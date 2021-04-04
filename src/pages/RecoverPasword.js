import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner';
import { domain } from '../App';

class RecoverPasword extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-white">{message}</div>,
        });
        console.log(this.validator);
        this.state = {
            token: this.props.match.params.token,
            password: '',
            errorMsg: '',
            islogged: '',
            password_confirmation: '',
            loader: '',
            email: '',
        };

        this.submitForm = this.submitForm.bind(this);

        console.log(this.props.match.params.token);
    }

    submitForm() {
        if (this.validator.allValid()) {
            // alert('You submitted the form and stuff!');
            console.log(this.state);
            this.signin(this.state);
            //  this.signin()
            // this.props.history.push('/User/section');
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    signin(param) {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.props.match.params.token,
        };
        this.setState({ loader: 1 });
        axios
            .post(domain + '/api/auth/reset', param)
            .then((response) => {
                console.log(response);
                this.setState({ loader: '' });
                this.setState({ errorMsg: response.data.message });

                console.log(response.data.message);
            })
            .catch((error) => {
                // what now?
                console.log(error.error);
                this.setState({ errorMsg: error.error });
                this.setState({ loader: '' });
            });
    }

    inputChangedHandler(e) {
        console.log(this.state);
    }

    render() {
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
                        <h1 className="mb-4 text-left white">Welcome back!</h1>
                        {/* Email */}

                        <input
                            type="text"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />

                        {this.validator.message('email', this.state.password, 'required|min:8')}

                        <input
                            type="password"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />

                        {this.validator.message('password', this.state.password, 'required|min:6')}

                        {/* Password */}
                        <input
                            type="text"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="Confirm Password"
                            type="password"
                            value={this.state.password_confirmation}
                            onChange={(e) =>
                                this.setState({ password_confirmation: e.target.value })
                            }
                        />
                        {this.validator.message(
                            'confirmPassword',
                            this.state.password_confirmation,
                            'required|min:6'
                        )}

                        <div className="text-white">{this.state.errorMsg}</div>

                        <div className="text-right">{/* Forgot password */}</div>
                        {/* Sign in button */}
                        <Link
                            to="#"
                            className="btn btn-info btn-block my-4 bg-light blue"
                            onClick={this.submitForm}
                            type="submit"
                        >
                            Submit
                        </Link>
                        <Link className="white" to="/signin">
                            Signin
                        </Link>

                        {/* Register */}
                    </form>
                </div>

                <br />
                <br />
            </div>
        );
    }
}
export default RecoverPasword;
