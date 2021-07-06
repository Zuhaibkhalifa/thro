import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import axios from 'axios';
import moment from 'moment';

import Header from './NurseHeader';
import { server } from '../../utils/functions';
import { domain } from '../../App';

import thromboAlgos from '../../helper/thromboAlgos';
import thromboMedicationAlgo from '../../helper/thromboMedicationAlgo';
import mapToView from '../../helper/mapMedicationDataToView';

//

let data;
class Page4 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });
      console.log(this.validator);

      this.state = { email: '', loader: '', showHide: '', table: { header: [], data: [], note: {} } };

      this.submitForm = this.submitForm.bind(this);
      this.page8 = this.page8.bind(this);
      this.onDateChange = this.onDateChange.bind(this);

      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      try {
         let patient_id = localStorage.getItem('patient_id');
         axios
            .get(domain + `/api/nurse/page8LoadData/:${patient_id}`, {
               headers: headers,
            })
            .then((response) => {
               console.log(response.data.success[0]);
               data = response.data.success[0];
               console.log("response is here: ", response);
               this.setState({ loader: '' });
               this.getDatafromAlgo()
            });
      } catch (error) {
         console.error(error);
         this.setState({ loader: '' });
      }
   }

   async getDatafromAlgo() {
      const inidcators = await thromboAlgos();
      const tableData = await thromboMedicationAlgo(inidcators);
      console.log(inidcators);
      this.setState({ table: tableData });
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
      if (this.state.table == 'none') return;

      const data = { 
         jsonTable: JSON.stringify({ ...this.state.table }),
         patient_id: localStorage.getItem('patient_id') 
      };
      console.log('>>> JSON data: ', data);
      server(`nurse/medicationJsonData/:${data.patient_id}`, data);
   }

   onDateChange(e) {
      const { value } = e.target;
      let newState = { ...this.state };

      newState.table.data[0]['d_5'] = moment(value, 'YYYY-MM-DD').subtract(5, 'd').format('YYYY-MM-DD');
      newState.table.data[1]['d_4'] = moment(value, 'YYYY-MM-DD').subtract(4, 'd').format('YYYY-MM-DD');
      newState.table.data[2]['d_3'] = moment(value, 'YYYY-MM-DD').subtract(3, 'd').format('YYYY-MM-DD');
      newState.table.data[3]['d_2'] = moment(value, 'YYYY-MM-DD').subtract(2, 'd').format('YYYY-MM-DD');
      newState.table.data[4]['d_1'] = moment(value, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD');

      newState.table.data[5].d = value;

      newState.table.data[6]['d1'] = moment(value, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD');
      newState.table.data[7]['d2'] = moment(value, 'YYYY-MM-DD').add(2, 'd').format('YYYY-MM-DD');
      newState.table.data[8]['d3'] = moment(value, 'YYYY-MM-DD').add(3, 'd').format('YYYY-MM-DD');
      newState.table.data[9]['d4'] = moment(value, 'YYYY-MM-DD').add(4, 'd').format('YYYY-MM-DD');
      newState.table.data[10]['d5'] = moment(value, 'YYYY-MM-DD').add(5, 'd').format('YYYY-MM-DD');

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
            <div className="container">
               <h2 className="text-center myHeading">Dosage Schedule</h2>
               <h3 className="text-center myHeading">(Drug names)</h3>
               <br />
               <br />

               <div className="jumbotron" style={{ paddingTop: '2.25rem' }}>
                  {mapToView.renderTable(table, this.onDateChange, true)}

                  <br />
                  <br />
                  <div className="row">
                     <div className="col-4">
                        <Link to="/Nurse/Nurse3" className="btn btn-outline-primary  btn-block">
                           Back
                        </Link>
                     </div>

                     <div className="col-4"></div>

                     <div className="col-4">
                        <button onClick={this.submitForm} className="btn btn-primary btn-block">
                           Next
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
export default Page4;
