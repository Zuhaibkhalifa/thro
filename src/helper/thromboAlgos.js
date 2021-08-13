import axios from 'axios';

import { domain } from '../App';

//
//

export default async function thromboAlgo() {
   // Global variables
   const response = await getAlgoData();
   console.log('thromboAlgo response: ', response);
   const res = response.data.success[0];
   let algoData;
   let indicators = {
      indicationRisk: indicationRiskAlgo(),
      patientBleedingRisk: patientBleedingRiskAlgo(),
      surgeryBleedingRisk: surgeryBleedingRiskAlgo(),
      CrCl: CrCl(),
   };
   console.log('Algo Data: ', algoData);
   console.log('Indicators: ', indicators);

   // Get all the data needed for Thrombo Algo
   function getAlgoData() {
      let res;
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };

      try {
         let patient_id = localStorage.getItem('patient_id');
         res = axios.get(domain + `/api/nurse/medicationAlgoDetails/:${patient_id}`, {
            headers: headers,
         });

         console.log('ThromboAlgo data - response: ', res);
         return res;

         //
      } catch (error) {
         console.error('ThromboAlgo - getAlgoData error: ', error);
      }
   }

   // Indication bleeding risk
   function indicationRiskAlgo() {
      console.log('indicationAlgo Called!!!');
      const mapIndicationData = () => {
         let variables = {};

         variables['Bileaflet_mech_aortic_valve'] =
            res.mechanical_heart_valve_Is_the_valve_bileaflet != null ? true : false;

         variables['CHADS'] = res.chads_score_and_distribution;

         variables['AF'] = res.atrial_fibrillation_of_flutter === 'Yes' ? true : false;

         variables['Mitral'] = res.mitral_stenosis === 'Yes' ? true : false;

         variables['Stroke_lt_1'] =
            res.stroke_or_mini_stroke === 'Yes' && res.stroke_how_long === 'Less than 1 month ago' ? true : false;
         variables['Stroke_btwn_1_3'] =
            res.stroke_or_mini_stroke === 'Yes' && res.stroke_how_long === 'Between 1 and 3 months ago' ? true : false;
         variables['Stroke_gt_3'] =
            res.stroke_or_mini_stroke === 'Yes' && res.stroke_how_long === 'More than 3 months ago' ? true : false;

         variables['VTE'] = res.venous_thromboelism === 'Yes' ? true : false;
         variables['VTE_dvt_lt_1'] =
            res.dvt === 'Yes' && res.dvt_how_long_ago === 'Less than 1 month ago' ? true : false;
         variables['VTE_dvt_btwn_1_3'] =
            res.dvt === 'Yes' && res.dvt_how_long_ago === 'Between 1 and 3 months ago' ? true : false;
         variables['VTE_dvt_gt_3'] =
            res.dvt === 'Yes' && res.dvt_how_long_ago === 'More than 3 months ago' ? true : false;
         variables['VTE_pe_lt_1'] =
            res.pe === 'Yes' && res.pe_dvt_how_long_ago === 'Less than 1 month ago' ? true : false;
         variables['VTE_pe_btwn_1_3'] =
            res.pe === 'Yes' && res.pe_dvt_how_long_ago === 'Between 1 and 3 months ago' ? true : false;
         variables['VTE_pe_gt_3'] =
            res.pe === 'Yes' && res.pe_dvt_how_long_ago === 'More than 3 months ago' ? true : false;

         variables['Mech_heart'] = res.mechanical_heart_valve === 'Yes' ? true : false;
         variables['Mitral_loc'] = res.location_mitral === 'Mitral' ? true : false;
         variables['Arotic_loc'] = res.location_aortic === 'Arotic' ? true : false;

         variables['Antiphospholipid'] = res.antiphospholipid_antibody_syndrome === 'Yes' ? true : false;

         return variables;
      };
      const indicationAlgo = (d) => {
         // Standard risk indication (0)
         if (d.Bileaflet_mech_aortic_valve && d.CHADS === 0 && !d.AF) return 0;
         else if (d.AF && d.CHADS < 5 && !d.Stroke_lt_1 && !d.Mitral) return 0;
         else if (d.VTE && (d.VTE_dvt_gt_3 || d.VTE_pe_gt_3)) return 0;

         // High-risk indication (1)
         if (d.Antiphospholipid) return 1;
         else if (d.AF && d.Mitral) return 1;
         else if (d.AF && d.CHADS >= 5) return 1;
         else if (d.Mech_heart && d.Mitral_loc) return 1;
         else if (d.AF && (d.Stroke_lt_1 || d.Stroke_btwn_1_3)) return 1;
         else if (d.Mech_heart && d.Arotic_loc && (d.CHADS > 0 || d.AF)) return 1;
         else if (d.VTE && (d.VTE_dvt_lt_1 || d.VTE_dvt_btwn_1_3 || d.VTE_pe_lt_1 || d.VTE_pe_btwn_1_3)) return 1;

         // Fall back to Standard Risk if any of the Conditios doesn't match
         return 0;
      };

      algoData = { ...mapIndicationData(), ...algoData };
      return indicationAlgo(algoData);
   }

   //
   function patientBleedingRiskAlgo() {
      console.log('patientAlgo Called!!!');

      const mapPatientData = () => {
         let variables = {};

         variables['Age'] = res.age;
         variables['Weight'] = res.weight;
         variables['WeightUnit'] = res.weight_unit;
         variables['Gender'] = res.gender;

         variables['POC_INR'] = res.poc_inr_text;
         variables['POC_CREAT'] = res.poc_creat_text;
         variables['CrCl'] = round2Decimal(CrCl(res.age, res.weight, res.weight_unit, res.gender, res.poc_creat_text));

         variables['Bleeding'] = res.bleeding_requiring_treatment === 'Yes' ? true : false;
         variables['Bleeding_lt_3'] = res.bleeding_requiring_treatment_last_three_months === 'Yes' ? true : false;
         variables['Bleeding_stomach'] = res.bleeding_from_stomach === 'Yes' ? true : false;
         variables['Bleeding_stomach_lt_3'] = res.bleeding_from_stomach_last_three_months === 'Yes' ? true : false;

         return variables;
      };
      const patientAlgo = (d) => {
         const hadRecentBleeding =
            (d.Bleeding && d.Bleeding_lt_3) || (d.Bleeding_stomach && d.Bleeding_stomach_lt_3) ? true : false;

         // High risk of bleeding (1)
         // DISPLAY FALG:
         if (d.POC_INR > 3.5 || d.CrCl < 30 || hadRecentBleeding) return 1;

         return 0;
      };

      algoData = { ...mapPatientData(), ...algoData };
      return patientAlgo(algoData);
   }

   //
   function surgeryBleedingRiskAlgo() {
      console.log('surgeryAlgo Called!!!');

      const surgeryAlgo = () => {
         const proc = res.procedure;
         console.log(res);

         if (proc.search('high') !== -1) return 1;
         if (proc.search('mod') !== -1) return 2;
         if (proc.search('low') !== -1) return 3;

         return -1;
      };

      return surgeryAlgo();
   }

   //

   // weight shoould be in kg
   function CrCl(
      age = res.age,
      weight = res.weight,
      weightUnit = res.weight_unit,
      gender = res.gender,
      creat = res.poc_creat_text
   ) {
      const multiplier = gender === 'Male' ? 1 : 0.85;
      const weightKg = weightUnit === 'Kg' ? weight : weight / 2.205;

      let result = 1.2 * (140 - age) * weightKg;
      result = result / creat;
      result = multiplier * result;

      return round2Decimal(result);
   }

   function round2Decimal(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100;
   }

   //
   return indicators;
}
