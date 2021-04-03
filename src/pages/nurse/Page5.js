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
        console.log(this.validator);
        this.state = {
            who_is_completing_this_form: '',
            patient_accompanied_by: '',
            lmwh: '',
            administration: '',
            understanding: '',
            explained: '',
            loader: 1,
        };

        this.submitForm = this.submitForm.bind(this);

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
                    this.setState({ loader: '' });
                    console.log(response);
                    console.log(response.data.success[0]);
                    data = response.data.success[0];
                    this.setState({ loader: '' });
                    if (data !== undefined) {
                        if (data.who_is_completing_this_form == 'MD') {
                            document.getElementById('who_is_completing_this_form1').checked = true;
                        } else if (data.who_is_completing_this_form == 'Nurse') {
                            document.getElementById('who_is_completing_this_form2').checked = true;
                        } else if (data.who_is_completing_this_form == 'Family Member') {
                            document.getElementById('who_is_completing_this_form3').checked = true;
                        } else if (data.who_is_completing_this_form == 'Other') {
                            document.getElementById('who_is_completing_this_form4').checked = true;
                        }

                        if (data.patient_accompanied_by == 'Spouse') {
                            document.getElementById('patient_accompanied_by1').checked = true;
                        } else if (data.patient_accompanied_by == 'Alone') {
                            document.getElementById('patient_accompanied_by3').checked = true;
                        } else if (data.patient_accompanied_by == 'Son / Daughter') {
                            document.getElementById('patient_accompanied_by2').checked = true;
                        } else if (data.patient_accompanied_by == 'Other') {
                            document.getElementById('patient_accompanied_by4').checked = true;
                        }

                        if (data.explained == 'Risk / Benefits explained') {
                            document.getElementById('explained1').checked = true;
                        }

                        if (data.lmwh == 'Instruction given with LMWH') {
                            document.getElementById('q3_1').checked = true;
                        } else if (data.lmwh == 'Has previously self-inject LMWH') {
                            document.getElementById('q3_2').checked = true;
                        } else if (data.lmwh == 'No bridging required') {
                            document.getElementById('q3_3').checked = true;
                        }

                        if (data.administration == 'Self') {
                            document.getElementById('administration1').checked = true;
                        } else if (data.administration == 'Family') {
                            document.getElementById('administration2').checked = true;
                        } else if (data.administration == 'CCAC') {
                            document.getElementById('administration3').checked = true;
                        }

                        if (data.understanding == 'Good') {
                            document.getElementById('understanding41').checked = true;
                        } else if (data.understanding == 'Fair') {
                            document.getElementById('understanding422').checked = true;
                        } else if (data.understanding == 'Poor') {
                            document.getElementById('understanding5').checked = true;
                        }

                        this.state = {
                            who_is_completing_this_form: data.who_is_completing_this_form,
                            patient_accompanied_by: data.patient_accompanied_by,
                            lmwh: data.lmwh,
                            administration: data.administration,
                            understanding: data.understanding,
                            explained: data.explained,
                        };
                    }
                });
        } catch (error) {
            this.setState({ loader: '' });
            console.error(error);
            this.setState({ loader: '' });
        }
    }

    submitForm() {
        if (this.validator.allValid()) {
            console.log(this.state);
            this.page3(this.state);
            this.props.history.push('/Nurse/Nurse6');
        } else {
            this.validator.showMessages();

            this.forceUpdate();
        }
    }

    page3(param) {
        var param = {
            who_is_completing_this_form: this.state.who_is_completing_this_form,
            patient_accompanied_by: this.state.patient_accompanied_by,
            lmwh: this.state.lmwh,
            administration: this.state.administration,
            understanding: this.state.understanding,
            explained: this.state.explained,
        };
        server('nurse/page3', param);
    }

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
                    )}{' '}
                    {/* container */}
                    <div className="jumbotron">
                        <h3>Bridging Summary</h3>
                        <br />
                        <br />
                        <h4>Who is completing this form?</h4>
                        <div className="row">
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="who_is_completing_this_form1"
                                        name="who_is_completing_this_form"
                                        onChange={(e) =>
                                            this.setState({
                                                who_is_completing_this_form: 'MD',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="who_is_completing_this_form1"
                                    >
                                        MD
                                    </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="who_is_completing_this_form2"
                                        name="who_is_completing_this_form"
                                        onChange={(e) =>
                                            this.setState({
                                                who_is_completing_this_form: 'Nurse',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="who_is_completing_this_form2"
                                    >
                                        Nurse
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="who_is_completing_this_form3"
                                        name="who_is_completing_this_form"
                                        onChange={(e) =>
                                            this.setState({
                                                who_is_completing_this_form: 'Family Member',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="who_is_completing_this_form3"
                                    >
                                        Family Member
                                    </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="who_is_completing_this_form4"
                                        name="who_is_completing_this_form"
                                        onChange={(e) =>
                                            this.setState({
                                                who_is_completing_this_form: 'Other',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="who_is_completing_this_form4"
                                    >
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                        {this.validator.message(
                            '',
                            this.state.who_is_completing_this_form,
                            'required'
                        )}
                        <br />
                        <h4>Patient accompanied by:</h4>
                        <div className="row">
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="patient_accompanied_by1"
                                        name="patient_accompanied_by"
                                        value="Spouse"
                                        defaultChecked={
                                            this.state.patient_accompanied_by === 'Spouse'
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                patient_accompanied_by: 'Spouse',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="patient_accompanied_by1"
                                    >
                                        Spouse
                                    </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="patient_accompanied_by2"
                                        name="patient_accompanied_by"
                                        value="Son / Daughter"
                                        defaultChecked={
                                            this.state.patient_accompanied_by === 'Son / Daughter'
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                patient_accompanied_by: 'Son / Daughter',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="patient_accompanied_by2"
                                    >
                                        Son / Daughter
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="patient_accompanied_by3"
                                        name="patient_accompanied_by"
                                        value="Alone"
                                        defaultChecked={
                                            this.state.patient_accompanied_by === 'Alone'
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                patient_accompanied_by: 'Alone',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="patient_accompanied_by3"
                                    >
                                        Alone
                                    </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="patient_accompanied_by4"
                                        name="patient_accompanied_by"
                                        value="Other"
                                        defaultChecked={
                                            this.state.patient_accompanied_by === 'Other'
                                        }
                                        onChange={(e) =>
                                            this.setState({
                                                patient_accompanied_by: 'Other',
                                            })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="patient_accompanied_by4"
                                    >
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                        {this.validator.message('', this.state.patient_accompanied_by, 'required')}
                        <br />
                        <hr />
                        <br />
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="q3_1"
                                name="q3"
                                onChange={(e) =>
                                    this.setState({
                                        lmwh: 'Instruction given with LMWH',
                                    })
                                }
                            />
                            <label className="custom-control-label" htmlFor="q3_1">
                                Instruction given with LMWH
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="q3_2"
                                name="q3"
                                onChange={(e) =>
                                    this.setState({
                                        lmwh: 'Has previously self-inject LMWH',
                                    })
                                }
                            />
                            <label className="custom-control-label" htmlFor="q3_2">
                                Has previously self-inject LMWH
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="q3_3"
                                name="q3"
                                onChange={(e) => this.setState({ lmwh: 'No bridging required' })}
                            />

                            <label className="custom-control-label" htmlFor="q3_3">
                                No bridging required
                            </label>
                        </div>
                        {this.validator.message('', this.state.lmwh, 'required')}
                        <br />
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="q3_1"
                                name="q3"
                                onChange={(e) =>
                                    this.setState({
                                        lmwh: 'Instruction given with LMWH',
                                    })
                                }
                            />
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="explained1"
                                name="explained"
                                onChange={(e) =>
                                    this.setState({
                                        explained: 'Risk / Benefits explained',
                                    })
                                }
                            />
                            <label className="custom-control-label" htmlFor="explained1">
                                Risk / Benefits explained
                            </label>
                        </div>
                        {this.validator.message('', this.state.explained, 'required')}
                        <br /> <br />
                        <div className="row">
                            <div className="col-6">
                                <h4>Administration</h4>
                                <br />
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="administration1"
                                        name="administration"
                                        onChange={(e) => this.setState({ administration: 'Self' })}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="administration1"
                                    >
                                        Self
                                    </label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="administration2"
                                        name="administration"
                                        onChange={(e) =>
                                            this.setState({ administration: 'Family' })
                                        }
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="administration2"
                                    >
                                        Family
                                    </label>
                                </div>

                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="administration3"
                                        name="administration"
                                        onChange={(e) => this.setState({ administration: 'CCAC' })}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="administration3"
                                    >
                                        CCAC
                                    </label>
                                </div>

                                {this.validator.message('', this.state.administration, 'required')}
                            </div>

                            <div className="col-6">
                                <h4>Understanding</h4>
                                <br />
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="understanding41"
                                        name="understanding"
                                        onChange={(e) => this.setState({ understanding: 'Good' })}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="understanding41"
                                    >
                                        Good
                                    </label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="understanding422"
                                        name="understanding"
                                        onChange={(e) => this.setState({ understanding: 'Fair' })}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="understanding422"
                                    >
                                        Fair
                                    </label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="understanding5"
                                        name="understanding"
                                        onChange={(e) => this.setState({ understanding: 'Poor' })}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="understanding5"
                                    >
                                        Poor
                                    </label>
                                </div>
                                {this.validator.message('', this.state.understanding, 'required')}
                            </div>
                        </div>
                        <br /> <br />
                        <div className="row">
                            <div className="col-4">
                                <Link
                                    to="/Nurse/Nurse4"
                                    className="btn btn-outline-primary  btn-block"
                                >
                                    Back
                                </Link>
                            </div>

                            <div className="col-4"></div>

                            <div className="col-4">
                                <button
                                    onClick={this.submitForm}
                                    className="btn btn-primary btn-block"
                                >
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
    componentDidMount() {}
}
export default Page5;
