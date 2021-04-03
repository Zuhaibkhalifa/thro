import React from 'react';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import { goBack } from '../../utils/user';
import { Link } from 'react-router-dom';
import { server, showLoader } from '../../utils/functions';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner';
import { domain } from '../../App';

class Page2 extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            messages: {
                age: 'That is not an email.',
            },
            element: (message, className) => <div className="text-danger">{message}</div>,
        });

        console.log('Patient Page 2 - Constructor - Validator: ', this.validator);

        this.state = {
            age: '',
            weight: '',
            weight_unit: '',
            physicianName: '',
            weightSelected: '',
            unit_weight: '',
            genderSelected: '',
            gender: '',
            loader: '',
        };

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
                .get(domain + '/api/patient/page2LoadData', {
                    headers: headers,
                })
                .then((response) => {
                    console.log('Patient Page 2 - Response: Success');

                    this.setState({ loader: '' });
                });
        } catch (error) {
            console.error('Patient Page 2 - Response - Error: ', error);
            this.setState({ loader: '' });
        }
    }

    handleChange_weight(value) {
        this.setState({ weightSelected: value });
        // this.setState({ weight: value });
    }

    handleChange_gender(value) {
        console.log(value);
        this.setState({ genderSelected: value });
        this.setState({ gender: value });
    }

    submitForm() {
        if (this.validator.allValid()) {
            // alert('You submitted the form and stuff!');
            console.log('Patient Page 2 - submit form: ', this.state);

            this.page2(this.state);
            this.props.history.push('/User/Page3');
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    page2() {
        var param = {
            age: this.state.age,
            weight: this.state.weight,
            weight_unit: this.state.weight_unit,
            physicianName: this.state.physicianName,

            weightSelected: this.state.weightSelected,
            unit_weight: this.state.unit_weight,

            gender: this.state.gender,
            genderSelected: this.state.genderSelected,
        };

        var a = server('patient/page2', param);
        console.log('Patient Page 2 - submit form - response: ', a);
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
                    <h1 className="text-center white">
                        Preliminary <br /> Questions
                    </h1>
                    <br />
                    <br />
                    <div className="bg-light blue-box">
                        {' '}
                        {/* white box */}
                        {/* Default form login */}
                        <form className="p-5" action="#!">
                            {/* Email */}
                            <div className="form-row mb-4">
                                <div className="col-4">
                                    {/* First name */}
                                    <label htmlFor="age" className="blue">
                                        <b>Age</b>
                                    </label>
                                    <input
                                        type="text"
                                        id="age"
                                        className="form-control blue-custom-input"
                                        maxlengt="2"
                                        defaultValue={this.state.age}
                                        onChange={(e) => this.setState({ age: e.target.value })}
                                    />
                                    {this.validator.message('age', this.state.age, [
                                        'required',
                                        { regex: '(1[89]|[2-9][0-9]|10[0-9]|110)' },
                                    ])}
                                </div>
                                <div className="col-4">
                                    {/* Last name */}
                                    <label htmlFor="weight" className="blue">
                                        <b>Weight</b>
                                    </label>
                                    <input
                                        type="number"
                                        id="weight"
                                        min="1"
                                        className="form-control blue-custom-input"
                                        onChange={(e) => this.setState({ weight: e.target.value })}
                                    />

                                    {this.validator.message(
                                        'Weight',
                                        this.state.weight,
                                        'required'
                                    )}
                                    <div className="form-group"></div>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="weight" className="blue">
                                        <b>Unit</b>
                                    </label>
                                    <select
                                        className="form-control"
                                        id="procedure"
                                        value={this.state.weightSelected}
                                        onChange={(event) =>
                                            this.handleChange_weight(event.target.value)
                                        }
                                    >
                                        <option>Select Unit</option>
                                        <option>lbs</option>
                                        <option>Kg</option>
                                    </select>
                                    {this.validator.message(
                                        'unit_weight',
                                        this.state.weightSelected,
                                        'required'
                                    )}
                                </div>
                            </div>

                            <div className="form-row mb-4">
                                <div className="col-4">
                                    <label htmlFor="weight" className="blue">
                                        <b>Gender</b>
                                    </label>
                                    <select
                                        className="form-control"
                                        id="procedure"
                                        value={this.state.genderSelected}
                                        onChange={(event) =>
                                            this.handleChange_gender(event.target.value)
                                        }
                                    >
                                        <option>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                    {this.validator.message(
                                        'gender',
                                        this.state.genderSelected,
                                        'required'
                                    )}
                                </div>
                                <div className="col-4">
                                    <label htmlFor="age" className="blue">
                                        <b>Physician Name</b>
                                    </label>
                                    <input
                                        type="text"
                                        id="physicianName"
                                        className="form-control blue-custom-input"
                                        defaultValue={this.state.physicianName}
                                        onChange={(e) =>
                                            this.setState({
                                                physicianName: e.target.value,
                                            })
                                        }
                                    />
                                    {this.validator.message(
                                        'Physician Name',
                                        this.state.physicianName,
                                        'required'
                                    )}
                                </div>
                            </div>
                        </form>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled"></li>
                                <li className="page-item">
                                    <button className="page-link" onClick={this.submitForm}>
                                        Next <i className="fa fa-angle-double-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        <br />
                    </div>{' '}
                    {/* //white box */}
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {}
}
export default Page2;
