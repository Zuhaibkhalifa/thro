import React from 'react';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import $ from 'jquery';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import ReactSpinner from 'react-bootstrap-spinner';
import _ from 'lodash';

class Page9 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });
      console.log(this.validator);
      this.state = {
         q1: '',
         q1_dosage: '',
         q1_freq: '',
         q2: '',
         q2_dosage: '',
         q2_freq: '',
         q3: '',
         q3_dosage: '',
         q3_freq: '',
         q4: '',

         loader: '',
         patient_id: '',
         redirectButton: false,
         nurse_add: false
      };

      this.submitForm = this.submitForm.bind(this);
      this.redirectBackNurse = this.redirectBackNurse.bind(this);
      this.dynamicRouting = this.dynamicRouting.bind(this);
      this.handleClickMain = this.handleClickMain.bind(this);
      this.chkOne = this.chkOne.bind(this);
      this.chkTwo = this.chkTwo.bind(this);

      this.chkFour = this.chkFour.bind(this);

      this.q4 = this.q4.bind(this);
      this.redirectNextPage = this.redirectNextPage.bind(this);

      var element = document.getElementById('body');
      element.classList.add('blue-bg');

   }

   redirectBackNurse() {
       this.submitForm();
       if(this.state.nurse_add) {
           this.props.history.push('/Nurse/add_patient')
       } else {
          this.props.history.push('/Nurse/Nurse1')
       }
   }

   submitForm() {
      console.log('Patient 9 - submit');
      const emptyErrors = {
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
      };
      let errors = { ...emptyErrors };

      if (
         document.getElementById('q4').checked === false &&
         document.getElementById('q1').checked === false &&
         document.getElementById('q2').checked === false &&
         document.getElementById('q3').checked === false
      ) {
         console.log('Patient 9 - submit - error1');
         errors.error1 = 'Please select any one of the options';
         this.setState({ ...errors });
      } else if (document.getElementById('q1').checked === true) {
         console.log('Patient 9 - submit - error2');
         if (
            document.getElementById('opt_dalteparin_dosage_other').checked === false &&
            document.getElementById('dalteparin_dosage1').checked === false
         )
            errors.error2 = 'This field is required!, Please select any one of the above options for dosage';

         if (
            document.getElementById('opt_dalteparin_dosage_other').checked === true &&
            $('#opt_dalteparin_dosage_other_textbox').val() === ''
         )
            errors.error3 = "Text box can't be empty";

         if (!$("input[name='opt_dalteparin_freq']:checked").val())
            errors.error4 = 'This field is required!, Please select any one of the above options for frequency';

         this.setState({ ...errors });
      } else if (document.getElementById('q2').checked === true) {
         console.log('Patient 9 - submit - error3');
         if (
            document.getElementById('opt_enoxaparin_dosage_other').checked === false &&
            document.getElementById('enoxaparin_dosage1').checked === false
         )
            errors.error5 = 'This field is required!, Please select any one of the above options for dosage';

         if (
            document.getElementById('opt_enoxaparin_dosage_other').checked === true &&
            $('#opt_enoxaparin_dosage_other_textbox').val() === ''
         )
            errors.error6 = "Text box can't be empty";

         if (!$("input[name='opt_enoxaparin_freq']:checked").val())
            errors.error7 = 'This field is required!, Please select any one of the above options for frequency';

         this.setState({ ...errors });
      } else if (document.getElementById('q3').checked === true) {
         console.log('Patient 9 - submit - error4');
         if (
            document.getElementById('opt_tinzaparin_dosage_other').checked === false &&
            document.getElementById('tinzaparin_dosage1').checked === false
         )
            errors.error8 = 'This field is required!, Please select any one of the above options for dosage';

         if (
            document.getElementById('opt_tinzaparin_dosage_other').checked === true &&
            $('#opt_tinzaparin_dosage_other_textbox').val() === ''
         )
            errors.error9 = "Text box can't be empty";

         if (!$("input[name='opt_tinzaparin_freq']:checked").val())
            errors.error10 = 'This field is required!, Please select any one of the above options for frequency';

         this.setState({ ...errors });
      }

      if (_.isEqual(emptyErrors, errors)) {
         this.setState({ ...errors });
         console.log('Patient 9 - submit - state: ', this.state);
         this.page9(this.state);
         this.dynamicRouting();
      }
   }

   dynamicRouting() {
      const { q4 } = this.state;
      console.log('Patient 8 - submit - dynamicRouting - q4: ', q4);

      if (q4 !== '') {
         this.props.history.push('/User/Page10');
      } else {
         this.props.history.push('/User/Page11');
      }
   }

   page9() {
      var param = {};
      param.patient_id = this.state.patient_id;
      if (document.getElementById('q4').checked === true) {
         param.none = this.state.q4;
      } else {
         if (document.getElementById('q1').checked === true) {
            param.dalteparin = this.state.q1;
            param.dalteparin_dosage = this.state.q1_dosage;
            param.dalteparin_freq = this.state.q1_freq;
         }
         if (document.getElementById('q2').checked === true) {
            param.enoxaparin = this.state.q2;
            param.enoxaparin_dosage = this.state.q2_dosage;
            param.enoxaparin_freq = this.state.q2_freq;
         }

         if (document.getElementById('q3').checked === true) {
            param.tinzaparin = this.state.q3;
            param.tinzaparin_dosage = this.state.q3_dosage;
            param.tinzaparin_freq = this.state.q3_freq;
         }
      }

      console.log('Patient 9 - page9 - param: ', param);
      server('patient/page9', param);
      //this.props.history.push('');
   }
   func() {
      document.getElementById('de').style.display = 'none';
   }

   handleClickMain(e) {
      const { id } = e.target;
      $("input[id='q4']:checked").prop('checked', false);

      ['q1', 'q2', 'q3'].map((q) => {
         if (id === q) {
            this.setState({ [q]: 'Yes' });
            return $(`#${q}_content`).show(500);
         } else {
            this.setState({ [q]: '' });
            return $(`#${q}_content`).hide(500);
         }
      });
   }

   chkOne() {
      this.setState({ q1: 'Yes' });
      $('#one').toggle(500);
   }
   chkTwo() {
      this.setState({ q2: 'Yes' });
      $('#two').toggle(500);
   }
   chkFour() {
      this.setState({ q3: 'Yes' });

      $('#three').toggle(500);
   }

   q4(e) {
      this.setState({
         q1: '',
         q1_dosage: '',
         q1_freq: '',
         q2: '',
         q2_dosage: '',
         q2_freq: '',
         q3: '',
         q3_dosage: '',
         q3_freq: '',
         q4: '',
      });

      ['q1', 'q2', 'q3'].map((q) => {
         this.setState({ [q]: '' });
         return $(`#${q}_content`).hide(500);
      });

      $("input[name='main_opt1']:checked").prop('checked', false);
   }


   redirectNextPage() {
      if(this.props.location.state !== undefined) {
         this.props.history.push({ pathname:'/User/Page10', state:{ patient_id: this.props.location.state.patient_id } });
      }
   }
   //
   //

   render() {
      return (
         <React.Fragment>
            <Header />
            {this.state.loader === 1 ? (
               <div className="centered">
                  <ReactSpinner type="border" color="bg-primary" size="5" />
               </div>
            ) : (
               ''
            )}
            <div>
               <h1 className="text-center white main-heading">Current Medication - Heparin</h1>
               <br />
               <br />
               <div className="bg-light blue-box">
                  {' '}
                  {/* white box */}
                  {/* Default form login */}
                  <form className="p-5" action="#!" id="frm">
                     <p className="blue">
                        <b>Please choose if applicable</b>{' '}
                     </p>

                     {/* option 1 */}
                     <div className="checkbox">
                        <label className="blue">Dalteparin (Fragmin)</label>
                        <input
                           type="radio"
                           className="pull-right goption chk"
                           name="main_opt1"
                           value="Dalteparin (Fragmin)"
                           onChange={this.handleClickMain}
                           id="q1"
                        />
                     </div>
                     <div id="q1_content" className="ml-lg-3">
                        <p className="blue mb-sm-1">
                           <b>Dosage</b>
                        </p>
                        <label className="radio-inline blue">Dosage in mg</label>
                        <input
                           type="radio"
                           name="opt_dalteparin_dosage"
                           id="opt_dalteparin_dosage_other"
                           className="pull-right"
                        />
                        {/* input */}
                        <input
                           type="number"
                           min="0"
                           id="opt_dalteparin_dosage_other_textbox"
                           className="form-control ml-lg-3 mb-sm-1 transparent-custom-input"
                           placeholder="Dosage in mg [Eg: 25]"
                           onChange={(e) => this.setState({ q1_dosage: e.target.value })}
                        />
                        <div className="text-danger mb-md-2"> {this.state.error3 !== '' ? this.state.error3 : ''}</div>

                        <label className="radio-inline blue">Not Sure about dosage</label>
                        <input
                           type="radio"
                           name="opt_dalteparin_dosage"
                           id="dalteparin_dosage1"
                           className="pull-right"
                           value="Not Sure"
                           onClick={(e) => this.setState({ q1_dosage: 'Not Sure' })}
                        />
                        <div className="text-danger mb-md-2"> {this.state.error2 !== '' ? this.state.error2 : ''}</div>

                        <p className="blue  mb-sm-1">
                           <b>Frequency of Dosage</b>
                        </p>
                        <label className="radio-inline blue">Once daily</label>
                        <input
                           type="radio"
                           name="opt_dalteparin_freq"
                           id="dalteparin_freq1"
                           className="pull-right"
                           defaultChecked={this.state.q1_freq === 'once daily' ? true : false}
                           onClick={(e) => this.setState({ q1_freq: 'once daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">Twice daily</label>
                        <input
                           type="radio"
                           name="opt_dalteparin_freq"
                           id="dalteparin_freq2"
                           className="pull-right"
                           defaultChecked={this.state.q1_freq === 'twice daily' ? true : false}
                           onClick={(e) => this.setState({ q1_freq: 'twice daily' })}
                        />

                        <br />
                        <div className="text-danger  mb-lg-4"> {this.state.error4 !== '' ? this.state.error4 : ''}</div>
                     </div>

                     {/* option 2 */}
                     <div className="checkbox">
                        <label className="blue">Enoxaparin (Lovenox)</label>
                        <input
                           type="radio"
                           className="pull-right goption chk"
                           name="main_opt1"
                           value="Enoxaparin (Lovenox)"
                           onChange={this.handleClickMain}
                           id="q2"
                        />
                     </div>
                     <div id="q2_content" className="ml-lg-3">
                        <p className="blue mb-sm-1">
                           <b>Dosage</b>
                        </p>
                        <label className="radio-inline blue">Dosage in mg</label>
                        <input
                           type="radio"
                           name="opt_enoxaparin_dosage"
                           id="opt_enoxaparin_dosage_other"
                           className="pull-right"
                        />
                        {/* input */}
                        <input
                           type="number"
                           min="0"
                           id="opt_enoxaparin_dosage_other_textbox"
                           className="form-control ml-lg-3 mb-sm-1 transparent-custom-input"
                           placeholder="Dosage in mg [Eg: 25]"
                           onChange={(e) => this.setState({ q2_dosage: e.target.value })}
                        />
                        <div className="text-danger mb-md-2"> {this.state.error6 !== '' ? this.state.error6 : ''}</div>

                        <label className="radio-inline blue">Not Sure about dosage</label>
                        <input
                           type="radio"
                           name="opt_enoxaparin_dosage"
                           id="enoxaparin_dosage1"
                           className="pull-right"
                           value="Not Sure"
                           onClick={(e) => this.setState({ q2_dosage: 'Not Sure' })}
                        />
                        <div className="text-danger mb-md-2"> {this.state.error5 !== '' ? this.state.error5 : ''}</div>

                        <p className="blue  mb-sm-1">
                           <b>Frequency of Dosage</b>
                        </p>
                        <label className="radio-inline blue">Once daily</label>
                        <input
                           type="radio"
                           name="opt_enoxaparin_freq"
                           id="enoxaparin_freq1"
                           className="pull-right"
                           defaultChecked={this.state.q2_freq === 'once daily' ? true : false}
                           onClick={(e) => this.setState({ q2_freq: 'once daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">Twice daily</label>
                        <input
                           type="radio"
                           name="opt_enoxaparin_freq"
                           id="enoxaparin_freq2"
                           className="pull-right"
                           defaultChecked={this.state.q2_freq === 'twice daily' ? true : false}
                           onClick={(e) => this.setState({ q2_freq: 'twice daily' })}
                        />
                        <br />

                        <div className="text-danger  mb-lg-4"> {this.state.error7 !== '' ? this.state.error7 : ''}</div>
                     </div>

                     {/* option 3 */}
                     <div className="checkbox">
                        <label className="blue">Tinzaparin (Innohep)</label>
                        <input
                           type="radio"
                           className="pull-right goption chk"
                           name="main_opt1"
                           value="Tinzaparin (Innohep)"
                           onChange={this.handleClickMain}
                           id="q3"
                        />
                     </div>
                     <div id="q3_content" className="ml-lg-3">
                        <p className="blue mb-sm-1">
                           <b>Dosage</b>
                        </p>
                        <label className="radio-inline blue">Dosage in mg</label>
                        <input
                           type="radio"
                           name="opt_tinzaparin_dosage"
                           id="opt_tinzaparin_dosage_other"
                           className="pull-right"
                        />
                        {/* input */}
                        <input
                           type="number"
                           min="0"
                           id="opt_tinzaparin_dosage_other_textbox"
                           className="form-control ml-lg-3 mb-sm-1 transparent-custom-input"
                           placeholder="Dosage in mg [Eg: 25]"
                           onChange={(e) => this.setState({ q3_dosage: e.target.value })}
                        />
                        <div className="text-danger mb-md-2"> {this.state.error9 !== '' ? this.state.error9 : ''}</div>

                        <label className="radio-inline blue">Not Sure about dosage</label>
                        <input
                           type="radio"
                           name="opt_tinzaparin_dosage"
                           id="tinzaparin_dosage1"
                           className="pull-right"
                           value="Not Sure"
                           onClick={(e) => this.setState({ q3_dosage: 'Not Sure' })}
                        />
                        <div className="text-danger mb-md-2"> {this.state.error8 !== '' ? this.state.error8 : ''}</div>

                        <p className="blue  mb-sm-1">
                           <b>Frequency of Dosage</b>
                        </p>
                        <label className="radio-inline blue">Once daily</label>
                        <input
                           type="radio"
                           name="opt_tinzaparin_freq"
                           id="tinzaparin_freq1"
                           className="pull-right"
                           defaultChecked={this.state.q3_freq === 'once daily' ? true : false}
                           onClick={(e) => this.setState({ q3_freq: 'once daily' })}
                        />
                        <br />
                        <label className="radio-inline blue">Twice daily</label>
                        <input
                           type="radio"
                           name="opt_tinzaparin_freq"
                           id="tinzaparin_freq2"
                           className="pull-right"
                           defaultChecked={this.state.q3_freq === 'twice daily' ? true : false}
                           onClick={(e) => this.setState({ q3_freq: 'twice daily' })}
                        />
                        <br />
                        <div className="text-danger  mb-lg-4">
                           {' '}
                           {this.state.error10 !== '' ? this.state.error10 : ''}
                        </div>
                     </div>

                     <div className="checkbox">
                        <label className="blue">None of the above</label>
                        <input
                           type="radio"
                           className="pull-right goption"
                           onChange={(e) => this.setState({ q4: 'Yes' })}
                           onClick={this.q4}
                           name="mainNone"
                           value="None of the above"
                           id="q4"
                        />
                     </div>
                     <div className="text-danger"> {this.state.error1 !== '' ? this.state.error1 : ''}</div>
                     <br />
                     <br />
                     <div className="row">
                        <div className="col-6">{/* input */}</div>
                        <div className="col-6">{/* input */}</div>
                     </div>
                  </form>
                  {/* Default form login */}
                  <nav aria-label="Page navigation example">
                     {!this.state.redirectButton ?
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
                        </ul> : 
                        <ul className="pagination justify-content-center">
                           <li className="page-item">
                              <button className="page-link" onClick={this.redirectBackNurse} tabIndex={-1}>
                                    <i className="fa fa-angle-double-left"></i> Go Back
                              </button>
                           </li>
                           { this.state.q4 === 'Yes' ?
                              <li className="page-item">
                                 <button className="page-link" onClick={this.redirectNextPage}>
                                       Next Page <i className="fa fa-angle-double-right"></i>
                                 </button>
                              </li> : ""
                           }
                        </ul>
                     }
                  </nav>
                  <br />
               </div>
            </div>
         </React.Fragment>
      );
   }

   componentDidMount() {
      if(this.props.location.state !== undefined) {
         this.setState({ 
             patient_id: this.props.location.state.patient_id, 
             redirectButton: true,
             nurse_add: this.props.location.state.nurse_add ? true : false
         });
      }
      $('#q1_content').hide();
      $('#q2_content').hide();
      $('#q3_content').hide();
      //   $('#four').hide();

      // $('#q4').click(function () {
      //    $('.chk').attr('disabled', !$("input[type='checkbox']").attr('disabled'));
      // });
   }
}
export default Page9;
