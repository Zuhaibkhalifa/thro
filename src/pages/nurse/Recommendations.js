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
            recommendations: [],
            link: '',
            loader: ''
        };
    }

    componentDidMount() {
        try {
            document.body.style.backgroundColor = "#FFFFFF";
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
             };
            let patient_id = localStorage.getItem('patient_id');
            axios
                .get(domain + `/api/nurse/getRecommendations/:${patient_id}`, {
                    headers: headers,
                })
                .then((response) => {
                console.log('Nurse6 - res: ', response);
                if (response.data.success === 'not_found') {
                    this.setState({ loader: '' });
                    this.props.history.push('/Nurse/Nurse4');
                }

                let data = response.data.success;
                console.log('Recommendations - Response: ');
                this.setState({
                    recommendations: data,
                    link: '/Nurse/Nurse4',
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
                            <th style={{ display: 'none' }}>#Id</th>
                            <th>SL No</th>
                            <th>Last Modified</th>
                            <th>Approved By</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            this.state.recommendations.length !== 0 ?
                            this.state.recommendations.map((ele, indx) => {
                                return (
                                    <tr key={indx} style={{ borderBottom: "1px solid #ccc" }}>
                                        <td style={{ display: 'none' }}>{ele.id}</td>
                                        <td>{++indx}</td>
                                        <td>{ele.last_modified}</td>
                                        <td>{ele.approved_by}</td>
                                        <td>{ele.status}</td>
                                        <td><Link to={{ pathname: this.state.link, state: { 'recommendation_id': ele.id, 'add_new': true } }}>{this.state.link}</Link></td>
                                    </tr>
                                )
                            }) : ""
                        }
                    </table>
                    <div className="row" style={{ marginTop: '60px' }}>
                        <div className="col-3">
                            <Link to={{ pathname: "/Nurse/Nurse1", state: { 'lmwh_flag': false } }} className="btn btn-outline-primary  btn-block">
                                Back
                            </Link>
                        </div>

                        <div className="col-3"></div>
                        
                        <div className="col-3"></div>

                        <div className="col-3">
                            <Link to={{ pathname: "/Nurse/Nurse4", state: { 'add_new_recom': true } }} className="btn btn-outline-primary  btn-block">
                                Accept
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Recommendations;