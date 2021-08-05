import React from 'react';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';

import { domain } from '../../App';

class Page14 extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });
        console.log(this.validator);
        this.state = { q1_ans: '', q2_ans: '', loader: '' };

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
                .get(domain + '/api/patient/page14LoadData', {
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

    submitForm() {
        if (this.validator.allValid()) {
            //  alert('You submitted the form and stuff!');
            console.log(this.state);
            this.page14(this.state);
            this.props.history.push('/User/Page15');
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    page14() {
        var param = {
            cirrhosis_of_liver: this.state.q1_ans,
            antiphospholipid_antibody_syndrome: this.state.q2_ans,
        };

        server('patient/page14', param);
        //this.props.history.push('');
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
                    <h1 className="text-center white main-heading">Other medical conditions</h1>
                    <br />
                    <br />
                    <div className="bg-light blue-box">
                        {' '}
                        {/* white box */}
                        {/* Default form login */}
                        <form className="p-5" action="#!">
                            <p className="blue">
                                <b>Do you have cirrhosis of the liver?</b>
                            </p>
                            <label className="radio-inline blue">Yes</label>
                            <input
                                type="radio"
                                name="liver"
                                className="pull-right"
                                value="Yes"
                                onChange={(e) => this.setState({ q1_ans: 'Yes' })}
                            />
                            <br />
                            <label className="radio-inline blue">No</label>
                            <input
                                type="radio"
                                name="liver"
                                className="pull-right"
                                value="No"
                                onChange={(e) => this.setState({ q1_ans: 'No' })}
                            />
                            {this.validator.message('Question', this.state.q1_ans, 'required')}
                            <br />
                            <br />
                            <p className="blue">
                                <b>Do you have antiphospholipid antibody syndrome?</b>
                            </p>
                            <label className="radio-inline blue">Yes</label>
                            <input
                                type="radio"
                                name="optradio"
                                className="pull-right"
                                value="Yes"
                                onChange={(e) => this.setState({ q2_ans: 'Yes' })}
                            />
                            <br />
                            <label className="radio-inline blue">No</label>
                            <input
                                type="radio"
                                name="optradio"
                                className="pull-right"
                                value="No"
                                onChange={(e) => this.setState({ q2_ans: 'No' })}
                            />
                            {this.validator.message('Question', this.state.q2_ans, 'required')}
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
}
export default Page14;
