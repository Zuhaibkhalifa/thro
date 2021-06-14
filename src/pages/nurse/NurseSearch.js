import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import axios from 'axios';
import Header from './NurseHeader';
import MUIDataTable from "mui-datatables";
import { server } from '../../utils/functions';
import { domain } from '../../App';
import procedures from './../../helper/procedures';


const col = [
    {
      name: "patient_id",
      label: "Patient Id",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "name",
      label: "Patient Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "nurse",
      label: "Nurse",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  
  let demoData = [{
    "patient_id": "1250",
    "email": "test@test.com",
    "name": "Test User",
    "nurse": "Claurie",
    "action":  <button className="btn btn-info">get info</button>
  }];
   
   const options = {
     filter: true,
     filterType: "dropdown"
   };
  

class NurseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loader: 1,
            patientCount: 150,
            ineligiblePatients: 12,
            activePatients: 85,
            patientId: "",
            patientName: "",
            patientEmail: "",
            totalPatients: "",
            testData: demoData
         };
    }

    componentDidMount() {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        axios.get(domain + '/api/auth/users', { headers:headers }).then((response) => {
            let servData = response.data;
            let patientData = [];
            servData.forEach( data => {
                if(data.user_role != "Admin" && data.user_role != "Nurse") {
                    patientData.push({
                        patient_id: data.id,
                        email: data.email,
                        name: data.name,
                        nurse: "Clauie",
                        action: <button className="btn btn-info"><Link style={{ color:"white", textDecoration:"none" }} to={{ pathname:'/Nurse/Nurse1', state:{ patient_id:data.id } }}>get info</Link></button>
                    });
                }
            });
            this.setState({ testData:patientData, loader: 0 });
        });
    };

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
                        <br /><br />
                        {/*---------------------------------------------------------------------------------*/}
                        <div className="row"> {/* row */}
                        <div className="db-s-box col-md-4 col-xs-12 col-sm-12"> {/* col */}
                            <h3>Total Patients</h3>
                            <i className="fa fa-users fa-2x" aria-hidden="true" />
                            <h4 className="text-left">{ this.state.patientCount }</h4>
                        </div> {/* //col */}
                        <div className="db-s-box col-md-4 col-xs-12 col-sm-12"> {/* col */}
                            <h3>Active Patients</h3>
                            <i className="fa fa-users fa-2x" aria-hidden="true" />
                            <h4 className="text-left">{ this.state.activePatients }</h4>
                        </div> {/* //col */}
                        <div className="db-s-box col-md-4 col-xs-12 col-sm-12"> {/* col */}
                            <h3>Ineligibal Patients</h3>
                            <i className="fa fa-users fa-2x" aria-hidden="true" />
                            <h4 className="text-left">{ this.state.ineligiblePatients }</h4>
                        </div> {/* //col */}
                        </div> {/* //row */}
                        <br />
                        <div className="row">
                            <div className="col-sm-12">
                                <MUIDataTable
                                  title={"Patient List"}
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