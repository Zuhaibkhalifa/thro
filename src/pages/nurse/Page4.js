import React from 'react';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import axios from 'axios';
import moment from 'moment';

import Header from './NurseHeader';
import { server } from '../../utils/functions';
import { domain } from '../../App';

import thromboAlgos from '../../helper/thromboAlgos';
import thromboMedicationAlgo from '../../helper/thromboMedicationAlgo';
// import mapToView from '../../helper/mapMedicationDataToView';

class Page4 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });
      // console.log(this.validator);

      this.state = {
         month_year: '',
         procedure: '',
         date_of_procedure: '',
         age: '',
         sex: '',
         weight: '',
         indication_for_anticoagulation: '',
         chads_score_and_distribution: '',
         dictation: "",
         
         activeAnticogMeds: [],
         activeAntiplatMeds: [],
         dynamicFlags: [],
         
         poc_inr_date: '',
         poc_creat_date: '',
         hb_date: '',
         plt_date: '',
         poc_inr_text: '',
         poc_creat_text: '',
         hb_text: '',
         plt_text: '',
         details_on_recomemendation: '',
         understanding: '',
         completed_by: '',
         reviewed_by: '',
         loader: 1,
         genderSelected: '',
         weightSelected: '',
         patient_id: '',
         dalteparin: '',
         dalteparin_dosage: '',
         dalteparin_freq: '',
         enoxaparin: '',
         enoxaparin_dosage: '',
         enoxaparin_freq: '',
         tinzaparin: '',
         tinzaparin_dosage: '',
         tinzaparin_freq: '',
         coumadin: '',
         coumadin_monday: '',
         coumadin_tuesday: '',
         coumadin_wednesday: '',
         coumadin_thursday: '',
         coumadin_friday: '',
         coumadin_saturday: '',
         coumadin_sunday: '',
         sintrom: '',
         sintrom_monday: '',
         sintrom_tuesday: '',
         sintrom_wednesday: '',
         sintrom_thursday: '',
         sintrom_friday: '',
         sintrom_saturday: '',
         sintrom_sunday: '',
         aspirin: '',
         aspirin_dosage: '',
         aspirin_dosage_time: '',
         plavix: '',
         plavix_dosage: '',
         plavix_dosage_time: '',
         brillinta: '',
         brillinta_dosage: '',
         brillinta_dosage_time: '',
         effient: '',
         effient_dosage: '',
         effient_dosage_time: '',
         not_using_drugs: '',
         bleeding_requiring_treatment_last_three_months: '',
         cognitive_heart_failure: '',
         diabetes: '',
         stroke_or_mini_stroke: '',
         high_blood_pressure: '',
         ulcer_in_stomach_or_bowel_last_three_months: '',
         had_transfusion_in_last_three_months_when: '',
         had_transfusion_in_last_three_months: '',
         liver_disease: '',
         lab_location_for_inr_test: '',
         pradaxa: '',
         pradaxa_dosage: '',
         xarelto: '',
         xarelto_dosage: '',
         xarelto_dosage_time: '',
         eliquis: '',
         eliquis_dosage: '',
         eliquis_dosage_time: '',
         edoxabon: '',
         edoxabon_dosage: '',
         edoxabon_dosage_time: '',
         ulcer_in_stomach_or_bowel: '',
         referred_by: '',
         email: '',
         showHide: '',
         table: {},
         vka_chkBox: false,
         doac_chkBox: false,
         antiplatelets_chkBox: false,
         lmwh_chkBox: false,

         labVal1: '',
         labVal2: '',
         labVal3: '',
         labVal4: '',
         labVal5: '',
         labVal6: '',
         labVal7: '',
         labVal8: '',
         labVal9: '',
         labVal10: '',
         labVal11: '',

         selectValVka1: '',
         selectValVka2: '',
         selectValVka3: '',
         selectValVka4: '',
         selectValVka5: '',
         selectValVka6: '',
         selectValVka7: '',
         selectValVka8: '',
         selectValVka9: '',
         selectValVka10: '',
         selectValVka11: '',

         InptValVka1: 0,
         InptValVka2: 0,
         InptValVka3: 0,
         InptValVka4: 0,
         InptValVka5: 0,
         InptValVka6: 0,
         InptValVka7: 0,
         InptValVka8: 0,
         InptValVka9: 0,
         InptValVka10: 0,
         InptValVka11: 0,

         selectValAntiplatelets1: '',
         selectValAntiplatelets2: '',
         selectValAntiplatelets3: '',
         selectValAntiplatelets4: '',
         selectValAntiplatelets5: '',
         selectValAntiplatelets6: '',
         selectValAntiplatelets7: '',
         selectValAntiplatelets8: '',
         selectValAntiplatelets9: '',
         selectValAntiplatelets10: '',
         selectValAntiplatelets11: '',

         InptValAntiplatelets1: 0,   
         InptValAntiplatelets2: 0,
         InptValAntiplatelets3: 0,
         InptValAntiplatelets4: 0,
         InptValAntiplatelets5: 0,
         InptValAntiplatelets6: 0,
         InptValAntiplatelets7: 0,
         InptValAntiplatelets8: 0,
         InptValAntiplatelets9: 0,
         InptValAntiplatelets10: 0,
         InptValAntiplatelets11: 0,

         selectValLmwh1: '',
         selectValLmwh2: '',
         selectValLmwh3: '',
         selectValLmwh4: '',
         selectValLmwh5: '',
         selectValLmwh6: '',
         selectValLmwh7: '',
         selectValLmwh8: '',
         selectValLmwh9: '',
         selectValLmwh10: '',
         selectValLmwh11: '',

         InptValLmwh1: 0,
         InptValLmwh2: 0,
         InptValLmwh3: 0,
         InptValLmwh4: 0,
         InptValLmwh5: 0,
         InptValLmwh6: 0,
         InptValLmwh7: 0,
         InptValLmwh8: 0,
         InptValLmwh9: 0,
         InptValLmwh10: 0,
         InptValLmwh11: 0,
        
         selectValDoac1: '',
         selectValDoac2: '',
         selectValDoac3: '',
         selectValDoac4: '',
         selectValDoac5: '',
         selectValDoac6: '',
         selectValDoac7: '',
         selectValDoac8: '',
         selectValDoac9: '',
         selectValDoac10: '',
         selectValDoac11: '',

         InptValDoac1: 0,
         InptValDoac2: 0,
         InptValDoac3: 0,
         InptValDoac4: 0,
         InptValDoac5: 0,
         InptValDoac6: 0,
         InptValDoac7: 0,
         InptValDoac8: 0,
         InptValDoac9: 0,
         InptValDoac10: 0,
         InptValDoac11: 0,

         approved_by: ''
      };

      this.submitForm = this.submitForm.bind(this);
      this.page8 = this.page8.bind(this);
      this.onDateChange = this.onDateChange.bind(this);
      this.handleLabValueChange = this.handleLabValueChange.bind(this);
      this.handleSelectValueChange = this.handleSelectValueChange.bind(this);
      this.handleInptValueChange = this.handleInptValueChange.bind(this);
      this.fillactiveanticogmeds = this.fillactiveanticogmeds.bind(this);
      this.fillactiveantiplatmeds = this.fillactiveantiplatmeds.bind(this);
      this.handleApprovedBy = this.handleApprovedBy.bind(this);
      this.handleSaveNApprove = this.handleSaveNApprove.bind(this);
      this.handleSaveDraft = this.handleSaveDraft.bind(this);
   }

   componentDidMount() {
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      try {
         let patient_id = localStorage.getItem('patient_id');
         this.setState({ patient_id: patient_id });
         axios
            .get(domain + `/api/nurse/medicationJsonData/:${patient_id}`, {
               headers: headers,
            })
            .then((response) => {
               // console.log(response.data.success[0]);
               console.log('response is here: ', response);
               let data = response.data.success[0];
               this.setState({
                  approved_by: data.approved_by,
                  table_data: data.jsonTable
               });

               axios
               .get(domain + `/api/nurse/page5LoadData/:${patient_id}`, {
                  // originally was page5LoadData
                  headers: headers,
               }).then((response) => {
                  console.log(response);
                  let data = response.data.success[0];
                  this.setState({
                     referred_by: data.physicianName,
                     age: data.age,
                     procedure: data.type_of_procedure,
                     date_of_procedure: data.date_of_procedure,
                     sex: data.gender,
                     weight: data.weight,
                     understanding: data.understanding,
                     completed_by: data.who_is_completing_this_form,
                     reviewed_by: data.reviewed_by,
                     genderSelected: data.gender,
                     indication_for_anticoagulation: data.indication_for_anticoagulation,
                     chads_score_and_distribution: data.chads_score_and_distribution,

                     poc_creat_text: data.poc_creat_text,
                     poc_creat_date: data.poc_creat_date,
                     hb_text: data.hb_text,
                     hb_date: data.hb_date,
                     plt_text: data.plt_text,
                     plt_date: data.plt_date,
                     poc_inr_text: data.poc_inr_text,
                     poc_inr_date: data.poc_inr_date,
                     dictation: data.dictation,

                     details_on_recomemendation: data.details_on_recomemendation,

                     weightSelected: data.weight_unit,
                     dalteparin: data.dalteparin,
                     dalteparin_dosage: data.dalteparin_dosage,
                     dalteparin_freq: data.dalteparin_freq,
                     enoxaparin: data.enoxaparin,
                     enoxaparin_dosage: data.enoxaparin_dosage,
                     enoxaparin_freq: data.enoxaparin_freq,
                     tinzaparin: data.tinzaparin,
                     tinzaparin_dosage: data.tinzaparin_dosage,
                     tinzaparin_freq: data.tinzaparin_freq,
                     aspirin: data.aspirin,
                     aspirin_dosage: data.aspirin_dosage,
                     aspirin_dosage_time: data.aspirin_dosage_time,
                     plavix: data.plavix,
                     plavix_dosage: data.plavix_dosage,
                     plavix_dosage_time: data.plavix_dosage_time,
                     brillinta: data.brillinta,
                     brillinta_dosage: data.brillinta_dosage,
                     brillinta_dosage_time: data.brillinta_dosage_timie,
                     effient: data.effient,
                     effient_dosage: data.effient_dosage,
                     effient_dosage_time: data.effient_dosage_time,
                     not_using_drugs: data.not_using_drugs,
                     ulcer_in_stomach_or_bowel_last_three_months: data.ulcer_in_stomach_or_bowel_last_three_months,
                     had_transfusion_in_last_three_months_when: data.had_transfusion_in_last_three_months_when,
                     had_transfusion_in_last_three_months: data.had_transfusion_in_last_three_months,

                     liver_disease: data.liver_disease,
                     lab_location_for_inr_test: data.lab_location_for_inr_test,

                     pradaxa: data.pradaxa,
                     pradaxa_dosage: data.pradaxa_dosage,
                     xarelto: data.xarelto,
                     xarelto_dosage: data.xarelto_dosage,
                     xarelto_dosage_time: data.xarelto_dosage_time,
                     eliquis: data.eliquis,
                     eliquis_dosage: data.eliquis_dosage,
                     eliquis_dosage_time: data.eliquis_dosage_time,
                     edoxabon: data.edoxabon,
                     edoxabon_dosage: data.edoxabon_dosage,
                     edoxabon_dosage_time: data.edoxabon_dosage_time,
                     coumadin: data.coumadin,
                     coumadin_monday: data.coumadin_monday,
                     coumadin_tuesday: data.coumadin_tuesday,
                     coumadin_wednesday: data.coumadin_wednesday,
                     coumadin_thursday: data.coumadin_thursday,
                     coumadin_friday: data.coumadin_friday,
                     coumadin_saturday: data.coumadin_saturday,
                     coumadin_sunday: data.coumadin_sunday,
                     sintrom: data.sintrom,
                     sintrom_monday: data.sintrom_monday,
                     sintrom_tuesday: data.sintrom_tuesday,
                     sintrom_wednesday: data.sintrom_wednesday,
                     sintrom_thursday: data.sintrom_thursday,
                     sintrom_friday: data.sintrom_friday,
                     sintrom_saturday: data.sintrom_saturday,
                     sintrom_sunday: data.sintrom_sunday,

                     ulcer_in_stomach_or_bowel: data.ulcer_in_stomach_or_bowel,
                     cognitive_heart_failure: data.cognitive_heart_failure,
                     high_blood_pressure: data.high_blood_pressure,
                     diabetes: data.diabetes,
                     stroke_or_mini_stroke: data.stroke_or_mini_stroke,
                     bleeding_requiring_treatment_last_three_months: data.bleeding_requiring_treatment_last_three_months
                  });
                  this.forceUpdate();
                  this.fillactiveanticogmeds();
                  this.fillactiveantiplatmeds();
                  this.set_DynamicFlags();
                  this.set_anticoagulation(response.data.success.anticoagulation);
                  this.set_CHADS_score();
               });
               this.setState({ loader: '' });
               this.getDatafromAlgo();
            });

         
      } catch (error) {
         console.error(error);
         this.setState({ loader: '' });
      }
   }

   handleApprovedBy(e) {
      this.setState({
         approved_by: e.target.value
      });
   }

   handleSaveNApprove(tableData) {
      if (this.state.table === 'none') return;

      const data = {
         jsonTable: JSON.stringify({ ...this.state.table }),
         patient_id: localStorage.getItem('patient_id'),
         last_modified: new Date().toLocaleDateString(),
         approved_by: tableData.approved_by,
         status: 'Approved'
      };
      console.log('>>> JSON data: ', data);
      server(`nurse/medicationJsonData/:${data.patient_id}`, data);
      this.props.history.push('/Nurse/Nurse5');
   }

   handleSaveDraft(tableData) {
      if (this.state.table === 'none') return;

      const data = {
         jsonTable: JSON.stringify({ ...this.state.table }),
         patient_id: localStorage.getItem('patient_id'),
         last_modified: new Date().toLocaleDateString(),
         approved_by: tableData.approved_by,
         status: 'Draft'
      };
      console.log('>>> JSON data: ', data);
      server(`nurse/medicationJsonData/:${data.patient_id}`, data);
      this.props.history.push('/Nurse/Nurse5');
   }

   fillactiveanticogmeds() {
      let activeMeds = [];
      if(this.state.dalteparin) {
         let idx = this.state.dalteparin_freq.indexOf(' ');
         activeMeds.push({
            med_name: this.state.dalteparin,
            med_dosage: this.state.dalteparin_dosage,
            med_dosage_time: this.state.dalteparin_freq.substr(idx+1),
            med_dosage_freequency: this.state.dalteparin_freq.substr(idx+1),
         });
      }
      if(this.state.enoxaparin) {
         let idx = this.state.enoxaparin_freq.indexOf(' ');
         activeMeds.push({
            med_name: this.state.enoxaparin,
            med_dosage: this.state.enoxaparin_dosage,
            med_dosage_time: this.state.enoxaparin_freq.substr(idx+1),
            med_dosage_freequency: this.state.enoxaparin_freq.substr(idx+1),
         });
      }
      
      if(this.state.tinzaparin) {
         let idx = this.state.tinzaparin_freq.indexOf(' ');
         activeMeds.push({
            med_name: this.state.tinzaparin,
            med_dosage: this.state.tinzaparin_dosage,
            med_dosage_time: this.state.tinzaparin_freq.substr(idx+1),
            med_dosage_freequency: this.state.tinzaparin_freq.substr(idx+1),
         });
      }
      if(this.state.pradaxa) {
         let idx = this.state.pradaxa_dosage.indexOf(' ', this.state.pradaxa_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.pradaxa,
            med_dosage: this.state.pradaxa_dosage,
            med_dosage_time: this.state.pradaxa_dosage.substr(idx+1),
            med_dosage_freequency: "am / pm",
         });
      } 
      if(this.state.xarelto) {
         let idx = this.state.xarelto_dosage.indexOf(' ', this.state.xarelto_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.xarelto,
            med_dosage: this.state.xarelto_dosage,
            med_dosage_time: this.state.xarelto_dosage.substr(idx+1),
            med_dosage_freequency: this.state.xarelto_dosage_time
         });
      } 
      if(this.state.eliquis) {
         let idx = this.state.eliquis_dosage.indexOf(' ', this.state.eliquis_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.eliquis,
            med_dosage: this.state.eliquis_dosage,
            med_dosage_time: this.state.eliquis_dosage.substr(idx+1),
            med_dosage_freequency: this.state.eliquis_dosage_time
         });
      }
      if(this.state.edoxabon) {
         let idx= this.state.edoxabon_dosage.indexOf(' ', this.state.edoxabon_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.edoxabon,
            med_dosage: this.state.edoxabon_dosage,
            med_dosage_time: this.state.edoxabon_dosage.substr(idx+1),
            med_dosage_freequency: this.state.edoxabon_dosage_time
         });
      }
      
      if(this.state.coumadin) {
         activeMeds.push({
            med_name: this.state.coumadin,
            med_dosage_monday: this.state.coumadin_monday,
            med_dosage_tuesday: this.state.coumadin_tuesday,
            med_dosage_wednesday: this.state.coumadin_wednesday,
            med_dosage_thursday: this.state.coumadin_thursday,
            med_dosage_friday: this.state.coumadin_friday,
            med_dosage_saturday: this.state.coumadin_saturday,
            med_dosage_sunday: this.state.coumadin_sunday
         });
      } 
      
      if(this.state.sintrom) {
         activeMeds.push({
            med_name: this.state.sintrom,
            med_dosage_monday: this.state.sintrom_monday,
            med_dosage_tuesday: this.state.sintrom_tuesday,
            med_dosage_wednesday: this.state.sintrom_wednesday,
            med_dosage_thursday: this.state.sintrom_thursday,
            med_dosage_friday: this.state.sintrom_friday,
            med_dosage_saturday: this.state.sintrom_saturday,
            med_dosage_sunday: this.state.sintrom_sunday
         });
      }
      console.log(activeMeds);
      this.setState({ activeAnticogMeds: activeMeds });

      console.log(this.props.location);
      if(this.props.location.state) {
         if(activeMeds.length === 0) {
            console.log('reloading !!!')
            window.location.reload();
         }
      }
   }

   handleLabValueChange(e, key) {
      this.setState({
         [key]: e.target.value
      });
   }

   handleInptValueChange(e, key) {
      this.setState({
         [key]: e.target.value
      });
   }

   handleSelectValueChange(e, key) {
      this.setState({
         [key]: e.target.value
      });
   }

   fillactiveantiplatmeds() {
      let activeMeds = [];
      if(this.state.effient) {
         let idx= this.state.effient_dosage.indexOf(' ', this.state.effient_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.effient,
            med_dosage: this.state.effient_dosage,
            med_dosage_freequency: this.state.effient_dosage_time,
            med_dosage_time: this.state.effient_dosage_time.substr(idx+1)
         });
      } 
      if(this.state.aspirin) {
         let idx= this.state.aspirin_dosage.indexOf(' ', this.state.aspirin_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.aspirin,
            med_dosage: this.state.aspirin_dosage,
            med_dosage_freequency: this.state.aspirin_dosage_time,
            med_dosage_time: this.state.aspirin_dosage_time.substr(idx+1)
         });
      } 
      if(this.state.plavix) {
         let idx= this.state.plavix_dosage.indexOf(' ', this.state.plavix_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.plavix,
            med_dosage: this.state.plavix_dosage,
            med_dosage_freequency: this.state.plavix_dosage_time,
            med_dosage_time: this.state.plavix_dosage_time.substr(idx+1)
         });
      }
      if(this.state.brillinta) {
         let idx= this.state.brillinta_dosage.indexOf(' ', this.state.brillinta_dosage.indexOf(' ')+1);
         activeMeds.push({
            med_name: this.state.brillinta,
            med_dosage: this.state.brillinta_dosage,
            med_dosage_freequency: this.state.brillinta_dosage_time,
            med_dosage_time: this.state.brillinta_dosage_time.substr(idx+1)
         });
      }
      console.log(activeMeds);
      this.setState({ activeAntiplatMeds: activeMeds });

      console.log(this.props.location);
      if(this.props.location.state) {
         if(activeMeds.length === 0) {
            console.log('reloading !!!')
            window.location.reload();
         }
      }
   }

   set_anticoagulation(data) {
      // Pulled the data drom Patient/Page4 from server
      // and then genereating the data over here,
      // to display in  indication_for_anticoagulation field
      let anticoagulation = '';

      let anticoagulationMap = {
         venous_thromboelism: 'Venous Thromboembolism (VTE)',
         dvt: 'DVT',
         pe: 'PE',
         atrial_fibrillation_of_flutter: 'Atrial Fibrillation of flutter',
         heart_valve_replacement: 'Heart Valve Replacement',
         blood_clot_in_heart: 'Blood clot in heart',
         arterial_peripheral_thrombosis: 'Arterial Peripheral Thrombosis',
         peripheral_arterial_disease: 'Peripheral arterial Disease',
         other: 'Some Other',
         none: 'None',
      };

      for (var key in data) {
         if (data[key] === 'Yes') anticoagulation += anticoagulationMap[key] + ',  ';
         if (key === 'other') anticoagulation += data[key] === null ? '' : data[key] + ',  ';
      }

      this.setState({ indication_for_anticoagulation: anticoagulation });
      console.log(this.props.location);
      if(this.props.location.state) {
         if(anticoagulation === '') {
            console.log('reloading !!!')
            window.location.reload();
         }
      }
   }

   set_CHADS_score() {
      // CHADS2 Score = C + H + A + D + S2
      // C:    Patient Page #7     => (If "Cognitive Heart Failure (ever)" is selected then score is 1)
      // H:    Patient Page #7     => (If "High Blood Pressure (or have had high blood pressure in the past)" is selected then score is 1)
      // A:    Patient Page #2     => (If Age of the patient is Greater than 74 Years then Score is 1 Else 0)
      // D:    Patient Page #7     => (If Diabetes is selected then score is 1)
      // S2:   Patient Page #7     => (transient ischemic attacks are selected then Score is 2)
      let score = 0;
      const {
         cognitive_heart_failure: C,
         high_blood_pressure: H,
         age: A,
         diabetes: D,
         stroke_or_mini_stroke: S2,
      } = this.state;
      console.log(`CHADS score: C=${C}  H=${H}  A=${A}  D=${D}  S2=${S2}`);

      if (C === 'Yes') score += 1;
      if (H === 'Yes') score += 1;
      if (A > 74) score += 1;
      if (D === 'Yes') score += 1;
      if (S2 === 'Yes') score += 2;

      this.setState({ chads_score_and_distribution: score });
   }

   setInitialState(key, value, length) {
      for(let i=0; i<length; i++) {
         this.setState({
            [key+(i+1)]: value
         });
      }
   }

   setInitialLabState(key, value, length) {
      for(let i=0; i<length; i++) {
         this.setState({
            [key+(i+1)]: value
         });
      }
   }

   setInitialSelectState(key, value, length) {
      for(let i=0; i<length; i++) {
         this.setState({
            [key+(i+1)]: value
         });
      }
   }

   set_DynamicFlags() {
      const {
         liver_disease: liver,
         bleeding_requiring_treatment_last_three_months: bleeding_requiring_treatment_in_last_three_months,
         cognitive_heart_failure: cognitive_heart_fail,
         diabetes: diabetic,
         stroke_or_mini_stroke: stroke_mini_stroke,
         high_blood_pressure: high_blood_pressures,
         had_transfusion_in_last_three_months: transfusion,
         had_transfusion_in_last_three_months_when: transfusion_date,
         ulcer_in_stomach_or_bowel_last_three_months: ulcer,
      } = this.state;
      let flags = [];

      if (liver === 'Yes') flags.push('Liver Diseases');
      if (transfusion === 'Yes') flags.push(`Transfusion did on ${transfusion_date}`);
      if (ulcer === 'Yes') flags.push(`Ulcer within last 3 months`);
      if(bleeding_requiring_treatment_in_last_three_months === 'Yes') flags.push('bleeding_requiring_treatment_last_three_months');
      if(cognitive_heart_fail === 'Yes') flags.push('cognitive_heart_failure');
      if(high_blood_pressures === 'Yes') flags.push('high_blood_pressure');
      if(stroke_mini_stroke === 'Yes') flags.push('stroke_or_mini_stroke');
      if(diabetic === 'Yes') flags.push('diabetes');
      
      this.setState({ dynamicFlags:flags });

      console.log(this.props.location);
      if(this.props.location.state) {
         if(flags.length === 0) {
            console.log('reloading !!!')
            window.location.reload();
         }
      }
   }

   async getDatafromAlgo() {
      let table_data = {
         vka: '',
         lmwh: '',
         antiplatelets: '',
         doac: '',
         headers: '',
         date: [
            {d_5: 'D-5'},
            {d_4: 'D-4'},
            {d_3: 'D-3'},
            {d_2: 'D-2'},
            {d_1: 'D-1'},
            {d_0: 'D'},
            {d1: 'D5'},
            {d2: 'D4'},
            {d3: 'D3'},
            {d4: 'D2'},
            {d5: 'D1'}
         ]
      };
      const inidcators = await thromboAlgos();
      const tableData = await thromboMedicationAlgo(inidcators);
      console.log('> Nurse Page 4 => inidcators: ', inidcators);
      console.log('> Nurse Page 4 => tableData: ', tableData);
      // tableData.data[5].d = tableData.data[5].d ? this.state.date_of_procedure : tableData.data[5].d;
      let tableHeader = [];
      if(tableData.vka !== undefined) {
         let keyIdx = tableData.vka.data.findIndex(x => x.d6);
         let keyIdx1 = tableData.vka.data.findIndex(x => x.warfain);
         let keyId = keyIdx !== -1 ? `labVal${keyIdx}` : '';
         let keyId1 = keyIdx1 !== -1 ? `InptValVka${keyIdx1+1}` : '';
         tableHeader.push({ 'vka': tableData.vka.header[0] });
         table_data.vka = tableData.vka.data;
         if(keyId !== '') {
            this.setState({ 
               [keyId]: tableData.vka.data[keyIdx].lab,
               [keyId1]: tableData.vka.data[keyIdx1].warfain.split(' ')[0]
            });
            this.setInitialState('InptValVka', tableData.vka.data[keyIdx1].warfain.split(' ')[0], tableData.vka.data.length);
            this.setInitialLabState('labVal', tableData.vka.data[keyIdx].lab, tableData.vka.data.length);
            this.setInitialSelectState('selectValVka', 'twice daily', tableData.vka.data.length);
         }
      }

      if(tableData.lmwh !== undefined) {
         let keyIdx1 = tableData.lmwh.data.findIndex(x => x.dosage);
         let keyId1 = keyIdx1 !== -1 ? `InptValLmwh${keyIdx1+1}` : '';
         tableHeader.push({ 'lmwh': tableData.lmwh.header[0] });
         table_data.lmwh = tableData.lmwh.data;
         if(keyId1 !== '') {
            this.setState({
               [keyId1]: tableData.lmwh.data[keyIdx1].dosage.split(' ')[0] 
            });
            this.setInitialState('InptValLmwh', tableData.lmwh.data[keyIdx1].dosage.split(' ')[0], tableData.lmwh.data.length);
            this.setInitialSelectState('selectValLmwh', 'once daily', tableData.lmwh.data.length);
         }
      }

      if(tableData.doac !== undefined) {
         
         let dataKey = Object.keys(tableData.doac);
         for(let datKey in dataKey) {
            let keyIdx1 = tableData.doac[dataKey[datKey]].data.findIndex(x => x.dosage);
            let keyId1 = keyIdx1 !== -1 ? `InptValDoac${keyIdx1+1}` : '';
            tableHeader.push({ 'doac': tableData.doac[dataKey[datKey]].header[0] });
            table_data.doac = tableData.doac[dataKey[datKey]].data;
            if(keyId1 !== '') {
               this.setState({
                  [keyId1]: tableData.doac[dataKey[datKey]].data[keyIdx1].dosage.split(' ')[0] 
               });
               this.setInitialState('InptValDoac', tableData.doac[dataKey[datKey]].data[keyIdx1].dosage.split(' ')[0], tableData.doac[dataKey[datKey]].data.length);
               this.setInitialSelectState('selectValDoac', 'twice daily', tableData.doac[dataKey[datKey]].data.length);
            }
         }
      }

      if(tableData.antiplatelets !== undefined) {
         let keyIdx = tableData.antiplatelets.data.findIndex(x => x.d6);
         let keyId = keyIdx !== -1 ? `labVal${keyIdx}` : '';
         let keyIdx1 = tableData.antiplatelets.data.findIndex(x => x.antiplatelets);
         let keyId1 = keyIdx1 !== -1 ? `InptValAntiplatelets${keyIdx1+1}` : '';
         tableHeader.push({ 'antiplatelets': tableData.antiplatelets.header[0].med_name !== undefined ? tableData.antiplatelets.header[0] : tableData.antiplatelets.header[1] });
         table_data.antiplatelets = tableData.antiplatelets.data;
         if(keyId !== '') {
            this.setState({ 
               [keyId]:tableData.antiplatelets.data[keyIdx].lab,
               [keyId1]: tableData.antiplatelets.data[keyIdx1].antiplatelets.split(' ')[0]  
            });
            this.setInitialState('InptValAntiplatelets', tableData.antiplatelets.data[keyIdx1].antiplatelets.split(' ')[0], tableData.antiplatelets.data.length);
            this.setInitialSelectState('selectValAntiplatelets', 'once daily', tableData.antiplatelets.data.length);
         }
      }

      table_data.headers = tableHeader;
      table_data.date[5].d_0 = this.state.date_of_procedure;
      console.log(this.state.table);

      this.setState({ 
         table: table_data, 
         vka_chkBox: tableData.vka !== undefined ? true: false,
         lmwh_chkBox: tableData.lmwh !== undefined ? true : false,
         doac_chkBox: tableData.doac !== undefined ? true : false,
         antiplatelets_chkBox: tableData.antiplatelets !== undefined ? true : false
      });

      if(this.state.date_of_procedure) {
         this.onDateChange(this.state.date_of_procedure);
      }
   }

   submitForm() {
      if (this.validator.allValid()) {
         this.page8();
         this.props.history.push('/Nurse/Nurse5');
      } else {
         this.validator.showMessages();
         // rerender to show messages for the first time
         // you can use the autoForceUpdate option to do this automatically`
         this.forceUpdate();
      }
   }

   page8() {
      if (this.state.table === 'none') return;

      const data = {
         jsonTable: JSON.stringify({ ...this.state.table }),
         patient_id: localStorage.getItem('patient_id'),
      };
      // console.log('>>> JSON data: ', data);
      server(`nurse/medicationJsonData/:${data.patient_id}`, data);
   }

   onDateChange(e) {
      const value = e.target ? e.target.value : e;
      let newState = { ...this.state };
      console.log(newState, value);
      newState.table.date[0]['d_5'] = moment(value, 'YYYY-MM-DD').subtract(5, 'd').format('YYYY-MM-DD');
      newState.table.date[1]['d_4'] = moment(value, 'YYYY-MM-DD').subtract(4, 'd').format('YYYY-MM-DD');
      newState.table.date[2]['d_3'] = moment(value, 'YYYY-MM-DD').subtract(3, 'd').format('YYYY-MM-DD');
      newState.table.date[3]['d_2'] = moment(value, 'YYYY-MM-DD').subtract(2, 'd').format('YYYY-MM-DD');
      newState.table.date[4]['d_1'] = moment(value, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD');

      newState.table.date[5]['d_0'] = value;

      newState.table.date[6]['d1'] = moment(value, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD');
      newState.table.date[7]['d2'] = moment(value, 'YYYY-MM-DD').add(2, 'd').format('YYYY-MM-DD');
      newState.table.date[8]['d3'] = moment(value, 'YYYY-MM-DD').add(3, 'd').format('YYYY-MM-DD');
      newState.table.date[9]['d4'] = moment(value, 'YYYY-MM-DD').add(4, 'd').format('YYYY-MM-DD');
      newState.table.date[10]['d5'] = moment(value, 'YYYY-MM-DD').add(5, 'd').format('YYYY-MM-DD');

      this.setState({ ...newState });
   }

   //

   render() {
      const { table } = this.state;
      // console.log(table)
      return (
         <>
            <React.Fragment>
               <Header />
               {this.state.loader === 1 ? (
                  <div className="centered">
                     <ReactSpinner type="border" color="blue" size="5" />
                  </div>
               ) : (
                  ''
               )}
               <div className="container">
                  <h4 className="text-center myHeading">Patient Summary</h4>
                  <h5 className="text-center myHeading">For Nurse's Use</h5>
                  {/* container */}
                  <div className="jumbotron">
                     <h4> Patient Information</h4>
                     <br />
                     <br />

                     <div className="row">
                        <div className="col-6">
                           <label htmlFor="usr">Pt Id </label>
                        </div>

                        <div className="col-6 text-left">
                           <p>{this.state.patient_id}</p>
                        </div>
                     </div>
                     <br />
                     <div className="row">
                        <div className="col-6">
                           <label htmlFor="usr">Patients procedure summary</label>
                        </div>

                        <div className="col-6 text-left">
                           <p type="text" disabled className="form-control">{this.state.procedure} </p>
                        </div>
                     </div>
                     <br />
                     <div className="row">
                        <div className="col-6">
                           <h3>Procedure</h3>
                           <p disabled className="form-control">{this.state.procedure}</p>
                        </div>
                        <div className="col-6">
                           <div className="form-group">
                              <label htmlFor="usr">Date of Procedure</label>
                              <p disabled className="form-control">{this.state.date_of_procedure}</p>
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-4">
                           <div className="form-group">
                              <label htmlFor="usr">Age </label>
                              <p disabled className="form-control">{this.state.age}</p>
                           </div>
                        </div>

                        <div className="col-4">
                           <div className="form-group">
                              <label htmlFor="usr">Sex </label>
                              <p disabled className="form-control">{this.state.genderSelected}</p>
                           </div>
                        </div>
                        <div className="col-2">
                           <div className="form-group">
                              <label htmlFor="usr">Weight</label>
                              <p disabled className="form-control">{this.state.weight}</p>
                           </div>
                        </div>

                        <div className="col-2">
                           <div className="form-group">
                              <label htmlFor="usr">Unit</label>
                              <p disabled className="form-control">{this.state.weightSelected}</p>
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-12">
                           <div className="form-group">
                              <label htmlFor="usr">Indication(s) for Anticoagulation </label>
                              <br />
                              <p disabled className="form-control">{this.state.indication_for_anticoagulation}</p>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-12">
                           <div className="form-group">
                              <label htmlFor="usr">CHADS Score And Distribution </label>
                              <p disabled className="form-control">{this.state.chads_score_and_distribution}</p>
                           </div>
                        </div>
                     </div>

                     <br />
                     <br />
                     <div className="row">
                        <div className="col-12">
                           <div className="form-group">
                              <h4>Anticoagulation Information </h4>
                              <div
                                 style={{
                                    backgroundColor: '#8ebce0',
                                    paddingLeft: 20,
                                    paddingTop: 5,
                                    paddingBottom: 10,
                                 }}
                              >
                                 <h5 style={{ color: 'white' }}>
                                    Medical Dose / Frequency
                                    <br />
                                 </h5>
                                 <h5 style={{ color: 'white' }} className="text-center">
                                    Current Dosing 
                                 </h5>
                              </div>
                              {
                                 (this.state.coumadin || this.state.sintrom) ?
                                 <> 
                                    <table style={{ display: "inline-table" }} className="table-responsive">
                                       <tr style={{ borderBottom: "1px solid #ccc" }}>
                                          <th>Medicine name</th>
                                          <th>MON</th>
                                          <th>TUE</th>
                                          <th>WED</th>
                                          <th>THR</th>
                                          <th>FRI</th>
                                          <th>SAT</th>
                                          <th>SUN</th>
                                       </tr>
                                       {
                                          this.state.activeAnticogMeds.length > 0 ?
                                             this.state.activeAnticogMeds.map((meds, index) => {
                                                return <tr key={index} style={{ borderBottom: "1px solid #ccc", paddingTop: "10px" }}>
                                                   <td>{meds.med_name}</td>
                                                   <td>{meds.med_dosage_monday}</td>
                                                   <td>{meds.med_dosage_tuesday}</td>
                                                   <td>{meds.med_dosage_wednesday}</td>
                                                   <td>{meds.med_dosage_thursday}</td>
                                                   <td>{meds.med_dosage_friday}</td>
                                                   <td>{meds.med_dosage_saturday}</td>
                                                   <td>{meds.med_dosage_sunday}</td>
                                                </tr>
                                             })
                                          : ""
                                       }

                                    </table>
                                 </> :
                                 <> 
                                    <table style={{ display: "inline-table" }} className="table-responsive">
                                       <tr style={{ borderBottom: "1px solid #ccc" }}>
                                          <th>Medicine name</th>
                                          <th>Dosage</th>
                                          <th>Frequency</th>
                                          <th>Time</th>
                                       </tr>
                                       {
                                          this.state.activeAnticogMeds.length > 0 ?
                                             this.state.activeAnticogMeds.map((meds, index) => {
                                                return <tr key={index} style={{ borderBottom: "1px solid #ccc", paddingTop: "10px" }}>
                                                   <td>{meds.med_name}</td>
                                                   <td>{meds.med_dosage}</td>
                                                   <td>{meds.med_dosage_time}</td>
                                                   <td>{meds.med_dosage_freequency}</td>
                                                </tr>
                                             })
                                          : ""
                                       }

                                    </table>
                                 </>
                              }
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-12">
                           <div className="form-group">
                              <h4>Antiplatelet Information </h4>
                              <div
                                 style={{
                                    backgroundColor: '#8ebce0',
                                    paddingLeft: 20,
                                    paddingTop: 5,
                                    paddingBottom: 10,
                                 }}
                              >
                                 <h5 style={{ color: 'white' }}>Medical Dose / Frequency</h5>
                                 <h5 style={{ color: 'white' }} className="text-center">
                                    Current Dosing 
                                 </h5>
                              </div>
                              <table style={{ display: "inline-table" }} className="table-responsive">
                                 <tr style={{ borderBottom: "1px solid #ccc", paddingTop: "10px" }}>
                                    <th>Medicine name</th>
                                    <th>Dosage</th>
                                    <th>Frequency</th>
                                    <th>Time</th>
                                 </tr>
                                 {
                                    this.state.activeAntiplatMeds.length > 0 ?
                                       this.state.activeAntiplatMeds.map((meds, index) => {
                                          return <tr key={index} style={{ borderBottom: "1px solid #ccc", paddingTop: "10px" }}>
                                             <td>{meds.med_name}</td>
                                             <td>{meds.med_dosage}</td>
                                             <td>{meds.med_dosage_freequency}</td>
                                             <td>{meds.med_dosage_time}</td>
                                          </tr>
                                       })
                                    : ""
                                 }
                              </table>
                           </div>
                        </div>
                     </div>

                     <br />
                     <br />
                     <h4>Recent Bloodwork</h4>
                     <div className="row">
                        <div className="col-6">
                           <div className="form-group">
                              <label htmlFor="usr">POC -INR </label>

                              <div className="row">
                                 <div className="col-6">
                                    <p disabled className="form-control">{this.state.poc_inr_date}</p>
                                 </div>
                                 <div className="col-6">
                                    {' '}
                                    <p disabled className="form-control">{this.state.poc_inr_text}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="col-6">
                           <div className="form-group">
                              <label htmlFor="usr">POC - Creatinine</label>

                              <div className="row">
                                 <div className="col-6">
                                    <p disabled className="form-control">{this.state.poc_creat_date}</p>
                                 </div>
                                 <div className="col-6">
                                    <p disabled className="form-control">{this.state.poc_creat_text}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-6">
                           <div className="form-group">
                              <label htmlFor="usr">High Blood Pressure</label>

                              <div className="row">
                                 <div className="col-6">
                                    {' '}
                                    <p disabled className="form-control">{this.state.hb_date}</p>
                                 </div>
                                 <div className="col-6">
                                    <p disabled className="form-control">{this.state.hb_text}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="col-6">
                           <div className="form-group">
                              <label htmlFor="usr">Platelet</label>

                              <div className="row">
                                 <div className="col-6">
                                    {' '}
                                    <p disabled className="form-control">{this.state.plt_date}</p>
                                 </div>
                                 <div className="col-6">
                                    {' '}
                                    <p disabled className="form-control">{this.state.plt_text}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-6">
                           <div className="form-group">
                              <label htmlFor="usr">Referred By</label>
                              <p disabled className="form-control">{this.state.referred_by}</p>
                           </div>
                        </div>
                     </div>

                     <br />
                     <br />
                     <h4>Flags</h4>
                     <div className="row">
                        {
                           this.state.dynamicFlags.map((flag) => {
                              return <div className="col s4">
                                 <div className="alert myDanger" role="alert">
                                    <span className="white">{flag}</span>
                                 </div>
                              </div>
                           })
                        }
                     </div>
                     <h5>
                        What Lab Did Patient Use : 
                        {this.state.lab_location_for_inr_test !== null ? (
                           <span className="text-right" style={{ color: 'green' }}>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {this.state.lab_location_for_inr_test}
                           </span>
                        ) : (
                           ''
                        )}
                     </h5>
                     <div className="row" style={{ padding:"15px" }}>
                        <>
                           <h5>Dictation</h5>
                           <p disabled className="form-control">{this.state.dictation}</p>
                        </>
                     </div>
                  </div>
                  <br />
               </div>
            </React.Fragment>
            <React.Fragment>
               {this.state.loader === 1 ? (
                  <div className="centered">
                     <ReactSpinner type="border" color="blue" size="5" />
                  </div>
               ) : (
                  ''
               )}
               <div className="container">
                  <h2 className="text-center myHeading">Dosage Schedule</h2>
                  <h3 className="text-center myHeading">(Drug names)</h3>
                  <br />
                  <br />

                  <div className="jumbotron" style={{ paddingTop: '2.25rem' }}>
                     {
                        this.state.table !== undefined ?
                        <>
                           <table style={{ display: "inline-table" }} className="table-responsive table-bordered">
                              <tr style={{ borderBottom: "1px solid #ccc" }}>
                                 <th>Date</th>
                                 <th>Lab</th>
                                 {
                                    this.state.vka_chkBox ? 
                                    <th colSpan={2}>
                                       <select className='form-control'>
                                          <option value={this.state.table.headers.findIndex(x => x.vka) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.vka)].vka?.med_name : ''}>{this.state.table.headers.findIndex(x => x.vka) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.vka)].vka?.med_name : ''}</option>
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.lmwh_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control'>
                                          <option value={this.state.table.headers.findIndex(x => x.lmwh) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.lmwh)].lmwh?.med_name : ''}>{this.state.table.headers.findIndex(x => x.lmwh) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.lmwh)].lmwh?.med_name : ''}</option>
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.doac_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control'>
                                          <option value={this.state.table.headers.findIndex(x => x.doac) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.doac)].doac?.med_name : ''}>{this.state.table.headers.findIndex(x => x.doac) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.doac)].doac?.med_name : ''}</option>
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.antiplatelets_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control'>
                                          <option value={this.state.table.headers.findIndex(x => x.antiplatelets) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.antiplatelets)].antiplatelets?.med_name : ''}>{this.state.table.headers.findIndex(x => x.antiplatelets) !== -1 ? this.state.table.headers[this.state.table.headers.findIndex(x => x.antiplatelets)].antiplatelets?.med_name : ''}</option>
                                       </select>
                                    </th> : <></>
                                 }
                              </tr>
                              {
                                 this.state.table.date?.map((date, key) => {
                                    let dataKey = Object.keys(date)[0];
                                    let vkaKey = key;
                                    let antiplateletKey = key;
                                    let lmwhKey = key;
                                    let doacKey = key;
                                    return (
                                       <>
                                          <tr key={`date-key-${key}`} style={{ borderBottom: "1px solid #ccc" }}>
                                             <td><input type='date' disabled={dataKey !== 'd_0' ? true : false} onChange={(e) => this.onDateChange(e)} value={date[dataKey]} className='form-control' /></td>
                                             <td>
                                                <input id={`labVal${vkaKey+1}`} type="text" onChange={(e) => this.handleLabValueChange(e, `labVal${vkaKey+1}`)} value={this.state[`labVal${vkaKey+1}`]} className='form-control' />
                                             </td>
                                             {
                                                this.state.vka_chkBox ?
                                                <>
                                                   <td><input id={`InptValVka${vkaKey+1}`} type="number" value={this.state[`InptValVka${vkaKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValVka${vkaKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValVka${vkaKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValVka${vkaKey+1}`)} className='form-control'>
                                                         <option value={'twice daily'}>twice daily</option>
                                                         <option value={'once daily'}>once daily</option>
                                                      </select>
                                                   </td>
                                                </> 
                                                : <></>
                                             }
                                             {this.state.lmwh_chkBox ?
                                                <>
                                                   <td><input id={`InptValLmwh${lmwhKey+1}`} type="number" value={this.state[`InptValLmwh${lmwhKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValLmwh${lmwhKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValLmh${lmwhKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValLmh${lmwhKey+1}`)} className='form-control'>
                                                         <option value={'twice daily'}>twice daily</option>
                                                         <option value={'once daily'}>once daily</option>
                                                      </select>
                                                   </td>
                                                </> : <></>
                                             }
                                             {this.state.antiplatelets_chkBox ?
                                                <>
                                                   <td><input id={`InptValAntiplatelets${antiplateletKey+1}`} type="number" value={this.state[`InptValAntiplatelets${antiplateletKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValAntiplatelets${antiplateletKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValAntiplatelets${antiplateletKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValAntiplatelets${antiplateletKey+1}`)} className='form-control'>
                                                         <option value={'twice daily'}>twice daily</option>
                                                         <option value={'once daily'}>once daily</option>
                                                      </select>
                                                   </td>
                                                </> : <></>
                                             }
                                             {this.state.doac_chkBox ?
                                                <>
                                                   <td><input id={`InptValDoac${doacKey+1}`} type="number" value={this.state[`InptValDoac${doacKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValDoac${doacKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValDoac${doacKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValDoac${doacKey+1}`)} className='form-control'>
                                                         <option value={'twice daily'}>twice daily</option>
                                                         <option value={'once daily'}>once daily</option>
                                                      </select>
                                                   </td>
                                                </> : <></>
                                             }
                                          </tr>
                                       </>
                                    )
                                 })
                              }
                           </table>
                        </> : ""
                     }
   
                     <div className="row">
                        <div className="col-3" style={{ marginTop: '15px' }}>
                           <div className='form-group'>
                              <label htmlFor='vka-label'>VKA</label>
                              <input type='checkbox' checked={this.state.vka_chkBox ? true : false} style={{ marginLeft: '5px' }} onChange={(e) => this.setState({ vka_chkBox: e.target.checked })} value={this.state.vka_chkBox} />
                           </div> 
                           <div className='form-group'>
                              <label htmlFor='doac-label'>DOAC</label>
                              <input type='checkbox' checked={this.state.doac_chkBox ? true : false} style={{ marginLeft: '5px' }} onChange={(e) => this.setState({ doac_chkBox: e.target.checked })} value={this.state.doac_chkBox} />
                           </div>
                           <div className='form-group'>
                              <label htmlFor='antiplatelets-label'>ANTIPLATELES</label>
                              <input type='checkbox' checked={this.state.antiplatelets_chkBox ? true : false} style={{ marginLeft: '5px' }} onChange={(e) => this.setState({ antiplatelets_chkBox: e.target.checked })} value={this.state.antiplatelets_chkBox} />
                           </div>
                           <div className='form-group'>
                              <label htmlFor='lmwh-label'>LMWH</label>
                              <input type='checkbox' checked={this.state.lmwh_chkBox ? true : false} style={{ marginLeft: '5px' }} onChange={(e) => this.setState({ lmwh_chkBox: e.target.checked })} value={this.state.lmwh_chkBox} />
                           </div>
                        </div>
                        <div className='col-6'>
                           <div className='form-group'>
                              <label htmlFor='approvedBy'>Approved By</label>
                              <input type='text' className='form-control' value={this.state.approved_by} onChange={(e) => this.handleApprovedBy(e)} />
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-4">
                           <button onClick={() => this.handleSaveNApprove(this.state)} className="btn btn-outline-danger  btn-block">
                              Save & Approve
                           </button>
                        </div>

                        <div className="col-4">
                           <button onClick={() => this.handleSaveDraft(this.state)} className="btn btn-secondary btn-block">
                              Save Draft
                           </button>
                        </div>
                     </div>
                  </div>
                  <br />
               </div>
            </React.Fragment>
         </>
      );
   }
}
export default Page4;
