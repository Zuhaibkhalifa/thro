import React from 'react';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import $ from 'jquery';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner';

import { domain } from '../../App';

class Page6 extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });

        console.log('Patient page6 - Constructor - Validator: ', this.validator);

        this.state = {
            q1_ans: '',
            q2_ans: '',
            q3_ans: '',
            q4_ans: '',
            q1_sub_ans1: '',
            q1_sub_ans2: '',
            q1_sub_ans3: '',
            q1_sub_ans4: '',
            q4_sub_ans1: '',
            q4_sub_ans2: '',
            q4_sub_ans3: '',
            q4_sub_ans4: '',
            loader: '',
            patient_id: '',
            redirectButton: false,
            nurse_add: false
        };

        this.submitForm = this.submitForm.bind(this);
        this.otherboxfunc = this.otherboxfunc.bind(this);
        this.redirectBackNurse = this.redirectBackNurse.bind(this);
        this.redirectNextPage = this.redirectNextPage.bind(this);
        this.no_error = this.no_error.bind(this);

        var element = document.getElementById('body');
        element.classList.add('blue-bg');
        //  this.test();

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };

        try {
            axios
                .get(domain + '/api/patient/page6LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Patient page6 - get Data - Success response: ', response.success);
                    let servrData = response.data.success[0];
                    if(servrData) {
                        this.setState({ 
                            loader: '',
                            q1_ans: servrData.mechanical_heart_valve,
                            q2_ans: servrData.tissue_heart_valve,
                            q3_ans: servrData.dont_know,
                            q1_sub_ans1: servrData.mechanical_heart_valve_Is_the_valve_bileaflet,
                            q1_sub_ans2: servrData.mechanical_heart_valve_Is_the_valve_ball_and_cage,
                            q1_sub_ans3: servrData.mechanical_heart_valve_Is_the_valve_tilting_disc,
                            q1_sub_ans4: servrData.mechanical_heart_valve_Is_the_valve_dont_know,
                            q4_sub_ans1: servrData.location_aortic,
                            q4_sub_ans2: servrData.location_mitral,
                            q4_sub_ans3: servrData.location_other,
                            q4_sub_ans4: servrData.location_dont_know 
                        });
                    } else {
                        this.setState({ loader: '' })
                    }
                });
        } catch (error) {
            console.error('Patient page6 - get Data - Error response: ', error);
            this.setState({ loader: '' });
            this.props.history.push('/');

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Patient page6 - get Data - Error response.data: ', error.response.data);
                console.log('Patient page6 - get Data - Error response.status: ', error.response.status);
                console.log('Patient page6 - get Data - Error response.headers: ', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('Patient page6 - get Data - Error response.request: ', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Patient page6 - get Data - Error message: ', error.message);
            }
            console.log('Patient page6 - get Data - Error config: ', error.config);
        }
    }

    mainOption() {
        if (document.getElementById('heart_valve3').checked === true) {
            document.getElementById('heart_valve1').disabled = true;
            document.getElementById('heart_valve2').disabled = true;
            $('input[name="location"]').prop('disabled', true);
            $('input[name="vte"]').prop('disabled', true);
        } else {
            document.getElementById('heart_valve1').disabled = false;
            document.getElementById('heart_valve2').disabled = false;
            $('input[name="location"]').prop('disabled', false);
            $('input[name="vte"]').prop('disabled', false);
        }
    }

    question2() {
        if (document.getElementById('valve4').checked === true) {
            document.getElementById('valve2').disabled = true;
            document.getElementById('valve3').disabled = true;
            document.getElementById('valve1').disabled = true;
        } else {
            document.getElementById('valve2').disabled = false;
            document.getElementById('valve3').disabled = false;
            document.getElementById('valve1').disabled = false;
        }
    }

    mechanical() {
        $('#mechanical').toggle(500);
    }

    otherboxfunc(e) {
        if (document.getElementById('other_opt').checked === true) {
            $('#other_box').show(500);
        } else {
            $('#other_box').hide(500);
            // this.setState({ q3_ans: e.target.value });
        }

        if (document.getElementById('loc3').checked === true) {
            document.getElementById('loc2').disabled = true;
            document.getElementById('loc1').disabled = true;
            document.getElementById('other_opt').disabled = true;
            $('#other_text_box').attr('disabled', true);
        } else {
            $('#other_text_box').attr('disabled', false);
            document.getElementById('loc2').disabled = false;
            document.getElementById('loc1').disabled = false;
            document.getElementById('other_opt').disabled = false;
        }
    }

    submitForm() {
        if (
            document.getElementById('heart_valve1').checked === false &&
            document.getElementById('heart_valve2').checked === false &&
            document.getElementById('heart_valve3').checked === false
        ) {
            this.setState({ error1: 'This field is required' });
            this.setState({ error2: '' });
            this.setState({ error3: '' });
            this.setState({ error4: '' });
            this.setState({ error5: '' });
        } else if (
            document.getElementById('heart_valve1').checked === true &&
            document.getElementById('valve1').checked === false &&
            document.getElementById('valve2').checked === false &&
            document.getElementById('valve3').checked === false &&
            document.getElementById('valve4').checked === false
        ) {
            this.setState({ error1: '' });
            this.setState({ error2: '' });
            this.setState({ error3: '' });
            this.setState({ error4: 'This field is required' });
            this.setState({ error5: '' });
        } else if (document.getElementById('heart_valve3').checked === true) {
            this.no_error();
            console.log('Patient page 6 - submit - state: ', this.state);
            this.page6(this.state);
            this.props.history.push('/User/Page7');
        } else if (
            document.getElementById('loc1').checked === false &&
            document.getElementById('loc2').checked === false &&
            document.getElementById('loc3').checked === false &&
            document.getElementById('other_opt').checked === false
        ) {
            this.setState({ error2: 'This field is required' });
            this.setState({ error1: '' });
            this.setState({ error3: '' });
            this.setState({ error4: '' });
            this.setState({ error5: '' });
        } else if (document.getElementById('other_opt').checked === true && $('#other_text_box').val() === '') {
            this.setState({ error1: '' });
            this.setState({ error2: '' });
            this.setState({ error3: '' });
            this.setState({ error4: '' });
            this.setState({ error5: 'This field is required' });
        } else {
            this.no_error();
            console.log('Patient page 6 - submit - state: ', this.state);
            this.page6(this.state);
            if(!this.state.patient_id === "") {
                this.props.history.push('/User/Page7');
            }
        }
    }

    no_error() {
        this.setState({
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
        });
    }

    

    redirectBackNurse() {
        this.submitForm();
        if(this.state.nurse_add) {
            this.props.history.push('/Nurse/add_patient')
        } else {
            this.props.history.push('/Nurse/Nurse1')
        }
    }

    redirectNextPage() {
        this.submitForm();
        if(this.state.patient_id !== "") {
           this.props.history.push({ pathname:'/Nurse/Nurse1', state:{ patient_id: this.state.patient_id } });
        }
    }

    //
    page6() {
        var param = {
            mechanical_heart_valve: this.state.q1_ans,
            tissue_heart_valve: this.state.q2_ans,
            dont_know: this.state.q3_ans,
            mechanical_heart_valve_Is_the_valve_bileaflet: this.state.q1_sub_ans1,
            mechanical_heart_valve_Is_the_valve_ball_and_cage: this.state.q1_sub_ans2,
            mechanical_heart_valve_Is_the_valve_tilting_disc: this.state.q1_sub_ans3,
            mechanical_heart_valve_Is_the_valve_dont_know: this.state.q1_sub_ans4,
            location_aortic: this.state.q4_sub_ans1,
            location_mitral: this.state.q4_sub_ans2,
            location_other: this.state.q4_sub_ans3,
            location_dont_know: this.state.q4_sub_ans4,
            patient_id: this.state.patient_id
        };
        console.log('Patient page6 - page6 func - param: ', param);
        server('patient/page6Post', param);
        // this.props.history.push('');
    }

    //

    render() {
        return (
            <React.Fragment>
                <Header patient_id={this.state.patient_id} patient_add={this.state.patient_add} />
                {this.state.loader === 1 ? (
                    <div className="centered">
                        <ReactSpinner type="border" color="bg-primary" size="5" />
                    </div>
                ) : (
                    ''
                )}
                <div>
                    <h1 className="text-center white main-heading">Heart Valve Replacement</h1>
                    <br />
                    <br />
                    <div className="bg-light blue-box">
                        {' '}
                        {/* white box */}
                        {/* Default form login */}
                        <form className="p-5" action="#!">
                            <br />
                            <br />
                            <p className="blue">
                                <b>Please specify the type of heart Valve Replacement technique that was used</b>
                            </p>
                            <label className="radio-inline blue">
                                <i className="fa fa-cog blue" aria-hidden="true" /> &nbsp; Mechanical Heart valve
                            </label>
                            <input
                                type="checkbox"
                                name="optradio"
                                className="pull-right"
                                id="heart_valve1"
                                onChange={(e) => this.setState({ q1_ans: 'Mechanical Heart valve' })}
                                onClick={this.mechanical}
                            />
                            <br />
                            <label className="radio-inline blue">
                                <i className="fa fa-male blue" aria-hidden="true" /> &nbsp; Tissue Heart Valve
                            </label>
                            <input
                                type="checkbox"
                                name="optradio"
                                className="pull-right"
                                id="heart_valve2"
                                onChange={(e) => this.setState({ q2_ans: 'Tissue Heart Valve' })}
                            />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp; <label className="radio-inline blue">I don't Know</label>
                            <input
                                type="checkbox"
                                name="optradio"
                                className="pull-right"
                                id="heart_valve3"
                                value="I dont Know"
                                onChange={(e) => this.setState({ q3_ans: 'I dont Know' })}
                                onClick={this.mainOption}
                            />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                            <div id="mechanical">
                                <p className="blue">
                                    <b>Is the valve</b>
                                </p>
                                <label className="radio-inline blue">Bileaflet</label>
                                <input
                                    type="checkbox"
                                    name="vte"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_sub_ans1: 'Bileaflet' })}
                                    id="valve1"
                                    onClick={this.question2}
                                />
                                <br />
                                <label className="radio-inline blue">Ball and Cage</label>
                                <input
                                    type="checkbox"
                                    name="vte"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_sub_ans2: 'Ball and Cage' })}
                                    id="valve2"
                                    onClick={this.question2}
                                />
                                <br />
                                <label className="radio-inline blue">Tilting Disc</label>
                                <input
                                    type="checkbox"
                                    name="vte"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_sub_ans3: 'Tilting Disc' })}
                                    id="valve3"
                                    onClick={this.question2}
                                />
                                <br />

                                <label className="radio-inline blue">I don't Know</label>
                                <input
                                    type="checkbox"
                                    name="vte"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_sub_ans4: 'I dont Know' })}
                                    id="valve4"
                                    onClick={this.question2}
                                />
                                <div className="text-danger"> {this.state.error4 !== '' ? this.state.error4 : ''}</div>
                                <br />
                            </div>
                            <div className="text-danger"> {this.state.error1 !== '' ? this.state.error1 : ''}</div>
                            <br />
                            <br />
                            <p className="blue">
                                <b>Please specify location</b>
                            </p>
                            <label className="radio-inline blue">Aortic</label>
                            <input
                                type="checkbox"
                                name="location"
                                className="pull-right"
                                onClick={this.otherboxfunc}
                                id="loc1"
                                onChange={(e) => this.setState({ q4_sub_ans1: 'Aortic' })}
                            />
                            <br />
                            <label className="radio-inline blue">Mitral</label>
                            <input
                                type="checkbox"
                                name="location"
                                className="pull-right"
                                onClick={this.otherboxfunc}
                                id="loc2"
                                onChange={(e) => this.setState({ q4_sub_ans2: 'Mitral' })}
                            />
                            <br />
                            <label className="radio-inline blue">Other</label>
                            <input
                                type="checkbox"
                                name="location"
                                className="pull-right"
                                id="other_opt"
                                onClick={this.otherboxfunc}
                            />
                            <div id="other_box">
                                <input
                                    type="text"
                                    className="form-control mb-4 transparent-custom-input"
                                    id="other_text_box"
                                    onChange={(e) => this.setState({ q4_sub_ans3: e.target.value })}
                                />
                                <div className="text-danger"> {this.state.error5 !== '' ? this.state.error5 : ''}</div>
                            </div>
                            <br />
                            <label className="radio-inline blue">I don't Know</label>
                            <input
                                type="checkbox"
                                name="location"
                                className="pull-right"
                                defaultValue=""
                                onClick={this.otherboxfunc}
                                id="loc3"
                                onChange={(e) => this.setState({ q4_sub_ans4: e.target.value })}
                            />
                            <div className="text-danger"> {this.state.error2 !== '' ? this.state.error2 : ''}</div>
                            <br />
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
                                    <li className="page-item">
                                        <button className="page-link" onClick={this.redirectNextPage}>
                                            Next Page <i className="fa fa-angle-double-right"></i>
                                        </button>
                                    </li>
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
        } else if(localStorage.getItem('patient_id') !== null) {
            this.setState({ 
                patient_id: localStorage.getItem('patient_id'),
                redirectButton: true,
                nurse_add: false 
            });
        }
        $(document).ready(function () {
            $('#other_box').hide();
            $('#mechanical').hide(500);
        });
    }
}
export default Page6;
