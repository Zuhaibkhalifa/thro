import React from 'react';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner';
import $ from 'jquery';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';

import { domain } from '../../App';

class Page12 extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });
        console.log(this.validator);
        this.state = { q1_id: '', q1_ans: '', loader: '' };

        this.submitForm = this.submitForm.bind(this);
        var element = document.getElementById('body');
        element.classList.add('blue-bg');

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        try {
            axios
                .get(domain + '/api/patient/page12LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log(response);
                    this.setState({ loader: '' });
                });
        } catch (error) {
            console.error(error);
            this.setState({ loader: '' });
        }
    }
    showhide() {
        if (document.getElementById('other_show_hide').checked === true) {
            $('#de').show(100);
        } else {
            $('#de').hide(100);
        }
    }

    submitForm() {
        var t = $('#reason11').val();

        if (document.getElementById('other_show_hide').checked === true && t === '') {
            this.setState({ error1: 'This field is required' });
        } else {
            this.setState({ error1: '' });
            if (this.validator.allValid()) {
                //  alert('You submitted the form and stuff!');
                console.log('Patient page 12 - submit form - state: ', this.state);
                this.page12(this.state);
                this.props.history.push('/User/Page13');
                //  this.getSignup(this.state);
            } else {
                this.validator.showMessages();
                // rerender to show messages for the first time
                // you can use the autoForceUpdate option to do this automatically`
                this.forceUpdate();
            }
        }
    }
    page12() {
        var param = {
            lab_location_for_inr_test: this.state.q1_ans,
        };
        const response = server('patient/page12', param);
        console.log('Patient page 12 - page12 func - reponse: ', response);
        //  this.props.history.push('');
    }

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
                    <h1 className="text-center white main-heading">Lab Location</h1>
                    <br />
                    <br />
                    <div className="bg-light blue-box">
                        {' '}
                        {/* white box */}
                        {/* Default form login */}
                        <form className="p-5" action="#!">
                            <p className="blue">
                                <b>Lab location for INR test</b>
                            </p>
                            <label className="radio-inline blue">Life Labs</label>
                            <input
                                type="radio"
                                name="optradio"
                                className="pull-right"
                                onClick={this.showhide}
                                value="Life Labs"
                                defaultChecked={this.state.q1_ans === 'Life Labs'}
                                onChange={(e) => this.setState({ q1_ans: 'Life Labs' })}
                            />
                            <br />
                            <label className="radio-inline blue">Gamma Dyna-care</label>
                            <input
                                type="radio"
                                name="optradio"
                                className="pull-right"
                                onClick={this.showhide}
                                value="Gamma Dyna-care"
                                defaultChecked={this.state.q1_ans === 'Gamma Dyna-care'}
                                onChange={(e) => this.setState({ q1_ans: 'Gamma Dyna-care' })}
                            />
                            <br />
                            <label className="radio-inline blue">Hamilton Health Science</label>
                            <input
                                type="radio"
                                name="optradio"
                                className="pull-right"
                                onClick={this.showhide}
                                value="Hamilton Health Science"
                                defaultChecked={this.state.q1_ans === 'Hamilton Health Science'}
                                onChange={(e) =>
                                    this.setState({ q1_ans: 'Hamilton Health Science' })
                                }
                            />
                            <br />
                            <label className="radio-inline blue">St. Josesph's Healthcare</label>
                            <input
                                type="radio"
                                name="optradio"
                                className="pull-right"
                                onClick={this.showhide}
                                value="St. Josesph's Healthcare"
                                defaultChecked={this.state.q1_ans === "St. Josesph's Healthcare"}
                                onChange={(e) =>
                                    this.setState({ q1_ans: "St. Josesph's Healthcare" })
                                }
                            />
                            <br />
                            <label className="radio-inline blue">Other</label>
                            <input
                                type="radio"
                                name="optradio"
                                className="pull-right"
                                onClick={this.showhide}
                                value="Other"
                                defaultChecked={this.state.q1_ans === 'Other'}
                                id="other_show_hide"
                                onChange={(e) => this.setState({ q1_ans: 'Other' })}
                            />
                            {this.validator.message('Field', this.state.q1_ans, 'required')}

                            <div id="de">
                                <input
                                    type="text"
                                    id="reason11"
                                    className="form-control mb-4 transparent-custom-input"
                                    placeholder="Reason for treatment with blood"
                                    onChange={(e) => this.setState({ q1_ans: e.target.value })}
                                />

                                <div className="text-danger">
                                    {' '}
                                    {this.state.error1 !== '' ? this.state.error1 : ''}
                                </div>
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
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        document.getElementById('de').style.display = 'none';
    }
}
export default Page12;
