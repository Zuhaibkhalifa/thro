import React from 'react';
import { Link } from 'react-router-dom';
import Header from './NurseHeader';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner';

import $ from 'jquery';
import { server } from '../../utils/functions';
import { domain } from '../../App';

//

class Page4_old extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message, className) => <div className="text-danger">{message}</div>,
        });
        console.log(this.validator);
        this.state = {
            seen_by: '',
            assessment_by_doctor: '',
            study_by: '',
            study_result: '',
            comments: '',
            loader: 0,
        };

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        if (this.validator.allValid()) {
            //  alert('You submitted the form and stuff!');
            console.log(this.state);
            this.page4(this.state);
            this.props.history.push('/Nurse/Nurse3');
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    page4(param) {
        server('nurse/page4', param);
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
                        <h1 className="display-4">Bridging Summary</h1>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-3">
                                <label>
                                    <b>Seen By:</b>
                                </label>
                            </div>
                            <div className="col-5">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="usr"
                                        value={this.state.seen_by}
                                        onChange={(e) => this.setState({ seen_by: e.target.value })}
                                    />
                                    {this.validator.message(
                                        'seen_by',
                                        this.state.seen_by,
                                        'required'
                                    )}
                                </div>
                            </div>
                        </div>
                        <br />
                        <h4>Assessment by Doctor:</h4>
                        <br />
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="assessment_by_doctor1"
                                name="assessment_by_doctor"
                                value="Schulman"
                                defaultChecked={this.state.assessment_by_doctor === 'Schulman'}
                                onChange={(e) =>
                                    this.setState({ assessment_by_doctor: 'Schulman' })
                                }
                            />
                            <label className="custom-control-label" htmlFor="assessment_by_doctor1">
                                Schulman
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="assessment_by_doctor2"
                                name="assessment_by_doctor"
                                value="Eikelboom"
                                defaultChecked={this.state.assessment_by_doctor === 'Eikelboom'}
                                onChange={(e) =>
                                    this.setState({ assessment_by_doctor: 'Eikelboom' })
                                }
                            />
                            <label className="custom-control-label" htmlFor="assessment_by_doctor2">
                                Eikelboom
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="assessment_by_doctor3"
                                name="assessment_by_doctor"
                                value="Douketis"
                                defaultChecked={this.state.assessment_by_doctor === 'Douketis'}
                                onChange={(e) =>
                                    this.setState({ assessment_by_doctor: 'Douketis' })
                                }
                            />
                            <label className="custom-control-label" htmlFor="assessment_by_doctor3">
                                Douketis
                            </label>
                            {this.validator.message(
                                '',
                                this.state.assessment_by_doctor,
                                'required'
                            )}
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="row">
                            <div className="col-3">
                                <label>
                                    <b>Study By:</b>
                                </label>
                            </div>
                            <div className="col-5">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="usr1"
                                        value={this.state.study_by}
                                        onChange={(e) =>
                                            this.setState({ study_by: e.target.value })
                                        }
                                    />
                                    {this.validator.message('', this.state.study_by, 'required')}
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="study_result1"
                                name="study_result"
                                value="Consented"
                                defaultChecked={this.state.study_result === 'Consented'}
                                onChange={(e) => this.setState({ study_result: 'Consented' })}
                            />
                            <label className="custom-control-label" htmlFor="study_result1">
                                Consented
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="study_result2"
                                name="study_result"
                                value="Consented"
                                defaultChecked={this.state.study_result === 'Declined'}
                                onChange={(e) => this.setState({ study_result: 'Declined' })}
                            />
                            <label className="custom-control-label" htmlFor="study_result2">
                                Declined
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id="study_result3"
                                name="study_result"
                                value="Not Eliginble"
                                defaultChecked={this.state.study_result === 'Not Eliginble'}
                                onChange={(e) => this.setState({ study_result: 'Not Eliginble' })}
                            />
                            <label className="custom-control-label" htmlFor="study_result3">
                                Not Eliginble
                            </label>
                            {this.validator.message('', this.state.study_result, 'required')}
                        </div>
                        <br />
                        <hr />
                        <br />
                        <h4>Comments:</h4>
                        <br />
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                rows={5}
                                id="comment"
                                value={this.state.comment}
                                onChange={(e) => this.setState({ comment: e.target.value })}
                            />
                            {this.validator.message('comment', this.state.comment, 'required')}
                        </div>
                    </div>{' '}
                    {/* //Jumbotron */}
                    <br />
                    <Link to="/Nurse/Nurse8" className="previous round np-btn">
                        <i className="fa fa-chevron-left" aria-hidden="true" />
                    </Link>
                    <button onClick={this.submitForm} className="previous round np-btn pull-right">
                        <i className="fa fa-chevron-right" aria-hidden="true" />
                    </button>
                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {}
}
export default Page4_old;
