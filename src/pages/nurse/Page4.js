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
         mitral_stenosis: '',
         blood_clot_blood_thinner_interrupted: '',
         diabetes: '',
         stroke_or_mini_stroke: '',
         high_blood_pressure: '',
         ulcer_in_stomach_or_bowel_last_three_months: '',
         had_transfusion_in_last_three_months_when: '',
         had_transfusion_in_last_three_months: '',
         being_treated_cancer: '',
         venous_thromboelism: '',
         dvt: '',
         dvt_how_long_ago: '',
         pe: '',
         pe_dvt_how_long_ago: '',
         atrial_fibrillation_of_flutter: '',
         mechanical_heart_valve: '',
         tissue_heart_valve: '',
         mechanical_heart_valve_Is_the_valve_bileaflet: '',
         mechanical_heart_valve_Is_the_valve_ball_and_cage: '',
         mechanical_heart_valve_Is_the_valve_tilting_disc: '',
         mechanical_heart_valve_Is_the_valve_dont_know: '',
         location_aortic: '',
         location_mitral: '',
         cirrhosis_of_liver: '',
         antiphospholipid_antibody_syndrome: '',
         cancer: '',
         radiation: '',
         chemotherapy: '',
         chemotherapy_ongoing: '',
         chemotherapy_finished: '',
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
         aspirin_chkBox: false,
         iv_heparin_chkBox: false,

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

         selectValAspirin1: '',
         selectValAspirin2: '',
         selectValAspirin3: '',
         selectValAspirin4: '',
         selectValAspirin5: '',
         selectValAspirin6: '',
         selectValAspirin7: '',
         selectValAspirin8: '',
         selectValAspirin9: '',
         selectValAspirin10: '',
         selectValAspirin11: '',

         InptValAspirin1: 0,
         InptValAspirin2: 0,
         InptValAspirin3: 0,
         InptValAspirin4: 0,
         InptValAspirin5: 0,
         InptValAspirin6: 0,
         InptValAspirin7: 0,
         InptValAspirin8: 0,
         InptValAspirin9: 0,
         InptValAspirin10: 0,
         InptValAspirin11: 0,

         selectValIvHeparin1: '',
         selectValIvHeparin2: '',
         selectValIvHeparin3: '',
         selectValIvHeparin4: '',
         selectValIvHeparin5: '',
         selectValIvHeparin6: '',
         selectValIvHeparin7: '',
         selectValIvHeparin8: '',
         selectValIvHeparin9: '',
         selectValIvHeparin10: '',
         selectValIvHeparin11: '',

         InptValIvHeparin1: 0,
         InptValIvHeparin2: 0,
         InptValIvHeparin3: 0,
         InptValIvHeparin4: 0,
         InptValIvHeparin5: 0,
         InptValIvHeparin6: 0,
         InptValIvHeparin7: 0,
         InptValIvHeparin8: 0,
         InptValIvHeparin9: 0,
         InptValIvHeparin10: 0,
         InptValIvHeparin11: 0,

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

         selectValAntiplateletsVer21: '',
         selectValAntiplateletsVer22: '',
         selectValAntiplateletsVer23: '',
         selectValAntiplateletsVer24: '',
         selectValAntiplateletsVer25: '',
         selectValAntiplateletsVer26: '',
         selectValAntiplateletsVer27: '',
         selectValAntiplateletsVer28: '',
         selectValAntiplateletsVer29: '',
         selectValAntiplateletsVer210: '',
         selectValAntiplateletsVer211: '',

         InptValAntiplateletsVer21: 0,
         InptValAntiplateletsVer22: 0,
         InptValAntiplateletsVer23: 0,
         InptValAntiplateletsVer24: 0,
         InptValAntiplateletsVer25: 0,
         InptValAntiplateletsVer26: 0,
         InptValAntiplateletsVer27: 0,
         InptValAntiplateletsVer28: 0,
         InptValAntiplateletsVer29: 0,
         InptValAntiplateletsVer210: 0,
         InptValAntiplateletsVer211: 0,

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

         approved_by: '',
         active_lmwh: '',
         active_doac: '',
         active_vka: '',
         add_new_recom: '',
         recom_id: '',
         assessment_date: ''
      };

      // this.submitForm = this.submitForm.bind(this);
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
      this.handleDropdownValChange = this.handleDropdownValChange.bind(this);
   }

   componentDidMount() {
      console.log(this.props.location);
      if(this.props.location.state !== undefined) {
         this.setState({ add_new_recom: this.props.location.state.add_new, recom_id: this.props.location.state.recommendation_id });
      }
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      try {
         let patient_id = localStorage.getItem('patient_id');
         this.setState({ patient_id: patient_id });
         console.log(this.state.add_new_recom, this.props.location.state.add_new);

         if(this.state.add_new_recom !== true && this.state.add_new_recom !== '') {
            axios
            .get(domain + `/api/nurse/getRecommendations/:${patient_id}`, {
               headers: headers,
            })
            .then((response) => {
               console.log('Nurse6 - res: ', response, this.state);
               if (response.data?.success === 'not_found') {
                  this.setState({ table: undefined });
                  return;
               }

               let recm_indx = response.data?.success.findIndex(x => x.id === this.state.recom_id);
               let data = recm_indx !== -1 ? response.data?.success[recm_indx] : response.data?.success[0];
               console.log('NURSE 6 - Response: ', this.props.location, recm_indx, response.data?.success[recm_indx]);
               this.setState({ loader: '' });
               this.getDataApiAlgo(JSON.parse(data?.jsonTable), data);
            });
         } else { this.getDatafromAlgo() }
            
         axios
         .get(domain + `/api/nurse/page5LoadData/:${patient_id}`, {
            // originally was page5LoadData
            headers: headers,
         }).then((response) => {
            console.log(response);
            let data = response.data?.success[0];
            this.setState({
               referred_by: data?.physicianName,
               age: data?.age,
               procedure: data?.type_of_procedure,
               date_of_procedure: data?.date_of_procedure,
               sex: data?.gender,
               weight: data?.weight,
               understanding: data?.understanding,
               completed_by: data?.who_is_completing_this_form,
               reviewed_by: data?.reviewed_by,
               genderSelected: data?.gender,
               indication_for_anticoagulation: data?.indication_for_anticoagulation,
               chads_score_and_distribution: data?.chads_score_and_distribution,

               poc_creat_text: data?.poc_creat_text,
               poc_creat_date: data?.poc_creat_date,
               hb_text: data?.hb_text,
               hb_date: data?.hb_date,
               plt_text: data?.plt_text,
               plt_date: data?.plt_date,
               poc_inr_text: data?.poc_inr_text,
               poc_inr_date: data?.poc_inr_date,
               dictation: data?.dictation,

               details_on_recomemendation: data?.details_on_recomemendation,

               weightSelected: data?.weight_unit,
               dalteparin: data?.dalteparin,
               dalteparin_dosage: data?.dalteparin_dosage,
               dalteparin_freq: data?.dalteparin_freq,
               enoxaparin: data?.enoxaparin,
               enoxaparin_dosage: data?.enoxaparin_dosage,
               enoxaparin_freq: data?.enoxaparin_freq,
               tinzaparin: data?.tinzaparin,
               tinzaparin_dosage: data?.tinzaparin_dosage,
               tinzaparin_freq: data?.tinzaparin_freq,
               aspirin: data?.aspirin,
               aspirin_dosage: data?.aspirin_dosage,
               aspirin_dosage_time: data?.aspirin_dosage_time,
               plavix: data?.plavix,
               plavix_dosage: data?.plavix_dosage,
               plavix_dosage_time: data?.plavix_dosage_time,
               brillinta: data?.brillinta,
               brillinta_dosage: data?.brillinta_dosage,
               brillinta_dosage_time: data?.brillinta_dosage_timie,
               effient: data?.effient,
               effient_dosage: data?.effient_dosage,
               effient_dosage_time: data?.effient_dosage_time,
               not_using_drugs: data?.not_using_drugs,
               ulcer_in_stomach_or_bowel_last_three_months: data?.ulcer_in_stomach_or_bowel_last_three_months,
               had_transfusion_in_last_three_months_when: data?.had_transfusion_in_last_three_months_when,
               had_transfusion_in_last_three_months: data?.had_transfusion_in_last_three_months,
                        
               venous_thromboelism: data.venous_thromboelism,
               dvt: data.dvt,
               dvt_how_long_ago: data.dvt_how_long_ago,
               pe: data.pe,
               pe_dvt_how_long_ago: data.pe_dvt_how_long_ago,
               atrial_fibrillation_of_flutter: data.atrial_fibrillation_of_flutter,
               mechanical_heart_valve: data.mechanical_heart_valve,
               tissue_heart_valve: data.tissue_heart_valve,
               mechanical_heart_valve_Is_the_valve_bileaflet: data.mechanical_heart_valve_Is_the_valve_bileaflet,
               mechanical_heart_valve_Is_the_valve_ball_and_cage: data.mechanical_heart_valve_Is_the_valve_ball_and_cage,
               mechanical_heart_valve_Is_the_valve_tilting_disc: data.mechanical_heart_valve_Is_the_valve_tilting_disc,
               mechanical_heart_valve_Is_the_valve_dont_know: data.mechanical_heart_valve_Is_the_valve_dont_know,
               location_aortic: data.location_aortic,
               location_mitral: data.location_mitral,
               cirrhosis_of_liver: data.cirrhosis_of_liver,
               antiphospholipid_antibody_syndrome: data.antiphospholipid_antibody_syndrome,
               mitral_stenosis: data.mitral_stenosis,
               blood_clot_blood_thinner_interrupted: data.blood_clot_blood_thinner_interrupted,

               liver_disease: data?.liver_disease,
               lab_location_for_inr_test: data?.lab_location_for_inr_test,
                        
               being_treated_cancer: data.being_treated_cancer,
               cancer: data.cancer,
               radiation: data.radiation,
               chemotherapy: data.chemotherapy,
               chemotherapy_ongoing: data.chemotherapy_ongoing,
               chemotherapy_finished: data.chemotherapy_finished,

               pradaxa: data?.pradaxa,
               pradaxa_dosage: data?.pradaxa_dosage,
               xarelto: data?.xarelto,
               xarelto_dosage: data?.xarelto_dosage,
               xarelto_dosage_time: data?.xarelto_dosage_time,
               eliquis: data?.eliquis,
               eliquis_dosage: data?.eliquis_dosage,
               eliquis_dosage_time: data?.eliquis_dosage_time,
               edoxabon: data?.edoxabon,
               edoxabon_dosage: data?.edoxabon_dosage,
               edoxabon_dosage_time: data?.edoxabon_dosage_time,
               coumadin: data?.coumadin,
               coumadin_monday: data?.coumadin_monday,
               coumadin_tuesday: data?.coumadin_tuesday,
               coumadin_wednesday: data?.coumadin_wednesday,
               coumadin_thursday: data?.coumadin_thursday,
               coumadin_friday: data?.coumadin_friday,
               coumadin_saturday: data?.coumadin_saturday,
               coumadin_sunday: data?.coumadin_sunday,
               sintrom: data?.sintrom,
               sintrom_monday: data?.sintrom_monday,
               sintrom_tuesday: data?.sintrom_tuesday,
               sintrom_wednesday: data?.sintrom_wednesday,
               sintrom_thursday: data?.sintrom_thursday,
               sintrom_friday: data?.sintrom_friday,
               sintrom_saturday: data?.sintrom_saturday,
               sintrom_sunday: data?.sintrom_sunday,
               assessment_date: data.assessment_date,

               ulcer_in_stomach_or_bowel: data?.ulcer_in_stomach_or_bowel,
               cognitive_heart_failure: data?.cognitive_heart_failure,
               high_blood_pressure: data?.high_blood_pressure,
               diabetes: data?.diabetes,
               stroke_or_mini_stroke: data?.stroke_or_mini_stroke,
               bleeding_requiring_treatment_last_three_months: data?.bleeding_requiring_treatment_last_three_months
            });
            this.forceUpdate();
            this.fillactiveanticogmeds();
            this.fillactiveantiplatmeds();
            this.set_DynamicFlags();
            this.set_anticoagulation(response.data?.success.anticoagulation);
            this.set_CHADS_score();
         });
         this.setState({ loader: '' });
      } catch (error) {
         console.error(error);
         this.setState({ loader: '' });
      }
   }

   getDataApiAlgo(tableValue, respData) {
      // console.log(tableValue, respData);
      let table_data = {
         vka: '',
         lmwh: '',
         antiplatelets: '',
         doac: '',
         aspirin: '',
         iv_heparin: '',
         headers: '',
         date: tableValue.date
      };

      const tableData = tableValue;
      let tableHeader = [];
      if(tableData.vka !== '') {
         let keyIdx = tableData.vka.findIndex(x => x.d6);
         let keyIdx1 = tableData.vka.findIndex(x => x.warfain !== '0');
         let keyId = keyIdx !== -1 ? `labVal${keyIdx}` : '';
         let keyId1 = keyIdx1 !== -1 ? `InptValVka${keyIdx1+1}` : '';
         table_data.vka = tableData.vka;
         if(tableData.vka[7].warfain !== '') {
            this.setState({ 
               [keyId]: tableData.vka[keyIdx].lab,
               [keyId1]: tableData.vka[keyIdx1].warfain
            });
            // this.setInitialState('InptValVka', tableData.vka[keyIdx1].warfain, tableData.vka.length);
            this.setVKAVal(tableData.vka);
            this.setInitialLabState('vka', 'labVal', tableData.vka.data, tableData.vka.length);
            this.setInitialSelectState('vka', 'selectValVka', tableData.vka.data, tableData.vka.length);
         }
      }

      if(tableData.lmwh !== '') {
         let keyIdx1 = tableData.lmwh.findIndex(x => x.dosage);
         let keyId1 = keyIdx1 !== -1 ? `InptValLmwh${keyIdx1+1}` : '';
         table_data.lmwh = tableData.lmwh;
         if(keyId1 !== '') {
            if(tableData.lmwh[0].dosage !== '') {
               this.setState({
                  [keyId1]: tableData.lmwh[keyIdx1].dosage.split(' ')[0] 
               });
               this.setInitialState('lmwh', 'InptValLmwh', tableData.lmwh, tableData.lmwh.length);
               this.setInitialSelectState('lmwh', 'selectValLmwh', tableData.lmwh, tableData.lmwh.length);
            }
         }
      }

      if(tableData.doac !== '') {
         let keyIdx1 = tableData.doac.findIndex(x => x.dosage);
         let keyId1 = keyIdx1 !== -1 ? `InptValDoac${keyIdx1+1}` : '';
         if(keyId1 !== '') {
            table_data.doac = tableData.doac;
            if(tableData.doac[0].dosage !=='') {
               this.setState({
                  [keyId1]: tableData.doac[keyIdx1].dosage.split(' ')[0] 
               });
               this.setInitialState('doac', 'InptValDoac', tableData.doac, tableData.doac.length);
               this.setInitialSelectState('doac', 'selectValDoac', tableData.doac, tableData.doac.length);
            }
         }
      }

      if(tableData.antiplatelets !== '') {
         let keyIdx1 = tableData.antiplatelets.findIndex(x => x.antiplatelets);
         let keyId1 = keyIdx1 !== -1 ? `InptValAntiplatelets${keyIdx1+1}` : '';
         table_data.antiplatelets = tableData.antiplatelets;
         if(keyId1 !== '') {
            if(tableData.antiplatelets[0].antiplatelets !== '') {
               this.setState({
                  [keyId1]: tableData.antiplatelets[keyIdx1].antiplatelets.split(' ')[0] 
               });
               this.setInitialState('antiplatelets', 'InptValAntiplatelets', tableData.antiplatelets, tableData.antiplatelets.length);
               this.setInitialSelectState('antiplatelets', 'selectValAntiplatelets', tableData.antiplatelets, tableData.antiplatelets.length);
            }
         }
      }

      if(tableData.aspirin !== '') {
         let keyIdx1 = tableData.aspirin.findIndex(x => x.aspirin);
         let keyId1 = keyIdx1 !== -1 ? `InptValAspirin${keyIdx1+1}` : '';
         tableHeader.push({ 'aspirin': tableData.aspirin.header });
         table_data.aspirin = tableData.aspirin;
         if(keyId1 !== '') {
            if(tableData.aspirin[0].aspirin !== '') {
               this.setState({
                  [keyId1]: tableData.aspirin[keyIdx1].aspirin.split(' ')[0] 
               });
               this.setInitialState('aspirin', 'InptValAspirin', tableData.aspirin, tableData.aspirin.length);
               this.setInitialSelectState('aspirin', 'selectValAspirin', tableData.aspirin, tableData.aspirin.length);
            }
         }
      }

      if(table_data.iv_heparin !== '') {
         this.setInitialState('heparin', 'InptValIvHeparin', '', 11);
         this.setInitialSelectState('heparin', 'selectValIvHeparin', 'do not take', 11);
      }

      table_data.headers = tableData.headers;

      // console.log(tableData, table_data);
      
      this.setState({
         approved_by: respData.approved_by,
         table: table_data,
         vka_chkBox: respData.is_vka_selected !== "0" ? true : false,
         doac_chkBox: respData.is_doac_selected !== "0" ? true : false,
         antiplatelets_chkBox: respData.is_antiplatelets_selected !== "0" ? true : false,
         lmwh_chkBox: respData.is_lmwh_selected !== "0" ? true : false,
         aspirin_chkBox: respData.is_aspirin_selected !== "0" ? true : false,
         iv_heparin_chkBox: respData.is_iv_heparin_selected !== "0" ? true : false
      });
   }

   handleApprovedBy(e) {
      this.setState({
         approved_by: e.target.value
      });
   }

   handleSaveNApprove(tableData) {
      if(!this.validator.allValid()) {
         this.validator.showMessages();
         this.forceUpdate();
         return;
      }
      
      if (this.state.table === 'none') return;
      // const { table } = this.state;
      // let headerVkaActiveIdx = table.headers.find(x => x['vka']).vka?.findIndex(x => x.med_name === this.state.active_vka);
      // let headerDoacActiveIdx = table.headers.find(x => x['doac']).doac?.findIndex(x => x.med_name === this.state.active_doac);
      // let headerLmwhActiveIdx = table.headers.find(x => x['lmwh']).lmwh?.findIndex(x => x.med_name === this.state.active_lmwh);

      // console.log(table.headers, table.headers.findIndex(x => x['vka']));
      // console.log(headerVkaActiveIdx, headerDoacActiveIdx, headerLmwhActiveIdx, this.state.active_vka, this.state.active_doac, this.state.active_lmwh);
      const data = {
         jsonTable: JSON.stringify({ ...this.state.table }),
         patient_id: localStorage.getItem('patient_id'),
         last_modified: new Date().toLocaleDateString(),
         approved_by: tableData.approved_by,
         status: 'Approved',
         is_vka_selected: this.state.vka_chkBox, 
         is_doac_selected: this.state.doac_chkBox, 
         is_antiplatelets_selected: this.state.antiplatelets_chkBox, 
         is_lmwh_selected: this.state.lmwh_chkBox, 
         is_aspirin_selected: this.state.aspirin_chkBox, 
         is_iv_heparin_selected: this.state.iv_heparin_chkBox,
         activeVKA: this.state.active_vka,
         activeDOAC: this.state.active_doac,
         activeLMWH: this.state.active_lmwh
      };
      // console.log(data, table, tableData);
      server(`nurse/medicationJsonData/:${data?.patient_id}`, data);
      server(`nurse/saveRecommendations/:${data?.patient_id}`, data);
      this.props.history.push({ pathname: '/Nurse/Nurse6', state: { 'is_lmwh_selected': this.state.lmwh_chkBox, 'recom_id': this.state.recom_id } });
   }

   handleSaveDraft(tableData) {
      if(!this.validator.allValid()) {
         this.validator.showMessages();
         this.forceUpdate();
         return;
      }
      if (this.state.table === 'none') return;

      const data = {
         jsonTable: JSON.stringify({ ...this.state.table }),
         patient_id: localStorage.getItem('patient_id'),
         last_modified: new Date().toLocaleDateString(),
         approved_by: tableData.approved_by,
         status: 'Draft',
         is_vka_selected: this.state.vka_chkBox, 
         is_doac_selected: this.state.doac_chkBox, 
         is_antiplatelets_selected: this.state.antiplatelets_chkBox, 
         is_lmwh_selected: this.state.lmwh_chkBox, 
         is_aspirin_selected: this.state.aspirin_chkBox, 
         is_iv_heparin_selected: this.state.iv_heparin_chkBox,
         activeVKA: this.state.active_vka,
         activeDOAC: this.state.active_doac,
         activeLMWH: this.state.active_lmwh
      };
      console.log('>>> JSON data: ', data);
      server(`nurse/medicationJsonData/:${data?.patient_id}`, data);
      server(`nurse/saveRecommendations/:${data?.patient_id}`, data);
      this.props.history.push({ pathname: '/Nurse/Nurse6', state: { 'is_lmwh_selected': this.state.lmwh_chkBox, 'recom_id': this.state.recom_id } });
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
      // console.log(activeMeds);
      this.setState({ activeAnticogMeds: activeMeds });
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
      // console.log(activeMeds);
      this.setState({ activeAntiplatMeds: activeMeds });
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
      // console.log(`CHADS score: C=${C}  H=${H}  A=${A}  D=${D}  S2=${S2}`);

      if (C === 'Yes') score += 1;
      if (H === 'Yes') score += 1;
      if (A > 74) score += 1;
      if (D === 'Yes') score += 1;
      if (S2 === 'Yes') score += 2;

      this.setState({ chads_score_and_distribution: score });
   }

   setVKAVal(value) {
      this.setState({
         InptValVka1: value[0]?.warfain,
         InptValVka2: value[1]?.warfain,
         InptValVka3: value[2]?.warfain,
         InptValVka4: value[3]?.warfain,
         InptValVka5: value[4]?.warfain,
         InptValVka6: value[5]?.warfain,
         InptValVka7: value[6]?.warfain,
         InptValVka8: value[7]?.warfain,
         InptValVka9: value[8]?.warfain,
         InptValVka10: value[9]?.warfain,
         InptValVka11: value[10]?.warfain,
      });
   }

   setInitialState(medKey, key, value, length) {
      console.log(value);
      for(let i=0; i<length; i++) {
         if(medKey === 'doac') {
            this.setState({
               [key+(i+1)]: value[i].dosage?.split(' ')[0]
            });
         } else if(medKey === 'lmwh') {
            this.setState({
               [key+(i+1)]: value[i].dosage?.split(' ')[0]
            });
         } else if(medKey === 'antiplatelets') {
            this.setState({
               [key+(i+1)]: value[i].antiplatelets?.split(' ')[0]
            });
         } else if(medKey === 'aspirin') {
            this.setState({
               [key+(i+1)]: value[i].aspirin?.split(' ')[0]
            });
         } else if(medKey === 'heparin') {
            this.setState({
               [key+(i+1)]: value
            });
         }
      }
   }

   handleDropdownValChange(key, value, dose) {
      if(key.toLowerCase().endsWith('vka')) {
         // this.setInitialState('vka', key, dose, 11);
         this.setState({ active_vka: value });
      } else if(key.toLowerCase().endsWith('doac')) {
         // this.setInitialState('doac', key, dose, 11);
         this.setState({ active_doac: value });
      } else if(key.toLowerCase().endsWith('lmwh')) {
         // this.setInitialState('lmwh', key, dose, 11);
         this.setState({ active_lmwh: value });
      } else if(key.toLowerCase().endsWith('antiplatelets')) {
         // this.setInitialState('antiplatelets', key, dose, 11);
      }
      // console.log(key, value, dose);
   }

   setInitialLabState(medKey, key, value, length) {
      for(let i=0; i<length; i++) {
         if(medKey === 'vka') {
            this.setState({
               [key+(i+1)]: value[i]?.lab
            });
         } 
      }
   }

   setInitialSelectState(medKey, key, value, length) {
      for(let i=0; i<length; i++) {
         if(medKey === 'vka') {
            this.setState({
               [key+(i+1)]: value[i]?.frequency
            });
         } else if(medKey === 'doac') {
            this.setState({
               [key+(i+1)]: value[i]?.frequency
            });
         } else if(medKey === 'lmwh') {
            this.setState({
               [key+(i+1)]: value[i]?.frequency
            });
         } else if(medKey === 'antiplatelets') {
            this.setState({
               [key+(i+1)]: value[i]?.frequency
            });
         } else if(medKey === 'aspirin') {
            this.setState({
               [key+(i+1)]: value[i]?.frequency
            });
         } else if(medKey === 'heparin') {
            this.setState({
               [key+(i+1)]: value
            });
         }
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
         being_treated_cancer: being_treated_cancer,          
         venous_thromboelism: venous_thromboelism,
         dvt: dvt,
         // dvt_how_long_ago: dvt_how_long_ago,
         // pe: pe,
         // pe_dvt_how_long_ago: pe_dvt_how_long_ago,
         // atrial_fibrillation_of_flutter: atrial_fibrillation_of_flutter,
         // mechanical_heart_valve: mechanical_heart_valve,
         // tissue_heart_valve: tissue_heart_valve,
         // mechanical_heart_valve_Is_the_valve_bileaflet: mechanical_heart_valve_Is_the_valve_bileaflet,
         // mechanical_heart_valve_Is_the_valve_ball_and_cage: mechanical_heart_valve_Is_the_valve_ball_and_cage,
         // mechanical_heart_valve_Is_the_valve_tilting_disc: mechanical_heart_valve_Is_the_valve_tilting_disc,
         // mechanical_heart_valve_Is_the_valve_dont_know: mechanical_heart_valve_Is_the_valve_dont_know,
         // location_aortic: location_aortic,
         // location_mitral: location_mitral,
         cirrhosis_of_liver: cirrhosis_of_liver,
         antiphospholipid_antibody_syndrome: antiphospholipid_antibody_syndrome,
         mitral_stenosis: mitral_stenosis,
         blood_clot_blood_thinner_interrupted: blood_clot_blood_thinner_interrupted,
      } = this.state;
      let flags = [];

      if (liver === 'Yes') flags.push('Liver diseases');
      if (transfusion === 'Yes' && transfusion_date !== null) flags.push(`Transfusion within the last 3 months ${transfusion_date}`);
      if (ulcer === 'Yes') flags.push(`Ulcer within the last 3 months`);
      if(bleeding_requiring_treatment_in_last_three_months === 'Yes') flags.push('Bleeding within the last 3 months');
      if(cognitive_heart_fail === 'Yes') flags.push('Congestive heart failure');
      if(high_blood_pressures === 'Yes') flags.push('High blood pressure');
      if(stroke_mini_stroke === 'Yes') flags.push('Stroke or ministroke within the last 3 months');
      if(diabetic === 'Yes') flags.push('Diabetes');
      if(being_treated_cancer === 'Yes') flags.push('Undergoing cancer therapy');
      if(blood_clot_blood_thinner_interrupted === 'Yes') flags.push('Blood clot while blood thinner interrupted');
      if(venous_thromboelism === 'Yes' || dvt === 'Yes') flags.push('DVT or PE in the last 3 months');
      if(cirrhosis_of_liver === 'Yes') flags.push('Liver cirrhosis');
      if(mitral_stenosis === 'Yes') flags.push('Mitral stenosis');
      if(antiphospholipid_antibody_syndrome === 'Yes') flags.push('Antiphospholipid antibody syndrome');
      
      this.setState({ dynamicFlags:flags });
   }

   async getDatafromAlgo() {
      let table_data = {
         vka: '',
         lmwh: '',
         antiplatelets: '',
         doac: '',
         aspirin: '',
         iv_heparin: '',
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
      console.log('> Nurse Page 4 => data: ', this.state.date_of_procedure);
      const inidcators = await thromboAlgos();
      const tableData = await thromboMedicationAlgo(inidcators, this.state.date_of_procedure);
      console.log('> Nurse Page 4 => tableData: ', tableData, tableData.lmwh !== undefined, tableData.lmwh);
      // tableData.data[5].d = tableData.data[5].d ? this.state.date_of_procedure : tableData.data[5].d;
      let tableHeader = [];
      if(tableData.vka !== undefined) {
         let keyIdx = tableData.vka.data?.findIndex(x => x.d6);
         let keyIdx1 = tableData.vka.data?.findIndex(x => x.warfain !== '0');
         let keyId = keyIdx !== -1 ? `labVal${keyIdx}` : '';
         let keyId1 = keyIdx1 !== -1 ? `InptValVka${keyIdx1+1}` : '';
         tableHeader.push({ 'vka': tableData.vka.header });
         table_data.vka = tableData.vka.data;
         console.log(tableData.vka.data[0].warfain);
         if(tableData.vka.data[7].warfain !== '') {
            console.log(tableData.vka.data[5].warfain);
            this.setState({ active_vka: tableData.vka.header[0].med_name });
            this.setState({ 
               [keyId]: tableData.vka.data[keyIdx].lab,
               [keyId1]: tableData.vka.data[keyIdx1].warfain
            });
            // this.setInitialState('InptValVka', tableData.vka.data[keyIdx1].warfain, tableData.vka.data?.length);
            this.setVKAVal(tableData.vka.data);
            this.setInitialLabState('vka', 'labVal', tableData.vka.data, tableData.vka.data?.length);
            this.setInitialSelectState('vka', 'selectValVka', tableData.vka.data, tableData.vka.data?.length);
         }
      }

      if(tableData.lmwh !== undefined) {
         let keyIdx1 = tableData.lmwh.data?.findIndex(x => x.dosage !== '');
         let keyId1 = keyIdx1 !== -1 ? `InptValLmwh${keyIdx1+1}` : '';
         tableHeader.push({ 'lmwh': tableData.lmwh.header });
         table_data.lmwh = tableData.lmwh.data;
         if(keyId1 !== '') {
            if(tableData.lmwh.data[0].dosage !== '') {
               this.setState({ active_lmwh: tableData.lmwh.header[0].med_name });
               this.setState({
                  [keyId1]: tableData.lmwh.data[keyIdx1].dosage.split(' ')[0] 
               });
               this.setInitialState('lmwh', 'InptValLmwh', tableData.lmwh.data, tableData.lmwh.data?.length);
               this.setInitialSelectState('lmwh', 'selectValLmwh', tableData.lmwh.data, tableData.lmwh.data?.length);
            }
         }
      }

      if(tableData.doac !== undefined) {
         let keyIdx1 = tableData.doac.data?.findIndex(x => x.dosage !== "");
         let keyId1 = keyIdx1 !== -1 ? `InptValDoac${keyIdx1+1}` : '';
         tableHeader.push({ 'doac': tableData.doac.header });
         if(keyId1 !== '') {
            this.setState({ active_doac: tableData.doac.header[0].med_name });
            table_data.doac = tableData.doac.data;
            this.setState({
               [keyId1]: tableData.doac.data[keyIdx1].dosage.split(' ')[0] 
            });
            this.setInitialState('doac', 'InptValDoac', tableData.doac.data, tableData.doac.data?.length);
            this.setInitialSelectState('doac', 'selectValDoac', tableData.doac.data, tableData.doac.data?.length);
         }
      }

      if(tableData.antiplatelets !== undefined) {
         let keyIdx1 = tableData.antiplatelets.data?.findIndex(x => x.antiplatelets);
         let keyId1 = keyIdx1 !== -1 ? `InptValAntiplatelets${keyIdx1+1}` : '';
         tableHeader.push({ 'antiplatelets': tableData.antiplatelets.header });
         table_data.antiplatelets = tableData.antiplatelets.data;
         if(keyId1 !== '') {
            if(tableData.antiplatelets.data[0].antiplatelets !== '') {
               this.setState({
                  [keyId1]: tableData.antiplatelets.data[keyIdx1].antiplatelets.split(' ')[0] 
               });
               this.setInitialState('antiplatelets', 'InptValAntiplatelets', tableData.antiplatelets.data, tableData.antiplatelets.data?.length);
               this.setInitialSelectState('antiplatelets', 'selectValAntiplatelets', tableData.antiplatelets.data, tableData.antiplatelets.data?.length);
            }
         }
      }

      if(tableData.aspirin !== undefined) {
         let keyIdx1 = tableData.aspirin.data?.findIndex(x => x.aspirin);
         let keyId1 = keyIdx1 !== -1 ? `InptValAspirin${keyIdx1+1}` : '';
         tableHeader.push({ 'aspirin': tableData.aspirin.header });
         table_data.aspirin = tableData.aspirin.data;
         if(keyId1 !== '') {
            if(tableData.aspirin.data[0].aspirin !== '') {
               this.setState({
                  [keyId1]: tableData.aspirin.data[keyIdx1].aspirin.split(' ')[0] 
               });
               this.setInitialState('aspirin', 'InptValAspirin', tableData.aspirin.data, tableData.aspirin.data?.length);
               this.setInitialSelectState('aspirin', 'selectValAspirin', tableData.aspirin.data, tableData.aspirin.data?.length);
            }
         }
      }

      if(table_data.iv_heparin === '') {
         tableHeader.push({ 'iv_heparin': 'Heparin' });
         this.setInitialState('heparin', 'InptValIvHeparin', '', 11);
         this.setInitialSelectState('heparin', 'selectValIvHeparin', 'once daily', 11);
      }

      table_data.headers = tableHeader;
      table_data.date[5].d_0 = this.state.date_of_procedure;
      this.setState({ 
         table: table_data, 
         vka_chkBox: tableData.vka?.data[7].warfain !== '' ? true: false,
         lmwh_chkBox: tableData.lmwh?.data[0].dosage !== '' ? true : false,
         doac_chkBox: tableData.doac?.data[0].dosage !== '' ? true : false,
         antiplatelets_chkBox: tableData.antiplatelets?.data[0].antiplatelets !== '' ? true : false,
         aspirin_chkBox: tableData.aspirin?.data[0].aspirin !== '' ? true : false,
         iv_heparin_chkBox: false
      });

      // console.log(this.state.table);

      if(this.state.date_of_procedure) {
         this.onDateChange(this.state.date_of_procedure);
      }
   }

   page8() {
      if (this.state.table === 'none') return;

      const data = {
         jsonTable: JSON.stringify({ ...this.state.table }),
         patient_id: localStorage.getItem('patient_id'),
      };
      // console.log('>>> JSON data: ', data);
      server(`nurse/medicationJsonData/:${data?.patient_id}`, data);
   }

   onDateChange(e) {
      const value = e.target ? e.target.value : e;
      let newState = { ...this.state };
      // console.log(newState, value);
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
      // const { table } = this.state;
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
                     <div className="row">
                        <div className="col-6">
                           <label htmlFor="usr">Date of Assessment</label>
                        </div>

                        <div className="col-6 text-left">
                           <p type="text" disabled className="form-control">{this.state.assessment_date} </p>
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
                  <br />
                  <br />

                  <div className="jumbotron" style={{ paddingTop: '2.25rem' }}>
                     {
                        this.state.table !== undefined ?
                        <>
                           <table style={{ display: "inline-table" }} className="table-responsive table-bordered">
                              <tr style={{ borderBottom: "1px solid #ccc" }}>
                                 <th>Date</th>
                                 {
                                    this.state.vka_chkBox ?
                                       <th>Lab</th>
                                    : <></>
                                 }
                                 {
                                    this.state.vka_chkBox ? 
                                    <th colSpan={2}>
                                       <select className='form-control' onChange={(e) => this.handleDropdownValChange(`InptValVka`, e.target.value, this.state.InptValVka1)}>
                                          {
                                             this.state.table.headers.find(x => x['vka']).vka.map((heads, key) => {
                                                return <option key={`med-header-${key}-${heads.med_name}`} value={heads.med_name}>{heads.med_name}&#174;</option>
                                             })
                                          }
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.doac_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control' onChange={(e) => this.handleDropdownValChange(`InptValDoac`, e.target.value, this.state.InptValDoac1)}>
                                          {
                                             this.state.table.headers.find(x => x['doac']).doac.map((heads, key) => {
                                                return <option key={`med-header-${key}-${heads.med_name}`} value={heads.med_name}>{heads.med_name}&#174;</option>
                                             })
                                          }
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.antiplatelets_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control' onChange={(e) => this.handleDropdownValChange(`InptValAntiplatelets`, e.target.value, this.state.InptValAntiplatelets1)}>
                                          {
                                             this.state.table.headers.find(x => x['antiplatelets']).antiplatelets.map((heads, key) => {
                                                return <option key={`med-header-${key}-${heads.med_name}`} value={heads.med_name}>{heads.med_name}&#174;</option>
                                             })
                                          }
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.lmwh_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control' onChange={(e) => this.handleDropdownValChange(`InptValLmwh`, e.target.value, this.state.InptValLmwh1)}>
                                          {
                                             this.state.table.headers.find(x => x['lmwh']).lmwh.map((heads, key) => {
                                                return <option key={`med-header-${key}-${heads.med_name}`} value={heads.med_name}>{heads.med_name}&#174;</option>
                                             })
                                          }
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.aspirin_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control' onChange={(e) => this.handleDropdownValChange(`InptValAspirin`, e.target.value, this.state.InptValAspirin1)}>
                                          <option value={this.state.table.headers.find(x => x['aspirin']).aspirin[0].med_name}>{this.state.table.headers.find(x => x['aspirin']).aspirin[0].med_name}&#174;</option>
                                       </select>
                                    </th> : <></>
                                 }
                                 {
                                    this.state.iv_heparin_chkBox ?
                                    <th colSpan={2}>
                                       <select className='form-control' onChange={(e) => this.handleDropdownValChange(`InptValIvHeparin`, e.target.value, this.state.InptValIvHeparin1)}>
                                          <option value={this.state.table.headers.find(x => x['iv_heparin']).iv_heparin}>{this.state.table.headers.find(x => x['iv_heparin']).iv_heparin}&#174;</option>
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
                                    let aspirinKey = key;
                                    let ivHeparinKey = key;
                                    return (
                                       <>
                                          <tr key={`date-key-${key}`} style={{ borderBottom: "1px solid #ccc" }}>
                                             <td><input type='date' disabled={dataKey !== 'd_0' ? true : false} onChange={(e) => this.onDateChange(e)} value={date[dataKey]} className='form-control' /></td>
                                             {
                                                this.state.vka_chkBox ?
                                                <td>
                                                   <input id={`labVal${vkaKey+1}`} type="text" onChange={(e) => this.handleLabValueChange(e, `labVal${vkaKey+1}`)} value={this.state[`labVal${vkaKey+1}`]} className='form-control' />
                                                </td> : <></>
                                             }
                                             {
                                                this.state.vka_chkBox ?
                                                <>
                                                   <td><input id={`InptValVka${vkaKey+1}`} type="text" value={this.state[`InptValVka${vkaKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValVka${vkaKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValVka${vkaKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValVka${vkaKey+1}`)} className='form-control'>
                                                         <option value={this.state[`selectValVka${vkaKey+1}`]}>{this.state[`selectValVka${vkaKey+1}`]}</option>
                                                         <option value={'do not take'}>do not take</option>
                                                         <option value={'evening'}>evening</option>
                                                         <option value={'morning'}>morning</option>
                                                         <option value={'morning and evening'}>morning and evening</option>
                                                      </select>
                                                   </td>
                                                </> 
                                                : <></>
                                             }
                                             {this.state.doac_chkBox ?
                                                <>
                                                   <td><input id={`InptValDoac${doacKey+1}`} type="number" value={this.state[`InptValDoac${doacKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValDoac${doacKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValDoac${doacKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValDoac${doacKey+1}`)} className='form-control'>
                                                         <option value={this.state[`selectValDoac${doacKey+1}`]}>{this.state[`selectValDoac${doacKey+1}`]}</option>
                                                         <option value={'do not take'}>do not take</option>
                                                         <option value={'evening'}>evening</option>
                                                         <option value={'morning'}>morning</option>
                                                         <option value={'morning and evening'}>morning and evening</option>
                                                         
                                                      </select>
                                                   </td>
                                                </> : <></>
                                             }
                                             {this.state.antiplatelets_chkBox ?
                                                <>
                                                   <td><input id={`InptValAntiplatelets${antiplateletKey+1}`} type="number" value={this.state[`InptValAntiplatelets${antiplateletKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValAntiplatelets${antiplateletKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValAntiplatelets${antiplateletKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValAntiplatelets${antiplateletKey+1}`)} className='form-control'>
                                                         <option value={this.state[`selectValAntiplatelets${antiplateletKey+1}`]}>{this.state[`selectValAntiplatelets${antiplateletKey+1}`]}</option>
                                                         <option value={'do not take'}>do not take</option>
                                                         <option value={'evening'}>evening</option>
                                                         <option value={'morning'}>morning</option>
                                                         <option value={'morning and evening'}>morning and evening</option>
                                                         
                                                      </select>
                                                   </td>
                                                </> : <></>
                                             }
                                             {this.state.lmwh_chkBox ?
                                                <>
                                                   <td><input id={`InptValLmwh${lmwhKey+1}`} type="number" value={this.state[`InptValLmwh${lmwhKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValLmwh${lmwhKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValLmh${lmwhKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValLmh${lmwhKey+1}`)} className='form-control'>
                                                         <option value={this.state[`selectValLmh${lmwhKey+1}`]}>{this.state[`selectValLmh${lmwhKey+1}`]}</option>
                                                         <option value={'do not take'}>do not take</option>
                                                         <option value={'evening'}>evening</option>
                                                         <option value={'morning'}>morning</option>
                                                         <option value={'morning and evening'}>morning and evening</option>
                                                         
                                                      </select>
                                                   </td>
                                                </> : <></>
                                             }
                                             {this.state.aspirin_chkBox ?
                                                <>
                                                   <td><input id={`InptValAspirin${aspirinKey+1}`} type="number" value={this.state[`InptValAspirin${aspirinKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValAspirin${aspirinKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValAspirin${aspirinKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValAspirin${aspirinKey+1}`)} className='form-control'>
                                                         <option value={this.state[`selectValAspirin${aspirinKey+1}`]}>{this.state[`selectValAspirin${aspirinKey+1}`]}</option>
                                                         <option value={'do not take'}>do not take</option>
                                                         <option value={'evening'}>evening</option>
                                                         <option value={'morning'}>morning</option>
                                                         <option value={'morning and evening'}>morning and evening</option>
                                                         
                                                      </select>
                                                   </td>
                                                </> : <></>
                                             }
                                             {this.state.iv_heparin_chkBox ?
                                                <>
                                                   <td><input id={`InptValIvHeparin${ivHeparinKey+1}`} type="number" value={this.state[`InptValIvHeparin${ivHeparinKey+1}`]} onChange={(e) => this.handleInptValueChange(e, `InptValIvHeparin${ivHeparinKey+1}`)} className='form-control' /></td>
                                                   <td>
                                                      <select id={`selectValIvHeparin${ivHeparinKey+1}`} onChange={(e) => this.handleSelectValueChange(e, `selectValIvHeparin${ivHeparinKey+1}`)} className='form-control'>
                                                         <option value={this.state[`selectValIvHeparin${ivHeparinKey+1}`]}>{this.state[`selectValIvHeparin${ivHeparinKey+1}`]}</option>
                                                         <option value={'do not take'}>do not take</option>
                                                         <option value={'evening'}>evening</option>
                                                         <option value={'morning'}>morning</option>
                                                         <option value={'morning and evening'}>morning and evening</option>
                                                         
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
                           <div className='form-group'>
                              <label htmlFor='aspirin-label'>ASPIRIN</label>
                              <input type='checkbox' checked={this.state.aspirin_chkBox ? true : false} style={{ marginLeft: '5px' }} onChange={(e) => this.setState({ aspirin_chkBox: e.target.checked })} value={this.state.aspirin_chkBox} />
                           </div>
                           <div className='form-group'>
                              <label htmlFor='iv_heparin-label'>IV Heparin</label>
                              <input type='checkbox' checked={this.state.iv_heparin_chkBox ? true : false} style={{ marginLeft: '5px' }} onChange={(e) => this.setState({ iv_heparin_chkBox: e.target.checked })} value={this.state.iv_heparin_chkBox} />
                           </div>
                        </div>
                        <div className='col-6'>
                           <div className='form-group'>
                              <label htmlFor='approvedBy'>Approved By</label>
                              <input type='text' className='form-control' value={this.state.approved_by} onChange={(e) => this.handleApprovedBy(e)} />
                              {this.validator.message('This field is required', this.state.approved_by, 'required')}
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-4">
                           <button onClick={() => this.handleSaveNApprove(this.state)} className="btn btn-outline-danger  btn-block">
                              Save & Approve
                           </button>
                        </div>

                        <div className="col-4"></div>

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
