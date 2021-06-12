import React from 'react';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { login, isLogin } from '../utils/user';
import ReactSpinner from 'react-bootstrap-spinner';
import { domain } from '../App';

//

class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-white">{message}</div>,
        });
        console.log('Signin - constructor - validator: ', this.validator);
        this.state = {
            email: '',
            password: '',
            errorMsg: '',
            islogged: '',
            loader: '',
        };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        if (this.validator.allValid()) {
            // alert('You submitted the form and stuff!');
            console.log('Signin - submitForm - state: ', this.state);
            this.signin(this.state);
            // this.props.history.push('/User/section');
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    signin(param) {
        this.setState({ loader: 1 });

        axios
            .post(domain + '/api/auth/login', {
                email: param.email,
                password: param.password,
            })
            .then((response) => {
                console.log(response.data); 
                this.setState({ loader: '' });
                this.setState({ errorMsg: response.data.error });

                if (response.data.hasOwnProperty('token')) {
                    // admin login
                    login(response.data.token); 
                    let serv_data = response.data.data;
                    if(serv_data.user_role == 'Patient') {
                        this.props.history.push('/User/Page2');
                    } else {
                        this.props.history.push('/Nurse/patient_search');
                    }
                }

                /*
    if(response.data.id !=''){
     window.location="/user/Dashboard";
    } else {
      
    } 
    */
            })
            .catch((error) => {
                // what now?
                console.log(error);
                this.setState({ loader: '' });
                console.log(error);

                // client received an error response (5xx, 4xx)
            });
    }

    render() {
        if (isLogin()) {
            this.props.history.push('/User/Section');
        } else {
        }
        return (
            <div>
                <br />
                <br />
                {this.state.loader === 1 ? (
                    <div className="centered">
                        <ReactSpinner type="border" color="white" size="5" />
                    </div>
                ) : (
                    ''
                )}
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

                        <input
                            type="email"
                            id="defaultLoginFormEmail"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="E-mail"
                            type="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <p className="text-left">
                            {' '}
                            {this.validator.message('email', this.state.email, 'required|email')}
                        </p>
                        {/* Password */}
                        <input
                            type="password"
                            id="defaultLoginFormPassword"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />

                        <p className="text-left">
                            {' '}
                            {this.validator.message('password', this.state.password, 'required|min:6')}
                        </p>

                        <div className="text-white text-left">{this.state.errorMsg}</div>

                        <div className="text-right">
                            {/* Forgot password */}
                            <Link className="white" to="/Forgotpassword">
                                Forgot password?
                            </Link>
                        </div>
                        {/* Sign in button */}
                        <Link
                            to="#"
                            className="btn btn-info btn-block my-4 bg-light blue"
                            onClick={this.submitForm}
                            type="submit"
                        >
                            SIGN IN
                        </Link>

                        {/* Register */}
                        <p className="white"> DO NOT HAVE AN ACCOUNT? </p>
                        <Link className="white" to="/Register">
                            REGISTER
                        </Link>
                    </form>
                </div>

                <br />
                <br />
            </div>
        );
    }
}
export default Signin;
