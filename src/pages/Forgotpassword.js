import React from 'react';
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-bootstrap-spinner';
import SimpleReactValidator from 'simple-react-validator';

import axios from 'axios';
import { domain } from '../App';
import { isLogin } from '../utils/user';

//

class Forgotpassword extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-white">{message}</div>,
        });
        console.log(this.validator);
        this.state = { email: '', errorMsg: '', loader: ''};

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        if (this.validator.allValid()) {
            // alert('You submitted the form and stuff!');
            console.log('Forget Pass, SubitForm - State: ', this.state);
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
            .post(domain + '/api/auth/recovery', {
                email: param.email,
            })
            .then((response) => {
                console.log(response);
                this.setState({ errorMsg: response.data.message });

                console.log('Forget Pass, Signin - Response data msg: ', response.data.message);
                /*
    if(response.data.id !=''){
     window.location="/user/Dashboard";
    } else {
      
    } 
    */
                this.setState({ loader: '' });
            })
            .catch((error) => {
                console.log('Forget Pass, Signin - Response error msg: ', error.error);
                this.setState({ errorMsg: error.error });
                this.setState({ loader: '' });
            });
    }

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
                        <h1 className="mb-4 text-left white">Recover Password</h1>
                        {/* Email */}
                        <input
                            type="email"
                            id="defaultLoginFormEmail"
                            className="form-control mb-4 blue-custom-input"
                            placeholder="E-mail"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <p className="text-white text-left">
                            {this.validator.message('email', this.state.email, 'required|email')}
                        </p>

                        <div className="text-white text-left">{this.state.errorMsg}</div>
                        <div className="text-right">
                            {/* Forgot password */}
                            <Link className="white" to="/Signin">
                                Signin
                            </Link>
                        </div>
                        {/* Sign in button */}
                        <Link
                            to="#"
                            className="btn btn-info btn-block my-4 bg-light blue"
                            onClick={this.submitForm}
                            type="submit"
                        >
                            Submit
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
export default Forgotpassword;
