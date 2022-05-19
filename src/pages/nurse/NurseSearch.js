import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import axios from 'axios';
import Header from './NurseHeader';
import MUIDataTable from 'mui-datatables';
import { domain } from '../../App';

const col = [
   {
      name: 'patient_id',
      label: 'Patient Id',
      options: {
         filter: true,
         sort: true,
      },
   },
   {
      name: 'action',
      label: 'Action',
      options: {
         filter: true,
         sort: true,
      },
   },
];

let demoData = [
   {
      patient_id: '1250',
      action: <button className="btn btn-info">view profile</button>,
   },
];

const options = {
   filter: true,
   filterType: 'dropdown',
};

class NurseSearch extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loader: 1,
         patientId: '',
         testData: demoData,
      };

      this.handleAddPatient = this.handleAddPatient.bind(this);
   }

   handleAddPatient() {
      this.props.history.push('/Nurse/add_patient');
   }

   componentDidMount() {
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      axios.get(domain + '/api/getPatients', { headers: headers }).then((response) => {
         let servData = response.data.success;
         let patientData = [];
         console.log(response);
         servData.forEach((data) => {
            if (data) {
               let button =
                  data.patient_id !== null ? 
                  (
                     <button className="btn btn-info">
                        <Link
                           style={{ color: 'white', textDecoration: 'none' }}
                           to={{ pathname: '/Nurse/Nurse1', state: { patient_id: data.patient_id } }}
                        >
                           view profile
                        </Link>
                     </button>
                  ) : "";
               if(data.patient_id) {
                  patientData.push({
                     patient_id: data.patient_id,
                     action: button,
                  });
               }
            }
         });
         localStorage.setItem('patient_id', servData[0].patient_id);
         this.setState({ testData: patientData, loader: 0 });
      });
   }

   render() {
      return (
         <React.Fragment>
            <Header heading="Search Patient" />
            <div className="container">
               {this.state.loader === 1 ? (
                  <div className="centered">
                     <ReactSpinner type="border" color="blue" size="5" />
                  </div>
               ) : (
                  <div className="container-fluid">
                     <br />
                     <br />
                     <br />
                     <div className="row">
                        <div className="col-sm-12">
                           <button className="btn btn-primary" 
                              style={{ float: 'right', marginBottom: "15px" }}
                              onClick={this.handleAddPatient}
                              >
                                 <i className="fa fa-plus"></i>Add Patient
                           </button>
                        </div>
                        <div className="row"></div>
                        <div className="col-sm-12">
                           {
                              this.state.testData ?
                              <MUIDataTable
                                 title={'Patient List'}
                                 data={this.state.testData}
                                 columns={col}
                                 options={options}
                              /> : ""
                           }
                        </div>
                     </div>
                     <br />
                  </div>
               )}
            </div>
         </React.Fragment>
      );
   }
}

export default NurseSearch;
