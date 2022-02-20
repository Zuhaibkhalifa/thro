import React from 'react';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import $ from 'jquery';
import axios from 'axios';
import Header from './Header';
import moment from 'moment';

import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import { domain } from '../../App';

//

//
//

class Page13 extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });

        this.state = {
            q1_ans: '',
            q1_ans_option: '',
            q2_ans: '',
            q2_ans_option: '',
            q3_ans: '',
            q3_ans_option: '',
            q4_ans: '',
            q5_ans: '',
            q6_ans: '',
            q7_ans: '',
            q7_ans_option: '',
            loader: '',
            transfusionDate: { minDate: '', maxDate: '' },
            patient_id: '',
            redirectButton: false,
            nurse_add: false
        };

        // Bind " this " re of class to Methods
        this.submitForm = this.submitForm.bind(this);
        this.redirectBackNurse = this.redirectBackNurse.bind(this);
        this.redirectNextPage = this.redirectNextPage.bind(this);

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
                .get(domain + '/api/patient/page13LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log(response);
                    // let servrData = response.data.success[0];
                    // if(servrData) {
                    //     this.setState({ 
                    //         loader: '',
                    //         q1_ans: servrData.bleeding_requiring_treatment,
                    //         q1_ans_option: servrData.bleeding_requiring_treatment_last_three_months,
                    //         q2_ans: servrData.bleeding_from_stomach,
                    //         q2_ans_option: servrData.bleeding_from_stomach_last_three_months,
                    //         q3_ans: servrData.ulcer_in_stomach_or_bowel,
                    //         q3_ans_option: servrData.ulcer_in_stomach_or_bowel_last_three_months,
                    //         q4_ans: servrData.liver_disease,
                    //         q5_ans: servrData.kidney_disease,
                    //         q6_ans: servrData.not_sure,
                    //         q7_ans: servrData.had_transfusion_in_last_three_months,
                    //         q7_ans_option: servrData.had_transfusion_in_last_three_months_when
                    //     });
                    // } else {
                    // }
                    this.setState({ loader: '' });
                });
        } catch (error) {
            console.error(error);
            this.setState({ loader: '' });
            this.props.history.push('/');
        }
    }

    //
    //

    toggleOptions2() {
        if (document.getElementById('optradio_not_sure_main').checked === true) {
            document.getElementById('optradio_yes').disabled = true;
            document.getElementById('optradio_no').disabled = true;
        } else {
            document.getElementById('optradio_yes').disabled = false;
            document.getElementById('optradio_no').disabled = false;
        }
    }

    toggleOptions() {
        if (document.getElementById('seven').checked === true) {
            document.getElementById('one').disabled = true;
            document.getElementById('two').disabled = true;
            document.getElementById('three').disabled = true;
            document.getElementById('four').disabled = true;
            document.getElementById('six').disabled = true;
            document.getElementById('oneone').disabled = true;
            document.getElementById('twotwo').disabled = true;
            document.getElementById('threethree').disabled = true;
            document.getElementById('oneone_freq1').disabled = true;
            document.getElementById('oneone_freq2').disabled = true;
            document.getElementById('oneone_freq3').disabled = true;
            document.getElementById('twotwo_freq1').disabled = true;
            document.getElementById('twotwo_freq2').disabled = true;
            document.getElementById('twotwo_freq3').disabled = true;
            document.getElementById('threethree_freq1').disabled = true;
            document.getElementById('threethree_freq2').disabled = true;
            document.getElementById('threethree_freq3').disabled = true;
        } else {
            document.getElementById('one').disabled = false;
            document.getElementById('two').disabled = false;
            document.getElementById('three').disabled = false;
            document.getElementById('four').disabled = false;
            document.getElementById('six').disabled = false;
            document.getElementById('oneone').disabled = false;
            document.getElementById('twotwo').disabled = false;
            document.getElementById('threethree').disabled = false;
            document.getElementById('oneone_freq1').disabled = false;
            document.getElementById('oneone_freq2').disabled = false;
            document.getElementById('oneone_freq3').disabled = false;
            document.getElementById('twotwo_freq1').disabled = false;
            document.getElementById('twotwo_freq2').disabled = false;
            document.getElementById('twotwo_freq3').disabled = false;
            document.getElementById('threethree_freq1').disabled = false;
            document.getElementById('threethree_freq2').disabled = false;
            document.getElementById('threethree_freq3').disabled = false;
        }
    }

    redirectBackNurse() {
       this.submitForm();
       if(this.state.nurse_add) {
        this.props.history.push('/Nurse/Nurse1')
       } else {
          this.props.history.push('/Nurse/Nurse1')
       }
    }
    
    redirectNextPage() {
        this.submitForm();
        console.log(this.props);
        // if(this.state.patient_id !== "") {
        //     this.props.history.push({ pathname:'/User/Page14', state:{ patient_id: this.state.patient_id } });
        // }
    }

    submitForm() {
        if (
            document.getElementById('one').checked === false &&
            document.getElementById('two').checked === false &&
            document.getElementById('three').checked === false &&
            document.getElementById('four').checked === false &&
            document.getElementById('six').checked === false &&
            document.getElementById('seven').checked === false
        ) {
            this.setState({ error1: 'This field is required' });
        } else if (
            document.getElementById('optradio_yes').checked === false &&
            document.getElementById('optradio_no').checked === false &&
            document.getElementById('optradio_not_sure_main').checked === false
        ) {
            this.setState({
                error5: '',
                error4: '',
                error3: '',
                error1: '',
                error2: 'This field is required',
            });
        } else if (
            document.getElementById('one').checked === true &&
            document.getElementById('oneone_freq1').checked === false &&
            document.getElementById('oneone_freq2').checked === false &&
            document.getElementById('oneone_freq3').checked === false
        ) {
            this.setState({
                error4: '',
                error2: '',
                error1: '',
                error3: 'This field is required',
            });
        } else if (
            document.getElementById('two').checked === true &&
            document.getElementById('twotwo_freq1').checked === false &&
            document.getElementById('twotwo_freq2').checked === false &&
            document.getElementById('twotwo_freq3').checked === false
        ) {
            this.setState({
                error2: '',
                error3: '',
                error1: '',
                error4: 'This field is required',
            });
        } else if (
            document.getElementById('three').checked === true &&
            document.getElementById('threethree_freq1').checked === false &&
            document.getElementById('threethree_freq2').checked === false &&
            document.getElementById('threethree_freq3').checked === false
        ) {
            this.setState({
                error4: '',
                error2: '',
                error3: '',
                error1: '',
                error5: 'This field is required',
            });
        } else if (
            document.getElementById('optradio_yes').checked === true &&
            $('#whenDate').val() === ''
        ) {
            this.setState({
                error4: '',
                error2: '',
                error3: '',
                error1: '',
                error5: '',
                error6: 'This field is required',
            });
        } else {
            console.log('Page 13 - Submit - state: ', this.state);
            if(this.state.q6_ans === "Yes" && this.state.q7_ans === "Yes") {
                console.log(this.state.q6_ans === "Yes" && this.state.q7_ans === "Yes");
                this.setState({
                    q1_ans: 'No',
                    q1_ans_option: 'No',
                    q2_ans: 'No',
                    q2_ans_option: 'No',
                    q3_ans: 'No',
                    q3_ans_option: 'No',
                    q4_ans: 'No',
                    q5_ans: 'No',
                    q6_ans: 'No',
                    q7_ans: 'No',
                    q7_ans_option: 'No',
                    transfusionDate: { minDate: '', maxDate: '' },
                    newState: 'added now'
                });
                this.page13();
                console.log(this.state);
                this.forceUpdate();
                this.props.history.push('/User/Page14');
            } else {
                this.page13();
                this.props.history.push('/User/Page14');
            }
        }
    }

    page13() {
        var param = {
            bleeding_requiring_treatment: this.state.q1_ans,
            bleeding_requiring_treatment_last_three_months: this.state.q1_ans_option,
            bleeding_from_stomach: this.state.q2_ans,
            bleeding_from_stomach_last_three_months: this.state.q2_ans_option,
            ulcer_in_stomach_or_bowel: this.state.q3_ans,
            ulcer_in_stomach_or_bowel_last_three_months: this.state.q3_ans_option,
            liver_disease: this.state.q4_ans,
            kidney_disease: this.state.q5_ans,
            not_sure: this.state.q6_ans,
            had_transfusion_in_last_three_months: this.state.q7_ans,
            had_transfusion_in_last_three_months_when: this.state.q7_ans_option,
            patient_id: this.state.patient_id
        };

        console.log('Page 13 - page13 func - param: ', param);
        server('patient/page13', param);
        //this.props.history.push('');
    }

    //
    //
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
                    <h1 className="text-center white main-heading">
                        Have you experienced any of the following
                    </h1>
                    <br />
                    <br />
                    <div className="bg-light blue-box">
                        {' '}
                        {/* white box */}
                        {/* Default form login */}
                        <form className="p-5" action="#!">
                            <p className="blue">
                                <b>Please choose if applicable</b>
                            </p>
                            <div className="checkbox">
                                <label className="blue">
                                    Bleeding requiring treatment in hospital or emergency
                                    department?
                                </label>
                                <input
                                    type="checkbox"
                                    className="pull-right"
                                    id="one"
                                    name="rdo"
                                    value=""
                                    onChange={(e) => this.setState({ q1_ans: e.target.checked ? 'Yes' : 'No' })}
                                />
                            </div>
                            <div className="checkbox" id="oneone">
                                <label className="blue">Was it in the last 3 months?</label>
                                <br />
                                <label className="radio-inline blue">Yes</label>
                                <input
                                    type="radio"
                                    name="prasugrel_dosage_freq"
                                    id="oneone_freq1"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />
                                <br />
                                <label className="radio-inline blue">No</label>
                                <input
                                    type="radio"
                                    name="prasugrel_dosage_freq"
                                    id="oneone_freq2"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />

                                <br />
                                <label className="radio-inline blue">Not Sure</label>
                                <input
                                    type="radio"
                                    name="prasugrel_dosage_freq"
                                    id="oneone_freq3"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />
                            </div>
                            <div className="text-danger">
                                {' '}
                                {this.state.error3 !== '' ? this.state.error3 : ''}
                            </div>

                            <div className="checkbox">
                                <label className="blue">Bleeding from the stomach or bowel</label>
                                <input
                                    type="checkbox"
                                    className="pull-right"
                                    id="two"
                                    name="rdo"
                                    value="Yes"
                                    onChange={(e) => this.setState({ q2_ans: e.target.checked ? 'Yes' : 'No' })}
                                />
                            </div>
                            <div className="checkbox" id="twotwo">
                                <label className="blue"> Was it in the last 3 months?</label>

                                <br />
                                <label className="radio-inline blue">Yes</label>
                                <input
                                    type="radio"
                                    name="bleeding_dosage_freq"
                                    id="twotwo_freq1"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q2_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />
                                <br />
                                <label className="radio-inline blue">No</label>
                                <input
                                    type="radio"
                                    name="bleeding_dosage_freq"
                                    id="twotwo_freq2"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q2_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />

                                <br />
                                <label className="radio-inline blue">Not Sure</label>
                                <input
                                    type="radio"
                                    name="bleeding_dosage_freq"
                                    id="twotwo_freq3"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q2_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />
                                <div className="text-danger">
                                    {' '}
                                    {this.state.error4 !== '' ? this.state.error4 : ''}
                                </div>
                            </div>

                            <div className="checkbox">
                                <label className="blue">Ulcer in the stomach or bowel?</label>
                                <input
                                    type="checkbox"
                                    className="pull-right"
                                    id="three"
                                    value="Yes"
                                    onChange={(e) => this.setState({ q3_ans: e.target.checked ? 'Yes' : 'No' })}
                                />
                            </div>

                            <div className="checkbox" id="threethree">
                                <label className="blue">Was it in the last 3 months?</label>

                                <br />
                                <label className="radio-inline blue">Yes</label>
                                <input
                                    type="radio"
                                    name="ulcer_dosage_freq"
                                    id="threethree_freq1"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q3_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />
                                <br />
                                <label className="radio-inline blue">No</label>
                                <input
                                    type="radio"
                                    name="ulcer_dosage_freq"
                                    id="threethree_freq2"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q3_ans_option: e.target.checked ? 'Yes' : 'No' })}
                                />

                                <br />
                                <label className="radio-inline blue">Not Sure</label>
                                <input
                                    type="radio"
                                    name="ulcer_dosage_freq"
                                    id="threethree_freq3"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q3_ans_option: 'Not Sure' })}
                                />
                                <div className="text-danger">
                                    {' '}
                                    {this.state.error5 !== '' ? this.state.error5 : ''}
                                </div>
                                <br />
                                <br />
                            </div>
                            <div className="checkbox">
                                <label className="blue">Liver Disease?</label>
                                <input
                                    type="checkbox"
                                    className="pull-right"
                                    id="four"
                                    name="rdo"
                                    onChange={(e) => this.setState({ q4_ans: e.target.checked ? 'Yes' : 'No' })}
                                />
                            </div>
                            <div className="checkbox" id="fourfour">
                                <label className="blue">Kidney Disease?</label>
                                <input
                                    type="checkbox"
                                    className="pull-right"
                                    id="six"
                                    name="rdo"
                                    onChange={(e) => this.setState({ q5_ans: e.target.checked ? 'Yes' : 'No' })}
                                />
                            </div>
                            <div className="checkbox" id="fourfour">
                                <label className="blue">Not Sure</label>
                                <input
                                    type="checkbox"
                                    className="pull-right"
                                    id="seven"
                                    name="rdo"
                                    onClick={this.toggleOptions}
                                    onChange={(e) => this.setState({ q6_ans: e.target.checked ? 'Yes' : 'No' })}
                                />
                                <div className="text-danger">
                                    {' '}
                                    {this.state.error1 !== '' ? this.state.error1 : ''}
                                </div>
                            </div>
                            <br />
                            <label className="blue">
                                <b>Have you had a transfusion in the last 3 months?</b>
                            </label>
                            <br />
                            <label className="radio-inline blue">Yes</label>
                            <input
                                type="radio"
                                name="optradio"
                                id="optradio_yes"
                                className="pull-right"
                                value="Yes"
                                onChange={(e) => this.setState({ q7_ans: e.target.checked ? 'Yes' : 'No' })}
                            />
                            <br />
                            <label className="radio-inline blue">No</label>
                            <input
                                type="radio"
                                name="optradio"
                                id="optradio_no"
                                className="pull-right"
                                value="No"
                                onChange={(e) => this.setState({ q7_ans: e.target.checked ? 'Yes' : 'No' })}
                            />

                            <br />
                            <label className="radio-inline blue">Not Sure</label>
                            <input
                                type="checkbox"
                                name="optradio"
                                id="optradio_not_sure_main"
                                className="pull-right"
                                value="Not Sure"
                                onClick={this.toggleOptions2}
                                onChange={(e) => this.setState({ q7_ans: e.target.checked ? 'Yes' : 'No' })}
                            />

                            {this.validator.message('Question', this.state.q7_ans, 'required')}
                            <div className="row">
                                <div className="col-4" id="whr_date">
                                    {/* input */}
                                    <label className="blue">
                                        <b>When?</b>
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control mb-4 transparent-custom-input"
                                        name="whenDate"
                                        id="whenDate"
                                        min={moment().subtract(3, 'months').format('YYYY-MM-DD')}
                                        max={moment().format('YYYY-MM-DD')}
                                        // value={q7_ans_option}
                                        onChange={(e) =>
                                            this.setState({
                                                q7_ans_option: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="text-danger">
                                        {' '}
                                        {this.state.error6 !== '' ? this.state.error6 : ''}
                                    </div>
                                </div>
                                <div className="col-4">{/* input */}</div>
                                <div className="col-4" id="">
                                    {/* input */}
                                </div>
                            </div>
                            <div className="text-danger">
                                {' '}
                                {this.state.error2 !== '' ? this.state.error2 : ''}
                            </div>
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
            $('#oneone').hide();
            $('#twotwo').hide();
            $('#threethree').hide();

            $('#whr_date').hide();

            $('#one').click(function () {
                if ($('#one').is(':checked')) {
                    $('#oneone').show(1000);
                } else {
                    $('#oneone').hide(1000);
                }
            });

            $('#two').click(function () {
                if ($('#two').is(':checked')) {
                    $('#twotwo').show(1000);
                } else {
                    $('#twotwo').hide(1000);
                }
            });

            $('#three').click(function () {
                if ($('#three').is(':checked')) {
                    $('#threethree').show(1000);
                } else {
                    $('#threethree').hide(1000);
                }
            });

            $('#four').click(function () {
                if ($('#four').is(':checked')) {
                }
            });

            $('#optradio_yes').click(function () {
                if ($('#optradio_yes').is(':checked')) {
                    $('#whr_date').show(1000);
                }
            });

            $('#optradio_no').click(function () {
                if ($('#optradio_no').is(':checked')) {
                    $('#whr_date').hide(1000);
                }
            });
        });
    }
}
export default Page13;
