import React from 'react';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import $ from 'jquery';
import axios from 'axios';
import Header from './Header';

import { domain } from '../../App';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';

//
//

class Page11 extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });

        console.log('Patient page 11 - Constructor - validator: ', this.validator);

        this.emptyState = {
            q1: '',
            q1_dosage: '',
            q1_freq: '',

            q2: '',
            q2_dosage: '',
            q2_freq: '',

            q3: '',
            q3_dosage: '',
            q3_freq: '',

            q4: '',
            q4_dosage: '',
            q4_freq: '',

            q5: '',

            loader: '',

            errors: {},
        };

        this.state = {
            q1: '',
            q1_dosage: '',
            q1_freq: '',

            q2: '',
            q2_dosage: '',
            q2_freq: '',

            q3: '',
            q3_dosage: '',
            q3_freq: '',

            q4: '',
            q4_dosage: '',
            q4_freq: '',

            q5: '',

            loader: '',
            patient_id: '',
            redirectButton: false,
            errors: {},
            nurse_add: false
        };

        // Binding "this" to functions
        this.submitForm = this.submitForm.bind(this);
        this.redirectBackNurse = this.redirectBackNurse.bind(this);
        this.redirectNextPage = this.redirectNextPage.bind(this);
        this.radioCustInputToggle = this.radioCustInputToggle.bind(this);
        this.checkBoxToggle = this.checkBoxToggle.bind(this);
        this.handleClickNoneCheckBox = this.handleClickNoneCheckBox.bind(this);
        this.validate = this.validate.bind(this);
        this.initialLoadPreSets = this.initialLoadPreSets.bind(this);

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
                .get(domain + '/api/patient/page11LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Patient page 11 - reponse from Server: ', response);
                    this.setState({ loader: '' });
                });
        } catch (error) {
            console.error(error);
            this.setState({ loader: '' });
            this.props.history.push('/');
        }
    }

    //

    validate() {
        let errors = {};
        const questions = ['q1', 'q2', 'q3', 'q4'];

        if(this.state.q1 === '' && this.state.q2 === '' && this.state.q3 === '' && this.state.q4 === '') {
            errors['med'] = 'please select either of the medicines';
        } else {
            for (let i = 0; i < 4; i++) {
                let Q = questions[i];
    
                if (this.state[Q] === 'Yes') {
                    const qDosage = `${Q}_dosage`;
                    const qFreq = `${Q}_freq`;
    
                    if (this.state[qDosage] === '') errors[qDosage] = 'Dosage is required';
                    if (this.state[qFreq] === '') errors[qFreq] = 'Frequency is required';
                }
            }
        }

        this.setState({ errors });
        if ($.isEmptyObject(errors)) return true;
        else return false;
    }

    redirectBackNurse() {
        this.submitForm();
    }
    
    redirectNextPage() {
        this.submitForm();
    }

    //
    async submitForm() {
        if (this.validate()) {
            console.log('Patient page 11 - submit - state: ', this.state);
            if(this.props.location.state !== undefined) {
                this.page11();
                this.props.history.push({ pathname:'/Nurse/Nurse1', state:{ patient_id: this.props.location.state.patient_id } });
            } else if(this.state.redirectButton) {
                this.page11();
                this.props.history.push('/Nurse/Nurse1');
            } else {
                this.page11();
                this.props.history.push('/User/Page12');
            }
        } else if(this.state.q5 === "Yes") {
            if(this.props.location.state !== undefined) {
                const resp = await this.page11();
                if(resp) this.props.history.push({ pathname:'/Nurse/Nurse1', state:{ patient_id: this.props.location.state.patient_id } });
                else alert('Something went wrong. Please try again.');
            } else if(this.state.redirectButton) {
                const resp = await this.page11();
                if(resp) this.props.history.push('/Nurse/Nurse1');
                else alert('Something went wrong. Please try again.');
            } else {
                this.page11();
                this.props.history.push('/User/Page12');
            }
        } else {
            console.log('Patient page11 - submit - error: ', this.state);
        }
    }

    async page11() {
        const state = this.state;
        let param = {};
        param.patient_id = this.state.patient_id;
        if (state.q5 === 'Yes') {
            param = { not_using_drugs: 'No, I am not on any of these medications' };
        } else {
            param = {};
            param.patient_id = this.state.patient_id;
            if (state.q1 === 'Yes') {
                param.aspirin = 'Aspirin (ASA)';
                param.aspirin_dosage = this.state.q1_dosage + ' mg';
                param.aspirin_dosage_time = this.state.q1_freq;
            }
            if (state.q2 === 'Yes') {
                param.plavix = 'Plavix (Clopidogrel)';
                param.plavix_dosage = this.state.q2_dosage + ' mg';
                param.plavix_dosage_time = this.state.q2_freq;
            }
            if (state.q3 === 'Yes') {
                param.brillinta = 'Brillinta (Ticagrelor)';
                param.brillinta_dosage = this.state.q3_dosage + ' mg';
                param.brillinta_dosage_timie = this.state.q3_freq;
            }
            if (state.q4 === 'Yes') {
                param.effient = 'Effient (Prasugrel)';
                param.effient_dosage = this.state.q4_dosage + ' mg';
                param.effient_dosage_time = this.state.q4_freq;
            }
        }

        console.log('Patient page 11 - page11 - param: ', param);
        const response = await server('patient/page11', param);
        return response;
    }

    //

    renderQuestionCheckBox(id, name, label) {
        const { errors } = this.state;
        return (
            <React.Fragment>
                <div className="checkbox">
                <label className="blue h5" style={{ fontSize: 18, fontWeight: 400 }}>
                    {label}
                </label>
                <input
                    type="checkbox"
                    className="pull-right"
                    id={id}
                    name={name}
                    value={label}
                    checked={this.state[id] !== '' ? true : false}
                    onClick={this.checkBoxToggle}
                />
            </div>
            {errors['med'] ? <div className="text-danger mb-lg-3"> {!$.isEmptyObject(errors) && errors['med']}</div> : ""}
            </React.Fragment>
        );
    }

    renderNoneCheckBox(id, name, label) {
        return (
            <div className="checkbox">
                <label className="blue h5" style={{ fontSize: 18, fontWeight: 400 }}>
                    {label}
                </label>
                <input
                    type="checkbox"
                    className="pull-right "
                    id={id}
                    name={name}
                    value="none"
                    checked={this.state[id] !== '' ? true : false}
                    onClick={this.handleClickNoneCheckBox}
                />
            </div>
        );
    }

    renderQuestionRadioOption(id, name, label, cType) {
        // const stateField = cType === 'dosage' ? `${id}-dosage` : `${id}-freq`;
        const label_ = cType === 'dosage' ? `${label} mg` : label;

        return (
            <React.Fragment>
                <label className="radio-inline blue ml-lg-3">{label_}</label>
                <input
                    type="radio"
                    className="pull-right"
                    id={id}
                    name={name}
                    value={label}
                    checked={label === this.state[name] ? true : false}
                    onChange={(e) => this.setState({ [name]: e.target.value })}
                    onClick={(e) => this.radioCustInputToggle(e)}
                />
                <br />
            </React.Fragment>
        );
    }

    renderQuestionRadioCustomOption(id, name, cType) {
        const { errors } = this.state;
        const inputLabel =
            cType === 'dosage' ? 'Please specify dosage in mg' : 'Please specify frequency of drug usage';
        const label_ = cType === 'dosage' ? 'Enter custom dosage' : 'Enter custom frequency';
        const placeHolder_ = cType === 'dosage' ? 'Dosage (mg)' : 'Frequency';

        return (
            <React.Fragment>
                <label className="radio-inline blue ml-lg-3">{label_}</label>
                <input
                    type="radio"
                    className="pull-right"
                    id={id}
                    name={name}
                    value="radioCustOption"
                    onClick={(e) => this.radioCustInputToggle(e)}
                />
                <br />

                <div className="row" id={`${id}-toggle`}>
                    <div className="col-6  ml-lg-3">
                        {/* input */}
                        <p className="blue" style={{ fontSize: 15, fontWeight: 500, opacity: '0.75' }}>
                            {inputLabel}
                        </p>
                        <input
                            type="text"
                            className="form-control mb-4 transparent-custom-input"
                            id={`${id}-text`}
                            placeholder={placeHolder_}
                            onChange={(e) => this.setState({ [name]: e.target.value })}
                        />
                    </div>
                </div>
                <div className="text-danger mb-lg-3"> {!$.isEmptyObject(errors) && errors[name]}</div>
            </React.Fragment>
        );
    }

    //
    //

    radioCustInputToggle(e) {
        const { value, name } = e.target;
        const custId = `${name}-cust`;
        const toggleId = `${custId}-toggle`;

        if (value === 'radioCustOption') {
            $(`#${toggleId}`).show(500);
            this.setState({ [name]: '' });
        } else {
            $(`#${toggleId}`).hide(500);
            $(`#${custId}-text`).val('');
        }
    }

    checkBoxToggle(e) {
        const { id, checked } = e.target;
        const toggleId = `${id}-toggle`;
        const dosageState = `${id}_dosage`;
        const freqState = `${id}_freq`;

        
        if($('#q2')[0].checked === true) {
            $('#q3')[0].disabled = true;
            $('#q4')[0].disabled = true;
        } else if($('#q3')[0].checked === true) {
            $('#q2')[0].disabled = true;
            $('#q4')[0].disabled = true;
        } else if($('#q4')[0].checked === true) {
            $('#q2')[0].disabled = true;
            $('#q3')[0].disabled = true;
        } else {
            $('#q2')[0].disabled = false;
            $('#q3')[0].disabled = false;
            $('#q4')[0].disabled = false;
        }

        if (checked) {
            $(`#${toggleId}`).show(500);
            this.setState({ [id]: 'Yes' });
        } else {
            $(`#${toggleId}`).hide(500);
            this.setState({ [id]: '', [dosageState]: '', [freqState]: '' });
        }
    }

    handleClickNoneCheckBox(e) {
        const { id, checked } = e.target;
        let state = { ...this.emptyState };

        if (checked) {
            state[id] = 'Yes';
            this.initialLoadPreSets();
            this.setState({ ...state });
            $(`input[name=q]`).prop('disabled', true);
        } else {
            $(`input[name=q]`).prop('disabled', false);
            this.setState({ ...state });
        }
    }

    //
    initialLoadPreSets() {
        $('#q1-toggle').hide(400);
        $('#q2-toggle').hide(400);
        $('#q3-toggle').hide(400);
        $('#q4-toggle').hide(400);

        $(`#q1_dosage-cust-toggle`).hide(400);
        $(`#q1_freq-cust-toggle`).hide(400);

        $(`#q2_dosage-cust-toggle`).hide(400);
        $(`#q2_freq-cust-toggle`).hide(400);

        $(`#q3_dosage-cust-toggle`).hide(400);
        $(`#q3_freq-cust-toggle`).hide(400);

        $(`#q4_dosage-cust-toggle`).hide(400);
        $(`#q4_freq-cust-toggle`).hide(400);
    }

    //
    //
    //

    render() {
        return (
            <React.Fragment>
                <Header patient_id={this.state.patient_id} patient_add={this.state.patient_add}  />
                {this.state.loader === 1 ? (
                    <div className="centered">
                        <ReactSpinner type="border" color="bg-primary" size="5" />
                    </div>
                ) : (
                    ''
                )}
                <div>
                    <h1 className="text-center white main-heading">Antiplatelets</h1>
                    <br />
                    <br />
                    <div className="bg-light blue-box">
                        {' '}
                        {/* white box */}
                        {/* Default form login */}
                        <form className="p-5" action="#!" id="frm">
                            <p className="blue">
                                <b className="h4">Please choose if applicable</b>
                            </p>
                            <p className="blue" style={{ fontSize: 14, marginTop: '-20px' }}>
                                Select up to 2 Options
                            </p>

                            {/*  */}
                            {this.renderQuestionCheckBox('q1', 'q', 'Aspirin (ASA)')}
                            <div id="q1-toggle" className="mb-xl-4">
                                {this.renderQuestionRadioOption('q1_dosage-1', 'q1_dosage', '81', 'dosage')}
                                {this.renderQuestionRadioCustomOption('q1_dosage-cust', 'q1_dosage', 'dosage')}

                                {this.renderQuestionRadioOption('q1_freq-1', 'q1_freq', 'Once Daily', 'freq')}
                                {this.renderQuestionRadioOption('q1_freq-2', 'q1_freq', 'Twice daily', 'freq')}
                                {this.renderQuestionRadioOption('q1_freq-3', 'q1_freq', 'Not sure', 'freq')}
                                {this.renderQuestionRadioCustomOption('q1_freq-cust', 'q1_freq', 'freq')}
                            </div>

                            {/*  */}
                            {this.renderQuestionCheckBox('q2', 'q', 'Plavix (Clopidogrel)')}
                            <div id="q2-toggle" className="mb-xl-4">
                                {this.renderQuestionRadioOption('q2_dosage-1', 'q2_dosage', '75', 'dosage')}
                                {this.renderQuestionRadioCustomOption('q2_dosage-cust', 'q2_dosage', 'dosage')}

                                {this.renderQuestionRadioOption('q2_freq-1', 'q2_freq', 'Once Daily', 'freq')}
                                {this.renderQuestionRadioOption('q2_freq-2', 'q2_freq', 'Twice daily', 'freq')}
                                {this.renderQuestionRadioOption('q2_freq-3', 'q2_freq', 'Not sure', 'freq')}
                                {this.renderQuestionRadioCustomOption('q2_freq-cust', 'q2_freq', 'freq')}
                            </div>

                            {/*  */}
                            {this.renderQuestionCheckBox('q3', 'q', 'Brillinta (Ticagrelor)')}
                            <div id="q3-toggle" className="mb-xl-4">
                                {this.renderQuestionRadioOption('q3_dosage-1', 'q3_dosage', '60', 'dosage')}
                                {this.renderQuestionRadioOption('q3_dosage-1', 'q3_dosage', '90', 'dosage')}
                                {this.renderQuestionRadioCustomOption('q3_dosage-cust', 'q3_dosage', 'dosage')}

                                {this.renderQuestionRadioOption('q3_freq-1', 'q3_freq', 'Once Daily', 'freq')}
                                {this.renderQuestionRadioOption('q3_freq-2', 'q3_freq', 'Twice daily', 'freq')}
                                {this.renderQuestionRadioOption('q3_freq-3', 'q3_freq', 'Not sure', 'freq')}
                                {this.renderQuestionRadioCustomOption('q3_freq-cust', 'q3_freq', 'freq')}
                            </div>

                            {/*  */}
                            {this.renderQuestionCheckBox('q4', 'q', 'Effient (Prasugrel)')}
                            <div id="q4-toggle" className="mb-xl-4">
                                {this.renderQuestionRadioOption('q4_dosage-1', 'q4_dosage', '5', 'dosage')}
                                {this.renderQuestionRadioOption('q4_dosage-1', 'q4_dosage', '10', 'dosage')}
                                {this.renderQuestionRadioCustomOption('q4_dosage-cust', 'q4_dosage', 'dosage')}

                                {this.renderQuestionRadioOption('q4_freq-1', 'q4_freq', 'Once Daily', 'freq')}
                                {this.renderQuestionRadioOption('q4_freq-2', 'q4_freq', 'Twice daily', 'freq')}
                                {this.renderQuestionRadioOption('q4_freq-3', 'q4_freq', 'Not sure', 'freq')}
                                {this.renderQuestionRadioCustomOption('q4_freq-cust', 'q4_freq', 'freq')}
                            </div>

                            {/*  */}
                            {this.renderNoneCheckBox('q5', 'none', 'No, I am not on any of these medications')}
                        </form>
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
        }
        this.initialLoadPreSets();
        $('input[name=q]').click(function () {
            if ($('input[name=q]:checked').length > 2) {
                this.checked = false;
            }
        });
    }
}
export default Page11;
