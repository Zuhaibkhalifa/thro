import axios from 'axios';
import _, { forEach } from 'lodash';

import { domain } from '../App';

//

export default async function thromboMedicationAlgo(indicators) {
   // indicators = {
   //    indicationRisk: 1,
   //    patientBleedingRisk: 1,
   //    surgeryBleedingRisk: 1,
   //    CrCl: 37.46,
   // };
   // const testCase = {
   //    warfain: true,
   //    dabigatran: false,
   //    apixaban: false,

   //    rivaroxaban: false,
   //    rivaroxaban_freq: 'once',
   //    rivaroxaban_dosage: '15',
   //    rivaroxaban_dosage_time: 'am',

   //    edoxaban: false,
   //    edoxaban_freq: 'once',
   //    edoxaban_dosage_time: 'am',
   // };

   const data = await getDrugData();

   console.log('thromboMedicationAlgo - indicators: ', indicators);
   console.log('thromboMedicationAlgo - data: ', data);

   const algodata = mapMedicationData(data);
   // const algodata = testCase;

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
         const res = await axios.get(domain + '/api/nurse/medicationDrugDetails', {
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

      data['warfain'] = d.coumadin != '' ? true : false;

      // data['lmwh'] = d.coumadin != '' ? true : false;

      data['dabigatran'] = d.pradaxa != '' ? true : false;

      data['apixaban'] = d.eliquis != '' ? true : false;

      data['rivaroxaban'] = d.Xarelto != '' ? true : false;
      data['rivaroxaban_dosage'] = checkAndGetDosage(d.xarelto_dosage, ['10', '15', '20']);
      data['rivaroxaban_freq'] = checkAndGetDosage(d.xarelto_dosage, ['once', 'twice']);
      data['rivaroxaban_dosage_time'] = checkAndGetDosage(d.xarelto_dosage_time, ['am', 'pm']);

      data['edoxaban'] = d.edoxaban != '' ? true : false;
      data['edoxabon_freq'] = checkAndGetDosage(d.xarelto_dosage, ['once']);
      data['edoxaban_dosage_time'] = checkAndGetDosage(d.xarelto_dosage_time, ['am', 'pm']);

      return data;
   }

   function detectCase(d) {
      if (d.warfain) return Warfain(indicators);
      // if (d.lmwh) return
      // if (d.lmwh) return
      else if (d.dabigatran) return Dabigatran(indicators);
      else if (d.apixaban) return Apixaban(indicators);
      else if (
         d.rivaroxaban &&
         d.rivaroxaban_freq == 'once' &&
         (d.rivaroxaban_dosage == '15' || d.rivaroxaban_dosage == '20')
      )
         return Rivaroxaban_20_or_15_once(indicators);
      else if (d.rivaroxaban && d.rivaroxaban_freq == 'once' && d.rivaroxaban_dosage == '10')
         return Rivaroxaban_10_once(indicators);
      else if (d.rivaroxaban && d.rivaroxaban_freq == 'twice' && d.rivaroxaban_dosage == '15')
         return Rivaroxaban_15_twice(indicators);
      else if (d.edoxaban && d.edoxaban_freq == 'once') return Edoxaban(indicators);
   }

   //
   function Warfain(indicators) {
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
      if (IR == 0 && PBR == 0 && SBR == 2) return table;
      // case a.2  FLAG
      else if (IR == 0 && PBR == 1 && SBR == 2) {
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         return table;
      }

      // case a.3
      else if (IR == 0 && PBR == 0 && SBR == 1) {
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');
         return table;
      }

      // case a.4
      else if (IR == 0 && PBR == 1 && SBR == 1) {
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');
         return table;
      }

      // case b
      else if (SBR == 3) {
         table = modifyData(table, [0, 1, 2, 3, 4, 5, 6], 'warfain', 'usual dosage');

         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         table.data[11].lab = 'Goto lab for INR test';

         return table;
      }

      // case c.1
      else if (IR == 1 && PBR == 0 && SBR == 2 && CrCl >= 30) {
         return lmwh(table);
      }

      // case c.2
      else if (IR == 1 && PBR == 1 && SBR == 1 && CrCl >= 30) {
         table = lmwh(table);
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');

         return table;
      }

      // case c.3    FLAG
      else if (IR == 1 && PBR == 1 && SBR == 2 && CrCl >= 30) {
         table = lmwh(table);
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';

         return table;
      }

      // case c.4    FLAG
      else if (IR == 1 && PBR == 1 && SBR == 1 && CrCl >= 30) {
         table = lmwh(table);
         table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
         table = modifyData(table, [5, 6], 'warfain', 'usual dosage');

         return table;
      }

      // case d.1
      else if (IR == 1 && PBR == 0 && SBR == 2 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [7, 8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }

      // case e.1
      else if (IR == 1 && PBR == 0 && SBR == 1 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [5, 6, 7], 'warfain', 'usual dosage');
         table = modifyData(table, [8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }

      // case e.2     FLAG
      else if (IR == 1 && PBR == 1 && SBR == 2 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [7, 8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }

      // case e.3     FLAG
      else if (IR == 1 && PBR == 1 && SBR == 1 && CrCl < 30) {
         table = heparin(table);
         table = modifyData(table, [5, 6, 7], 'warfain', 'usual dosage');
         table = modifyData(table, [8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }
   }

   function Dabigatran(indicators) {
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
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

      if (SBR == 3) return table; // case a.1

      // case b.1
      if (SBR == 2 && CrCl >= 50) {
         table = modifyData(table, [4, 5], 'dabigatran', '');
         table = modifyData(table, [6], 'dabigatran', 'Pm only');

         return table;
      }

      // case b.2
      if (SBR == 1 && CrCl >= 50) {
         table = modifyData(table, [3, 4, 5, 6], 'dabigatran', '');
         table = modifyData(table, [7], 'dabigatran', 'Pm only');

         return table;
      }

      // case c.1
      if (SBR == 2 && CrCl < 50) {
         table = modifyData(table, [2, 3, 4, 5], 'dabigatran', '');
         table = modifyData(table, [6], 'dabigatran', 'Pm only');

         return table;
      }

      // case c.2
      if (SBR == 1 && CrCl < 50) {
         table = modifyData(table, [1, 2, 3, 4, 5, 6], 'dabigatran', '');
         table = modifyData(table, [7], 'dabigatran', 'Pm only');

         return table;
      }
   }

   function Apixaban(indicators) {
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
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
      if (SBR == 3) return table;

      // case b.1
      if (SBR == 2) {
         table = modifyData(table, [4, 5], 'apixaban', '');
         table = modifyData(table, [6], 'apixaban', 'Pm only');

         return table;
      }

      // case c.1
      if (SBR == 1) {
         table = modifyData(table, [3, 4, 5, 6], 'dabigatran', '');
         table = modifyData(table, [7], 'dabigatran', 'Pm only');

         return table;
      }
   }

   function Rivaroxaban_20_or_15_once(indicators) {
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
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
      if (SBR == 3) return table;

      // case b.1
      if (SBR == 2 && RDT == 'am') {
         return modifyData(table, [4, 5, 6], 'rivaroxaban', '');
      }

      // case b.1
      if (SBR == 2 && RDT == 'pm') {
         return modifyData(table, [4, 5], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR == 1 && RDT == 'am') {
         return modifyData(table, [3, 4, 5, 6, 7], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR == 1 && RDT == 'pm') {
         return modifyData(table, [3, 4, 5, 6], 'rivaroxaban', '');
      }
   }

   function Rivaroxaban_10_once(indicators) {
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
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
      if (SBR == 3) return table;

      // case b.1
      if (SBR == 2 && RDT == 'am') {
         return modifyData(table, [5, 6], 'rivaroxaban', '');
      }

      // case b.1
      if (SBR == 2 && RDT == 'pm') {
         return modifyData(table, [4, 5], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR == 1 && RDT == 'am') {
         return modifyData(table, [4, 5, 6, 7], 'rivaroxaban', '');
      }

      // case c.1
      if (SBR == 1 && RDT == 'pm') {
         return modifyData(table, [3, 4, 5, 6], 'rivaroxaban', '');
      }
   }

   function Rivaroxaban_15_twice(indicators) {
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
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators;
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
      if (SBR == 3) return table;

      // case b.1
      if (SBR == 2 && RDT == 'am') {
         return modifyData(table, [4, 5, 6], 'edoxaban', '');
      }
      // case b.1
      if (SBR == 2 && RDT == 'pm') {
         return modifyData(table, [4, 5], 'edoxaban', '');
      }

      // case c.1
      if (SBR == 1 && RDT == 'am') {
         return modifyData(table, [3, 4, 5, 6, 7], 'edoxaban', '');
      }
      // case c.1
      if (SBR == 1 && RDT == 'pm') {
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
         d[prop] = value;
      });
      return table;
   }

   //
   function modifyData(table, targets, prop, value) {
      targets.map((t) => {
         table.data[t][prop] = value;
      });
      return table;
   }

   //
   function checkAndGetDosage(str, arr) {
      if (str == null) return 'none';
      for (let i = 0; i < arr.length; i++) if (str.search(arr[i]) != -1) return arr[i];
   }

   return tableData;
}
