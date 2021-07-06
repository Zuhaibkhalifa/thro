import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import axios from 'axios';
import moment from 'moment';

import Header from './NurseHeader';
import { server } from '../../utils/functions';
import { Modal } from 'react-bootstrap';
import Logo from '../../assets/img/3.png';
import { domain } from '../../App';

import thromboAlgos from '../../helper/thromboAlgos';
import thromboMedicationAlgo from '../../helper/thromboMedicationAlgo';
import mapToView from '../../helper/mapMedicationDataToView';

//

let data;
class Page6 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });

      console.log(this.validator);
      this.state = { email: '', loader: '', showHide: '', table: { header: [], data: [], note: {} }
      ,patient_id: localStorage.getItem('patient_id') };

      this.submitForm = this.submitForm.bind(this);
      this.handleModalShowHide = this.handleModalShowHide.bind(this);
      this.onDateChange = this.onDateChange.bind(this);

      // const headers = {
      //    'Content-Type': 'application/json',
      //    Accept: 'application/json',
      //    Authorization: 'Bearer ' + localStorage.getItem('token'),
      // };

      // try {
      //    axios
      //       .get(domain + '/api/nurse/page8LoadData', {
      //          headers: headers,
      //       })
      //       .then((response) => {
      //          console.log(response.data.success[0]);
      //          data = response.data.success[0];
      //          this.setState({ loader: '' });
      //       });
      // } catch (error) {
      //    console.error(error);
      //    this.setState({ loader: '' });
      // }
   }

   async componentDidMount() {
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };

      try {
         let patient_id = localStorage.getItem('patient_id');
         axios
            .get(domain + `/api/nurse/medicationJsonData/:${patient_id}`, {
               headers: headers,
            })
            .then((response) => {
               console.log('Nurse6 - res: ', response);
               if (response.data.success == 'not_found') {
                  this.setState({ table: 'none' });
                  return;
               }

               data = JSON.parse(response.data.success[0].jsonTable);
               console.log('NURSE 6 - Response: ', data);
               this.setState({ loader: '' });
               this.setState({ table: data });
            });
      } catch (error) {
         console.error(error);
         this.setState({ loader: '' });
      }
   }

   handleModalShowHide() {
      this.setState({ showHide: !this.state.showHide });
   }

   submitForm() {
      // this.props.history.push('/Nurse/Nurse7');
      this.page8(this.state);
      window.print();
   }

   page8(param) {
      server('nurse/page8', param);
   }

   onDateChange(e) {
      const { value } = e.target;
      let newState = { ...this.state };

      let date = moment(value, 'YYYY-MM-DD');

      newState.table.data[0]['d_5'] = date.subtract(5, 'd').format('YYYY-MM-DD');
      newState.table.data[1]['d_4'] = date.subtract(4, 'd').format('YYYY-MM-DD');
      newState.table.data[2]['d_3'] = date.subtract(3, 'd').format('YYYY-MM-DD');
      newState.table.data[3]['d_2'] = date.subtract(2, 'd').format('YYYY-MM-DD');
      newState.table.data[4]['d_1'] = date.subtract(1, 'd').format('YYYY-MM-DD');

      newState.table.data[5].d = value;

      newState.table.data[6]['d1'] = date.add(1, 'd').format('YYYY-MM-DD');
      newState.table.data[7]['d2'] = date.add(2, 'd').format('YYYY-MM-DD');
      newState.table.data[8]['d3'] = date.add(3, 'd').format('YYYY-MM-DD');
      newState.table.data[9]['d4'] = date.add(4, 'd').format('YYYY-MM-DD');
      newState.table.data[10]['d5'] = date.add(5, 'd').format('YYYY-MM-DD');

      this.setState({ ...newState });
   }

   //

   render() {
      const { table } = this.state;

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

            <Modal show={this.state.showHide}>
               <Modal.Body className="blue-bg">
                  {' '}
                  <div className="row">
                     <div className="col-6 offset-3">
                        <img src={Logo} className="img-fluid" style={{ height: 200 }} />
                     </div>
                  </div>{' '}
                  <p className="white">
                     Thank you for completing the Bridging Form, Please keep a copy of the Medication Schedule for your
                     records.
                  </p>
                  <div className="row">
                     <div className="col-6"></div>
                     <div className="col-6">
                        <Link to="/">
                           <button
                              type="button"
                              className="btn btn-secondary btn-block big-btn-white"
                              data-dismiss="modal"
                              onClick={this.handleModalShowHide}
                           >
                              OK
                           </button>
                        </Link>
                     </div>
                  </div>
               </Modal.Body>
            </Modal>

            <div className="container">
               <h2 className="text-center myHeading">Dosage Schedule</h2>
               <h3 className="text-center myHeading">(Drug names)</h3>
               <br />
               <br />

               <div className="jumbotron" style={{ paddingTop: '2.25rem' }}>
                  {mapToView.renderTable(table, false)}

                  <br />
                  <br />
                  <div className="row">
                     <div className="col-4">
                        <Link to="/Nurse/Nurse5" className="btn btn-outline-primary  btn-block">
                           Back
                        </Link>
                     </div>

                     <div className="col-4">
                        <button onClick={this.submitForm} className="btn btn-primary btn-block">
                           Print
                        </button>
                     </div>

                     <div className="col-4">
                        <button onClick={this.handleModalShowHide} className="btn btn-primary btn-block">
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
export default Page6;
