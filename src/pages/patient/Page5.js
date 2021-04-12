import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';
import $ from 'jquery';

import { domain } from '../../App';

class Page5 extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });

        console.log('Patient page5 - Constructor - Validator: ', this.validator);

        this.state = {
            q1_ans: '',
            q2_ans: '',
            q3_ans: '',
            q1_sub_q1_ans: '',
            q1_sub_q2_ans: '',

            chkVal: '',
            subchkVal: '',
            error1: '',
            error2: '',
            error3: '',
            loader: '',
        };

        this.submitForm = this.submitForm.bind(this);
        this.mainOption = this.mainOption.bind(this);
        this.onRadioBtn1 = this.onRadioBtn1.bind(this);
        this.onRadioBtn2 = this.onRadioBtn2.bind(this);

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
                .get(domain + '/api/patient/page5LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Patient page5 - get data - Server Success Reponse: ', response);
                    this.setState({ loader: '' });
                });
        } catch (error) {
            console.error('Patient page5 - get data - Server Error Reponse: ', error);
            this.setState({ loader: '' });
        }
    }

    onRadioBtn1() {
        this.setState({ q1_sub_q1_ans: 1 });

        $('#toggle1').toggle(1000);
    }

    onRadioBtn2() {
        $('#toggle2').toggle(1000);
    }
    mainOption() {
        this.setState({ q4_ans: 'Not Sure' });
        if (document.getElementById('mainoption313').checked === true) {
            document.getElementById('optradio1').disabled = true;
            document.getElementById('optradio2').disabled = true;
            this.setState({
                q1_ans: '',
                q2_ans: '',
                q3_ans: '',
                q1_sub_q1_ans: '',
                q1_sub_q2_ans: '',
            });
        } else {
            document.getElementById('optradio1').disabled = false;
            document.getElementById('optradio2').disabled = false;
        }
    }

    submitForm() {
        if (!$("input[name='optradio']:checked").val()) {
            this.setState({ error1: 'This field is required' });
        } else if (document.getElementById('optradio1').checked === true && !$("input[name='dvt1']:checked").val()) {
            this.setState({ error1: '' });
            this.setState({ error2: 'This field is required' });
        } else if (document.getElementById('optradio2').checked === true && !$("input[name='pe']:checked").val()) {
            this.setState({ error1: '' });
            this.setState({ error2: '' });
            this.setState({ error3: 'This field is required' });
        } else {
            //  alert('You submitted the form and stuff!');
            this.page5(this.state);
            this.props.history.push('/User/Page6');
        }
    }

    page5() {
        var param = {
            deep_vein_thrombosis: this.state.q1_ans,
            deep_vein_thrombosis_how_long_ago: this.state.q1_sub_q1_ans,
            pulmonary_embolism: this.state.q2_ans,
            pulmonary_embolism_how_long_ago: this.state.q2_sub_q2_ans,
            not_sure: this.state.q3_ans,
        };

        console.log('Patient page5 - page5 - param: ', param);
        server('patient/page5', param);
        //this.props.history.push('');
    }

    valueChanged2(e) {
        this.setState({ q1_ans: e.target.value });
        document.getElementById('de').style.display = 'none';
    }

    valueChanged3(e) {}

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
                <div>
                    <h1 className="text-center white main-heading">Have you experienced any of the following</h1>
                    <br />
                    <br />
                    <div className="bg-light blue-box">
                        {' '}
                        {/* white box */}
                        {/* Default form login */}
                        <form className="p-5" action="#!">
                            {/*<h4 class="text-center blue">Have you had a blood clot white your blood thinner was interrupted?</h4> */}
                            <br />
                            <br />
                            <p className="blue">
                                <b>Please specify the type of condition</b>
                            </p>
                            <label className="radio-inline blue">Deep vein Thrombosis</label>
                            <input
                                type="checkbox"
                                name="optradio"
                                id="optradio1"
                                className="pull-right"
                                onClick={this.onRadioBtn1}
                                onChange={(e) =>
                                    this.setState({
                                        q1_ans: 'Deep vein Thrombosis',
                                        chkVal: 1,
                                    })
                                }
                            />

                            <div id="toggle1">
                                <p className="blue">
                                    <b>If So, how long ago</b>
                                </p>
                                <label className="radio-inline blue">Less than 1 month ago</label>
                                <input
                                    type="radio"
                                    name="dvt1"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q1_ans: 'Less than 1 month ago',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">Between 1 and 3 months ago</label>
                                <input
                                    type="radio"
                                    name="dvt1"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q1_ans: 'Between 1 and 3 months ago',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">More than 3 months ago</label>
                                <input
                                    type="radio"
                                    name="dvt1"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q1_ans: 'More than 3 months ago<',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">Not Sure</label>
                                <input
                                    type="radio"
                                    name="dvt1"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_sub_q1_ans: 'Not Sure' })}
                                />
                                <div className="text-danger"> {this.state.error2 !== '' ? this.state.error2 : ''}</div>
                            </div>

                            <br />
                            <label className="radio-inline blue">Pulmonary Embolism</label>
                            <input
                                type="checkbox"
                                name="optradio"
                                id="optradio2"
                                className="pull-right"
                                onClick={this.onRadioBtn2}
                                onChange={(e) =>
                                    this.setState({
                                        q2_ans: 'Pulmonary Embolis',
                                        chkVal: 1,
                                    })
                                }
                            />

                            <div id="toggle2">
                                <p className="blue">
                                    <b>If So, how long ago</b>
                                </p>
                                <label className="radio-inline blue">Less than 1 month ago</label>
                                <input
                                    type="radio"
                                    name="pe"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q2_ans: 'Less than 1 month ago',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">Between 1 and 3 months ago</label>
                                <input
                                    type="radio"
                                    name="pe"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q2_ans: 'Between 1 and 3 months ago',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">More than 3 months ago</label>
                                <input
                                    type="radio"
                                    name="pe"
                                    className="pull-right"
                                    onChange={(e) =>
                                        this.setState({
                                            q1_sub_q2_ans: 'More than 3 months ago',
                                        })
                                    }
                                />
                                <br />
                                <label className="radio-inline blue">Not Sure</label>
                                <input
                                    type="radio"
                                    name="pe"
                                    className="pull-right"
                                    onChange={(e) => this.setState({ q1_sub_q2_ans: 'Not Sure' })}
                                />

                                <div className="text-danger"> {this.state.error3 !== '' ? this.state.error3 : ''}</div>
                            </div>
                            <br />
                            <label className="radio-inline blue">Not Sure</label>
                            <input
                                type="checkbox"
                                name="optradio"
                                onClick={this.mainOption}
                                id="mainoption313"
                                className="pull-right"
                                onChange={(e) => this.setState({ q3_ans: 'Not Sure', chkVal: 1 })}
                            />
                            <br />

                            <div className="text-danger"> {this.state.error1 !== '' ? this.state.error1 : ''}</div>
                        </form>
                        {/* Default form login */}
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item ">
                                    <button className="page-link" onClick={goBack} tabIndex={-1}>
                                        <i className="fa fa-angle-double-left"></i> Previous
                                    </button>
                                </li>
                                <button className="page-link" onClick={this.submitForm}>
                                    Next <i className="fa fa-angle-double-right"></i>
                                </button>
                            </ul>
                        </nav>
                        <br />
                    </div>
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        $('#toggle1').hide();
        $('#toggle2').hide();
    }
}
export default Page5;
