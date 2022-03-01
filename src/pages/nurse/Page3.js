import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import axios from 'axios';

import Header from './NurseHeader';
import { server } from '../../utils/functions';
import { domain } from '../../App';

//

let data;

class Page5 extends React.Component {
    constructor(props) {
        super(props);
        document.getElementById('body').classList.remove('blue-bg');

        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });
        // console.log(this.validator);

        console.log('Nurse page5 - Constructor');

        this.state = {
            who: '',
            accompanied: '',
            lmwh: '',
            admin: '',
            understand: '',
            explained: '',
            loader: 1,
            lmwh_flag: false,
            risk_factor: '',
            briefing_date: '',
            is_first_time: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.page3 = this.page3.bind(this);
        this.createRadio = this.createRadio.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    componentDidMount() {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        console.log(this.props.location)

        try {
            let patient_id = localStorage.getItem('patient_id');
            if(this.props.location.state !== undefined) {
                this.setState({
                    lmwh_flag: this.props.location.state.is_lmwh_selected
                });
            }
            axios
                .get(domain + `/api/nurse/page3LoadData/:${patient_id}`, {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Nurse page 5 - Response: ', response);
                    console.log('Nurse page 5 - Response.data.success: ', response.data.success[0]);

                    data = response.data.success[0];
                    this.setState({ loader: '' });

                    this.setState({
                        who:  data ? data.who_is_completing_this_form : "undefined",
                        accompanied: data ? data.patient_accompanied_by : "undefined",
                        lmwh: data ? data.lmwh : "undefined",
                        admin: data ? data.administration : "undefined",
                        understand: data ? data.understanding : "undefined",
                        explained: data ? data.explained : "undefined",
                        briefing_date: data ? data.briefing_date : "undefined",
                        is_first_time: data ? data.is_first_time : "undefined",
                        lmwh_flag: this.state.lmwh_flag !== '' ? data?.is_lmwh_selected === "1" ? true : false : this.state.lmwh_flag
                    });
                });
        } catch (error) {
            console.error('Nurse page 5 new - response error: ', error);
            this.setState({ loader: '' });
        }
    }

    submitForm() {
        if (this.validator.allValid()) {
            this.page3(this.state);
            this.props.history.push('/Nurse/Dictation');
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    page3(params) {
        let param = {
            who_is_completing_this_form: this.state.who,
            patient_accompanied_by: this.state.accompanied,
            lmwh: this.state.lmwh,
            administration: this.state.admin,
            understanding: this.state.understand,
            explained: this.state.explained,
            patient_id: localStorage.getItem('patient_id'),
            briefing_date: this.state.briefing_date,
            is_first_time: this.state.is_first_time
        };

        console.log('Nurse page 5 - param: ', params);
        server(`nurse/page3/:${param.patient_id}`, param);
    }

    handleRadioChange(e) {
        const { name, value } = e.target;
        //   console.log(`handleChange - id=${id}  name=${name}  value=${value}  checked=${checked}  e=${e} `);
        this.setState({ [name]: value });
    }

    //
    createRadio(id, name, label, handleRadioChange, classNames = '') {
        return (
            <div className={'col-6 ' + classNames}>
                <div className="custom-control custom-radio">
                    <input
                        type="radio"
                        className="custom-control-input"
                        id={`${id}`}
                        name={`${name}`}
                        value={`${label}`}
                        checked={this.state[name] === label}
                        onChange={(e) => handleRadioChange(e)}
                    />
                    <label className="custom-control-label" htmlFor={id}>
                        {label}
                    </label>
                </div>
            </div>
        );
    }

    //
    //
    //

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="container">
                    {this.state.loader === 1 ? (
                        <div className="centered">
                            <ReactSpinner type="border" color="blue" size="5" />
                        </div>
                    ) : (
                        ''
                    )}
                    {/* container */}
                    <div className="jumbotron">
                        <h3>Bridging Summary</h3>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="usr">Patient Briefing Date</label>
                            </div>

                            <div className="col-6 text-left">
                                <input
                                type="date"
                                id="date_of_assessment"
                                className="form-control"
                                defaultValue={this.state.briefing_date}
                                onChange={(e) => this.setState({ briefing_date: e.target.value })}
                                />
                            </div>
                        </div>
                        <br />
                        <h4>Who is completing this form?</h4>
                        <div className="row">
                            {this.createRadio('who-1', 'who', 'MD', this.handleRadioChange)}
                            {this.createRadio('who-2', 'who', 'Nurse', this.handleRadioChange)}
                        </div>
                        <div className="row">
                            {this.createRadio('who-3', 'who', 'Pharmacist', this.handleRadioChange)}
                            {this.createRadio('who-4', 'who', 'Other', this.handleRadioChange)}
                        </div>
                        {this.validator.message('', this.state.who, 'required')}
                        <br />
                        <h4>Patient accompanied by:</h4>
                        <div className="row">
                            {this.createRadio('accompanied-1', 'accompanied', 'Alone', this.handleRadioChange)}
                            {this.createRadio('accompanied-2', 'accompanied', 'Spouse or partner', this.handleRadioChange)}
                        </div>
                        <div className="row">
                            {this.createRadio('accompanied-3', 'accompanied', 'Patient\'s adult child', this.handleRadioChange)}
                            {this.createRadio('accompanied-4', 'accompanied', 'Other', this.handleRadioChange)}
                        </div>
                        {this.validator.message('', this.state.accompanied, 'required')}
                        <br />
                        <hr />
                        {
                            this.state.lmwh_flag ?
                            <>
                                <br />
                                <h4>LMWH:</h4>
                                {this.createRadio(
                                    'lmwh-1',
                                    'lmwh',
                                    'Instruction given with LMWH',
                                    this.handleRadioChange,
                                    'padding-0'
                                )}
                                {this.createRadio(
                                    'lmwh-2',
                                    'lmwh',
                                    'Has previously self-injected LMWH',
                                    this.handleRadioChange,
                                    'padding-0'
                                )}
                                {this.validator.message('', this.state.lmwh, 'required')}
                                <h4>Previous Experience with Self-Injection</h4>
                                <div className="row">
                                    {this.createRadio('is_first_time-1', 'is_first_time', 'Yes', this.handleRadioChange)}
                                    {this.createRadio('is_first_time-2', 'is_first_time', 'No', this.handleRadioChange)}
                                </div>
                                {this.validator.message('', this.state.is_first_time, 'required')}
                                <br />
                                <h4>LMWH Administration</h4>
                                <div className="row">
                                    {this.createRadio('admin-1', 'admin', 'Self', this.handleRadioChange)}
                                    {this.createRadio('admin-2', 'admin', 'Family', this.handleRadioChange)}
                                </div>
                                <div className="row">
                                    {this.createRadio('admin-3', 'admin', 'CCAC', this.handleRadioChange)}
                                </div>
                                {this.validator.message('', this.state.admin, 'required')}
                                <br />
                            </> : ''
                        }
                        <br />
                        <h4>Risk/Benefits</h4>
                        {this.createRadio(
                            'explained-1',
                            'explained',
                            'Risks/benefits of peri-procedural antithrombotic management plan explained, andopportunity to ask questions provided.',
                            this.handleRadioChange,
                            'padding-0'
                        )}
                        {this.validator.message('', this.state.explained, 'required')}
                        <br /> <br />
                        <br />
                        <h4>Understanding</h4>
                        <div className="row">
                            {this.createRadio('understand-1', 'understand', 'Good [patient or caregiver able to accurately state details of plan]', this.handleRadioChange)}
                            {this.createRadio('understand-2', 'understand', 'Fair [patient or caregiver able to state details of plan when prompted to refer to documentation]', this.handleRadioChange)}
                        </div>
                        <div className="row">
                            {this.createRadio('understand-3', 'understand', 'Poor [patient or caregiver unable to state details of plan even when prompted to refer to documentation]', this.handleRadioChange)}
                        </div>
                        <div className='row'>
                            {
                                document.getElementById('understand-3')?.checked ? <textarea value={this.state.risk_factor} className='form-control' onChange={(e) => this.setState({ risk_factor: e.target.value })}></textarea> : ''
                            }
                            
                            {this.validator.message('', this.state.risk_factor, 'required')}
                        </div>
                        {this.validator.message('', this.state.understand, 'required')}
                        <br /> <br />
                        <div className="row">
                            <div className="col-4">
                                <Link to={{ pathname: "/Nurse/Nurse6", state: { 'recom_id': '', 'lmwh_chkBox': false } }} className="btn btn-outline-primary  btn-block">
                                    Back
                                </Link>
                            </div>

                            <div className="col-4"></div>

                            <div className="col-4">
                                <button onClick={this.submitForm} className="btn btn-primary btn-block">
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
}
export default Page5;
