import React from 'react';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import $ from 'jquery';
import axios from 'axios';
import Header from './Header';

import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';

import { domain } from '../../App';

//
//

class Page7 extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });
        // console.log("Patient page7 - Constructor - Validator: ", this.validator);

        this.state = {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q5_sub: '',
            q6: '',
            chkVal: '',
            loader: '',
            patient_id: '',
            redirectButton: false,
            nurse_add: false
        };

        this.submitForm = this.submitForm.bind(this);
        this.redirectBackNurse = this.redirectBackNurse.bind(this);
        this.redirectNextPage = this.redirectNextPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNone = this.handleChangeNone.bind(this);

        //
        var element = document.getElementById('body');
        element.classList.add('blue-bg');

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };

        try {
            axios
                .get(domain + '/api/patient/page7LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Patient page7 - Get Data - Success response: ', response);
                    let servrData = response.data.success[0];

                    if(servrData) {
                        this.setState({ 
                            loader: '',
                            q1: servrData.cognitive_heart_failure,
                            q2: servrData.high_blood_pressure,
                            q3: servrData.diabetes,
                            q4: servrData.mitral_stenosis,
                            q5: servrData.stroke_or_mini_stroke,
                            q5_sub: servrData.stroke_how_long,
                            q6: servrData.none_of_above, 
                        });
                    } else {
                        this.setState({ loader: '' })
                    }
                });
        } catch (error) {
            console.error('Patient page7 - Get Data - Error response: ', error);
            this.setState({ loader: '' });
            this.props.history.push('/');
        }
    }

    // Validation Rules in one place
    //    Simplified the Validation code
    validate() {
        const { q1, q2, q3, q4, q5, q5_sub, q6 } = this.state;
        let errors = { error1: '', error2: '' };

        let q5_radio_selected = q5_sub === '' ? false : true;

        if (q1 === '' && q2 === '' && q3 === '' && q4 === '' && q5 === '' && q6 === '')
            errors.error1 = 'The field is required, PLease select atleast 1 Option';
        else if (q5 !== '' && q5_radio_selected === false)
            errors.error2 = 'This field is required, PLease select atleast 1 Option';

        return errors;
    }

    // Checks for any Voilations in Form
    //    if it passes Validation then send Data to Server
    submitForm() {
        const { error1, error2 } = this.validate();

        if (error1 !== '' || error2 !== '') {
            this.setState({ error1, error2 }, () => {
                console.log('Page7- submitForm Error - state: ', this.state);
            });
        } else {
            this.page7(this.state);
            this.props.history.push('/User/Page8');
        }
    }

    // Question5 Answer is bit Tricky
    //    So tried to encapsulate the logic in one place
    //    If Q5 is selected then it will Show the Options with Animation
    //    If Q5 is Unselected then it will make sure to Unselect any selected Options in Q5_Answer_Radio_Options and Hides the Options
    q5_ans_smartToggle(id, checked) {
        if (id === 'q5') {
            if (checked === false) {
                $('input:radio[name=dvt]:checked').prop('checked', false);
                $('#de').hide(500);
                this.setState({ q5_sub: '' });
            } else {
                $('#de').show(500);
            }
        }
    }

    // Smart Handler for [Q1, Q2, Q3, Q4, Q5]
    //    will populate the appropriate value in State Object based on Event e
    //    It will makes sure to Nullify appropriate values in State Object, If its Unselected(Before it was selected)
    handleChange(e) {
        const { id, value, checked } = e.target;

        const updatedValue = this.state[id] === '' ? value : '';
        this.setState({ [id]: updatedValue });

        this.q5_ans_smartToggle(id, checked);
    }

    // Special Handler for Q6
    //    If Q6 is selected, It will Unselect and Disable [Q1, Q2, Q3, Q4, Q5], Even clear Q5_Answer_Radio_Options by calling q5_ans_smartToggle
    //    If Q6 is Unselected, It will Enable [Q1, Q2, Q3, Q4, Q5]
    handleChangeNone(e) {
        const { id, value, checked } = e.target;
        const options = ['q1', 'q2', 'q3', 'q4', 'q5'];
        let nullState = {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q5_sub: '',
            q6: '',
            chkVal: '',
            loader: '',
        };

        let disableOtions = checked === true ? true : false;

        options.forEach((optn) => {
            document.getElementById(optn).checked = false;
            document.getElementById(optn).disabled = disableOtions;
        });
        this.q5_ans_smartToggle('q5', false);

        if (disableOtions) nullState[id] = value;
        this.setState(nullState, () => console.log('handleChangeNone - AFTER state: ', this.state));
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
           this.props.history.push({ pathname:'/User/Page13', state:{ patient_id: this.state.patient_id } });
        }
    }

    // Prepare Data to be sent to Server
    page7(parms) {
        let param = {
            cognitive_heart_failure: this.state.q1,
            high_blood_pressure: this.state.q2,
            diabetes: this.state.q3,
            mitral_stenosis: this.state.q4,
            stroke_or_mini_stroke: this.state.q5,
            stroke_how_long: this.state.q5_sub,
            none_of_above: this.state.q6,
            patient_id: this.state.patient_id
        };

        console.log('Patient page7 - page7 func - param: ', parms);
        server('patient/page7', param);
    }

    //
    //
    //

    render() {
        const { handleChange, handleChangeNone } = this;

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
                <h1 className="text-center white main-heading">Potential Diagnosis</h1>
                <br />
                <br />
                <div className="bg-light blue-box">
                    {' '}
                    {/* white box */}
                    {/* Default form login */}
                    <form className="p-5" action="#!">
                        <p className="blue">
                            <b>Please Indicate if you have ever been diagnosed with any of the following</b>
                        </p>
                        <label className="radio-inline blue">Cognitive Heart Failure (ever)</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            onClick={handleChange}
                            id="q1"
                            value="Yes"
                        />

                        <br />
                        <label className="radio-inline blue">
                            High Blood Pressure (or have had high blood pressure in the past)
                        </label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            onClick={handleChange}
                            id="q2"
                            value="Yes"
                        />
                        <br />

                        <label className="radio-inline blue">Diabetes</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            onClick={handleChange}
                            value="Yes"
                            id="q3"
                        />
                        <br />
                        <label className="radio-inline blue">Mitral Stenosis</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            className="pull-right"
                            onClick={handleChange}
                            value="Yes"
                            id="q4"
                        />
                        <br />
                        <label className="radio-inline blue">Stroke or Mini-Stroke</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            id="q5"
                            value="Yes"
                            className="pull-right"
                            onClick={this.handleChange}
                        />

                        <br />
                        <div id="de">
                            <p className="blue">
                                <b>If So, how long ago</b>
                            </p>
                            <label className="radio-inline blue">Less than 1 month ago</label>
                            <input
                                type="radio"
                                name="dvt"
                                id="dvt1"
                                className="pull-right"
                                value="Less than 1 month ago"
                                onChange={(e) => this.setState({ q5_sub: e.target.value })}
                            />
                            <br />
                            <label className="radio-inline blue">Between 1 and 3 months ago</label>
                            <input
                                type="radio"
                                name="dvt"
                                id="dvt2"
                                className="pull-right"
                                value="Between 1 and 3 months ago"
                                onChange={(e) => this.setState({ q5_sub: e.target.value })}
                            />
                            <br />
                            <label className="radio-inline blue">More than 3 months ago</label>
                            <input
                                type="radio"
                                name="dvt"
                                id="dvt3"
                                className="pull-right"
                                value="More than 3 months ago"
                                onChange={(e) => this.setState({ q5_sub: e.target.value })}
                            />
                            <br />
                            <label className="radio-inline blue">Not Sure</label>
                            <input
                                type="radio"
                                name="dvt"
                                id="dvt4"
                                value="Not Sure"
                                className="pull-right"
                                onChange={this.handleRadioChange}
                            />
                            <div className="text-danger"> {this.state.error2 !== '' ? this.state.error2 : ''}</div>
                        </div>

                        <label className="radio-inline blue">None Of Above</label>
                        <input
                            type="checkbox"
                            name="optradio"
                            id="q6"
                            value="Name of Diagnose is Not in the Options Provided"
                            className="pull-right"
                            onClick={handleChangeNone}
                        />
                        <div className="text-danger"> {this.state.error1 !== '' ? this.state.error1 : ''}</div>
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
            </React.Fragment>
        );
    }

    //
    componentDidMount() {
        console.log(this.props);
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
            $('#de').hide();
        });
    }
}
export default Page7;
