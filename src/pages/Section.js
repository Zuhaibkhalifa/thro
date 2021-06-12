import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../utils/user';
import axios from 'axios';
import PatientImg from '.././assets/img/421342314.png';
import NurseImg from '.././assets/img/123124.png';
import { domain } from '../App';
import ReactSpinner from 'react-bootstrap-spinner';
//

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user_role: "", loading: 1 };
        this.go_away = this.go_away.bind(this);
        document.getElementById('body').classList.remove('blue-bg');
    }

    go_away() {
        logout();

        this.props.history.push('/');
    }

    //

    componentDidMount() {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        axios.get(domain + '/api/profile', { headers:headers }).then((response) => {
            console.log(response);
            this.setState({ user_role: response.data.user_role, loading: 0 });
        });
        console.log(this.state);
    }
    
    render() {
        return (
            <div>
                <br />
                <br />
                { (this.state.loading == 0) ? 
                <div className="col-md-10 offset-md-1 text-center bg-light">
                    {' '}
                    {/* col */}
                    <h1 className="blue">Please click the below link and continue. </h1>
                    <br /> 
                    <br />
                    <div className="row">
                        { (this.state.user_role == 'Nurse') ? 
                            <div style={{ paddingLeft: "45px" }} className="col-6">
                                <Link to="/Nurse/patient_search">
                                    <img className="img-fluid" src={NurseImg} alt="Nurse" />
                                </Link>
                            </div>
                            : 
                            <div style={{ paddingLeft: "45px" }} className="col-6">
                                <Link to="/User/Page2">
                                    <img className="img-fluid" src={PatientImg} alt="Patients" />
                                </Link>
                            </div>
                        }
                    </div>
                    <br />
                    <br />
                    <Link to="" className="blue" onClick={this.go_away}>
                        <i className="fa fa-long-arrow-left" aria-hidden="true" /> &nbsp; Logout
                    </Link>
                </div>
                : 
                    <div className="centered">
                    <ReactSpinner type="border" color="blue" size="5" />
                </div> }
            </div> 
        );
    }
}
export default Section;
