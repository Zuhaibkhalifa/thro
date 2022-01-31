import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import Header from './NurseHeader';
import { domain } from '../../App';

class Recommendations extends Component {
    constructor() {
        super();

        this.state = {
            status: '',
            last_modified: '',
            approved_by: '',
            recommendations: '',
            loader: ''
        };
    }

    componentDidMount() {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
             };
            let patient_id = localStorage.getItem('patient_id');
            axios
                .get(domain + `/api/nurse/medicationJsonData/:${patient_id}`, {
                    headers: headers,
                })
                .then((response) => {
                console.log('Nurse6 - res: ', response);
                if (response.data.success === 'not_found') {
                    this.setState({ loader: '' });
                    this.props.history.push('/Nurse/Nurse3');
                }

                let data = response.data.success[0];
                console.log('Recommendations - Response: ', JSON.parse(data.jsonTable));
                this.setState({
                    approved_by: data.approved_by,
                    status: data.status,
                    last_modified: data.last_modified,
                    recommendations: '/Nurse/Nurse4',
                    loader: ''
                });
            });
        } catch(ex) {
            console.log('error ==> ', ex.message);
        }
    }

    render() {
        return (
            <>
                <Header />
                {this.state.loader === 1 ? (
                    <div className="centered">
                        <ReactSpinner type="border" color="blue" size="5" />
                    </div>
                ) : (
                ''
                )}

                <div className="container">
                    <h2 className="text-center myHeading">Recommendations</h2>
                    <h3 className="text-center myHeading">pick any recommendation to modify or move ahead</h3>
                    <br />
                    <br />
                    <br />

                    <table style={{ display: "inline-table", textAlign: 'center' }} className="table-responsive table-bordered">
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                            <th>SL No</th>
                            <th>Last Modified</th>
                            <th>Approved By</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                            <td>1</td>
                            <td>{this.state.last_modified}</td>
                            <td>{this.state.approved_by}</td>
                            <td>{this.state.status}</td>
                            <td><Link to={this.state.recommendations}>{this.state.recommendations}</Link></td>
                        </tr>
                    </table>
                    <div className="row" style={{ marginTop: '60px' }}>
                     <div className="col-4">
                        <Link to="/Nurse/Nurse1" className="btn btn-outline-primary  btn-block">
                           Back
                        </Link>
                     </div>

                     <div className="col-4"></div>

                     <div className="col-4">
                        <Link to="/Nurse/Nurse3" className="btn btn-outline-primary  btn-block">
                           Next
                        </Link>
                     </div>
                  </div>
                </div>
            </>
        );
    }
}

export default Recommendations;