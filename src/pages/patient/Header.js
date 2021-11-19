import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.go_away = this.go_away.bind(this);
        this.go_home = this.go_home.bind(this);
        this.redirectBackNurse = this.redirectBackNurse.bind(this);
    }

    redirectBackNurse() {
        if(this.props.nurse_add) {
            this.props.history.push('/Nurse/add_patient')
        } else {
            this.props.history.push('/Nurse/Nurse1');
        }
    }

    go_away() {
        localStorage.clear();
        window.location = '/signin';
        //    this.props.history.push('/signin');
    }

    go_home() {
        window.location = '/User/Section';
        //    this.props.history.push('/signin');
    }

    render() {
        return (
            <div className="top-bar-div">
                <div className="top-bar1">
                    <div className="row">
                        <div className="col-3">
                            <div className="dropdown dropright">
                                <button
                                    className="btn custom-dropdown"
                                    type="button"
                                    id="dropdown1"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    onClick={this.go_home}
                                >
                                    <span>
                                        <i className="fa fa-home" />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="col-6">
                            <h6 className="white text-center topbar-h6">PATIENT QUESTIONNAIRE</h6>
                        </div>
                        <div className="col-3 text-right">
                            <div className="dropdown dropleft">
                                {!this.props.patient_id ?
                                    <button
                                        onClick={this.go_away}
                                        className="btn custom-dropdown"
                                        type="button"
                                        id="dropdown2"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <i className="fa fa-sign-out" />
                                        </span>
                                    </button> :
                                    <button
                                    onClick={this.redirectBackNurse}
                                    className="btn custom-dropdown"
                                    type="button"
                                    id="dropdown2"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >
                                        <span>
                                            <i className="fa fa-arrow-left" />
                                        </span>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;
