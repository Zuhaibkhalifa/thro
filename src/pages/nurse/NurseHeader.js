import React from 'react';
import { NavLink } from 'react-router-dom';

class NurseHeader extends React.Component {

    render() {
        return (
            <div className="top-bar">
                <div className="row">
                    <div className="col-3">
                        <div className="dropdown dropright">
                            <NavLink to="/User/page2">
                                <button
                                    className="btn custom-dropdown"
                                    type="button"
                                    id="dropdown1"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-exchange" />
                                </button>
                            </NavLink>
                            <div className="dropdown-menu" aria-labelledby="dropdown1">
                                <a className="dropdown-item" href="!#">
                                    Action
                                </a>
                                <a className="dropdown-item" href="!#">
                                    Another action
                                </a>
                                <a className="dropdown-item" href="!#">
                                    Something else here
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h2 className="white text-center topbar-h6">Nurses Questionnaire</h2>
                    </div>
                    <div className="col-3 text-right">
                        <div className="dropdown dropleft">
                            <NavLink to="/Nurse/patient_search">
                                <button
                                    className="btn custom-dropdown"
                                    type="button"
                                    id="dropdown2"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-arrow-left" />
                                </button>
                            </NavLink>
                            <div className="dropdown-menu" aria-labelledby="dropdown2">
                                <a className="dropdown-item" href="!#">
                                    Action
                                </a>
                                <a className="dropdown-item" href="!#">
                                    Another action
                                </a>
                                <a className="dropdown-item" href="!#">
                                    Something else here
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NurseHeader;
