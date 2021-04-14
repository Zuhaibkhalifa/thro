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

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });
        console.log('Nurse page2 - Constructor - validator: ', this.validator);

        this.state = {
            date: '',
            referred_by: '',
            procedure: '',
            procedureSelected: '',
            cabg: '',
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
                .get(domain + '/api/nurse/page1LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Nurse page2 - Constructor - Response: ', response);
                    console.log('Nurse page2 - Constructor - Response.data.success: ', response.data.success[0]);

                    data = response.data.success[0];
                    this.setState({ loader: '' });

                    if (data !== undefined) {
                        this.setState({
                            date: data.date,
                            referred_by: data.physicianName,
                            procedureSelected: data.procedure1,
                            cabg: data.cabg,
                        });
                    }
                });
        } catch (error) {
            console.error(error);
            this.setState({ loader: '' });
        }
    }

    //
    submitForm() {
        console.log(this.state);

        if (this.validator.allValid()) {
            console.log('Nurse page2 - submit - state: ', this.state);
            this.page1(this.state);
            this.props.history.push('/Nurse/Nurse3');
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    handleChange_procedure(value) {
        this.setState({ procedureSelected: value });
    }

    page1(param) {
        var param = {
            date: this.state.date,
            procedure: this.state.procedureSelected,
            referred_by: this.state.physicianName,
            cabg: this.state.cabg,
        };
        console.log(param);
        server('nurse/page1', param);
    }

    //
    //
    //

    render() {
        return (
            <React.Fragment>
                <Header />
                <br />
                <h2 className="text-center myHeading">Procedure Information</h2>
                <br />
                <div className="container">
                    {this.state.loader === 1 ? (
                        <div className="centered">
                            <ReactSpinner type="border" color="blue" size="5" />
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="jumbotron">
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="usr">Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="form-control"
                                        value={this.state.date}
                                        onChange={(e) => this.setState({ date: e.target.value })}
                                    />
                                    {this.validator.message('', this.state.date, 'required')}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="usr">Referred By</label>
                                    <input
                                        type="text"
                                        id="referred_by"
                                        className="form-control"
                                        value={this.state.referred_by}
                                        onChange={(e) => this.setState({ referred_by: e.target.value })}
                                    />
                                    {this.validator.message('', this.state.referred_by, 'required')}
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="sel1">Select list procedure</label>
                            <select
                                className="form-control"
                                id="procedure"
                                value={this.state.procedureSelected}
                                onChange={(e) => this.setState({ procedureSelected: e.target.value })}
                            >
                                <option>Please select</option>
                                <option>Endoscopy</option>
                                <option>Colonoscopy</option>
                                <option>Bronchoscopy</option>
                                <option>ICD insert / replace</option>
                                <option>Pacemater insert / replace</option>
                                <option>Cardioversion</option>
                                <option>Lead reposition</option>
                                <option>CABG</option>
                            </select>
                            {this.validator.message('unit_procedure', this.state.procedureSelected, 'required')}
                        </div>
                        <br />
                        <div className="form-group" id="cabg_div">
                            <label htmlFor="usr">Please specify number for CABG</label>
                            <input
                                type="text"
                                className="form-control"
                                id="usr"
                                defaultValue={this.state.cabg}
                                onChange={(e) => this.setState({ cabg: e.target.value })}
                            />
                        </div>
                        <br /> <br />
                        <div className="row">
                            <div className="col-4">
                                <Link to="/Nurse/Nurse1" className="btn btn-outline-primary  btn-block">
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
                </div>
                ;
            </React.Fragment>
        );
    }

    componentDidMount() {
        $('#cabg_div').hide();

        $('#procedure').change(function () {
            var txt = $('#procedure').val();
            if (txt === 'CABG') {
                $('#cabg_div').show(500);
            } else {
                $('#cabg_div').hide(500);
            }
        });
    }
}
export default Page2;
