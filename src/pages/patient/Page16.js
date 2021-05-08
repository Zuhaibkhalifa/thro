import React from 'react';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { Button, Modal } from 'react-bootstrap';
import ReactSpinner from 'react-bootstrap-spinner';

import Header from './Header';
import $ from 'jquery';
import axios from 'axios';

import Logo from '../../assets/img/3.png';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';

import { domain } from '../../App';
import procedures from '../../helper/procedures';

//

class Page16 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });
      console.log(this.validator);
      this.state = {
         showHide: false,
         q1_ans: '',
         q2_ans: '',
         q3_ans: '',
         loader: '',
      };

      this.submitForm = this.submitForm.bind(this);
      this.go_nurse = this.go_nurse.bind(this);
      this.handle_procedure = this.handle_procedure.bind(this);

      var element = document.getElementById('body');
      element.classList.add('blue-bg');

      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      try {
         axios
            .get(domain + '/api/patient/page16LoadData', {
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
   handleModalShowHide() {
      this.setState({ showHide: !this.state.showHide });
   }
   handleChange_procedure(value) {
      this.setState({ q1_ans: value });
      // this.setState({ weight: value });
   }
   redirect() {
      this.setState({ showHide: !this.state.showHide });
      this.props.history.push('/User/Section');
   }

   //
   submitForm() {
      let errors = {
         error1: '',
         error2: '',
         error3: '',
      };

      if (document.getElementById('notsure').checked === false && this.state.q1_ans == '') {
         errors.error1 = 'This field is required';
         this.setState({ ...errors });
         console.log('Patient 16 - submit - state: ', this.state);
      } else if (document.getElementById('notsure').checked === false && $('#procedure_date').val() === '') {
         errors.error2 = 'This field is required';
         this.setState({ ...errors });
         console.log('Patient 16 - submit - state: ', this.state);
      } else {
         this.setState({ ...errors });
         console.log('Patient 16 - submit - state: ', this.state);
         this.page16(this.state);

         this.handleModalShowHide();
      }
   }

   go_nurse() {
      // alert('ss');
      this.props.history.push('/User/Section');
   }
   page16() {
      if (document.getElementById('notsure').checked === true) {
         var param = {
            type_of_procedure: this.state.q1_ans,
         };
      } else {
         var param = {
            type_of_procedure: this.state.q1_ans,
            date_of_procedure: this.state.q2_ans,
         };
      }

      console.log(param);
      // server('patient/page16', param);
      //this.props.history.push('');
   }
   handle_procedure(value) {
      this.setState({ q1_ans: value });
      // this.setState({ weight: value });
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
            <Modal show={this.state.showHide}>
               <Modal.Body className="blue-bg">
                  {' '}
                  <div className="row">
                     <div className="col-6 offset-3">
                        <img src={Logo} className="img-fluid" style={{ height: 200 }} />
                     </div>
                  </div>{' '}
                  <p className="white">
                     Thank you for filling out the bridging clinic patient application. Please pass the tablet to the
                     nurse.
                  </p>
                  <div className="row">
                     <div className="col-6"></div>
                     <div className="col-6">
                        <button
                           type="button"
                           className="btn btn-secondary btn-block big-btn-white"
                           data-dismiss="modal"
                           onClick={() => this.redirect()}
                        >
                           OK
                        </button>
                     </div>
                  </div>
               </Modal.Body>
            </Modal>

            <div>
               <h1 className="text-center white main-heading">Surgery</h1>
               <br />
               <br />
               <div className="bg-light blue-box">
                  {' '}
                  {/* white box */}
                  {/* Default form login */}
                  <form className="p-5" action="#!">
                     <p className="blue">
                        <b>Please enter the type of Procedure</b>
                     </p>

                     <div id="t1">
                        {/* {procedures(this.state.q1_ans, this.handle_procedure, null, false)} */}
                        <select
                           id="procedure"
                           className="custom-select transparent-custom-input"
                           value={this.state.q1_ans}
                           onChange={(e) => this.handle_procedure(e.target.value)}
                        >
                           <option value="Select Surgery">Select Surgery</option>
                           <optgroup label="Neurosurgery/Spine">
                              <option value="Neuraxial procedure (high)">Neuraxial procedure (high)</option>
                              <option value="Neurosurgery or Spinal Surgery (high)">
                                 Neurosurgery or Spinal Surgery (high)
                              </option>
                           </optgroup>

                           <optgroup label="GI/abdominal">
                              <option value="Abdominal surgery (mod)">Abdominal surgery (mod)</option>
                              <option value="Gastroscopy or colonoscopy without biopsy (mod)">
                                 Gastroscopy or colonoscopy without biopsy (mod)
                              </option>
                              <option value="Gastroscopy or colonoscopy with biopsy (low)">
                                 Gastroscopy or colonoscopy with biopsy (low)
                              </option>
                              <option value="Intestinal anastomosis (high)">Intestinal anastomosis (high)</option>
                              <option value="Extensive cancer surgery (e.g. liver/pancreas) (high)">
                                 Extensive cancer surgery (e.g. liver/pancreas) (high)
                              </option>
                           </optgroup>

                           <optgroup label="Lung/Thoracic (non-cardiac)">
                              <option value="Lung resection (high)">Lung resection (high)</option>
                              <option value="Other intrathoracic surgery (mod)">
                                 Other intrathoracic surgery (mod)
                              </option>
                           </optgroup>
                           <optgroup label="Orthopedic">
                              <option value="Major orthopedic surgery (high">Major orthopedic surgery (high</option>
                              <option value="Other orthopedic surgery (mod)">Other orthopedic surgery (mod)</option>
                           </optgroup>

                           <optgroup label="Eye">
                              <option value="Cataract surgery (low)">Cataract surgery (low)</option>
                              <option value="Non-cataract ophthalmological surgery (mod)">
                                 Non-cataract ophthalmological surgery (mod)
                              </option>
                           </optgroup>

                           <optgroup label="Dental">
                              <option value="Complex dental procedure (e.g. multiple tooth extractions) (mod)">
                                 Complex dental procedure (e.g. multiple tooth extractions) (mod)
                              </option>
                              <option value="Dental other than multiple tooth extractions or maxillofacial surgery (low)">
                                 Dental other than multiple tooth extractions or maxillofacial surgery (low)
                              </option>
                           </optgroup>
                           <optgroup label="Plastic surgery">
                              <option value="Reconstructive plastic surgery (high)">
                                 Reconstructive plastic surgery (high)
                              </option>
                              <option value="Other plastic surgery">Other plastic surgery</option>
                           </optgroup>
                           <optgroup label="Cardiac or vascular">
                              <option value="Cardiac surgery (high)">Cardiac surgery (high)</option>
                              <option value="Coronary angiography (low)">Coronary angiography (low)</option>
                              <option value="Permanent pacemaker or ICD placement (if patient is on apixaban, edoxaban, rivaroxaban, or dabigatran – mod, if on any other drugs - low)">
                                 Permanent pacemaker or ICD placement (if patient is on apixaban, edoxaban, rivaroxaban,
                                 or dabigatran – mod, if on any other drugs - low)
                              </option>
                              <option value="Major vascular surgery (aortic aneurysm repair, aortofemoral bypass) (high)">
                                 Major vascular surgery (aortic aneurysm repair, aortofemoral bypass) (high)
                              </option>
                              <option value="Other vascular surgery (mod)">Other vascular surgery (mod)</option>
                           </optgroup>

                           <optgroup label="Needle biopsy">
                              <option value="Kidney biopsy (high)">Kidney biopsy (high)</option>
                              <option value="Prostate biopsy (high)">Prostate biopsy (high)</option>
                              <option value="Cervical cone biopsy (high)">Cervical cone biopsy (high)</option>
                              <option value="Pericardiocentesis (high)">Pericardiocentesis (high)</option>
                              <option value="Colonic polypectomy (high)">Colonic polypectomy (high)</option>
                              <option value="Bone marrow biopsy (mod)">Bone marrow biopsy (mod)</option>
                              <option value="Lymph node biopsy (mod)">Lymph node biopsy (mod)</option>
                              <option value="Low-risk procedures (e.g. thoracentesis, paracentesis, arthrocentesis) (low)">
                                 Low-risk procedures (e.g. thoracentesis, paracentesis, arthrocentesis) (low)
                              </option>
                           </optgroup>

                           <optgroup label="Urological">
                              <option value="Urological surgery (high)">Urological surgery (high)</option>
                              <option value="Other general surgery (e.g. breast) (mod)">
                                 Other general surgery (e.g. breast) (mod)
                              </option>
                              <option value="Extensive cancer surgery (high)">Extensive cancer surgery (high)</option>
                           </optgroup>
                        </select>

                        <div className="text-danger"> {this.state.error1 !== '' ? this.state.error1 : ''}</div>
                        <br />

                        <div className="row">
                           <div className="col-12">
                              <p className="blue">
                                 <b>Date of Procedure</b>
                              </p>

                              <input
                                 type="date"
                                 id="procedure_date"
                                 className="form-control mb-2 transparent-custom-input"
                                 value={this.state.q2_ans}
                                 onChange={(e) => this.setState({ q2_ans: e.target.value })}
                              />
                              <div className="text-danger"> {this.state.error2 !== '' ? this.state.error2 : ''}</div>
                              <br />
                           </div>
                        </div>
                     </div>

                     <br />
                     <p className="blue">
                        <b>Not Sure</b>
                     </p>

                     <input
                        type="checkbox"
                        name="optradio"
                        className="pull-right"
                        id="notsure"
                        value="Not Sure"
                        onChange={(e) => this.setState({ q1_ans: 'Not Sure' })}
                     />

                     <br />
                  </form>
                  <nav aria-label="Page navigation example">
                     <ul className="pagination justify-content-center">
                        <li className="page-item">
                           <button className="page-link" onClick={goBack} tabIndex={-1}>
                              <i className="fa fa-angle-double-left"></i> Previous
                           </button>
                        </li>
                        <li className="page-item">
                           <button className="page-link" onClick={this.submitForm}>
                              Finish
                           </button>
                        </li>
                     </ul>
                  </nav>
                  <br />
                  {/*---------------------------------------------------------------------*/}
                  {/* Button trigger modal */}
                  {/* Modal */}
                  <div
                     className="modal fade"
                     id="exampleModal"
                     tabIndex={-1}
                     role="dialog"
                     aria-labelledby="exampleModalLabel"
                     aria-hidden="true"
                  >
                     <div className="modal-dialog" role="document">
                        <div className="modal-content">
                           {/*<div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>*/}
                           <div className="modal-body blue-bg">
                              <div className="row">
                                 <div className="col-6 offset-3">
                                    <img src="img/3.png" className="img-fluid" style={{ height: 200 }} />
                                 </div>
                              </div>
                              <br />
                              <p className="white">
                                 Thanks. you for filling out the bridiging clinic patient application. Please pass the
                                 tablet to the nurse.
                              </p>
                              <br />
                              <br />
                              <div className="row">
                                 <div className="col-6">
                                    <button
                                       type="button"
                                       className="btn btn-secondary btn-block big-btn-white"
                                       data-dismiss="modal"
                                    >
                                       CANCEL
                                    </button>
                                 </div>
                                 <div className="col-6">
                                    <button
                                       type="button"
                                       className="btn btn-secondary btn-block big-btn-white"
                                       data-dismiss="modal"
                                    >
                                       OK
                                    </button>
                                 </div>
                              </div>
                           </div>
                           {/*<div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary">Save changes</button>
		      </div>*/}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
   componentDidMount() {
      $(document).ready(function () {
         $('#notsure').change(function () {
            $('#t1').toggle(1000);
            $('#procedure').val('');
            $('#procedure_date').val('');
         });
      });
      var dtToday = new Date();

      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) month = '0' + month.toString();
      if (day < 10) day = '0' + day.toString();

      var maxDate = year + '-' + month + '-' + day;
      //alert(maxDate);

      $('#procedure_date').attr('min', maxDate);
   }
}
export default Page16;
