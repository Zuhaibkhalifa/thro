import React from 'react';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { login, isLogin } from '../utils/user';
import ReactSpinner from 'react-bootstrap-spinner';
import { domain } from '../App';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-white">{message}</div>,
        });
        console.log(this.validator);
        this.state = {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
            errorMsg: '',
            loader: '',
        };

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        if (this.validator.allValid()) {
            //  alert('You submitted the form and stuff!');
            console.log(this.state);
            this.getSignup(this.state);
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    getSignup(param) {
        this.setState({ loader: 1 });
        axios
            .post(domain + '/api/auth/register', {
                email: param.email,
                name: param.name,
                password: param.password,
                password_confirmation: param.confirmPassword,
            })
            .then(
                (response) => {
                    console.log(response);

                    this.setState({ loader: '' });
                    this.setState({ errorMsg: response.data.message });

                    console.log(response.data.message);
                },
                (error) => {
                    console.log(error);
                    console.log(error.error);

                    this.setState({ loader: '' });

                    if (error.response) {
                        console.log(error.response.data.error);
                        this.setState({ errorMsg: error.response.data.error.email });
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                }
            );
    }

    // gmail signup

    render() {
        if (isLogin()) {
            this.props.history.push('/User/Section');
        }
        return (
            <div>
                {this.state.loader === 1 ? (
                    <div className="centered">
                        <ReactSpinner type="border" color="white" size="5" />
                    </div>
                ) : (
                    ''
                )}
                <br />
                <br />
                <div className="col-md-6 offset-md-3 blue-bg blue-box">
                    {' '}
                    {/* blue box */}
                    {/* Default form login */}
                    <form className="text-center p-5" action="#!">
                        <div className="round-icon">
                            <i className="fa fa-user fa-2x blue" aria-hidden="true" />
                        </div>
                        <br />
                        <h4 className="mb-4 text-left white">Register As Healthcare Provider</h4>
                        {/* Email */}
                        <input
                            type="text"
                            id="defaultLoginFormEmail"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                        <p className="text-left">
                            {' '}
                            {this.validator.message('Name', this.state.name, 'required|alpha')}{' '}
                        </p>

                        {/* Password */}
                        <input
                            type="text"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="Email"
                            type="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <p className="text-left">
                            {' '}
                            {this.validator.message('email', this.state.email, 'required|email')}
                        </p>
                        <input
                            type="text"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <p className="text-left">
                            {' '}
                            {this.validator.message(
                                'password',
                                this.state.password,
                                'required|min:6'
                            )}{' '}
                        </p>

                        <input
                            type="text"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="Confirm Password"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                        />

                        {this.validator.message(
                            'confirmPassword',
                            this.state.confirmPassword,
                            `required|in:${this.state.password}`,
                            { messages: { in: 'Passwords need to match!' } }
                        )}
                        <br />
                        <div className="text-white text-left">{this.state.errorMsg}</div>
                        {/* Sign in button */}
                        <Link
                            to="#"
                            className="btn btn-info btn-block my-4 bg-light blue"
                            type="submit"
                            onClick={this.submitForm}
                        >
                            REGISTER
                        </Link>
                        {/* Register */}
                        <Link className="white" to="/Signin">
                            SIGN IN
                        </Link>
                    </form>
                    {/* Default form login */}
                </div>{' '}
                {/* //blue box */}
            </div>
        );
    }
}
export default Register;
