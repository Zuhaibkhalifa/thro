import axios from 'axios';
import { domain } from '../App';

export default async function thromboMedicationAlgo(_indicators) {
    const drugData = await getDrugData();
    console.log('>> drug details - ', drugData, _indicators);
    const indicators = check_sugery_bleeding_risk_outlier(_indicators, drugData);
    console.log('indicators after ==> ', indicators);
    
   function getDayOfProcedure(date) {
      const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
      return days[new Date(date).getDay()];
   }

   function daysInMonth(month, year, days, additionalValue) {
      const currentDays = new Date(year, month, 0).getDate();
      if(parseInt(days)+additionalValue < 0) {
         if(parseInt(month) === 1) return 12;
         else return 12+additionalValue;
      } else {
         if(currentDays === parseInt(days)) {
            if((parseInt(month)+1) > 12) return 1;
            else return month;
         } else if(currentDays === (parseInt(days)+additionalValue)) return parseInt(month);
         else if(currentDays < (parseInt(days)+additionalValue)) {
            if((parseInt(month)+1) > 12) return 1;
            else return parseInt(month)+1;
         } else return parseInt(month); 
      }
   }

   function resetDays(month, year, days, additionalValue) {
      const currentDays = new Date(year, month, 0).getDate();
      if(parseInt(days)+additionalValue < 0) {
         return parseInt(currentDays)+additionalValue;
      } else {
         if(currentDays === parseInt(days)) return ((parseInt(days)+additionalValue) - currentDays) === 0 ? currentDays : ((parseInt(days)+additionalValue) - currentDays);
         else if(currentDays === (parseInt(days)+additionalValue)) return ((parseInt(days)+additionalValue));
         else if(currentDays < (parseInt(days)+additionalValue)) return ((parseInt(days)+additionalValue) - currentDays);
         else return ((parseInt(days)+additionalValue)); 
      }
   }

   function resetYear(year, month, days, additionalValue) {
      const currentDays = new Date(year, month, 0).getDate();
      if(parseInt(days)+additionalValue < 0) {
         if(parseInt(month)-1 < 0) return parseInt(year)-1;
         else return parseInt(year);
      } else {
         if(currentDays === parseInt(days)) {
            if((parseInt(month)+1) > 12) return parseInt(year)+1;
            else return parseInt(year);
         } else if(currentDays === (parseInt(days)+additionalValue)) return parseInt(year);
         else if(currentDays < (parseInt(days)+additionalValue)) {
            if((parseInt(month)+1) > 12) return parseInt(year)+1;
            else return parseInt(year);
         } else return parseInt(year);
      }
   }

    function check_sugery_bleeding_risk_outlier(_indicators, _algodata) {
        const indicators = { ..._indicators };
  
        if (indicators.surgeryBleedingRisk === 0) {
           if(_algodata.doac.length !== 0 ) {
              let meds = _algodata.doac?.find(x => x.med_dosage !== "");
              if(meds !== undefined) {
                 indicators.surgeryBleedingRisk = 2;
              } else {
                 indicators.surgeryBleedingRisk = 3;
              }
           }
        }
  
        return indicators;
    }

    const tableData = detectCase(drugData);

    function detectCase(meds) {
         console.log(meds);
        let data = {};
        let vkaData = mapToVKACases(meds.vka, indicators, meds.date_of_procedure, meds.lmwh);
        console.log("vka data ==> ", vkaData);
        if(vkaData[1] !== undefined) data['lmwh'] = vkaData[1]; else data['lmwh'] = lmwhCases(meds.lmwh, indicators);
        if(vkaData[2] !== undefined) data['iv_heparin'] = vkaData[2];
        data['vka'] = vkaData[0];
        data['doac'] = doacCases(meds.doac, indicators);
        data['aspirin'] = aspirin(meds.aspirin, indicators);
        data['antiplatelets'] = antiplatelets(meds.antiplatelet, indicators);
  
        return data;
    }

    function getVKAMedsDoses(meds, date) {
        let day = getDayOfProcedure(date);
        let dkey = meds?.med_name.toLowerCase().split(' ')[0]+'_'+day;

        console.log('vka doses', meds, date, day, dkey);
        
        return meds.med_dosage[dkey];
    }

    function mapToVKACases(meds, indicators, date_of_procedure, lmwhMeds) {
        const procedure_day = getDayOfProcedure(date_of_procedure);
        let medIndx = meds.findIndex(x => x.med_dosage !== '');
        let med_data = medIndx !== -1 ? meds[medIndx] : '';
        let LMWHMeds = getLMWHData(lmwhMeds);
        let table = {};
  
        if(med_data !== '') {
         //   let dataKey = getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2)));
           console.log('date :', date_of_procedure, 'day :', procedure_day, 'med_data :', med_data);
           const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
           
           console.log('indicators ==> ', indicators);
           
           let medData = [];
           let data = [
              { warfain: 'No', frequency: 'do not take', lab: '' },
              { warfain: 'No', frequency: 'do not take', lab: '' },
              { warfain: 'No', frequency: 'do not take', lab: '' },
              { warfain: 'No', frequency: 'do not take', lab: '' },
              { warfain: 'No', frequency: 'do not take', lab: '' },
              { warfain: parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0)))*2).toString(), lab: '', frequency: 'morning' },
              { warfain: parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1)))*2).toString(), lab: '', frequency: 'morning' },
              { warfain: getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), lab: '', frequency: 'morning' },
              { warfain: getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))), lab: '', frequency: 'morning' },
              { warfain: getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))), lab: '', frequency: 'morning' },
              { warfain: getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))), lab: '', frequency: 'morning' },
              { d6: `First weekday after ${date_of_procedure}`, lab: 'Goto Lab for INR test' },
           ];
  
           meds.forEach(med => {
              medData.push({
                 'med_name': med.med_name
              });
           });
           table['header'] = medData;
           table['data'] = data;
    
            // case a.1
            if (IR === 0 && PBR === 0 && SBR === 2) {
               return [table];
            }
            // case a.2  FLAG
            else if (IR === 0 && PBR === 1 && SBR === 2) {
                table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
                
                return [table];
            }
    
            // case a.3
            else if (IR === 0 && PBR === 0 && SBR === 1) {
               table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
               table = modifyData(table, [5], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [6], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                
               return [table];
            }
    
            // case a.4
            else if (IR === 0 && PBR === 1 && SBR === 1) {
                table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
                table = modifyData(table, [5], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [6], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               
                return [table];
            }
    
            // case b
            else if (SBR === 3) {
               table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
               table = modifyData(table, [0], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], -5))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -5))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -5))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [1], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], -4))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -4))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -4))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [2], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], -3))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -3))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -3))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [3], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], -2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [4], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], -1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], -1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [5], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [6], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [7], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [8], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [9], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [10], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               
               return [table];
            }
    
            // case c.1
            else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl >= 30) {
                table.data[2].frequency = 'morning and evening';
                table.data[3].frequency = 'morning and evening';
                table.data[4].frequency = 'morning';
                table.data[6].frequency = 'evening';
                table.data[7].frequency = 'morning and evening';
                table.data[8].frequency = 'morning and evening';
                table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [5], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [6], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [7], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [8], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [9], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [10], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               
                return [table, LMWHMeds];
            }
    
            // case c.2
            else if (IR === 1 && PBR === 0 && SBR === 1 && CrCl >= 30) {
                table.data[2].frequency = 'morning and evening';
                table.data[3].frequency = 'morning and evening';
                table.data[4].frequency = 'morning';
                table.data[6].frequency = 'evening';
                table.data[7].frequency = 'morning and evening';
                table.data[8].frequency = 'morning and evening';
                table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
                table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [5], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [6], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [7], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [8], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [9], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [10], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               
                return [table, LMWHMeds];
            }
    
            // case c.3    FLAG
            else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl >= 30) {
                table.data[2].frequency = 'morning and evening';
                table.data[3].frequency = 'morning and evening';
                table.data[4].frequency = 'morning';
                table.data[6].frequency = 'evening';
                table.data[7].frequency = 'morning and evening';
                table.data[8].frequency = 'morning and evening';
                table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
                table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [5], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [6], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [7], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [8], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [9], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [10], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               
                return [table, LMWHMeds];
            }
    
            // case c.4    FLAG
            else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl >= 30) {
                table.data[2].frequency = 'morning and evening';
                table.data[3].frequency = 'morning and evening';
                table.data[4].frequency = 'morning';
                table.data[6].frequency = 'evening';
                table.data[7].frequency = 'morning and evening';
                table.data[8].frequency = 'morning and evening';
                table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
                table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [5], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [6], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [7], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [8], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 3))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [9], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 4))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [10], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 5))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               
                return [table, LMWHMeds];
            }
    
            // case d.1
            else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl < 30) {
               table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
               table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
               table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [5], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [6], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [7, 8, 9, 10], 'warfain', 'Dose dependents on INR', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table.data[12] = { d6: "", lab: "" };
               let heparinTable = {};
               
               heparinTable['header'] = [{ med_name: 'IV Heparin' }];
               heparinTable['data'] = [
                  { dosage: 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery.', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
               ];

               return [table, undefined, heparinTable];
            }
    
            // case e.1
            else if (IR === 1 && PBR === 0 && SBR === 1 && CrCl < 30) {
                table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
                table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
                table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [5], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [6], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [7], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [8, 9, 10], 'warfain', 'Dose dependents on INR', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table.data[12] = { d6: "", lab: "" };
                let heparinTable = {};
               
                heparinTable['header'] = [{ med_name: 'IV Heparin' }];
                heparinTable['data'] = [
                  { dosage: 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery.', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                ];

               return [table, undefined, heparinTable];
            }
    
            // case e.2     FLAG
            else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl < 30) {
               table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
               table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
               table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [5], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [6], 'warfain', parseInt(getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1)))*2).toString(), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table = modifyData(table, [7, 8, 9, 10], 'warfain', 'Dose dependents on INR', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
               table.data[12] = { d6: "", lab: "" };
               
               let heparinTable = {};
               
               heparinTable['header'] = [{ med_name: 'IV Heparin' }];
               heparinTable['data'] = [
                  { dosage: 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery.', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
                  { dosage: '', frequency: '' },
               ];

               return [table, undefined, heparinTable];
            }
    
            // case e.3     FLAG
            else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl < 30) {
                table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
                table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
                table = modifyData(table, [0, 1, 2, 3, 4], 'warfain', 'No', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [5], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 0))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [6], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 1))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [7], 'warfain', getVKAMedsDoses(med_data, parseInt(resetYear(date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(daysInMonth(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))+'-'+parseInt(resetDays(date_of_procedure?.split('-')[1], date_of_procedure?.split('-')[0], date_of_procedure?.split('-')[2], 2))), med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table = modifyData(table, [8, 9, 10], 'warfain', 'Dose dependents on INR', med_data?.med_dosage_time === 'Once daily' ? 'morning' : med_data?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
                table.data[12] = { d6: "", lab: "" };
                
                let heparinTable = {};
               
                heparinTable['header'] = [{ med_name: 'IV Heparin' }];
                heparinTable['data'] = [
                   { dosage: 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery.', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: '', frequency: '' },
                   { dosage: '', frequency: '' },
                ];
 
                return [table, undefined, heparinTable];
            }
    
            return [table, undefined, undefined];
  
        } else {
           let medData = [];
           let data = [
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { warfain: '', lab: '', frequency: 'do not take' },
              { d6: '', lab: '' },
           ];
  
           meds.forEach(med => {
              medData.push({
                 'med_name': med.med_name
              });
           });
           table['header'] = medData;
           table['data'] = data;

           return [table, undefined, undefined];;
        }
    }

    function getLMWHData(meds) {
      let med_data = meds.findIndex(x => x.med_dosage !== "");
      console.log('lmwh index', med_data);
      if(med_data !== -1) {
         let medData = [];
         meds.forEach(med => {
            medData.push({
               'med_name': med.med_name
            });
         });
         let tempArry = [...medData];
         let tempItem = tempArry.splice(med_data, 1)[0];
         tempArry.splice(0, 0, tempItem);
         console.log('>> lmwh data', meds[med_data].med_dosage_time.toLowerCase(), meds, med_data, tempArry);
         
         let table = {
            header: tempArry,
            data: [
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
               { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
               { 'dosage': meds[med_data].med_dosage, frequency: 'morning', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': meds[med_data].med_dosage, frequency: 'evening', lab: '' },
               { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
               { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
            ]
         };

         return table;
      } else {
         let medData = [];
         meds.forEach(med => {
            medData.push({
               'med_name': med.med_name
            });
         });
         let table = {
            header: medData,
            data: [
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': '30', frequency: 'morning and evening', lab: '' },
               { 'dosage': '30', frequency: 'morning and evening', lab: '' },
               { 'dosage': '30', frequency: 'morning', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': '30', frequency: 'evening', lab: '' },
               { 'dosage': '30', frequency: 'morning and evening', lab: '' },
               { 'dosage': '30', frequency: 'morning and evening', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
               { 'dosage': '', frequency: '', lab: '' },
            ]
         };

         return table;
      }
    }

    function lmwhCases(meds, indicators) {
        let med_data = meds.findIndex(x => x.med_dosage !== "");
        console.log('lmwh index', med_data);
        if(med_data !== -1) {
           let medData = [];
           meds.forEach(med => {
              medData.push({
                 'med_name': med.med_name
              });
           });
           let tempArry = [...medData];
           let tempItem = tempArry.splice(med_data, 1)[0];
           tempArry.splice(0, 0, tempItem);
           console.log('>> lmwh data', meds[med_data].med_dosage_time.toLowerCase(), meds, med_data, tempArry);
           if(meds[med_data].med_dosage_time.toLowerCase() === ('once daily').toLowerCase()) {
              console.log('>> lmwh once');
              return LMWH_once(meds[med_data], indicators, tempArry);
           } else if(meds[med_data].med_dosage_time.toLowerCase() === ('twice daily').toLowerCase()) {
              console.log('>> lmwh twice');
              return LMWH_twice(meds[med_data], indicators, tempArry);
           } else {
              let table = {
                 header: tempArry,
                 data: [
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: '', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                    { 'dosage': meds[med_data].med_dosage, frequency: 'morning and evening', lab: '' },
                 ],
              };
  
              return table;
           }
        } else {
            let medData = [];
            let table = {
                data: [
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                   { 'dosage': '', frequency: 'do not take' },
                ],
            };

            meds.forEach(med => {
              medData.push({
                 'med_name': med.med_name
              });
            });
           table['header'] = medData;
 
            return table;
        }
    }

    function LMWH_twice(meds, indicators, headers) {
        console.log('>>   CASE LMWH_twice');
        const { patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
        let table = {
           header: headers,
           data: [
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning', lab: '' },
            { 'dosage': '', frequency: '', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
           ],
        };
  
        // Case a.1
        if (PBR === 0 && SBR === 2 && CrCl >= 50) return table;
  
        // Case a.2    FLAG
        if (PBR === 1 && SBR === 2 && CrCl >= 50) return table;
  
        // Case a.3
        if (PBR === 0 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'dosage', '', '');
  
        // Case a.4    FLAG
        if (PBR === 1 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'dosage', '', '');
  
        // Case b.1
        if (PBR === 0 && SBR === 2 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [6], 'dosage', '', '');
  
        // Case b.2    FLAG
        if (PBR === 1 && SBR === 2 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [6], 'dosage', '', '');
  
        // Case b.3
        if (PBR === 0 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 6], 'dosage', '', '');
  
        // Case b.4    FLAG
        if (PBR === 1 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 6], 'dosage', '', '');
  
        // Case c.1    FLAG
        if (CrCl < 30) {
           table = modifyData(table, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'dosage', '', '');
           table['note1'] = 'Relative contraindication to LMWH with CrCl <30. Periprocedural management plan should be individualized for this patient. And blank schedule appears';
  
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
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': parseInt(meds.med_dosage)/2, frequency: 'morning', lab: '' },
            { 'dosage': '', frequency: '', lab: '' },
            { 'dosage': parseInt(meds.med_dosage)/2, frequency: 'evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
            { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
           ],
        };
  
        // Case a.1
        if (PBR === 0 && SBR === 2 && CrCl >= 50) return table;
  
        // Case a.2    FLAG
        if (PBR === 1 && SBR === 2 && CrCl >= 50) return table;
  
        // Case a.3
        if (PBR === 0 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'dosage', '', '');
  
        // Case a.4    FLAG
        if (PBR === 1 && SBR === 1 && CrCl >= 50) return modifyData(table, [6], 'dosage', '', '');
  
        // Case b.1
        if (PBR === 0 && SBR === 2 && CrCl >= 30 && CrCl <= 49) {
           table = modifyData(table, [4, 5], 'dosage', '', '');
           table = modifyData(table, [6], 'dosage', parseInt(meds?.med_dosage)/2, 'evening');

           return table;
        }
  
        // Case b.2    FLAG
        if (PBR === 1 && SBR === 2 && CrCl >= 30 && CrCl <= 49) {
            table = modifyData(table, [4, 5], 'dosage', '', '');
            table = modifyData(table, [6], 'dosage', parseInt(meds?.med_dosage)/2, 'evening');

            return table;
         }
  
        // Case b.3
        if (PBR === 0 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 5, 6], 'dosage', '', '');
  
        // Case b.4    FLAG
        if (PBR === 1 && SBR === 1 && CrCl >= 30 && CrCl <= 49) return modifyData(table, [4, 5, 6], 'dosage', '', '');
  
        // Case c.1    FLAG
        if (CrCl < 30) {
           table = modifyData(table, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'dosage', '', '');
           table['note1'] = 'Relative contraindication to LMWH with CrCl <30. Periprocedural management plan should be individualized for this patient. And blank schedule appears';
  
           return table;
        }
  
        return table;
    }

    function doacCases(meds, indicators) {
      let data = {};
      let medIndx = meds.findIndex(x => x.med_dosage !== "");
      
      if(medIndx !== -1) {
         let medData = [];
         meds.forEach(med => {
            if(med.med_name !== meds[medIndx]) {
               medData.push({
                  'med_name': med.med_name
               });
            }
         });
         let tempArry = [...medData];
         let tempItem = tempArry.splice(medIndx, 1)[0];
         tempArry.splice(0, 0, tempItem);
         if(meds[medIndx].med_name === "Pradaxa (Dabigatran)") {
            data['dabigatran'] = Dabigatran(meds[medIndx], indicators, tempArry);
         } else if(meds[medIndx].med_name === "Eliquis (Apixaban)") {
            data['apixaban'] = Apixaban(meds[medIndx], indicators, tempArry);
         } else if(meds[medIndx].med_name === "Xarelto (Rivaroxaban)") {
            if(meds[medIndx].med_dosage_time.toLowerCase() === ('once daily').toLowerCase() && (meds[medIndx].med_dosage === '15' || meds[medIndx].med_dosage === '20')) {
               data['rivaroxaban'] = Rivaroxaban_20_or_15_once(meds[medIndx], indicators, tempArry);
            } else if(meds[medIndx].med_dosage_time.toLowerCase() === ('once daily').toLowerCase() && meds[medIndx].med_dosage === '10') {
               data['rivaroxaban'] = Rivaroxaban_10_once(meds[medIndx], indicators, tempArry);
            } else if(meds[medIndx].med_dosage_time.toLowerCase() === ('twice daily').toLowerCase() && meds[medIndx].med_dosage === '15') {
               data['rivaroxaban'] = Rivaroxaban_15_twice(meds[medIndx], indicators, tempArry);
            }
         } else if(meds[medIndx].med_name === "Edoxabon (Lixiana)") {
            data['edoxaban'] = Edoxaban(meds[medIndx], indicators, tempArry);
         }
      } else {
        let medData = [];
        let table = {
            data: [
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
               { 'dosage': '', frequency: 'do not take', lab: '' },
            ],
        };

        meds.forEach(med => {
          medData.push({
             'med_name': med.med_name
          });
       });
       table['header'] = medData;

        return table;
    }
      
      return data;
    }
  
    function Dabigatran(meds, indicators, headers) {
        console.log('>>   CASE Dabigatran');
        const { surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
        let table = {
           header: headers,
           data: [
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
           ],
        };
  
        if (SBR === 3) return table; // case a.1
  
        // case b.1
        if (SBR === 2 && CrCl >= 50) {
           table = modifyData(table, [4, 5], 'dosage', '', );
           table = modifyData(table, [6], 'dosage', meds.med_dosage, 'evening');
  
           return table;
        }
  
        // case b.2
        if (SBR === 1 && CrCl >= 50) {
           table = modifyData(table, [3, 4, 5, 6], 'dosage', '', '');
           table = modifyData(table, [7], 'dosage', meds?.med_dosage, 'evening');
  
           return table;
        }
  
        // case c.1
        if (SBR === 2 && CrCl < 50) {
           table = modifyData(table, [2, 3, 4, 5], 'dosage', '', '');
           table = modifyData(table, [6], 'dosage', meds?.med_dosage, 'evening');
  
           return table;
        }
  
        // case c.2
        if (SBR === 1 && CrCl < 50) {
           table = modifyData(table, [1, 2, 3, 4, 5, 6], 'dosage', '', '');
           table = modifyData(table, [7], 'dosage', meds?.med_dosage, 'evening');
  
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
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
              { 'dosage': meds.med_dosage, frequency: 'morning and evening', lab: '' },
           ],
        };
  
        // case a.1
        if (SBR === 3) return table;
  
        // case b.1
        if (SBR === 2) {
           table = modifyData(table, [4, 5], 'dosage', '', '');
           table = modifyData(table, [6], 'dosage', meds?.med_dosage, 'evening');
  
           return table;
        }
  
        // case c.1
        if (SBR === 1) {
           table = modifyData(table, [3, 4, 5, 6], 'dosage', '', '');
           table = modifyData(table, [7], 'dosage', meds?.med_dosage, 'evening');
  
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
           return modifyData(table, [4, 5, 6], 'dosage', '', '');
        }
  
        // case b.1
        if (SBR === 2 && RDT === 'pm') {
           return modifyData(table, [4, 5], 'dosage', '', '');
        }
  
        // case c.1
        if (SBR === 1 && RDT === 'am') {
           return modifyData(table, [3, 4, 5, 6, 7], 'dosage', '', '');
        }
  
        // case c.1
        if (SBR === 1 && RDT === 'pm') {
           return modifyData(table, [3, 4, 5, 6], 'dosage', '', '');
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
           return modifyData(table, [5, 6], 'dosage', '', '');
        }
  
        // case b.1
        if (SBR === 2 && RDT === 'pm') {
           return modifyData(table, [4, 5], 'dosage', '', '');
        }
  
        // case c.1
        if (SBR === 1 && RDT === 'am') {
           return modifyData(table, [4, 5, 6, 7], 'dosage', '', '');
        }
  
        // case c.1
        if (SBR === 1 && RDT === 'pm') {
           return modifyData(table, [3, 4, 5, 6], 'dosage', '', '');
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
           return modifyData(table, [4, 5, 6], 'dosage', '', '');
        }
        // case b.1
        if (SBR === 2 && RDT === 'pm') {
           return modifyData(table, [4, 5], 'dosage', '', '');
        }
  
        // case c.1
        if (SBR === 1 && RDT === 'am') {
           return modifyData(table, [3, 4, 5, 6, 7], 'dosage', '', '');
        }
        // case c.1
        if (SBR === 1 && RDT === 'pm') {
           return modifyData(table, [3, 4, 5, 6], 'dosage', '', '');
        }
  
        return table;
    }
    
   function aspirin(meds, indicators) {
    console.log('>>   CASE Aspirin', meds);
    let med_data = meds.findIndex(x => x.med_dosage !== "");
    console.log(meds, med_data);
    const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
    let table = {};
    if(med_data !== -1) {
       let med_Indx = meds.findIndex(x => x.med_dosage !== "") !== -1 ? meds.findIndex(x => x.med_dosage !== "") : 0;
       let data = [
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
          { aspirin: meds[med_Indx].med_dosage, frequency: '', lab: '' },
       ];

       table['header'] = [{ med_name: 'Aspirin (ASA)' }];
       table['data'] = data;

       console.log('>> table data - ', table);

         // case a.1
         if (IR === 0 && PBR === 0 && SBR === 2) return table;
         // case a.2  FLAG
         else if (IR === 0 && PBR === 1 && SBR === 2) {
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            return table;
         }

         // case a.3
         else if (IR === 0 && PBR === 0 && SBR === 1) {
            table = modifyData(table, [5, 6], 'aspirin', meds[med_Indx].med_dosage, meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            return table;
         }

         // case a.4
         else if (IR === 0 && PBR === 1 && SBR === 1) {
            table = modifyData(table, [5, 6], 'aspirin', meds[med_Indx].med_dosage, meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            return table;
         }

         // case b
         else if (SBR === 3) {
            table = modifyData(table, [0, 1, 2, 3, 4, 5, 6], 'aspirin', meds[med_Indx].med_dosage, meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            table.data[10].lab = 'Goto lab for INR test';

            return table;
         }

         // case c.1
         else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';

            return table;
         }

         // case c.2
         else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            table = modifyData(table, [5, 6], 'aspirin', meds[med_Indx].med_dosage, meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
         }

         // case c.3    FLAG
         else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';

            return table;
         }

         // case c.4    FLAG
         else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            table = modifyData(table, [5, 6], 'aspirin', meds[med_Indx].med_dosage, meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
         }

         // case d.1
         else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [7, 8, 9, 10], 'aspirin', 'Dose dependents on INR', meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
         }

         // case e.1
         else if (IR === 1 && PBR === 0 && SBR === 1 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [5, 6, 7], 'aspirin', meds[med_Indx].med_dosage, meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            table = modifyData(table, [8, 9, 10], 'aspirin', 'Dose dependents on INR', meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
         }

         // case e.2     FLAG
         else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [7, 8, 9, 10], 'aspirin', 'Dose dependents on INR', meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
         }

         // case e.3     FLAG
         else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [5, 6, 7], 'aspirin', meds[med_Indx].med_dosage, meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            table = modifyData(table, [8, 9, 10], 'aspirin', 'Dose dependents on INR', meds[med_Indx]?.med_dosage_time === 'Once daily' ? 'morning' : meds[med_Indx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
         }
    } else {
      let data = [
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
         { aspirin: '', frequency: '', lab: '' },
      ];

      table['header'] = [{ med_name: 'Aspirin (ASA)' }];
      table['data'] = data;

      return table;
    }

    return table;
   }

    function antiplatelets(meds, indicators) {
        console.log('>>   CASE Antiplatelets', meds);
        let tempMeds = meds;
      //   let medAspIndx = tempMeds.findIndex(x => x.med_name === "Aspirin (ASA)");
      //   if(medAspIndx !== -1) {
      //   tempMeds.splice(medAspIndx, 1);
      //   }
        let med_data = tempMeds.find(x => x.med_name !== "");
        let medIdx = tempMeds.findIndex(x => x.med_dosage !== "") !== -1 ? tempMeds.findIndex(x => x.med_dosage !== "") : 0;
        const { indicationRisk: IR, patientBleedingRisk: PBR, surgeryBleedingRisk: SBR, CrCl } = indicators ? indicators : 0;
        let table = {};
        if(med_data !== undefined) {
            let medData = [];
            tempMeds.forEach(med => {
                  medData.push({
                     'med_name': med.med_name
                  });
            });
            let tempArry = [...medData];
            let tempItem = tempArry.splice(medIdx, 1)[0];
            tempArry.splice(0, 0, tempItem);
            let med_Indx = tempMeds.findIndex(x => x.med_dosage !== "") !== -1 ? tempMeds.findIndex(x => x.med_dosage !== "") : 0;
            console.log(">> Antiplatelets array dose", tempArry, tempMeds, med_Indx, tempMeds[med_Indx]);
            let data = [
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
               { antiplatelets: tempMeds[med_Indx].med_dosage, frequency: tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening', lab: '' },
            ];
            table['header'] = tempArry;
            table['data'] = data;
            console.log(data);
        }


        // case a.1
        if (IR === 0 && PBR === 0 && SBR === 2) return table;
        // case a.2  FLAG
        else if (IR === 0 && PBR === 1 && SBR === 2) {
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            return table;
        }

        // case a.3
        else if (IR === 0 && PBR === 0 && SBR === 1) {
            table = modifyData(table, [5, 6], 'antiplatelets', tempMeds[medIdx].med_dosage, tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            return table;
        }

        // case a.4
        else if (IR === 0 && PBR === 1 && SBR === 1) {
            table = modifyData(table, [5, 6], 'antiplatelets', tempMeds[medIdx].med_dosage, tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            return table;
        }

        // case b
        else if (SBR === 3) {
            table = modifyData(table, [0, 1, 2, 3, 4, 5, 6], 'antiplatelets', tempMeds[medIdx].med_dosage, tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            table.data[10].lab = 'Goto lab for INR test';

            return table;
        }

        // case c.1
        else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';
            
            return table;
        }

        // case c.2
        else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            table = modifyData(table, [5, 6], 'antiplatelets', tempMeds[medIdx].med_dosage, tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
        }

        // case c.3    FLAG
        else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';

            return table;
        }

        // case c.4    FLAG
        else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl >= 30) {
            table.data[2].frequency = 'morning and evening';
            table.data[3].frequency = 'morning and evening';
            table.data[4].frequency = 'morning';
            table.data[6].frequency = 'evening';
            table.data[7].frequency = 'morning and evening';
            table.data[8].frequency = 'morning and evening';
            table.data[3].lab = 'Go to lab for INR test (Thursday before if this is a Friday, Sat, or Sun)';
            table = modifyData(table, [5, 6], 'antiplatelets', tempMeds[medIdx].med_dosage, tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
        }

        // case d.1
        else if (IR === 1 && PBR === 0 && SBR === 2 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [7, 8, 9, 10], 'antiplatelets', 'Dose dependents on INR', tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
        }

        // case e.1
        else if (IR === 1 && PBR === 0 && SBR === 1 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [5, 6, 7], 'antiplatelets', tempMeds[medIdx].med_dosage, tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            table = modifyData(table, [8, 9, 10], 'antiplatelets', 'Dose dependents on INR', tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
        }

        // case e.2     FLAG
        else if (IR === 1 && PBR === 1 && SBR === 2 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [7, 8, 9, 10], 'antiplatelets', 'Dose dependents on INR', tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
        }

        // case e.3     FLAG
        else if (IR === 1 && PBR === 1 && SBR === 1 && CrCl < 30) {
            table['note1'] = 'Consider IV heparin (aPTT 1.5-2x control) when INR <2. Stop IV heparin 4-6 hours before surgery';
            table['note2'] = 'Resume IV heparin at least 24 h after surgery, when hemostasis secured. Stop IV heparin when INR >=2';
            table = modifyData(table, [5, 6, 7], 'antiplatelets', tempMeds[medIdx].med_dosage, tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');
            table = modifyData(table, [8, 9, 10], 'antiplatelets', 'Dose dependents on INR', tempMeds[medIdx]?.med_dosage_time === 'Once daily' ? 'morning' : tempMeds[medIdx]?.med_dosage === 'Twice daily' ? 'morning and evening' : 'evening');

            return table;
        }

        return table;
    }
  
     //
    function modifyData(table, targets, prop, value, freq_value) {
       console.log(freq_value);
        targets.map((t) => {
           table.data[t][prop] = value;
           table.data[t]['frequency'] = freq_value;
           return table;
        });
        return table;
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

    return tableData;
}