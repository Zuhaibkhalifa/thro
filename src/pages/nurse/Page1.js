import React from 'react';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner';

import $ from 'jquery';
import axios from 'axios';
import Header from './NurseHeader';

import { server } from '../../utils/functions';
import { domain } from '../../App';
import procedures from './../../helper/procedures';

//

let data;
class Page1 extends React.Component {
   constructor(props) {
      super(props);

      this.validator = new SimpleReactValidator({
         validators: {
            not_select_default: {
               // name the rule
               message: 'Must be selected.',
               rule: (val, params, validator) => {
                  return val === params[0] ? false : true;
               },
            },
            not_select_procedure: {
               // name the rule
               message: 'Procedure must be selected.',
               rule: (val, params, validator) => {
                  if (val.search('low') !== -1 || val.search('mod') !== -1 || val.search('high') !== -1) {
                     return true;
                  }

                  return false;
               },
            },
         },
         element: (message, className) => <div className="text-danger">{message}</div>,
      });

      // console.log("Constructor - Validator: ", this.validator);

      this.state = {
         anticogMedsDropdown: [
            { "med_name": "Pradaxa (Dabigatran)", "dosage": ["75 mg twice daily", "110 mg twice daily", "150 mg twice daily"] },
            { "med_name": "Xarelto (Rivaroxaban)", "dosage": ["15 mg twice daily", "15 mg once daily", "10 mg once daily", "20 mg once daily"] },
            { "med_name": "Eliquis (Apixaban)", "dosage": ["5 mg twice daily", "2.5 mg twice daily"] },
            { "med_name": "Edoxabon (Lixiana)", "dosage": ["60 mg once daily", "30 mg once daily", "15 mg once daily"] }
         ],
         antiplatMedsDropdown: [
            { "med_name": "Aspirin (ASA)", "dosage": ["81 mg"], "dosage_time": ["Once Daily", "Twice daily"] },
            { "med_name": "Plavix (Clopidogrel)", "dosage": ["75 mg"], "dosage_time": ["Once Daily", "Twice daily"] },
            { "med_name": "Brillinta (Ticagrelor)", "dosage": ["60 mg", "90 mg"], "dosage_time": ["Once Daily", "Twice daily"] },
            { "med_name": "Effient (Prasugrel)", "dosage": ["5 mg", "10 mg"], "dosage_time": ["Once Daily", "Twice daily"] }
         ],
         month_year: '',
         procedure: '',
         date_of_procedure: '',
         age: '',
         sex: '',
         weight: '',
         indication_for_anticoagulation: '',
         chads_score_and_distribution: '',

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
         aspirin: '',
         aspirin_dosage: '',
         aspirin_dosage_time: '',
         plavix: '',
         plavix_dosage: '',
         plavix_dosage_time: '',
         brillinta: '',
         brillinta_dosage: '',
         brillinta_dosage_timie: '',
         effient: '',
         effient_dosage: '',
         effient_dosage_time: '',
         not_using_drugs: '',
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
         anticogMedDropDownValChanged: "",
         anticogDosageDropDownValChanged: "",
         antiplatMedDropDownValChanged: "",
         antiplatDosageDropDownValChanged: "",
         antiplatDosageTimeDropDownValChanged: ""
      };

      // Bind " this " ref of class to Methods
      this.submitForm = this.submitForm.bind(this);
      this.handle_procedure = this.handle_procedure.bind(this);
      this.handle_anticog_med_dropdown_value = this.handle_anticog_med_dropdown_value.bind(this);
      this.handle_anticog_dosage_dropdown_value = this.handle_anticog_dosage_dropdown_value.bind(this);
      this.handle_antiplat_med_dropdown_value = this.handle_antiplat_med_dropdown_value.bind(this);
      this.handle_antiplat_dosage_dropdown_value = this.handle_antiplat_dosage_dropdown_value.bind(this);
      this.handle_antiplat_dosage_time_dropdown_value = this.handle_antiplat_dosage_time_dropdown_value.bind(this);
      this.changeAnticogMedDropdownValue = this.changeAnticogMedDropdownValue.bind(this);
      this.changeAnticogDosageDropdownValue = this.changeAnticogDosageDropdownValue.bind(this);
      this.changeAntiplatMedDropdownValue = this.changeAntiplatMedDropdownValue.bind(this);
      this.changeAntiplatDosageDropdownValue = this.changeAntiplatDosageDropdownValue.bind(this);
      this.changeAntiplatDosageTimeDropdownValue = this.changeAntiplatDosageTimeDropdownValue.bind(this);
   }

