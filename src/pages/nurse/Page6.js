import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import $ from 'jquery';
import axios from 'axios';

import Header from './NurseHeader';
import { server } from '../../utils/functions';
import { Button, Modal } from 'react-bootstrap';
import Logo from '../../assets/img/3.png';
import { domain } from '../../App';
import indicationAlgo from '../../helper/thromboAlgo';

//

let data;
class Page6 extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });
        console.log(this.validator);
        this.state = { email: '', loader: '', showHide: '' };

        this.submitForm = this.submitForm.bind(this);
        this.handleModalShowHide = this.handleModalShowHide.bind(this);

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };

        try {
            axios
                .get(domain + '/api/nurse/page8LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log(response.data.success[0]);
                    data = response.data.success[0];
                    this.setState({ loader: '' });
                });
        } catch (error) {
            console.error(error);
            this.setState({ loader: '' });
        }

        indicationAlgo();
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide });
    }

    submitForm() {
        // this.props.history.push('/Nurse/Nurse7');

        window.print();
    }

    page8(param) {
        server('nurse/page8', param);
    }

    render() {
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
                            Thank you for completing the Bridging Form, Please keep a copy of the Medication Schedule
                            for your records.
                        </p>
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-block big-btn-white"
                                    data-dismiss="modal"
                                    onClick={this.handleModalShowHide}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="container">
                    <h2 className="text-center myHeading">Dosage Schedule</h2>
                    <h3 className="text-center myHeading">(Drug names)</h3>
                    <br />
                    <br />

                    <div className="jumbotron">
                        <br />
                        <br />
                        {/*-----------------------------------------------------------------------------------------------*/}
                        {/* <div class="container-table100">
                            <div class="wrap-table100">
                                <div class="table100">
                                    <table>
                                        <thead>
                                            <tr class="table100-head">
                                                <th class="column1">Date</th>
                                                <th class="column2">Lovenox Time</th>
                                                <th class="column3">Lovenox Dosage</th>
                                                <th class="column4">Warfarin Time</th>
                                                <th class="column5">Warfarin Dosage</th>
                                                <th class="column6">Comment</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td class="column1">T - 5</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">No warfarin</td>
                                                <td class="column5">Warfarin</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">T - 4</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">No warfarin</td>
                                                <td class="column5">Warfarin</td>
                                                <td class="column6">Comment</td>
                                            </tr>

                                            <tr>
                                                <td class="column1">T - 3</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">No warfarin</td>
                                                <td class="column5">Warfarin</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">T - 2</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">No warfarin</td>
                                                <td class="column5">Warfarin</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">T - 1</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">No warfarin</td>
                                                <td class="column5">Warfarin</td>
                                                <td class="column6">Comment</td>
                                            </tr>

                                            <tr>
                                                <td class="column1">T - 0</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">No warfarin</td>
                                                <td class="column5">20 mg</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">T + 1</td>
                                                <td class="column2">No lovenox</td>
                                                <td class="column3">--</td>
                                                <td class="column4">6:00 PM</td>
                                                <td class="column5">20 mg</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">T + 2</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">6:00 PM</td>
                                                <td class="column5">10 mg</td>
                                                <td class="column6">Comment</td>
                                            </tr>

                                            <tr>
                                                <td class="column1">T + 3</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">6:00 PM</td>
                                                <td class="column5">10 mg</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">T + 4</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">6:00 PM</td>
                                                <td class="column5">10 mg</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">T + 5</td>
                                                <td class="column2">8:00 AM - 8:00 PM</td>
                                                <td class="column3">1 needle</td>
                                                <td class="column4">6:00 PM</td>
                                                <td class="column5">10 mg</td>
                                                <td class="column6">Comment</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                         */}
                        <div class="container-table100">
                            <div class="wrap-table100">
                                <div class="table">
                                    <div class="tableRow header">
                                        <div class="cell">Date</div>
                                        <div class="cell">Lovenox Time</div>
                                        <div class="cell">Lovenox Dosage</div>
                                        <div class="cell">Warfarin Time</div>
                                        <div class="cell">Warfarin Dosage</div>
                                        <div class="cell">Comment</div>
                                    </div>

                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T - 5
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            8:00 AM - 8:00 PM
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            1 needle
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>
                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T - 4
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            8:00 AM - 8:00 PM
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            1 needle
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>

                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T - 3
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            8:00 AM - 8:00 PM
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            1 needle
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>
                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T - 2
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            8:00 AM - 8:00 PM
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            1 needle
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>

                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T - 1
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            8:00 AM - 8:00 PM
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            1 needle
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>

                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T - 0
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            8:00 AM - 8:00 PM
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            1 needle
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            6:00 PM
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            20 mg
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>

                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T + 1
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            6:00 PM
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            20 mg
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>
                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T + 2
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            6:00 PM
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            20 mg
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>

                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T + 3
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            6:00 PM
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            10 mg
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>
                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T + 4
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            6:00 PM
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            10 mg
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>

                                    <div class="tableRow">
                                        <div class="cell" data-title="Date">
                                            T + 5
                                        </div>
                                        <div class="cell" data-title="Lovenox Time">
                                            --
                                        </div>
                                        <div class="cell" data-title="Lovenox Dosage">
                                            --
                                        </div>
                                        <div class="cell" data-title="Warfarin Time">
                                            6:00 PM
                                        </div>
                                        <div class="cell" data-title="Warfarin Dosage">
                                            10 mg
                                        </div>
                                        <div class="cell" data-title="Comment">
                                            Comment
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*-----------------------------------------------------------------------------------------------*/}
                        <br /> <br />
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
    componentDidMount() {}
}
export default Page6;
