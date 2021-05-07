import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import $ from 'jquery';
import axios from 'axios';
import Header from './Header';

import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import { domain } from '../../App';

//

class Page8 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });
      console.log(this.validator);
      this.state = {
         q1_ans: '',
         q1_ans_dosage: '',
         q2_ans: '',
         q2_ans_dosage: '',
         q2_ans_dosage_timing: '',
         q2_ans_dosage_meal_taken: '',
         q3_ans: '',
         q3_ans_dosage: '',
         q4_ans: '',
         q4_ans_dosage: '',
         q4_ans_dosage_timing: '',
         q5_ans: '',

         error1: '',
         error2: '',
         error3: '',
         error4: '',
         error5: '',
         error6: '',
         error7: '',
         error8: '',
         error9: '',
         error10: '',
         error11: '',
         loader: '',
      };

      this.submitForm = this.submitForm.bind(this);
      this.pradaxa_rdo = this.pradaxa_rdo.bind(this);
      this.xarelto_rdo = this.xarelto_rdo.bind(this);
      this.eliquis_rdo = this.eliquis_rdo.bind(this);
      this.other_rdo = this.other_rdo.bind(this);
      this.edxo_rdo = this.eliquis_rdo.bind(this);
      this.opt_none = this.other_rdo.bind(this);
      this.dynamicRouting = this.dynamicRouting.bind(this);

      var element = document.getElementById('body');
      element.classList.add('blue-bg');

      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      try {
         axios
            .get(domain + '/api/patient/page8LoadData', {
               headers: headers,
            })
            .then((response) => {
               console.log(response);
               this.setState({ loader: '' });
            });
      } catch (error) {
         console.error(error);
         this.setState({ loader: '' });
      }
   }

   submitForm() {
      console.log('Patient 8 - submit');
      if (!$("input[name='optradio']:checked").val()) {
         this.setState({ error1: 'This field is required!, Please select any one of the above options' });
      } else if (
         document.getElementById('pradaxa_rdo').checked === true &&
         !$("input[name='opt_pradaxa_dosage']:checked").val()
      ) {
         this.setState({ error1: '' });
         this.setState({ error2: 'This field is required' });
      } else if (
         document.getElementById('xarelto_rdo').checked === true &&
         !$("input[name='opt_xarelto_dosage']:checked").val()
      ) {
         this.setState({ error1: '' });
         this.setState({ error2: '' });
         this.setState({ error3: 'This field is required' });
      } else if (
         document.getElementById('eliquis_rdo').checked === true &&
         !$("input[name='opt_eliquis_dosage']:checked").val()
      ) {
         this.setState({ error1: '' });
         this.setState({ error2: '' });
         this.setState({ error3: '' });
         this.setState({ error4: 'This field is required' });
      } else if (
         document.getElementById('edxo_rdo').checked === true &&
         !$("input[name='opt_edxo_dosage']:checked").val()
      ) {
         this.setState({ error1: '' });
         this.setState({ error2: '' });
         this.setState({ error3: '' });
         this.setState({ error4: '' });
         this.setState({ error5: 'This field is required' });
      } else if (
         document.getElementById('15_mg_once2').checked === true &&
         !$("input[name='opt_xarelto_dosage_15mg_daily']:checked").val()
      ) {
         this.setState({ error1: '' });
         this.setState({ error2: '' });
         this.setState({ error3: '' });
         this.setState({ error4: '' });
         this.setState({ error5: '' });
         this.setState({ error6: 'This field is required' });
      } else if ($("input[name='opt_xarelto_dosage_15mg_daily']:checked").val() && $('#bridging2').val() == '') {
         this.setState({ error6: '' });

         this.setState({ error8: 'This field is required' });
      } else if (document.getElementById('opt_eliquis_dosage').checked === true && $('#bridging4').val() == '') {
         this.setState({
            error8: '',
            error7: '',
            error6: '',
            error5: '',
            error4: '',
            error3: '',
         });

         this.setState({ error9: 'This field is required' });
      } else if (
         document.getElementById('edxo_rdo').checked === true &&
         document.getElementById('opt_edxo_dosage_other').checked === true &&
         $('#opt_edxo_dosage_other_textbox').val() == ''
      ) {
         this.setState({
            error8: '',
            error7: '',
            error6: '',
            error5: '',
            error4: '',
            error3: '',
            error9: '',
         });

         this.setState({ error10: 'This field is required' });
      } else if (
         document.getElementById('edxo_rdo').checked === true &&
         !$("input[name='opt_edxo_dosage_time']:checked").val()
      ) {
         this.setState({
            error8: '',
            error7: '',
            error6: '',
            error5: '',
            error4: '',
            error3: '',
            error9: '',
            error10: '',
         });

         this.setState({ error11: 'Please select when medication was taken' });
      } else {
         //  alert('You submitted the form and stuff!');
         console.log(this.state);
         this.page8(this.state);
         //  this.props.history.push('/User/Page10');
         this.dynamicRouting();
      }
   }

   dynamicRouting() {
      const { q5_ans } = this.state;
      console.log('Patient 8 - submit - dynamicRouting - q5: ', q5_ans);

      if (q5_ans != '') {
         this.props.history.push('/User/Page9');
      } else {
         this.props.history.push('/User/Page11');
      }
   }

   page8() {
      if (document.getElementById('pradaxa_rdo').checked === true) {
         var param = {
            pradaxa: this.state.q1_ans,
            pradaxa_dosage: this.state.q1_ans_dosage,
         };
      } else if (document.getElementById('xarelto_rdo').checked === true) {
         var param = {
            xarelto: this.state.q2_ans,
            xarelto_dosage: this.state.q2_ans_dosage,
            xarelto_dosage_time: this.state.q2_ans_dosage_timing,
            // xarelto_dosage_time: this.state.q2_ans_dosage_meal_taken,
         };
      } else if (document.getElementById('eliquis_rdo').checked === true) {
         var param = {
            eliquis: this.state.q3_ans,
            eliquis_dosage: this.state.q3_ans_dosage,
         };
      } else if (document.getElementById('edxo_rdo').checked === true) {
         var param = {
            edoxabon: this.state.q4_ans,
            edoxabon_dosage: this.state.q4_ans_dosage,
            edoxabon_dosage_time: this.state.q4_ans_dosage_timing,
         };
      }

      console.log('Patient 8 - page8 - param: ', param);
      server('patient/page8', param);
      // this.props.history.push('');
   }

   valueChanged1() {
      if (document.getElementById('optradio5').checked === true) {
         document.getElementById('de').style.display = 'block';
      } else {
         document.getElementById('de').style.display = 'none';
      }
   }

   pradaxa_rdo() {
      this.setState({
         q1_ans: '',
         q1_ans_dosage: '',
         q2_ans: '',
         q2_ans_dosage: '',
         q3_ans: '',
         q3_ans_dosage: '',
         q4_ans: '',
         q4_ans_dosage: '',
         q5_ans: '',
         q2_ans_dosage_timing: '',
         q4_ans_dosage_timing: '',
         q2_ans_dosage_meal_taken: '',
      });
   }
   xarelto_rdo() {
      this.setState({
         q1_ans: '',
         q1_ans_dosage: '',
         q2_ans: '',
         q2_ans_dosage: '',
         q3_ans: '',
         q3_ans_dosage: '',
         q4_ans: '',
         q4_ans_dosage: '',
         q4_ans_dosage_timing: '',
         q5_ans: '',
      });
   }
   eliquis_rdo() {
      this.setState({
         q1_ans: '',
         q1_ans_dosage: '',
         q2_ans: '',
         q2_ans_dosage: '',
         q3_ans: '',
         q3_ans_dosage: '',
         q4_ans: '',
         q4_ans_dosage: '',
         q4_ans_dosage_timing: '',
         q5_ans: '',
         q2_ans_dosage_timing: '',
         q2_ans_dosage_meal_taken: '',
      });
   }
   other_rdo() {
      this.setState({
         q1_ans: '',
         q1_ans_dosage: '',
         q2_ans: '',
         q2_ans_dosage: '',
         q3_ans: '',
         q3_ans_dosage: '',
         q4_ans: '',
         q4_ans_dosage: '',
         q4_ans_dosage_timing: '',
         q5_ans: '',
         q2_ans_dosage_timing: '',
         q2_ans_dosage_meal_taken: '',
      });
   }
   opt_none() {
      this.setState({
         q1_ans: '',
         q1_ans_dosage: '',
         q2_ans: '',
         q2_ans_dosage: '',
         q3_ans: '',
         q3_ans_dosage: '',
         q4_ans: '',
         q4_ans_dosage: '',
         q4_ans_dosage_timing: '',
         q5_ans: '',
         q2_ans_dosage_timing: '',
         q2_ans_dosage_meal_taken: '',
      });
   }

   //

   render() {
      return (
         <React.Fragment>
            <Header />
            <>
               {this.state.loader === 1 ? (
                  <div className="centered">
                     <ReactSpinner type="border" color="bg-primary" size="5" />
                  </div>
               ) : (
                  ''
               )}
               <h1 className="text-center white main-heading">Are you currently taking any of the following?</h1>
               <br />
               <br />
               <div className="bg-light blue-box">
                  {' '}
                  {/* white box */}
                  {/* Default form login */}
                  <form className="p-5" action="#!">
                     <p className="blue">
                        <b>Are you currently on any of these drugs?</b>
                     </p>
                     <label className="radio-inline blue">Pradaxa (Dabigatran)</label>
                     <input
                        type="radio"
                        name="optradio"
                        className="pull-right"
                        id="pradaxa_rdo"
                        onClick={this.pradaxa_rdo}
                        onChange={(e) => this.setState({ q1_ans: 'Pradaxa (Dabigatran)' })}
                     />
                     <div id="pradaxa_dosage">
                        <p className="blue">
                           <b>Dosage</b>
                        </p>
                        <label className="radio-inline blue">75 mg twice daily</label>
                        <input
                           type="radio"
                           name="opt_pradaxa_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q1_ans_dosage: '75 mg twice daily' })}
                        />

                        <br />
                        <label className="radio-inline blue">110 mg twice daily</label>
                        <input
                           type="radio"
                           name="opt_pradaxa_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q1_ans_dosage: '110 mg twice daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">150 mg twice daily</label>
                        <input
                           type="radio"
                           name="opt_pradaxa_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q1_ans_dosage: '150 mg twice daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">None of the above</label>
                        <input
                           type="radio"
                           name="opt_pradaxa_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q1_ans_dosage: 'None of the above' })}
                        />
                        <br />
                        <label className="radio-inline blue">Not Sure</label>
                        <input
                           type="radio"
                           name="opt_pradaxa_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q1_ans_dosage: 'Not Sure' })}
                        />
                        <br />

                        <div className="text-danger"> {this.state.error2 !== '' ? this.state.error2 : ''}</div>
                     </div>

                     <br />
                     <label className="radio-inline blue">Xarelto (Rivaroxaban)</label>
                     <input
                        type="radio"
                        name="optradio"
                        className="pull-right"
                        id="xarelto_rdo"
                        onChange={(e) => this.setState({ q2_ans: 'Xarelto (Rivaroxaban)' })}
                        onClick={this.xarelto_rdo}
                     />
                     <br />
                     <div id="xarelto_dosage">
                        <p className="blue">
                           <b>Dosage</b>
                        </p>
                        <label className="radio-inline blue">15 mg twice daily</label>
                        <input
                           type="radio"
                           name="opt_xarelto_dosage"
                           id="15_mg_once1"
                           className="pull-right"
                           onChange={(e) => this.setState({ q2_ans_dosage: '15 mg twice daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">15 mg once daily</label>
                        <input
                           type="radio"
                           name="opt_xarelto_dosage"
                           id="15_mg_once2"
                           className="pull-right"
                           onChange={(e) => this.setState({ q2_ans_dosage: '15 mg once daily' })}
                        />
                        <br />
                        <div id="opt_xarelto_dosage_15mg_daily_div">
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <label className="radio-inline blue">Taken in the morning</label>
                           <input
                              type="radio"
                              name="opt_xarelto_dosage_15mg_daily"
                              id
                              className="pull-right"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_dosage_timing: 'am',
                                 })
                              }
                           />
                           <br />
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <label className="radio-inline blue">Taken later in the day</label>
                           <input
                              type="radio"
                              name="opt_xarelto_dosage_15mg_daily"
                              id
                              className="pull-right"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_dosage_timing: 'pm',
                                 })
                              }
                           />
                           <div className="text-danger"> {this.state.error6 !== '' ? this.state.error6 : ''}</div>{' '}
                           <br />
                        </div>
                        <label className="radio-inline blue">10 mg once daily</label>
                        <input
                           type="radio"
                           name="opt_xarelto_dosage"
                           id="20_mg_once1"
                           className="pull-right"
                           onChange={(e) => this.setState({ q2_ans_dosage: '10 mg once daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">20 mg once daily</label>
                        <input
                           type="radio"
                           name="opt_xarelto_dosage"
                           id="20_mg_once2"
                           className="pull-right"
                           onChange={(e) => this.setState({ q2_ans_dosage: '20 mg once daily' })}
                        />
                        <br />

                        <div id="opt_xarelto_dosage_20mg_daily_div">
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <label className="radio-inline blue">Taken in the morning</label>
                           <input
                              type="radio"
                              name="opt_xarelto_dosage_20mg_daily"
                              id="opt_xarelto_dosage_20mg_daily1"
                              className="pull-right"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_dosage_timing: 'am',
                                 })
                              }
                           />
                           <br />
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <label className="radio-inline blue">Taken later in the day</label>
                           <input
                              type="radio"
                              name="opt_xarelto_dosage_20mg_daily"
                              id="opt_xarelto_dosage_20mg_daily2"
                              className="pull-right"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_dosage_timing: 'pm',
                                 })
                              }
                           />
                        </div>
                        <div className="text-danger"> {this.state.error7 !== '' ? this.state.erro7 : ''}</div>
                        {/* input */}
                        <label className="text blue">If once daily, please specify meal taken with </label>
                        <input
                           type="text"
                           id="bridging2"
                           className="form-control mb-4 transparent-custom-input"
                           placeholder="If once daily, please specify meal taken with"
                           defaultValue={this.state.q1_ans_dosage_meal_taken}
                           onChange={(e) => this.setState({ q2_ans_dosage_meal_taken: e.target.value })}
                        />
                        <div className="text-danger"> {this.state.error8 !== '' ? this.state.error8 : ''}</div>
                        <div className="text-danger"> {this.state.error3 !== '' ? this.state.error3 : ''}</div>
                     </div>

                     <label className="radio-inline blue">Eliquis (Apixaban)</label>
                     <input
                        type="radio"
                        name="optradio"
                        className="pull-right"
                        id="eliquis_rdo"
                        onChange={(e) => this.setState({ q3_ans: 'Eliquis (Apixaban)' })}
                        onClick={this.eliquis_rdo}
                     />
                     <div id="eliquis_dosage">
                        <p className="blue">
                           <b>Dosage</b>
                        </p>

                        <label className="radio-inline blue">5 mg twice daily</label>
                        <input
                           type="radio"
                           name="opt_eliquis_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q3_ans_dosage: '5 mg twice daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">2.5 mg twice daily</label>
                        <input
                           type="radio"
                           name="opt_eliquis_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q3_ans_dosage: '2.5 mg twice daily' })}
                        />
                        <br />

                        <label className="radio-inline blue">Other</label>
                        <input type="radio" name="opt_eliquis_dosage" id="opt_eliquis_dosage" className="pull-right" />
                        {/* input */}
                        <input
                           type="text"
                           id="bridging4"
                           className="form-control mb-4 transparent-custom-input"
                           placeholder="Please specify if other"
                           onChange={(e) => this.setState({ q3_ans_dosage: e.target.value })}
                        />
                        <div className="text-danger"> {this.state.error9 !== '' ? this.state.error9 : ''}</div>
                     </div>
                     <div className="text-danger"> {this.state.error4 !== '' ? this.state.error4 : ''}</div>

                     <label className="radio-inline blue">Edoxabon (Lixiana)</label>
                     <input
                        type="radio"
                        name="optradio"
                        className="pull-right"
                        id="edxo_rdo"
                        onChange={(e) => this.setState({ q4_ans: 'Edoxabon (Lixiana)' })}
                        onClick={this.edxo_rdo}
                     />

                     <div id="edxo_dosage">
                        <p className="blue">
                           <b>Dosage</b>
                        </p>
                        <label className="radio-inline blue">60 mg once daily</label>
                        <input
                           type="radio"
                           name="opt_edxo_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q4_ans_dosage: '60 mg once daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">30 mg once daily</label>
                        <input
                           type="radio"
                           name="opt_edxo_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q4_ans_dosage: '30 mg once daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">15 mg once daily</label>
                        <input
                           type="radio"
                           name="opt_edxo_dosage"
                           className="pull-right"
                           onChange={(e) => this.setState({ q4_ans_dosage: '15 mg once daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">Other</label>
                        <input type="radio" name="opt_edxo_dosage" id="opt_edxo_dosage_other" className="pull-right" />
                        {/* input */}
                        <input
                           type="text"
                           id="opt_edxo_dosage_other_textbox"
                           className="form-control mb-4 transparent-custom-input"
                           placeholder="Please specify if other"
                           onChange={(e) => this.setState({ q4_ans_dosage: e.target.value })}
                        />

                        <div id="opt_edxo_dosage_div">
                           <label className="radio-inline blue">Taken in the morning</label>
                           <input
                              type="radio"
                              name="opt_edxo_dosage_time"
                              id="opt_edxo_dosage1"
                              className="pull-right"
                              onChange={(e) =>
                                 this.setState({
                                    q4_ans_dosage_timing: 'am',
                                 })
                              }
                           />
                           <br />

                           <label className="radio-inline blue">Taken later in the day</label>
                           <input
                              type="radio"
                              name="opt_edxo_dosage_time"
                              id="opt_edxo_dosage2"
                              className="pull-right"
                              onChange={(e) =>
                                 this.setState({
                                    q4_ans_dosage_timing: 'pm',
                                 })
                              }
                           />
                        </div>

                        <div className="text-danger"> {this.state.error8 !== '' ? this.state.error8 : ''}</div>
                        <div className="text-danger"> {this.state.error10 !== '' ? this.state.error10 : ''}</div>
                        <div className="text-danger"> {this.state.error11 !== '' ? this.state.error11 : ''}</div>
                     </div>
                     <div className="text-danger"> {this.state.error5 !== '' ? this.state.error5 : ''}</div>

                     <label className="radio-inline blue">None Of The Above</label>
                     <input
                        type="radio"
                        name="optradio"
                        className="pull-right"
                        id="opt_none"
                        onChange={(e) => this.setState({ q5_ans: 'None Of The Above' })}
                        onClick={this.opt_none}
                     />

                     <div className="text-danger"> {this.state.error1 !== '' ? this.state.error1 : ''}</div>
                  </form>
                  {/* Default form login */}
                  <nav aria-label="Page navigation example">
                     <ul className="pagination justify-content-center">
                        <li className="page-item">
                           <button className="page-link" onClick={goBack} tabIndex={-1}>
                              <i className="fa fa-angle-double-left"></i> Previous
                           </button>
                        </li>
                        <li className="page-item">
                           <button className="page-link" onClick={this.submitForm}>
                              Next <i className="fa fa-angle-double-right"></i>
                           </button>
                        </li>
                     </ul>
                  </nav>
                  <br />
               </div>
            </>
         </React.Fragment>
      );
   }
   componentDidMount() {
      $(document).ready(function () {
         $('#pradaxa_dosage').hide();
         $('#eliquis_dosage').hide();
         $('#xarelto_dosage').hide();
         $('#other_dosage').hide();
         $('#edxo_dosage').hide();

         $('#opt_xarelto_dosage_20mg_daily_div').hide(1000);
         $('#opt_xarelto_dosage_15mg_daily_div').hide(1000);

         $('#pradaxa_rdo').change(function () {
            if ($('#pradaxa_rdo').is(':checked')) {
               $('#pradaxa_dosage').show(1000);
               $('#eliquis_dosage').hide(1000);
               $('#xarelto_dosage').hide(1000);
               $('#edxo_dosage').hide(1000);

               $('input[name=opt_eliquis_dosage]').prop('checked', false);
               $('input[name=opt_xarelto_dosage]').prop('checked', false);
               $('input[name=opt_edxo_dosage]').prop('checked', false);
            }
         });

         $('#xarelto_rdo').change(function () {
            if ($('#xarelto_rdo').is(':checked')) {
               $('#pradaxa_dosage').hide(1000);
               $('#eliquis_dosage').hide(1000);
               $('#xarelto_dosage').show(1000);
               $('#other_dosage').hide(1000);

               $('input[name=opt_pradaxa_dosage]').prop('checked', false);
               $('input[name=opt_eliquis_dosage]').prop('checked', false);
               $('input[name=opt_edxo_dosage]').prop('checked', false);
            }
         });
         $('#eliquis_rdo').change(function () {
            if ($('#eliquis_rdo').is(':checked')) {
               $('#pradaxa_dosage').hide(1000);
               $('#eliquis_dosage').show(1000);
               $('#xarelto_dosage').hide(1000);
               $('#other_dosage').hide(1000);
               $('#edxo_dosage').hide(1000);

               $('input[name=opt_pradaxa_dosage]').prop('checked', false);
               $('input[name=opt_xarelto_dosage]').prop('checked', false);
               $('input[name=opt_edxo_dosage]').prop('checked', false);
            }
         });
         $('#other_rdo').change(function () {
            if ($('#other_rdo').is(':checked')) {
               $('#pradaxa_dosage').hide(1000);
               $('#eliquis_dosage').hide(1000);
               $('#xarelto_dosage').hide(1000);
               $('#other_dosage').show(1000);
            }
         });

         $('#edxo_rdo').change(function () {
            if ($('#edxo_rdo').is(':checked')) {
               $('#pradaxa_dosage').hide(1000);
               $('#eliquis_dosage').hide(1000);
               $('#xarelto_dosage').hide(1000);
               $('#edxo_dosage').show(1000);

               $('input[name=opt_pradaxa_dosage]').prop('checked', false);
               $('input[name=opt_eliquis_dosage]').prop('checked', false);
               $('input[name=opt_xarelto_dosage]').prop('checked', false);
            }
         });

         $('#opt_none').change(function () {
            if ($('#opt_none').is(':checked')) {
               $('#pradaxa_dosage').hide(1000);
               $('#eliquis_dosage').hide(1000);
               $('#xarelto_dosage').hide(1000);
               $('#other_dosage').hide(1000);
               $('#edxo_dosage').hide(1000);

               $('input[name=opt_pradaxa_dosage]').prop('checked', false);
               $('input[name=opt_eliquis_dosage]').prop('checked', false);
               $('input[name=opt_xarelto_dosage]').prop('checked', false);
               $('input[name=opt_edxo_dosage]').prop('checked', false);
            }
         });

         $('#15_mg_once2').change(function () {
            if ($('#15_mg_once2').is(':checked')) {
               $('#opt_xarelto_dosage_15mg_daily_div').show(1000);
            }
         });

         $('#15_mg_once1').change(function () {
            if ($('#15_mg_once1').is(':checked')) {
               $('#opt_xarelto_dosage_15mg_daily_div').hide(1000);

               $('input[name=opt_xarelto_dosage_15mg_daily]').prop('checked', false);
            }
         });

         $('#20_mg_once2').change(function () {
            if ($('#20_mg_once2').is(':checked')) {
               $('#opt_xarelto_dosage_20mg_daily_div').show(1000);
            }
         });

         $('#20_mg_once1').change(function () {
            if ($('#20_mg_once1').is(':checked')) {
               $('#opt_xarelto_dosage_20mg_daily_div').hide(1000);
               $('input[name=opt_xarelto_dosage_20mg_daily]').prop('checked', false);
            }
         });
      });
   }
}
export default Page8;
