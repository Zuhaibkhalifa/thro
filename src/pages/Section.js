import React from 'react';
import { Link } from 'react-router-dom';
import PatientImg from '.././assets/img/421342314.png';
import NurseImg from '.././assets/img/123124.png';
import { logout } from '../utils/user';

class Section extends React.Component {
    constructor(props) {
        super(props);

        this.go_away = this.go_away.bind(this);
        document.getElementById('body').classList.remove('blue-bg');
    }

    go_away() {
        logout();

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <div className="col-md-10 offset-md-1 text-center bg-light">
                    {' '}
                    {/* col */}
                    <h1 className="blue">Are you a patient or a healthcare provider?</h1>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <Link to="/User/Page2">
                                <img className="img-fluid" src={PatientImg} alt="Patients" />
                            </Link>
                        </div>

                        <div className="col-6">
                            <Link to="/Nurse/Nurse1">
                                <img className="img-fluid" src={NurseImg} alt="Nurse" />
                            </Link>
                        </div>
                    </div>
                    <br />
                    <br />
                    <Link to="" className="blue" onClick={this.go_away}>
                        <i className="fa fa-long-arrow-left" aria-hidden="true" /> &nbsp; Logout
                    </Link>
                </div>{' '}
                {/* //col */}
            </div>
        );
    }
}
export default Section;
