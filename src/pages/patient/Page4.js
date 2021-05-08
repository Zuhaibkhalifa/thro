import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';

import $ from 'jquery';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner';

import { domain } from '../../App';

class Page4 extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });

        console.log('Patient page 4 - Constructor - validator: ', this.validator);

        this.state = {
            q1_ans: '',
            q1_sub_q1_ans: '',
            q1_sub_q1_ans_inner1: '',
            q1_sub_q2_ans: '',
            q1_sub_q2_ans_inner2: '',
            q3_ans: '',
            q4_ans: '',
            q5_ans: '',
            q6_ans: '',
            q7_ans: '',
            q7_sub_ans: '',
            q8_ans: '',
            chkVal: '',
            chkSubValidation: '',
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
            loader: '',
        };

        this.submitForm = this.submitForm.bind(this);
        this.mainOption = this.mainOption.bind(this);
        this.onRadioBtn1 = this.onRadioBtn1.bind(this);
        this.onRadioBtn2 = this.onRadioBtn2.bind(this);
        this.no_errors = this.no_errors.bind(this);

        //

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
                .get(domain + '/api/patient/page4LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Patient page 4 - Constructor - Success Response: ', response);

                    this.setState({ loader: '' });
                });
        } catch (error) {
            console.error('Patient page 4 - Constructor - Response Error: ', error);
            this.setState({ loader: '' });
        }
    }

    //
    submitForm() {
        //var chk=this.renderElement();

        if (!$("input[name='optradio']:checked").val()) {
            this.setState({ error1: 'This field is required' });
        } else if (
            document.getElementById('vte').checked === true &&
            document.getElementById('dvt_option1').checked === false &&
            document.getElementById('pe_option1').checked === false
        ) {
            this.setState({ error1: '' });
            this.setState({ error2: 'This field is required' });
        } else if (
            document.getElementById('vte').checked === true &&
            document.getElementById('dvt_option1').checked === true &&
            !$("input[name='dvt_sub_opt']:checked").val()
        ) {
            this.setState({ error1: '' });
            this.setState({ error2: '' });
            this.setState({ error3: 'This field is required' });
        } else if (
            document.getElementById('vte').checked === true &&
            document.getElementById('pe_option1').checked === true &&
            !$("input[name='pe_sub_option']:checked").val()
        ) {
            this.setState({ error1: '' });
            this.setState({ error2: '' });
            this.setState({ error3: '' });
            this.setState({ error4: 'This field is required' });
        } else if (
            document.getElementById('optradio7').checked === true &&
            document.getElementById('reason').value === ''
        ) {
            this.setState({ error1: '' });
            this.setState({ error2: '' });
            this.setState({ error3: '' });
            this.setState({ error4: '' });
            this.setState({ error5: 'This field is required' });
        }
        // else if (document.getElementById('hvr').checked === true) {
        //     this.page4();
        //     this.props.history.push('/User/Page6');
        // }
        else {
            this.no_errors();
            console.log('Patient page 4 - SubmitForm - State: ', this.state);
            this.page4();
            this.props.history.push('/User/Page6');
        }
    }

    page4() {
        var param = {
            venous_thromboelism: this.state.q1_ans,

            dvt: this.state.q1_sub_q1_ans,
            dvt_how_long_ago: this.state.q1_sub_q1_ans_inner1,

            pe: this.state.q1_sub_q2_ans,
            pe_dvt_how_long_ago: this.state.q1_sub_q2_ans_inner2,

            atrial_fibrillation_of_flutter: this.state.q2_ans,
            heart_valve_replacement: this.state.q3_ans,
            blood_clot_in_heart: this.state.q4_ans,
            arterial_peripheral_thrombosis: this.state.q5_ans,

            peripheral_arterial_disease: this.state.q6_ans,
            other: this.state.q7_sub_ans,

            none: this.state.q8_ans,
        };

        console.log('Patient Page 4 - Page4 Func: ', param);
        server('patient/page4Post', param);
        //this.props.history.push('');
    }

    mainOption() {
        this.setState({ q8_ans: 'Yes' });
        if (document.getElementById('optradio8').checked === true) {
            document.getElementById('de').style.display = 'none';
            document.getElementById('vte').disabled = true;
            document.getElementById('mainOption2').disabled = true;
            document.getElementById('mainOption3').disabled = true;
            document.getElementById('mainOption4').disabled = true;
            document.getElementById('mainOption5').disabled = true;
            document.getElementById('optradio7').disabled = true;
            document.getElementById('hvr').disabled = true;

            this.setState({
                q1_ans: '',
                q2_ans: '',
                q3_ans: '',
                q4_ans: '',
                q5_ans: '',
                q6_ans: '',
                q7_ans: '',
                q8_ans: '',
                q5_ans: '',

                q1_sub_q1: '',
                q1_sub_q2: '',
                q1_sub_q1_ans: '',
                q1_sub_q2_ans: '',
                q1_inner_q1: '',
                q1_inner_q2: '',
                q1_inner_q1_ans: '',
                q1_inner_q2_ans: '',
            });
        } else {
            document.getElementById('vte').disabled = false;
            document.getElementById('mainOption2').disabled = false;
            document.getElementById('mainOption3').disabled = false;
            document.getElementById('mainOption4').disabled = false;
            document.getElementById('mainOption5').disabled = false;
            document.getElementById('optradio7').disabled = false;

            document.getElementById('hvr').disabled = false;
        }
    }

    onRadioBtn1() {
        $('#toggle1').toggle(1000);
    }

    onRadioBtn2() {
        $('#toggle2').toggle(1000);
    }

    showhide() {
        if (document.getElementById('optradio7').checked === true) {
            $('#de').show(1000);
        } else {
            $('#de').hide(1000);
        }
    }

    showhidevte() {
        $('#toggle').toggle(1000);
        $('#toggle1').hide(1000);
        $('#toggle2').hide(1000);
    }

    checkUncheck() {
        document.getElementById('vte_option2').checked = false;
        document.getElementById('vte_option1').checked = false;
    }

    no_errors() {
        this.setState({
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
        });
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
                <h1 className="text-center white main-heading">Have you experienced any of the following</h1>
                <br />
                <br />
                <div className="bg-light blue-box">
                    {' '}
                    {/* white box */}
                    {/* Default form login */}
                    <form id="pg4" className="p-5" action="#!">
                        {/*<h4 class="text-center blue">Have you had a blood clot white your blood thinner was interrupted?</h4> */}
                        <br />
                        <br />
                        <label className="radio-inline blue">Venous Thromboembolism (VTE)</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            value="Yes"
                            className="pull-right"
                            onChange={(e) => this.setState({ q1_ans: 'Yes', chkVal: 1 })}
                            id="vte"
                            onClick={this.showhidevte}
                        />

                        <div id="toggle">
                            <label className="radio-inline blue">DVT</label>
                            <input
                                type="checkbox"
                                id="dvt_option1"
                                name="dvt_option"
                                className="pull-right"
                                onClick={this.onRadioBtn1}
                                onChange={(e) => this.setState({ q1_sub_q1_ans: 'Yes' })}
                            />
                            <div id="toggle1">
                                <p className="blue">
                                    <b>If So, how long ago</b>
                                </p>
                                <label className="radio-inline blue">Less than 1 month ago</label>
                                <input
                                    type="radio"
                                    name="dvt_sub_opt"
                                    id="dvt_option1"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q1_ans_inner1: 'Less than 1 month ago',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">Between 1 and 3 months ago</label>
                                <input
                                    type="radio"
                                    name="dvt_sub_opt"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q1_ans_inner1: 'Between 1 and 3 months ago',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">More than 3 months ago</label>
                                <input
                                    type="radio"
                                    name="dvt_sub_opt"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q1_ans_inner1: 'More than 3 months ago<',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">Not Sure</label>
                                <input
                                    type="radio"
                                    name="dvt_sub_opt"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q1_ans_inner1: 'Not Sure',
                                        })
                                    }
                                />
                                <div className="text-danger"> {this.state.error3 !== '' ? this.state.error3 : ''}</div>
                            </div>

                            <br />
                            <label className="radio-inline blue">PE</label>
                            <input
                                type="checkbox"
                                id="pe_option1"
                                name="pe_option"
                                className="pull-right"
                                onClick={this.onRadioBtn2}
                                onChange={(e) => this.setState({ q1_sub_q2_ans: 'Yes' })}
                            />
                        </div>

                        <div id="toggle2">
                            <p className="blue">
                                <b>If So, how long ago</b>
                            </p>
                            <label className="radio-inline blue">Less than 1 month ago</label>
                            <input
                                type="radio"
                                name="pe_sub_option"
                                className="pull-right"
                                onChange={(e) =>
                                    this.setState({
                                        q1_sub_q2_ans_inner2: 'Less than 1 month ago',
                                    })
                                }
                            />
                            <br />
                            <label className="radio-inline blue">Between 1 and 3 months ago</label>
                            <input
                                type="radio"
                                name="pe_sub_option"
                                className="pull-right"
                                onChange={(e) =>
                                    this.setState({
                                        q1_sub_q2_ans_inner2: 'Between 1 and 3 months ago',
                                    })
                                }
                            />
                            <br />
                            <label className="radio-inline blue">More than 3 months ago</label>
                            <input
                                type="radio"
                                name="pe_sub_option"
                                className="pull-right"
                                onChange={(e) =>
                                    this.setState({
                                        q1_sub_q2_ans_inner2: 'More than 3 months ago',
                                    })
                                }
                            />
                            <br />
                            <label className="radio-inline blue">Not Sure</label>
                            <input
                                type="radio"
                                name="pe_sub_option"
                                className="pull-right"
                                onChange={(e) => this.setState({ q1_sub_q2_ans_inner2: 'Not Sure' })}
                            />
                            <div className="text-danger"> {this.state.error4 !== '' ? this.state.error4 : ''}</div>
                        </div>

                        <br />

                        <div className="text-danger"> {this.state.error2 !== '' ? this.state.error2 : ''}</div>

                        <label className="radio-inline blue">Atrial Fibrillation of flutter</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            onChange={(e) => this.setState({ q2_ans: 'Yes', chkVal: 1 })}
                            onClick={this.showhide}
                            id="mainOption2"
                        />
                        <br />
                        <label className="radio-inline blue">Heart Valve Replacement</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            id="hvr"
                            onChange={(e) => this.setState({ q3_ans: 'Yes', chkVal: 1 })}
                        />
                        <br />
                        <label className="radio-inline blue">Blood clot in heart</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            value="1"
                            defaultChecked={this.state.q4_ans === '1'}
                            onChange={(e) => this.setState({ q4_ans: 'Yes', chkVal: 1 })}
                            onClick={this.showhide}
                            id="mainOption3"
                        />
                        <br />
                        <label className="radio-inline blue">Arterial Peripheral Thrombosis</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            onChange={(e) => this.setState({ q5_ans: 'Yes', chkVal: 1 })}
                            onClick={this.showhide}
                            id="mainOption4"
                        />
                        <br />
                        <label className="radio-inline blue">Peripheral arterial Disease</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            onChange={(e) => this.setState({ q6_ans: 'Yes', chkVal: 1 })}
                            onClick={this.showhide}
                            id="mainOption5"
                        />
                        <br />
                        <label className="radio-inline blue">Other</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            id="optradio7"
                            value="Other"
                            className="pull-right"
                            onClick={this.showhide}
                            onChange={(e) => this.setState({ q7_ans: 'Other', chkVal: 1 })}
                        />
                        <div id="de">
                            <label className="radio-inline blue">Reason for treatment with blood</label>
                            <input
                                type="text"
                                id="reason"
                                className="form-control mb-4 transparent-custom-input"
                                placeholder="Reason for treatment with blood"
                                defaultValue={this.state.q7_sub_ans}
                                onChange={(e) => this.setState({ q7_sub_ans: e.target.value })}
                            />
                            <div className="text-danger"> {this.state.error5 !== '' ? this.state.error5 : ''}</div>
                        </div>

                        <br />
                        <label className="radio-inline blue">None Of The Above</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            id="optradio8"
                            className="pull-right"
                            onChange={(e) => this.setState({ q8_ans: 'Yes', chkVal: 1 })}
                            onClick={this.mainOption}
                        />
                        <br />

                        {/* input */}
                        <div>
                            <br />

                            <div className="text-danger"> {this.state.error1 !== '' ? this.state.error1 : ''}</div>
                        </div>
                    </form>
                    {/* Default form login */}
                    <nav aria-label="Page navigation example">
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
                        </ul>
                    </nav>
                    <br />
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        $('#de').hide();
        $('#toggle').hide();
        $('#toggle1').hide();
        $('#toggle2').hide();

        $(document).ready(function () {});
    }
}
export default Page4;
