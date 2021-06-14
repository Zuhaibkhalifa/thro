import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import $ from 'jquery';
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

        try {
            axios
                .get(domain + '/api/nurse/page3LoadData', {
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
            this.props.history.push('/Nurse/Nurse4');
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    page3(param) {
        var param = {
            who_is_completing_this_form: this.state.who,
            patient_accompanied_by: this.state.accompanied,
            lmwh: this.state.lmwh,
            administration: this.state.admin,
            understanding: this.state.understand,
            explained: this.state.explained,
        };

        console.log('Nurse page 5 - param: ', param);
        server('nurse/page3', param);
    }

    handleRadioChange(e) {
        const { id, name, value, checked } = e.target;
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
                        <h4>Who is completing this form?</h4>
                        <div className="row">
                            {this.createRadio('who-1', 'who', 'MD', this.handleRadioChange)}
                            {this.createRadio('who-2', 'who', 'Nurse', this.handleRadioChange)}
                        </div>
                        <div className="row">
                            {this.createRadio('who-3', 'who', 'Family Member', this.handleRadioChange)}
                            {this.createRadio('who-4', 'who', 'Other', this.handleRadioChange)}
                        </div>
                        {this.validator.message('', this.state.who, 'required')}
                        <br />
                        <h4>Patient accompanied by:</h4>
                        <div className="row">
                            {this.createRadio('accompanied-1', 'accompanied', 'Spouse', this.handleRadioChange)}
                            {this.createRadio('accompanied-2', 'accompanied', 'Son / Daughter', this.handleRadioChange)}
                        </div>
                        <div className="row">
                            {this.createRadio('accompanied-3', 'accompanied', 'Alone', this.handleRadioChange)}
                            {this.createRadio('accompanied-4', 'accompanied', 'Other', this.handleRadioChange)}
                        </div>
                        {this.validator.message('', this.state.accompanied, 'required')}
                        <br />
                        <hr />
                        <br />
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
                            'Has previously self-inject LMWH',
                            this.handleRadioChange,
                            'padding-0'
                        )}
                        {this.createRadio(
                            'lmwh-3',
                            'lmwh',
                            'No bridging required',
                            this.handleRadioChange,
                            'padding-0'
                        )}
                        {this.validator.message('', this.state.lmwh, 'required')}
                        <br />
                        {this.createRadio(
                            'explained-1',
                            'explained',
                            'Risk / Benefits explained',
                            this.handleRadioChange,
                            'padding-0'
                        )}
                        {this.validator.message('', this.state.explained, 'required')}
                        <br /> <br />
                        <h4>Administration</h4>
                        <div className="row">
                            {this.createRadio('admin-1', 'admin', 'Self', this.handleRadioChange)}
                            {this.createRadio('admin-2', 'admin', 'Family', this.handleRadioChange)}
                        </div>
                        <div className="row">
                            {this.createRadio('admin-3', 'admin', 'CCAC', this.handleRadioChange)}
                        </div>
                        {this.validator.message('', this.state.admin, 'required')}
                        <br />
                        <h4>Understanding</h4>
                        <div className="row">
                            {this.createRadio('understand-1', 'understand', 'Good', this.handleRadioChange)}
                            {this.createRadio('understand-2', 'understand', 'Fair', this.handleRadioChange)}
                        </div>
                        <div className="row">
                            {this.createRadio('understand-3', 'understand', 'Poor', this.handleRadioChange)}
                        </div>
                        {this.validator.message('', this.state.understand, 'required')}
                        <br /> <br />
                        <div className="row">
                            <div className="col-4">
                                <Link to="/Nurse/Nurse4" className="btn btn-outline-primary  btn-block">
                                    Back
                                </Link>
                            </div>

                            <div className="col-4"></div>

                            <div className="col-4">
                                <button onClick={this.submitForm} className="btn btn-primary btn-block">
                                    Forward
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