   componentDidMount() {
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };

      try {
         let patient_id = '';
         if (localStorage.getItem('patient_id') === ('' || null)) {
            localStorage.setItem('patient_id', this.props.location.state.patient_id);
            patient_id = localStorage.getItem('patient_id');
            this.setState({ patient_id: patient_id });
         } else {
            if (this.props.location.state !== undefined) {
               patient_id =
                  localStorage.getItem('patient_id') !== this.props.location.state.patient_id
                     ? localStorage.setItem('patient_id', this.props.location.state.patient_id)
                     : localStorage.getItem('patient_id');
               patient_id = localStorage.getItem('patient_id');
               this.setState({ patient_id: patient_id });
            } else {
               patient_id = localStorage.getItem('patient_id');
               this.setState({ patient_id: patient_id });
            }
         }
         axios
            .get(domain + `/api/nurse/page5LoadData/:${patient_id}`, {
               // originally was page5LoadData
               headers: headers,
            })
            .then(
               (response) => {
                  this.setState({ loader: '' });
                  console.log('Nurse page 1 - constructor - Response from Server: ', response);
                  console.log(
                     'Nurse page 1 - constructor - Response from Server - data.success[0]: ',
                     response.data.success[0]
                  );
                  data = response.data.success[0];
                  this.setState({ loader: '' });
                  if (data !== undefined) {
                     $('#patient_id').val(data.patient_id);
                     $('#weight_selected1').val(data.weight_unit);
                     $('#procedure').val(data.type_of_procedure);
                     $('#date_of_procedure').val(data.date_of_procedure);
                     $('#age').val(data.age);

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

                        details_on_recomemendation: data.details_on_recomemendation,

                        weightSelected: data.weight_unit,
                        aspirin: data.aspirin,
                        aspirin_dosage: data.aspirin_dosage,
                        aspirin_dosage_time: data.aspirin_dosage_time,
                        plavix: data.plavix,
                        plavix_dosage: data.plavix_dosage,
                        plavix_dosage_time: data.plavix_dosage_time,
                        brillinta: data.brillinta,
                        brillinta_dosage: data.brillinta_dosage,
                        brillinta_dosage_timie: data.brillinta_dosage_timie,
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
                        ulcer_in_stomach_or_bowel: data.ulcer_in_stomach_or_bowel,
                        cognitive_heart_failure: data.cognitive_heart_failure,
                        high_blood_pressure: data.high_blood_pressure,
                        diabetes: data.diabetes,
                        stroke_or_mini_stroke: data.stroke_or_mini_stroke,
                     });
                     this.changeAnticogMedDropdownValue();
                     this.changeAnticogDosageDropdownValue();
                     this.changeAntiplatMedDropdownValue();
                     this.changeAntiplatDosageDropdownValue();
                     this.changeAntiplatDosageTimeDropdownValue();

                     this.set_anticoagulation(response.data.success.anticoagulation);

                     this.set_CHADS_score();
                  } else {
                     this.setState({ loader: '' });
                  }
               },
               (error) => {
                  this.setState({ loader: '' });
                  console.log(error);
               }
            );
      } catch (error) {
         this.setState({ loader: '' });
         this.setState({ loader: '' });
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

   set_DynamicFlags() {
      const {
         liver_disease: liver,
         had_transfusion_in_last_three_months: transfusion,
         had_transfusion_in_last_three_months_when: transfusion_date,
         ulcer_in_stomach_or_bowel_last_three_months: ulcer,
      } = this.state;
      let flags = [];

      if (liver === 'Yes') flags.push('Liver Diseases');
      if (transfusion === 'Yes') flags.push(`Transfusion did on ${transfusion_date}`);
      if (ulcer === 'Yes') flags.push(`Ulcer within last 3 months`);

      let displayFlags = flags.map((flag) => {
         return (
            <div className="col-4">
               <div className="alert myDanger" role="alert">
                  <span className="white">{flag}</span>
               </div>
            </div>
         );
      });

      return displayFlags;
   }

   //

   handleChange_gender(value) {
      this.setState({ genderSelected: value });
   }

   handle_anticog_med_dropdown_value(value) {
      this.setState({ anticogMedDropDownValChanged: value });
   }

   handle_anticog_dosage_dropdown_value(value) {
      this.setState({ anticogDosageDropDownValChanged: value });
   }
   
   handle_antiplat_med_dropdown_value(value) {
      this.setState({ antiplatMedDropDownValChanged: value });
   }

   handle_antiplat_dosage_dropdown_value(value) {
      this.setState({ antiplatDosageDropDownValChanged: value });
   }

   handle_antiplat_dosage_time_dropdown_value(value) {
      this.setState({ antiplatDosageTimeDropDownValChanged: value });
   }

   changeAnticogMedDropdownValue() {
      if(this.state.pradaxa !== null) {
         this.setState({ anticogMedDropDownValChanged: this.state.pradaxa });
      } else if(this.state.xarelto !== null) {
         this.setState({ anticogMedDropDownValChanged: this.state.xarelto });
      } else if(this.state.eliquis !== null) {
         this.setState({ anticogMedDropDownValChanged: this.state.eliquis });
      } else if(this.state.edoxabon !== null) {
         this.setState({ anticogMedDropDownValChanged: this.state.edoxabon });
      }
   }

   changeAnticogDosageDropdownValue() {
      if(this.state.pradaxa_dosage !== null) {
         this.setState({ anticogDosageDropDownValChanged: this.state.pradaxa_dosage });
      } else if(this.state.xarelto_dosage !== null) {
         this.setState({ anticogDosageDropDownValChanged: this.state.xarelto_dosage });
      } else if(this.state.eliquis_dosage !== null) {
         this.setState({ anticogDosageDropDownValChanged: this.state.eliquis_dosage });
      } else if(this.state.edoxabon_dosage !== null) {
         this.setState({ anticogDosageDropDownValChanged: this.state.edoxabon_dosage });
      }
   }

   changeAntiplatMedDropdownValue() {
      if(this.state.aspirin !== null) {
         this.setState({ antiplatMedDropDownValChanged: this.state.aspirin });
      } else if(this.state.plavix !== null) {
         this.setState({ antiplatMedDropDownValChanged: this.state.plavix });
      } else if(this.state.brillinta !== null) {
         this.setState({ antiplatMedDropDownValChanged: this.state.brillinta });
      } else if(this.state.effient !== null) {
         this.setState({ antiplatMedDropDownValChanged: this.state.effient });
      }
      console.log(this.state.antiplatMedDropDownValChanged);
   }

   changeAntiplatDosageDropdownValue() {
      if(this.state.aspirin_dosage !== null) {
         this.setState({ antiplatDosageDropDownValChanged: this.state.aspirin_dosage });
      } else if(this.state.plavix_dosage !== null) {
         this.setState({ antiplatDosageDropDownValChanged: this.state.plavix_dosage });
      } else if(this.state.brillinta_dosage !== null) {
         this.setState({ antiplatDosageDropDownValChanged: this.state.brillinta_dosage });
      } else if(this.state.effient_dosage !== null) {
         this.setState({ antiplatDosageDropDownValChanged: this.state.effient_dosage });
      }
   }

   changeAntiplatDosageTimeDropdownValue() {
      if(this.state.aspirin_dosage_time !== null) {
         this.setState({ antiplatDosageTimeDropDownValChanged: this.state.aspirin_dosage_time });
      } else if(this.state.plavix_dosage_time !== null) {
         this.setState({ antiplatDosageTimeDropDownValChanged: this.state.plavix_dosage_time });
      } else if(this.state.brillinta_dosage_timie !== null) {
         this.setState({ antiplatDosageTimeDropDownValChanged: this.state.brillinta_dosage_timie });
      } else if(this.state.effient_dosage_time !== null) {
         this.setState({ antiplatDosageTimeDropDownValChanged: this.state.effient_dosage_time });
      }
   }

   submitForm() {
      if (this.validator.allValid()) {
         console.log('Nure page1 - submitForm - state: ', this.state);
         this.page5(this.state);
         this.props.history.push('/Nurse/Nurse3');
      } else {
         window.scroll({
            top: 500,
            behavior: 'smooth',
         });
         this.validator.showMessages();
         // rerender to show messages for the first time
         // you can use the autoForceUpdate option to do this automatically`
         this.forceUpdate();
      }
   }

   page5(params) {
      let param = {
         procedure: this.state.procedure,
         date_of_procedure: this.state.date_of_procedure,
         age: this.state.age,
         gender: this.state.genderSelected,
         weight: this.state.weight,
         indication_for_anticoagulation: this.state.indication_for_anticoagulation,
         chads_score_and_distribution: this.state.chads_score_and_distribution,

         poc_creat_text: this.state.poc_creat_text,
         poc_creat_date: this.state.poc_creat_date,
         hb_text: this.state.hb_text,
         hb_date: this.state.hb_date,
         plt_text: this.state.plt_text,
         plt_date: this.state.plt_date,
         poc_inr_text: this.state.poc_inr_text,
         poc_inr_date: this.state.poc_inr_date,

         details_on_recomemendation: this.state.details_on_recomemendation,
         understanding: this.state.understanding,
         who_is_completing_this_form: this.state.completed_by,
         reviewed_by: this.state.reviewed_by,
         patient_id: localStorage.getItem('patient_id'),
         referred_by: this.state.referred_by,
      };
      let patient_id = localStorage.getItem('patient_id');
      server(`nurse/page5/:${patient_id}`, param);
   }

   handleChange_weight(value) {
      this.setState({ weightSelected: value });
      // this.setState({ weight: value });
   }
   handle_procedure(value) {
      this.setState({ procedure: value });
      // this.setState({ weight: value });
   }

   //
   //
   //

   render() {
      return (
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
                        <input
                           type="text"
                           disabled
                           id="patient_id"
                           className="form-control"
                           defaultValue={this.state.patient_id}
                           onChange={(e) => this.setState({ patient_id: e.target.value })}
                        />
                     </div>
                  </div>
                  <br />
                  <div className="row">
                     <div className="col-6">
                        <label htmlFor="usr">Patients procedure summary</label>
                     </div>

                     <div className="col-6 text-left">
                        <textarea type="text" disabled className="form-control" defaultValue={this.state.procedure} />
                     </div>
                  </div>
                  <br />
                  <div className="row">
                     <div className="col-6">
                        {procedures(
                           this.state.procedure,
                           this.handle_procedure,
                           this.validator.message('procedure', this.state.procedure, 'required|not_select_procedure')
                        )}
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <label htmlFor="usr">Date of Procedure</label>
                           <input
                              type="date"
                              id="date_of_procedure"
                              className="form-control"
                              defaultValue={this.state.date_of_procedure}
                              onChange={(e) => this.setState({ date_of_procedure: e.target.value })}
                           />
                           {this.validator.message('procedure_date', this.state.date_of_procedure, 'required')}
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-4">
                        <div className="form-group">
                           <label htmlFor="usr">Age </label>
                           <input
                              type="number"
                              id="age"
                              min="1"
                              className="form-control"
                              defaultValue={this.state.age}
                              onChange={(e) => this.setState({ age: e.target.value })}
                           />
                           {this.validator.message('age', this.state.age, 'required')}
                        </div>
                     </div>

                     <div className="col-4">
                        <div className="form-group">
                           <label htmlFor="usr">Sex </label>
                           <select
                              className="form-control"
                              id="sex"
                              value={this.state.genderSelected}
                              onChange={(event) => this.handleChange_gender(event.target.value)}
                           >
                              <option>Select Gender</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                           </select>
                           {this.validator.message('gender', this.state.genderSelected, 'required')}
                        </div>
                     </div>
                     <div className="col-2">
                        <div className="form-group">
                           <label htmlFor="usr">Weight</label>
                           <input
                              type="number"
                              id="weight"
                              min="1"
                              className="form-control"
                              defaultValue={this.state.weight}
                              onChange={(e) => this.setState({ weight: e.target.value })}
                           />

                           {this.validator.message('weight', this.state.weight, 'required')}
                        </div>
                     </div>

                     <div className="col-2">
                        <div className="form-group">
                           <label htmlFor="usr">Unit</label>
                           <select
                              className="form-control"
                              id="weight_selected1"
                              value={this.state.weightSelected}
                              onChange={(event) => this.handleChange_weight(event.target.value)}
                           >
                              <option>Select Unit</option>
                              <option>lbs</option>
                              <option>Kg</option>
                           </select>
                           {this.validator.message('unit_weight', this.state.weightSelected, 'required')}
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-12">
                        <div className="form-group">
                           <label htmlFor="usr">Indication(s) for Anticoagulation </label>
                           <input
                              type="text"
                              className="form-control"
                              defaultValue={this.state.indication_for_anticoagulation}
                              onChange={(e) =>
                                 this.setState({
                                    indication_for_anticoagulation: e.target.value,
                                 })
                              }
                              id="indication_for_anticoagulation"
                           />
                           {this.validator.message(
                              'anticoagulation',
                              this.state.indication_for_anticoagulation,
                              'required'
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-12">
                        <div className="form-group">
                           <label htmlFor="usr">CHADS Score And Distribution </label>
                           <input
                              type="text"
                              className="form-control"
                              defaultValue={this.state.chads_score_and_distribution}
                              onChange={(e) =>
                                 this.setState({
                                    chads_score_and_distribution: e.target.value,
                                 })
                              }
                              id="chads_score_and_distribution"
                           />
                           {this.validator.message('chads_score', this.state.chads_score_and_distribution, 'required')}
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
                                 {' '}
                                 What Lab They Use{' '}
                                 {this.state.lab_location_for_inr_test !== null ? (
                                    <span className="text-right" style={{ color: 'green' }}>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                       {this.state.lab_location_for_inr_test}{' '}
                                    </span>
                                 ) : (
                                    ''
                                 )}
                                 <br />
                              </h5>
                              <h5 style={{ color: 'white' }} className="text-center">
                                 Current Dosing
                              </h5>
                           </div>
                           <div className="table-responsive">
                              <div className="row" style={{ width: "100%" }}>
                                 <div className="col s3">
                                    <select className="form-control" onChange={(e) => this.handle_anticog_med_dropdown_value(e.target.value)}>
                                       <option value={this.state.anticogMedDropDownValChanged}>{this.state.anticogMedDropDownValChanged}</option> 
                                       {
                                          this.state.anticogMedsDropdown.map((meds, index) => {
                                             return meds.med_name !== this.state.anticogMedDropDownValChanged ? <option key={index} value={meds.med_name}>{meds.med_name}</option> : ""
                                          }) 
                                       }
                                    </select>
                                 </div>
                                 <div className="col s3">
                                    <select className="form-control" onChange={(e) => this.handle_anticog_dosage_dropdown_value(e.target.value)}>
                                       <option value={this.state.anticogDosageDropDownValChanged}>{this.state.anticogDosageDropDownValChanged}</option>
                                       {
                                          this.state.anticogMedsDropdown.map((meds, mindex) => {
                                             return meds.med_name === this.state.anticogMedDropDownValChanged ?
                                                this.state.anticogMedsDropdown[mindex].dosage.map((dosage, index) => {
                                                   return dosage !== this.state.anticogDosageDropDownValChanged ? <option key={index} value={dosage}>{dosage}</option> : ""
                                                })
                                             : ""
                                          })
                                       }
                                    </select>
                                 </div>
                              </div>
                           </div>
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
                           </div>
                           <div className="table-responsive">
                              <div className="row" style={{ width: "100%" }}>
                                 <div className="col s3">
                                    <select className="form-control" onChange={(e) => this.handle_antiplat_med_dropdown_value(e.target.value)}>
                                       <option value={this.state.antiplatMedDropDownValChanged}>{this.state.antiplatMedDropDownValChanged}</option> 
                                       {
                                          this.state.antiplatMedsDropdown.map((meds, index) => {
                                             return meds.med_name !== this.state.antiplatMedDropDownValChanged ? <option key={index} value={meds.med_name}>{meds.med_name}</option> : ""
                                          }) 
                                       }
                                    </select>
                                 </div>
                                 <div className="col s3">
                                    <select className="form-control" onChange={(e) => this.handle_antiplat_dosage_dropdown_value(e.target.value)}>
                                       <option value={this.state.antiplatDosageDropDownValChanged}>{this.state.antiplatDosageDropDownValChanged}</option>
                                       {
                                          this.state.antiplatMedsDropdown.map((meds, mindex) => {
                                             return meds.med_name === this.state.antiplatMedDropDownValChanged ?
                                                this.state.antiplatMedsDropdown[mindex].dosage.map((dosage, index) => {
                                                   return dosage !== this.state.antiplatDosageDropDownValChanged ? <option key={index} value={dosage}>{dosage}</option> : ""
                                                })
                                             : ""
                                          })
                                       }
                                    </select>
                                 </div>
                                 <div className="col s3">
                                    <select className="form-control" onChange={(e) => this.handle_antiplat_dosage_time_dropdown_value(e.target.value)}>
                                       <option value={this.state.antiplatDosageTimeDropDownValChanged}>{this.state.antiplatDosageTimeDropDownValChanged}</option>
                                       {
                                          this.state.antiplatMedsDropdown.map((meds, mindex) => {
                                             return meds.med_name === this.state.antiplatMedDropDownValChanged ?
                                                this.state.antiplatMedsDropdown[mindex].dosage_time.map((dosageTime, index) => {
                                                   return dosageTime !== this.state.antiplatDosageTimeDropDownValChanged ? <option key={index} value={dosageTime}>{dosageTime}</option> : ""
                                                })
                                             : ""
                                          })
                                       }
                                    </select>
                                 </div>
                              </div>
                           </div>
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
                                 <input
                                    type="date"
                                    className="form-control"
                                    id="usr"
                                    defaultValue={this.state.poc_inr_date}
                                    onChange={(e) => this.setState({ poc_inr_date: e.target.value })}
                                 />
                                 {this.validator.message('poc_inr_date', this.state.poc_inr_date, 'required')}
                              </div>
                              <div className="col-6">
                                 {' '}
                                 <input
                                    type="number"
                                    className="form-control"
                                    id="usr"
                                    value={this.state.poc_inr_text}
                                    onChange={(e) => this.setState({ poc_inr_text: e.target.value })}
                                 />
                                 {this.validator.message('poc_inr_text', this.state.poc_inr_text, 'required')}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="col-6">
                        <div className="form-group">
                           <label htmlFor="usr">POC - Creatinine</label>

                           <div className="row">
                              <div className="col-6">
                                 <input
                                    type="date"
                                    className="form-control"
                                    defaultValue={this.state.poc_creat_date}
                                    onChange={(e) =>
                                       this.setState({
                                          poc_creat_date: e.target.value,
                                       })
                                    }
                                    id="poc_creat"
                                 />
                                 {this.validator.message('poc_creat_date', this.state.poc_creat_date, 'required')}
                              </div>
                              <div className="col-6">
                                 <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.poc_creat_text}
                                    onChange={(e) =>
                                       this.setState({
                                          poc_creat_text: e.target.value,
                                       })
                                    }
                                    id="poc_creat"
                                 />
                                 {this.validator.message('poc_creat_text', this.state.poc_creat_text, 'required')}
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
                                 <input
                                    type="date"
                                    id="hb"
                                    className="form-control"
                                    value={this.state.hb_date}
                                    onChange={(e) => this.setState({ hb_date: e.target.value })}
                                 />
                                 {this.validator.message('hb_date', this.state.hb_date, 'required')}
                              </div>
                              <div className="col-6">
                                 <input
                                    type="number"
                                    id="hb"
                                    className="form-control"
                                    defaultValue={this.state.hb_text}
                                    onChange={(e) => this.setState({ hb_text: e.target.value })}
                                 />
                                 {this.validator.message('hb_text', this.state.hb_text, 'required')}
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
                                 <input
                                    type="date"
                                    className="form-control"
                                    defaultValue={this.state.plt_date}
                                    onChange={(e) => this.setState({ plt_date: e.target.value })}
                                    id="plt"
                                 />
                                 {this.validator.message('plt_date', this.state.plt_date, 'required')}
                              </div>
                              <div className="col-6">
                                 {' '}
                                 <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.plt_text}
                                    onChange={(e) => this.setState({ plt_text: e.target.value })}
                                    id="plt"
                                 />
                                 {this.validator.message('plt_text', this.state.plt_text, 'required')}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <label htmlFor="usr">Referred By</label>
                           <input
                              type="text"
                              id="referred_by"
                              className="form-control"
                              value={this.state.referred_by}
                              onChange={(e) => this.setState({ referred_by: e.target.value })}
                           />
                           {this.validator.message('referred_by', this.state.referred_by, 'required')}
                        </div>
                     </div>
                  </div>

                  <br />
                  <br />
                  <h4>Flags</h4>
                  <div className="row">{this.set_DynamicFlags()}</div>

                  <br />
                  <br />

                  <div className="row">
                     <div className="col-4">
                        <Link to="/Nurse/patient_search" className="btn btn-outline-primary  btn-block">
                           Back
                        </Link>
                     </div>

                     <div className="col-4"></div>

                     <div className="col-4">
                        <button onClick={this.submitForm} className="btn btn-primary btn-block">
                           Accept
                        </button>
                     </div>
                  </div>
               </div>

               <br />
            </div>
         </React.Fragment>
      );
   }
}
export default Page1;
