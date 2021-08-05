import axios from 'axios';
import { domain } from '../App';

export default async function thromboMedicationAlgo(indicators) {

   const data = await getDrugData();

   console.log('thromboMedicationAlgo - indicators: ', indicators);

   const algodata = mapMedicationData(data);
   console.log('thromboMedicationAlgo - algodata: ', algodata);

   const tableData = detectCase(algodata);
   console.log('thromboMedicationAlgo - detectCase - table: ', tableData);

   // Get all the data needed for Thrombo Algo
   async function getDrugData() {
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };

      try {
         let patient_id = localStorage.getItem('patient_id');
         const res = await axios.get(domain + `/api/nurse/medicationDrugDetails/:${patient_id}`, {
            headers: headers,
         });

         console.log('MedicationAlgo data - response: ', res.data.success[0]);
         return await res.data.success[0];

         //
      } catch (error) {
         console.error(error);
      }
   }

   function mapMedicationData(d) {
      let data = {};

      data['warfain'] = d.coumadin != null ? true : false;

      data['dabigatran'] = d.pradaxa != null ? true : false;

      data['apixaban'] = d.eliquis != null ? true : false;

      data['rivaroxaban'] = d.Xarelto != null ? true : false;
      data['rivaroxaban_dosage'] = checkAndGetDosage(d.xarelto_dosage, ['10', '15', '20']);
      data['rivaroxaban_freq'] = checkAndGetDosage(d.xarelto_dosage, ['once', 'twice']);
      data['rivaroxaban_dosage_time'] = checkAndGetDosage(d.xarelto_dosage_time, ['am', 'pm']);

      data['edoxaban'] = d.edoxaban != null ? true : false;
      data['edoxabon_freq'] = checkAndGetDosage(d.xarelto_dosage, ['once']);
      data['edoxaban_dosage_time'] = checkAndGetDosage(d.xarelto_dosage_time, ['am', 'pm']);

      data['lmwh'] = d.dalteparin != null || d.enoxaparin != null || d.tinzaparin != null ? true : false;
      data['lmwh_drug'] =
         d.dalteparin != null
            ? 'dalteparin'
            : d.enoxaparin != null
            ? 'enoxaparin'
            : d.tinzaparin != null
            ? 'tinzaparin'
            : null;

      data[`lmwh_dosage`] = d[`${data['lmwh_drug']}_dosage`] != null ? d[`${data['lmwh_drug']}_dosage`] : 'none';
      data[`lmwh_freq`] = checkAndGetDosage(d[`${data['lmwh_drug']}_freq`], ['once', 'twice']);

      // data['lmwh_dalteparin'] = d.dalteparin != null ? true : false;
      // data['lmwh_dalteparin_dosage'] = d.dalteparin_dosage != null ? d.dalteparin_dosage : 'none';
      // data['lmwh_dalteparin_freq'] = checkAndGetDosage(d.dalteparin_freq, ['once', 'twice']);

      // data['lmwh_enoxaparin'] = d.enoxaparin != null ? true : false;
      // data['lmwh_enoxaparin_dosage'] = d.enoxaparin_dosage != null ? d.enoxaparin_dosage : 'none';
      // data['lmwh_enoxaparin_freq'] = checkAndGetDosage(d.enoxaparin_freq, ['once', 'twice']);

      // data['lmwh_tinzaparin'] = d.tinzaparin != null ? true : false;
      // data['lmwh_tinzaparin_dosage'] = d.tinzaparin_dosage != null ? d.tinzaparin_dosage : 'none';
      // data['lmwh_tinzaparin_freq'] = checkAndGetDosage(d.tinzaparin_freq, ['once', 'twice']);

      return data;
   }

   function detectCase(d) {
      if (d.warfain) return Warfain(indicators);
      else if (d.lmwh && d.lmwh_freq === 'twice') return LMWH_twice(indicators);
      else if (d.lmwh && d.lmwh_freq === 'once') return LMWH_once(indicators);
      else if (d.dabigatran) return Dabigatran(indicators);
      else if (d.apixaban) return Apixaban(indicators);
      else if (
         d.rivaroxaban &&
         d.rivaroxaban_freq === 'once' &&
         (d.rivaroxaban_dosage === '15' || d.rivaroxaban_dosage === '20')
      )
         return Rivaroxaban_20_or_15_once(indicators);
      else if (d.rivaroxaban && d.rivaroxaban_freq === 'once' && d.rivaroxaban_dosage === '10')
         return Rivaroxaban_10_once(indicators);
      else if (d.rivaroxaban && d.rivaroxaban_freq === 'twice' && d.rivaroxaban_dosage === '15')
         return Rivaroxaban_15_twice(indicators);
      else if (d.edoxaban && d.edoxaban_freq === 'once') return Edoxaban(indicators);

      return 'none';
   }

   //
   //

   function Warfain(indicators) {
      console.log('>>   CASE Warfain');
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
      let table = {
         header: ['date', 'warfain', 'lab'],
         data: [
            { d_5: 'D-5', warfain: 'No', lab: '' },
            { d_4: 'D-4', warfain: 'No', lab: '' },
            { d_3: 'D-3', warfain: 'No', lab: '' },
            { d_2: 'D-2', warfain: 'No', lab: '' },
            { d_1: 'D-1', warfain: 'No', lab: '' },
            { d: 'D', warfain: 'usual dosage * 2', lab: '' },
            { d1: 'D1', warfain: 'usual dosage * 2', lab: '' },
            { d2: 'D2', warfain: 'usual dosage', lab: '' },
            { d3: 'D3', warfain: 'usual dosage', lab: '' },
            { d4: 'D4', warfain: 'usual dosage', lab: '' },
            { d5: 'D5', warfain: 'usual dosage', lab: '' },
            { d6: 'First weekday after D5', warfain: '', lab: 'Goto Lab for INR test' },
         ],
         note: {},
      };

      const lmwh = (data) => {
         data = addNewProp(data, 'lmwh', '');
         data = modifyData(data, [2, 3, 7, 8], 'lmwh', 'am pm');
         data = modifyData(data, [4], 'lmwh', 'am only');
         return modifyData(data, [6], 'lmwh', 'pm only');
      };
      const heparin = (data) => {
         data = addNote(
            data,
            'NoteHeprain1',
            'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery'
         );
         data = addNote(
            data,
            'NoteHeprain2',
            'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2'
         );

         data = addNewProp(data, 'heparin_4', '');
         data = modifyData(data, [0, 1, 2, 3, 4], 'heparin_4', 'NoteHeprain1');
         data = modifyData(data, [6, 7, 8, 9, 10, 11], 'heparin_4', 'NoteHeprain2');
         return modifyData(data, [2, 3, 4, 5, 6, 7, 8, 9, 10], 'lab', 'INR');
      };

      // case a.1
      if (IR === 0 && PBR === 0 && SBR === 2) return table;
      // case a.2  FLAG
      else if (IR === 0 && PBR === 1 && SBR === 2) {
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         return table;
      }

      // case a.3
      else if (IR === 0 && PBR === 0 && SBR === 1) {
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');
         return table;
      }

      // case a.4
      else if (IR === 0 && PBR === 1 && SBR === 1) {
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');
         return table;
      }

      // case b
      else if (SBR === 3) {
         table = modifyData(table, [0, 1, 2, 3, 4, 5, 6], 'warfain', 'usual dosage');

         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         table.data[11].lab = 'Goto lab for INR test';

         return table;
      }

      // case c.1
      else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl >= 30) {
         return lmwh(table);
      }

      // case c.2
      else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl >= 30) {
         table = lmwh(table);
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');

         return table;
      }

      // case c.3    FLAG
      else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl >= 30) {
         table = lmwh(table);
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';

         return table;
      }

      // case c.4    FLAG
      else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl >= 30) {
         table = lmwh(table);
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');

         return table;
      }

      // case d.1
      else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [7, 8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }

      // case e.1
      else if (IR === 1 && PBR === 0 && SBR === 1 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [5, 6, 7], 'warfain', 'usual dosage');
         table = modifyData(table, [8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }

      // case e.2     FLAG
      else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [7, 8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }

      // case e.3     FLAG
      else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [5, 6, 7], 'warfain', 'usual dosage');
         table = modifyData(table, [8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }
   }

   function LMWH_twice(indicators) {
      console.log('>>   CASE LMWH_twice');
      const { patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
      let table = {
         header: ['date', 'lmwh'],
         data: [
            { d_5: 'D-5', lmwh: 'Am Pm' },
            { d_4: 'D-4', lmwh: 'Am Pm' },
            { d_3: 'D-3', lmwh: 'Am Pm' },
            { d_2: 'D-2', lmwh: 'Am Pm' },
            { d_1: 'D-1', lmwh: 'Am Only' },
            { d: 'D', lmwh: '' },
            { d1: 'D1', lmwh: 'Pm Only' },
            { d2: 'D2', lmwh: 'Am Pm' },
            { d3: 'D3', lmwh: 'Am Pm' },
            { d4: 'D4', lmwh: 'Am Pm' },
            { d5: 'D5', lmwh: 'Am Pm' },
         ],
         note: {},
      };

      // Case a.1
      if (PBR === 0 && SBR === 2 && CrCl >= 50) return table;

      // Case a.2    FLAG
      if (PBR === 1 && SBR === 2 && CrCl >= 50) return table;

      // Case a.3
      if (PBR === 0 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'lmwh', '');

      // Case a.4    FLAG
      if (PBR === 1 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'lmwh', '');

      // Case b.1
      if (PBR === 0 && SBR === 2 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4], 'lmwh', '');

      // Case b.2    FLAG
      if (PBR === 1 && SBR === 2 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4], 'lmwh', '');

      // Case b.3
      if (PBR === 0 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 5, 6], 'lmwh', '');

      // Case b.4    FLAG
      if (PBR === 1 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 5, 6], 'lmwh', '');

      // Case c.1    FLAG
      if (CrCl < 30) {
         table = modifyData(table, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'lmwh', '');
         table = addNote(
            table,
            'Plan',
            'Relative contraindication to LMWH with CrCl <30. Periprocedural management plan should be individualized for this patient. And blank schedule appears'
         );

         return table;
      }
   }

   function LMWH_once(indicators) {
      console.log('>>   CASE LMWH_once');
      const { patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
      let table = {
         header: ['date', 'lmwh'],
         data: [
            { d_5: 'D-5', lmwh: 'Yes' },
            { d_4: 'D-4', lmwh: 'Yes' },
            { d_3: 'D-3', lmwh: 'Yes' },
            { d_2: 'D-2', lmwh: 'Yes' },
            { d_1: 'D-1', lmwh: 'Half dose in am' },
            { d: 'D', lmwh: '' },
            { d1: 'D1', lmwh: 'Half dose in pm' },
            { d2: 'D2', lmwh: 'Yes' },
            { d3: 'D3', lmwh: 'Yes' },
            { d4: 'D4', lmwh: 'Yes' },
            { d5: 'D5', lmwh: 'Yes' },
         ],
         note: {},
      };

      // Case a.1
      if (PBR === 0 && SBR === 2 && CrCl >= 50) return table;

      // Case a.2    FLAG
      if (PBR === 1 && SBR === 2 && CrCl >= 50) return table;

      // Case a.3
      if (PBR === 0 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'lmwh', '');

      // Case a.4    FLAG
      if (PBR === 1 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'lmwh', '');

      // Case b.1
      if (PBR === 0 && SBR === 2 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4], 'lmwh', '');

      // Case b.2    FLAG
      if (PBR === 1 && SBR === 2 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4], 'lmwh', '');

      // Case b.3
      if (PBR === 0 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 5, 6], 'lmwh', '');

      // Case b.4    FLAG
      if (PBR === 1 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 5, 6], 'lmwh', '');

      // Case c.1    FLAG
      if (CrCl < 30) {
         table = modifyData(table, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'lmwh', '');
         table = addNote(
            table,
            'Plan',
            'Relative contraindication to LMWH with CrCl <30. Periprocedural management plan should be individualized for this patient. And blank schedule appears'
         );

         return table;
      }
   }

   function Dabigatran(indicators) {
      console.log('>>   CASE Dabigatran');
      const { surgeryBleedingRisk: SBR, CrCl } = indicators;
      let table = {
         header: ['date', 'dabigatran'],
         data: [
            { d_5: 'D-5', dabigatran: 'Am and Pm' },
            { d_4: 'D-4', dabigatran: 'Am and Pm' },
            { d_3: 'D-3', dabigatran: 'Am and Pm' },
            { d_2: 'D-2', dabigatran: 'Am and Pm' },
            { d_1: 'D-1', dabigatran: 'Am and Pm' },
            { d: 'D', dabigatran: 'Am and Pm' },
            { d1: 'D1', dabigatran: 'Am and Pm' },
            { d2: 'D2', dabigatran: 'Am and Pm' },
            { d3: 'D3', dabigatran: 'Am and Pm' },
            { d4: 'D4', dabigatran: 'Am and Pm' },
            { d5: 'D5', dabigatran: 'Am and Pm' },
         ],
         note: {},
      };

      if (SBR === 3) return table; // case a.1

      // case b.1
      if (SBR === 2 && CrCl >= 50) {
         table = modifyData(table, [4, 5], 'dabigatran', '');
         table = modifyData(table, [6], 'dabigatran', 'Pm only');

         return table;
      }

      // case b.2
      if (SBR === 1 && CrCl >= 50) {
         table = modifyData(table, [3, 4, 5, 6], 'dabigatran', '');
         table = modifyData(table, [7], 'dabigatran', 'Pm only');

         return table;
      }

      // case c.1
      if (SBR === 2 && CrCl < 50) {
         table = modifyData(table, [2, 3, 4, 5], 'dabigatran', '');
         table = modifyData(table, [6], 'dabigatran', 'Pm only');

         return table;
      }

      // case c.2
      if (SBR === 1 && CrCl < 50) {
         table = modifyData(table, [1, 2, 3, 4, 5, 6], 'dabigatran', '');
         table = modifyData(table, [7], 'dabigatran', 'Pm only');

         return table;
      }
   }

   function Apixaban(indicators) {
      console.log('>>   CASE Apixaban');
      const { surgeryBleedingRisk: SBR } = indicators;
      let table = {
         header: ['date', 'apixaban'],
         data: [
            { d_5: 'D-5', apixaban: 'Am and Pm' },
            { d_4: 'D-4', apixaban: 'Am and Pm' },
            { d_3: 'D-3', apixaban: 'Am and Pm' },
            { d_2: 'D-2', apixaban: 'Am and Pm' },
            { d_1: 'D-1', apixaban: 'Am and Pm' },
            { d: 'D', apixaban: 'Am and Pm' },
            { d1: 'D1', apixaban: 'Am and Pm' },
            { d2: 'D2', apixaban: 'Am and Pm' },
            { d3: 'D3', apixaban: 'Am and Pm' },
            { d4: 'D4', apixaban: 'Am and Pm' },
            { d5: 'D5', apixaban: 'Am and Pm' },
         ],
         note: {},
      };

      // case a.1
      if (SBR === 3) return table;

      // case b.1
      if (SBR === 2) {
         table = modifyData(table, [4, 5], 'apixaban', '');
         table = modifyData(table, [6], 'apixaban', 'Pm only');

         return table;
      }

      // case c.1
      if (SBR === 1) {
         table = modifyData(table, [3, 4, 5, 6], 'dabigatran', '');
         table = modifyData(table, [7], 'dabigatran', 'Pm only');

         return table;
      }
   }

   function Rivaroxaban_20_or_15_once(indicators) {
      console.log('>>   CASE Rivaroxaban_20_or_15_once');
      const { surgeryBleedingRisk: SBR } = indicators;
      const { rivaroxaban_dosage_time: RDT } = algodata;

      let table = {
         header: ['date', 'rivaroxaban'],
         data: [
            { d_5: 'D-5', rivaroxaban: 'yes' },
            { d_4: 'D-4', rivaroxaban: 'yes' },
            { d_3: 'D-3', rivaroxaban: 'yes' },
            { d_2: 'D-2', rivaroxaban: 'yes' },
            { d_1: 'D-1', rivaroxaban: 'yes' },
            { d: 'D', rivaroxaban: 'yes' },
            { d1: 'D1', rivaroxaban: 'yes' },
            { d2: 'D2', rivaroxaban: 'yes' },
            { d3: 'D3', rivaroxaban: 'yes' },
            { d4: 'D4', rivaroxaban: 'yes' },
            { d5: 'D5', rivaroxaban: 'yes' },
         ],
         note: {},
      };

      //
      // case a.1
      if (SBR === 3) return table;

      // case b.1
      if (SBR === 2 && RDT === 'am') {
         return modifyData(table, [4, 5, 6], 'rivaroxaban', '');
      }

      // case b.1
      if (SBR === 2 && RDT === 'pm') {
         return modifyData(table, [4, 5], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR === 1 && RDT === 'am') {
         return modifyData(table, [3, 4, 5, 6, 7], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR === 1 && RDT === 'pm') {
         return modifyData(table, [3, 4, 5, 6], 'rivaroxaban', '');
      }
   }

   function Rivaroxaban_10_once(indicators) {
      console.log('>>   CASE Rivaroxaban_10_once');
      const { surgeryBleedingRisk: SBR } = indicators;
      const { rivaroxaban_dosage_time: RDT } = algodata;

      let table = {
         header: ['date', 'rivaroxaban'],
         data: [
            { d_5: 'D-5', rivaroxaban: 'yes' },
            { d_4: 'D-4', rivaroxaban: 'yes' },
            { d_3: 'D-3', rivaroxaban: 'yes' },
            { d_2: 'D-2', rivaroxaban: 'yes' },
            { d_1: 'D-1', rivaroxaban: 'yes' },
            { d: 'D', rivaroxaban: 'yes' },
            { d1: 'D1', rivaroxaban: 'yes' },
            { d2: 'D2', rivaroxaban: 'yes' },
            { d3: 'D3', rivaroxaban: 'yes' },
            { d4: 'D4', rivaroxaban: 'yes' },
            { d5: 'D5', rivaroxaban: 'yes' },
         ],
         note: {},
      };

      //
      // case a.1
      if (SBR === 3) return table;

      // case b.1
      if (SBR === 2 && RDT === 'am') {
         return modifyData(table, [5, 6], 'rivaroxaban', '');
      }

      // case b.1
      if (SBR === 2 && RDT === 'pm') {
         return modifyData(table, [4, 5], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR === 1 && RDT === 'am') {
         return modifyData(table, [4, 5, 6, 7], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR === 1 && RDT === 'pm') {
         return modifyData(table, [3, 4, 5, 6], 'rivaroxaban', '');
      }
   }

   function Rivaroxaban_15_twice(indicators) {
      console.log('>>   CASE Rivaroxaban_15_twice');
      let table = {
         header: ['date', 'rivaroxaban'],
         data: [
            { d_5: 'D-5', rivaroxaban: ' ' },
            { d_4: 'D-4', rivaroxaban: ' ' },
            { d_3: 'D-3', rivaroxaban: ' ' },
            { d_2: 'D-2', rivaroxaban: ' ' },
            { d_1: 'D-1', rivaroxaban: ' ' },
            { d: 'D', rivaroxaban: ' ' },
            { d1: 'D1', rivaroxaban: ' ' },
            { d2: 'D2', rivaroxaban: ' ' },
            { d3: 'D3', rivaroxaban: ' ' },
            { d4: 'D4', rivaroxaban: ' ' },
            { d5: 'D5', rivaroxaban: ' ' },
         ],
         note: {},
      };

      // case a.1
      return table;
   }

   function Edoxaban(indicators) {
      console.log('>>   CASE Edoxaban');
      const { surgeryBleedingRisk: SBR } = indicators;
      const { rivaroxaban_dosage_time: RDT } = algodata;

      let table = {
         header: ['date', 'edoxaban'],
         data: [
            { d_5: 'D-5', edoxaban: 'yes' },
            { d_4: 'D-4', edoxaban: 'yes' },
            { d_3: 'D-3', edoxaban: 'yes' },
            { d_2: 'D-2', edoxaban: 'yes' },
            { d_1: 'D-1', edoxaban: 'yes' },
            { d: 'D', edoxaban: 'yes' },
            { d1: 'D1', edoxaban: 'yes' },
            { d2: 'D2', edoxaban: 'yes' },
            { d3: 'D3', edoxaban: 'yes' },
            { d4: 'D4', edoxaban: 'yes' },
            { d5: 'D5', edoxaban: 'yes' },
         ],
         note: {},
      };

      //
      // case a.1
      if (SBR === 3) return table;

      // case b.1
      if (SBR === 2 && RDT === 'am') {
         return modifyData(table, [4, 5, 6], 'edoxaban', '');
      }
      // case b.1
      if (SBR === 2 && RDT === 'pm') {
         return modifyData(table, [4, 5], 'edoxaban', '');
      }

      // case c.1
      if (SBR === 1 && RDT === 'am') {
         return modifyData(table, [3, 4, 5, 6, 7], 'edoxaban', '');
      }
      // case c.1
      if (SBR === 1 && RDT === 'pm') {
         return modifyData(table, [3, 4, 5, 6], 'edoxaban', '');
      }
   }

   //

   //
   function addNote(table, key, value) {
      table.note[key] = value;
      return table;
   }

   //
   function addNewProp(table, prop, value) {
      table.header.splice(-1, 0, prop);
      table.data.map((d) => {
         return d[prop] = value;
      });
      return table;
   }

   //
   function modifyData(table, targets, prop, value) {
      targets.map((t) => {
         return table.data[t][prop] = value;
      });
      return table;
   }

   //
   function checkAndGetDosage(str, arr) {
      if (str === null) return 'none';
      for (let i = 0; i < arr.length; i++) if (str.search(arr[i]) !== -1) return arr[i];
   }

   return tableData;
}
