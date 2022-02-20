import axios from 'axios';
import { domain } from '../App';

export default async function thromboMedicationAlgo(__indicators) {
   console.log('thromboMedicationAlgo - indicators: ', __indicators);

   const data = await getDrugData();
   console.log('thromboMedicationAlgo - getDrugData => data: ', data);

   const indicators = check_sugery_bleeding_risk_outlier(__indicators, data);
   console.log('medAlgo indicators >>', indicators);

   const tableData = detectCase(data);
   console.log('thromboMedicationAlgo - detectCase - table: ', tableData);

   function getDayOfProcedure(date) {
      const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
      return days[new Date(date).getDay()];
   }

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

         console.log('MedicationAlgo data - response: ', res.data);
         return await res.data.success;

         //
      } catch (error) {
         console.error(error);
      }
   }

   // if indicators.surgeryBleedingRisk is 0(Zero)
   // Permanent pacemaker or ICD placement (if patient is on apixaban, edoxaban, rivaroxaban, or dabigatran – mod, if on any other drugs - low)
   function check_sugery_bleeding_risk_outlier(_indicators, _algodata) {
      const indicators = { ..._indicators };

      if (indicators.surgeryBleedingRisk === 0) {
         if(_algodata.doac.length !== 0 ) {
            let meds = _algodata.doac?.find(x => x.med_name !== "");
            if(meds !== undefined) {
               indicators.surgeryBleedingRisk = 2;
            } else {
               indicators.surgeryBleedingRisk = 3;
            }
         }
      }

      return indicators;
   }

   function detectCase(meds) {
      let data = {};
      data['vka'] = mapToVKACases(meds.vka, indicators, meds.date_of_procedure);
      data['lmwh'] = lmwhCases(meds.lmwh, indicators);
      data['doac'] = doacCases(meds.doac, indicators);
      console.log(meds);
      if(meds.antiplatelet.find(x => x.med_name === 'Aspirin (ASA)')) {
         data['aspirin'] = aspirin(meds.antiplatelet, indicators);
      }
      data['antiplatelets'] = antiplatelets(meds.antiplatelet, indicators);

      return data;
   }

   function lmwhCases(meds, indicators) {
      let med_data = meds.findIndex(x => x.med_name !== "");
      console.log('no data found', med_data);
      if(med_data !== -1) {
         let medData = [];
         meds.forEach(med => {
            medData.push({
               'med_name': med.med_name
            });
         });
         if(meds[med_data].med_dosage.toLowerCase() === ('once daily').toLowerCase()) {
            return LMWH_twice(meds[med_data], indicators, medData);
         } else if(meds[med_data].med_dosage.toLowerCase() === ('twice daily').toLowerCase()) {
            return LMWH_once(meds[med_data], indicators, medData);
         } else {
            let table = {
               header: medData,
               data: [
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Only' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: '' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Pm Only' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
                  { 'dosage': meds[med_data].med_dosage, lmwh: 'Am Pm' },
               ],
               note: {},
            };

            return table;
         }
      }
   }

   function doacCases(meds, indicators) {
      let data = {};
      let medIndx = meds.findIndex(x => x.med_name !== "");
      
      if(medIndx !== -1) {
         let medData = [];
         meds.forEach(med => {
            if(med.med_name !== meds[medIndx]) {
               medData.push({
                  'med_name': med.med_name
               });
            }
         });
         if(meds[medIndx].med_name === "Pradaxa (Dabigatran)") {
            data['dabigatran'] = Dabigatran(meds[medIndx], indicators, medData);
         } else if(meds[medIndx].med_name === "Eliquis (Apixaban)") {
            data['apixaban'] = Apixaban(meds[medIndx], indicators, medData);
         } else if(meds[medIndx].med_name === "Xarelto (Rivaroxaban)") {
            if(meds[medIndx].med_dosage_time.toLowerCase() === ('once daily').toLowerCase() && (meds[medIndx].med_dosage === '15' || meds[medIndx].med_dosage === '20')) {
               data['rivaroxaban'] = Rivaroxaban_20_or_15_once(meds[medIndx], indicators, medData);
            } else if(meds[medIndx].med_dosage_time.toLowerCase() === ('once daily').toLowerCase() && meds[medIndx].med_dosage === '10') {
               data['rivaroxaban'] = Rivaroxaban_10_once(meds[medIndx], indicators, medData);
            } else if(meds[medIndx].med_dosage_time.toLowerCase() === ('twice daily').toLowerCase() && meds[medIndx].med_dosage === '15') {
               data['rivaroxaban'] = Rivaroxaban_15_twice(meds[medIndx], indicators, medData);
            }
         } else if(meds[medIndx].med_name === "Edoxabon (Lixiana)") {
            data['edoxaban'] = Edoxaban(meds[medIndx], indicators, medData);
         }
      }
      
      return data;
   }

   function getVKAMedsDoses(meds, date) {
      let day = getDayOfProcedure(date);
      let dkey = meds?.med_name.toLowerCase().split(' ')[0]+'_'+day;
      
      return meds.med_dosage[dkey];
   }

   function mapToVKACases(meds, indicators, date_of_procedure) {
      const procedure_day = getDayOfProcedure(date_of_procedure);
      let medIndx = meds.findIndex(x => x.med_dosage !== '');
      let med_data = medIndx !== -1 ? meds[medIndx] : '';
      let dataKey = med_data?.med_name.toLowerCase().split(' ')[0]+'_'+procedure_day;
      console.log('date :', date_of_procedure, 'day :', procedure_day, 'dataKey :', dataKey, 'med_data :', med_data);
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
      let table = {};

      if(med_data !== '') {
         let medData = [];
         let data = [
            { warfain: '0', lab: '' },
            { warfain: '0', lab: '' },
            { warfain: '0', lab: '' },
            { warfain: '0', lab: '' },
            { warfain: '0', lab: '' },
            { warfain: med_data.med_dosage[dataKey]+' * 2', lab: '' },
            { warfain: getVKAMedsDoses(med_data, date_of_procedure?.split('-')[0]+'-'+date_of_procedure?.split('-')[1]+'-'+(parseInt(date_of_procedure?.split('-')[2])+1))+' * 2', lab: '' },
            { warfain: getVKAMedsDoses(med_data, date_of_procedure?.split('-')[0]+'-'+date_of_procedure?.split('-')[1]+'-'+(parseInt(date_of_procedure?.split('-')[2])+2)), lab: '' },
            { warfain: getVKAMedsDoses(med_data, date_of_procedure?.split('-')[0]+'-'+date_of_procedure?.split('-')[1]+'-'+(parseInt(date_of_procedure?.split('-')[2])+3)), lab: '' },
            { warfain: getVKAMedsDoses(med_data, date_of_procedure?.split('-')[0]+'-'+date_of_procedure?.split('-')[1]+'-'+(parseInt(date_of_procedure?.split('-')[2])+4)), lab: '' },
            { warfain: getVKAMedsDoses(med_data, date_of_procedure?.split('-')[0]+'-'+date_of_procedure?.split('-')[1]+'-'+(parseInt(date_of_procedure?.split('-')[2])+5)), lab: '' },
            { d6: 'First weekday after D5', warfain: '', lab: 'Goto Lab for INR test' },
         ];

         meds.forEach(med => {
            medData.push({
               'med_name': med.med_name
            });
         });
         table['header'] = medData;
         table['data'] = data;

      } else {
         return undefined;
      }

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
         table = modifyData(table, [5, 6], 'warfain', med_data.med_dosage[dataKey]);
         return table;
      }

      // case a.4
      else if (IR === 0 && PBR === 1 && SBR === 1) {
         table = modifyData(table, [5, 6], 'warfain', med_data.med_dosage[dataKey]);
         return table;
      }

      // case b
      else if (SBR === 3) {
         table = modifyData(table, [0, 1, 2, 3, 4, 5, 6], 'warfain', med_data.med_dosage[dataKey]);

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
         table = modifyData(table, [5, 6], 'warfain', med_data.med_dosage[dataKey]);

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
         table = modifyData(table, [5, 6], 'warfain', med_data.med_dosage[dataKey]);

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
         table = modifyData(table, [5, 6, 7], 'warfain', med_data.med_dosage[dataKey]);
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
         table = modifyData(table, [5, 6, 7], 'warfain', med_data.med_dosage[dataKey]);
         table = modifyData(table, [8, 9, 10], 'warfain', 'Dose dependents on INR');

         return table;
      }

      return table;
   }

   function aspirin(meds, indicators) {
      console.log('>>   CASE Antiplatelets', meds);
      let med_data = meds.find(x => x.med_name !== "");
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
      let table = {};
      if(med_data !== undefined) {
         let med_Indx = meds.findIndex(x => x.med_name !== "");
         let data = [
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { aspirin: meds[med_Indx].med_dosage, lab: '' },
            { d6: 'First weekday after D5', lab: 'Goto Lab for INR test' },
         ];

         table['header'] = [meds[med_Indx]];
         table['data'] = data;
      }

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

      return table;
   }

   function antiplatelets(meds, indicators) {
      console.log('>>   CASE Antiplatelets', meds);
      let medAspIndx = meds.findIndex(x => x.med_name === "Aspirin (ASA)");
      if(medAspIndx !== -1) {
         meds.splice(medAspIndx, 1);
      }
      let med_data = meds.find(x => x.med_name !== "");
      const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
      let table = {};
      if(med_data !== undefined) {
         let medData = [];
         meds.forEach(med => {
            medData.push({
               'med_name': med.med_name
            });
         });
         let med_Indx = meds.findIndex(x => x.med_name !== "");
         let data = [
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { antiplatelets: meds[med_Indx].med_dosage, lab: '' },
            { d6: 'First weekday after D5', lab: 'Goto Lab for INR test' },
         ];

         table['header'] = medData;
         table['data'] = data;
      }

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

      return table;
   }

   function LMWH_twice(meds, indicators, headers) {
      console.log('>>   CASE LMWH_twice');
      const { patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Only' },
            { 'dosage': meds.med_dosage, lmwh: '' },
            { 'dosage': meds.med_dosage, lmwh: 'Pm Only' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
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

      return table;
   }

   function LMWH_once(meds, indicators, headers) {
      console.log('>>   CASE LMWH_once');
      const { patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Only' },
            { 'dosage': meds.med_dosage, lmwh: '' },
            { 'dosage': meds.med_dosage, lmwh: 'Pm Only' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
            { 'dosage': meds.med_dosage, lmwh: 'Am Pm' },
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

      return table;
   }

   function Dabigatran(meds, indicators, headers) {
      console.log('>>   CASE Dabigatran');
      const { surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
            { 'dosage': meds.med_dosage, dabigatran: 'Am and Pm' },
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

      return table;
   }

   function Apixaban(meds, indicators, headers) {
      console.log('>>   CASE Apixaban');
      const { surgeryBleedingRisk: SBR } = indicators ? indicators : 0;
      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
            { 'dosage': meds.med_dosage, apixaban: 'Am and Pm' },
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

      return table;
   }

   function Rivaroxaban_20_or_15_once(meds, indicators, headers) {
      console.log('>>   CASE Rivaroxaban_20_or_15_once');
      const { surgeryBleedingRisk: SBR } = indicators ? indicators : 0;
      const { rivaroxaban_dosage_time: RDT } = meds.med_dosage_time ? meds.med_dosage_time : '';

      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
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

      return table;
   }

   function Rivaroxaban_10_once(meds, indicators, headers) {
      console.log('>>   CASE Rivaroxaban_10_once');
      const { surgeryBleedingRisk: SBR } = indicators ? indicators : 0;
      const { rivaroxaban_dosage_time: RDT } = meds.med_dosage_time ? meds.med_dosage_time : '';

      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
            { 'dosage': meds.med_dosage, rivaroxaban: 'yes' },
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

      return table;
   }

   function Rivaroxaban_15_twice(meds, indicators, headers) {
      console.log('>>   CASE Rivaroxaban_15_twice');
      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
            { 'dosage': meds.med_dosage, rivaroxaban: ' ' },
         ],
         note: {},
      };

      // case a.1
      return table;
   }

   function Edoxaban(meds, indicators, headers) {
      console.log('>>   CASE Edoxaban');
      const { surgeryBleedingRisk: SBR } = indicators ? indicators : 0;
      const { rivaroxaban_dosage_time: RDT } = meds.med_dosage_time ? meds.med_dosage_time : '';

      let table = {
         header: headers,
         data: [
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
            { 'dosage': meds.med_dosage, edoxabon: 'yes' },
         ],
         note: {},
      };

      //
      // case a.1
      if (SBR === 3) return table;

      // case b.1
      if (SBR === 2 && RDT === 'am') {
         return modifyData(table, [4, 5, 6], 'edoxabon', '');
      }
      // case b.1
      if (SBR === 2 && RDT === 'pm') {
         return modifyData(table, [4, 5], 'edoxabon', '');
      }

      // case c.1
      if (SBR === 1 && RDT === 'am') {
         return modifyData(table, [3, 4, 5, 6, 7], 'edoxabon', '');
      }
      // case c.1
      if (SBR === 1 && RDT === 'pm') {
         return modifyData(table, [3, 4, 5, 6], 'edoxabon', '');
      }

      return table;
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
         return (d[prop] = value);
      });
      return table;
   }

   //
   function modifyData(table, targets, prop, value) {
      targets.map((t) => {
         return (table.data[t][prop] = value);
      });
      return table;
   }

   return tableData;
}
