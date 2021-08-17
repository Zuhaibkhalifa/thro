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
      name: 'user_id',
      label: 'User Id',
      options: {
         filter: true,
         sort: true,
      },
   },
   {
      name: 'name',
      label: 'Patient Name',
      options: {
         filter: true,
         sort: true,
      },
   },
   {
      name: 'email',
      label: 'Email',
      options: {
         filter: true,
         sort: true,
      },
   },
   {
      name: 'age',
      label: 'Age',
      options: {
         filter: true,
         sort: true,
      },
   },
   {
      name: 'weight',
      label: 'Weight',
      options: {
         filter: true,
         sort: true,
      },
   },
   {
      name: 'nurse',
      label: 'Nurse',
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
      user_id: '34',
      name: 'Test User',
      email: 'test@test.com',
      age: '22',
      weight: '65kg',
      sex: 'male',
      nurse: 'Claurie',
      action: <button className="btn btn-info">get info</button>,
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
         patientCount: 150,
         ineligiblePatients: 12,
         activePatients: 85,
         patientId: '',
         patientName: '',
         patientEmail: '',
         totalPatients: '',
         testData: demoData,
      };
   }

   componentDidMount() {
      const headers = {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      axios.get(domain + '/api/users', { headers: headers }).then((response) => {
         let servData = response.data;
         let patientData = [];
         console.log(response);
         servData.forEach((data) => {
            if (data.user_role !== 'Admin' && data.user_role !== 'Nurse') {
               let weight = data.weight + data.weight_unit;
               let patient_id = data.id;
               let button =
                  data.patient_id == null ? (
                     <button className="btn btn-info" disabled={true}>
                        <Link
                           style={{ color: 'white', textDecoration: 'none', pointerEvents: 'none' }}
                           to={{ pathname: '/Nurse/Nurse1', state: { patient_id: patient_id } }}
                        >
                           get info
                        </Link>
                     </button>
                  ) : (
                     <button className="btn btn-info">
                        <Link
                           style={{ color: 'white', textDecoration: 'none' }}
                           to={{ pathname: '/Nurse/Nurse1', state: { patient_id: patient_id } }}
                        >
                           get info
                        </Link>
                     </button>
                  );
               patientData.push({
                  patient_id: data.patient_id ? data.patient_id : 'Profile Not Completed',
                  user_id: data.id ? data.id : 'Profile Not Completed',
                  name: data.name ? data.name : 'Profile Not Completed',
                  email: data.email ? data.email : 'Profile Not Completed',
                  age: data.age ? data.age : 'Profile Not Completed',
                  weight: weight ? weight : 'Profile Not Completed',
                  sex: data.gender ? data.gender : 'Profile Not Completed',
                  nurse: data.physicianName ? data.physicianName : 'Profile Not Completed',
                  action: button,
               });
            }
         });
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
                     {/*---------------------------------------------------------------------------------*/}
                     {/* <div className="row"> 
                          <div className="db-s-box col-md-4 col-xs-12 col-sm-12"> 
                              <h3>Total Patients</h3>
                              <i className="fa fa-users fa-2x" aria-hidden="true" />
                              <h4 className="text-left">{ this.state.patientCount }</h4>
                          </div> 
                          <div className="db-s-box col-md-4 col-xs-12 col-sm-12"> 
                              <h3>Active Patients</h3>
                              <i className="fa fa-users fa-2x" aria-hidden="true" />
                              <h4 className="text-left">{ this.state.activePatients }</h4>
                          </div> 
                          <div className="db-s-box col-md-4 col-xs-12 col-sm-12"> 
                              <h3>Ineligibal Patients</h3>
                              <i className="fa fa-users fa-2x" aria-hidden="true" />
                              <h4 className="text-left">{ this.state.ineligiblePatients }</h4>
                          </div> 
                        </div>  */}

                     <br />
                     <div className="row">
                        <div className="col-sm-12">
                           <MUIDataTable
                              title={'Patient List'}
                              data={this.state.testData}
                              columns={col}
                              options={options}
                           />
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
