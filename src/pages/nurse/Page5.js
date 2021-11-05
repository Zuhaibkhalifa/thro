import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';
import Header from './NurseHeader';

import $ from 'jquery';
import axios from 'axios';

import { server } from '../../utils/functions';
import { domain } from '../../App';
import procedures from '../../helper/procedures';

//

let data;
class Page3 extends React.Component {
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

      this.state = {
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

         procedureSelected: '',
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
      };

      this.submitForm = this.submitForm.bind(this);
      this.set_CHADS_score = this.set_CHADS_score.bind(this);
      this.handle_procedure = this.handle_procedure.bind(this);

      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };

      try {
         let patient_id = localStorage.getItem('patient_id');
         axios
            .get(domain + `/api/nurse/page5LoadData/:${patient_id}`, {
               headers: headers,
            })
            .then((response) => {
               console.log('Nurse page 3 - reponse: ', response);
               console.log('Nurse page 3 - reponse.data.success: ', response.data.success[0]);
               data = response.data.success[0];

               this.setState({ loader: '' });

               if (data !== undefined) {
                  $('#patient_id').val(data.patient_id);
                  $('#weight_selected1').val(data.weight_unit);
                  $('#procedure').val(data.type_of_procedure);
                  $('#date_of_procedure').val(data.date_of_procedure);

                  this.setState({
                     procedure: data.type_of_procedure,
                     date_of_procedure: data.date_of_procedure,
                     age: data.age,
                     sex: data.gender,
                     weight: data.weight,
                     understanding: data.understanding,
                     completed_by: data.who_is_completing_this_form,
                     reviewed_by: data.physicianName,
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

                     details_on_recomemendation: data.dictation,
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
                  });

                  // this.set_CHADS_score();
                  console.log('Nurse page 3 - state after reponse: ', this.state);
               }
            });
      } catch (error) {
         this.setState({ loader: '' });
         console.error('Nurse page3 - error response: ', error);
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
   //

   handleChange_procedure(value) {
      this.setState({ genderSelected: value });
   }

   submitForm() {
      if (this.validator.allValid()) {
         //  alert('You submitted the form and stuff!');
         console.log('>>>  Nurse Page5: submitted:', this.state);
         this.page5(this.state);
         this.props.history.push('/Nurse/Nurse6');
      } else {
         window.scroll({
            top: 400,
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
         gender: this.state.procedureSelected,
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
      };
      console.log('nurse page 5 - page5 - param: ', params);
      server(`nurse/page5/:${param.patient_id}`, param);
   }

   handleChange_weight(value) {
      this.setState({ weightSelected: value });
      // this.setState({ weight: value });
   }
   handle_procedure(value) {
      this.setState({ procedure: value });
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
               <h3 className="text-center myHeading">Final Report</h3>
               <br />
               {/* container */}
               <div className="jumbotron">
                  <h4> Patient Information</h4>
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
                              onChange={(event) => this.handleChange_procedure(event.target.value)}
                           >
                              <option value="Select_Gender">Select_Gender</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                           </select>
                           {this.validator.message(
                              'gender',
                              this.state.genderSelected,
                              'required|not_select_default:Select_Gender'
                           )}
                        </div>
                     </div>
                     <div className="col-2">
                        <div className="form-group">
                           <label htmlFor="usr">Weight</label>
                           <input
                              type="number"
                              id="weight"
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
                           <h4>Indication(s) for Anticoagulation </h4>
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
                                 What Lab They Use
                                 {this.state.lab_location_for_inr_test !== null ? (
                                    <span className="text-right" style={{ color: 'green' }}>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                       {this.state.lab_location_for_inr_test}
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
                              <table className="table table-striped text-center">
                                 <thead></thead>
                                 <tbody>
                                    {this.state.pradaxa !== null ? (
                                       <tr style={{ color: 'white' }}>
                                          <td>{this.state.pradaxa} </td>
                                          <td>{this.state.pradaxa_dosage}</td>
                                       </tr>
                                    ) : (
                                       ''
                                    )}

                                    {this.state.xarelto !== null ? (
                                       <tr style={{ color: 'white' }}>
                                          <td>{this.state.xarelto} </td>
                                          <td>{this.state.xarelto_dosage}</td>
                                          <td>{this.state.xarelto_dosage_time}</td>
                                       </tr>
                                    ) : (
                                       ''
                                    )}

                                    {this.state.eliquis !== null ? (
                                       <tr style={{ color: 'white' }}>
                                          <td>{this.state.eliquis} </td>
                                          <td>{this.state.eliquis_dosage}</td>
                                          <td>{this.state.eliquis_dosage_time}</td>
                                       </tr>
                                    ) : (
                                       ''
                                    )}

                                    {this.state.edoxabon !== null ? (
                                       <tr style={{ color: 'white' }}>
                                          <td>{this.state.edoxabon} </td>
                                          <td>{this.state.edoxabon_dosage}</td>
                                          <td>{this.state.edoxabon_dosage_time}</td>
                                       </tr>
                                    ) : (
                                       ''
                                    )}
                                 </tbody>
                              </table>
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

                              <div className="table-responsive">
                                 <table className="table table-striped text-center">
                                    <thead></thead>
                                    <tbody>
                                       {this.state.aspirin !== null ? (
                                          <tr style={{ color: 'white' }}>
                                             <td>{this.state.aspirin} </td>
                                             <td>{this.state.aspirin_dosage}</td>
                                             <td>{this.state.aspirin_dosage_time}</td>
                                          </tr>
                                       ) : (
                                          ''
                                       )}
                                       {this.state.brillinta !== null ? (
                                          <tr style={{ color: 'white' }}>
                                             <td>{this.state.brillinta} </td>
                                             <td>{this.state.brillinta_dosage}</td>
                                             <td>{this.state.brillinta_dosage_timie}</td>
                                          </tr>
                                       ) : (
                                          ''
                                       )}

                                       {this.state.effient !== null ? (
                                          <tr style={{ color: 'white' }}>
                                             <td>{this.state.effient} </td>
                                             <td>{this.state.effient_dosage}</td>
                                             <td>{this.state.effient_dosage_time}</td>
                                          </tr>
                                       ) : (
                                          ''
                                       )}

                                       {this.state.plavix !== null ? (
                                          <tr style={{ color: 'white' }}>
                                             <td>{this.state.plavix} </td>
                                             <td>{this.state.plavix_dosage}</td>
                                             <td>{this.state.plavix_dosage_time}</td>
                                          </tr>
                                       ) : (
                                          ''
                                       )}

                                       {this.state.not_using_drugs === '' ? (
                                          <tr style={{ color: 'white' }}>
                                             <td> N/A </td>
                                             <td>N/A</td>
                                             <td>N/A</td>
                                          </tr>
                                       ) : (
                                          ''
                                       )}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

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
                                 <input
                                    type="text"
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
                           <label htmlFor="usr">POC - Creatinine </label>

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
                                    type="text"
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
                                    type="text"
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
                                 <input
                                    type="text"
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
                  </div>

                  <h4>Flags</h4>
                  <div className="row">{this.set_DynamicFlags()}</div>

                  <br />
                  <h6>Aditional Information</h6>
                  <div className="row">
                     <div className="col-12">
                        <div className="form-group">
                           <label htmlFor="usr">Details on recomemendation</label>
                           <input
                              type="text"
                              className="form-control"
                              defaultValue={this.state.details_on_recomemendation}
                              onChange={(e) =>
                                 this.setState({
                                    details_on_recomemendation: e.target.value,
                                 })
                              }
                              id="details_on_recomemendation"
                           />
                           {this.validator.message(
                              'details_on_recomemendation',
                              this.state.details_on_recomemendation,
                              'required'
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-12">
                        <span>
                           Form completed by
                           <input
                              type="text"
                              className="form-control"
                              defaultValue={this.state.completed_by}
                              onChange={(e) => this.setState({ completed_by: e.target.value })}
                              id="completed_by"
                           />
                        </span>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-12">
                        <span>
                           Understanding
                           <input
                              type="text"
                              className="form-control"
                              defaultValue={this.state.understanding}
                              onChange={(e) => this.setState({ understanding: e.target.value })}
                              id="understanding"
                           />
                        </span>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-12">
                        <span>
                           Reviewed By
                           <input
                              type="text"
                              id="reviewed_by"
                              className="form-control"
                              defaultValue={this.state.reviewed_by}
                              onChange={(e) => this.setState({ reviewed_by: e.target.value })}
                           />
                        </span>
                        {this.validator.message('reviewed_by', this.state.reviewed_by, 'required')}
                     </div>
                  </div>

                  <br />

                  <br />
                  <div className="row">
                     <div className="col-4">
                        <Link to="/Nurse/Nurse2" className="btn btn-outline-primary  btn-block">
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
   componentDidMount() {}
}

export default Page3;
