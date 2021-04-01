import React from "react";

import SimpleReactValidator from "simple-react-validator";
import { goBack } from "../../utils/user";
import { Link } from "react-router-dom";
import { server, showLoader } from "../../utils/functions";
import axios from "axios";
import ReactSpinner from "react-bootstrap-spinner";

class Header extends React.Component {
   constructor(props) {
      super(props);
      this.go_away = this.go_away.bind(this);
   }

   go_away() {
      localStorage.clear();
      window.location = "/signin";
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
                        >
                           <span className="fa-stack fa-sm">
                              <i className="fa fa-circle fa-stack-2x" />
                              <i className="fa fa-bars fa-stack-1x fa-inverse" />
                           </span>
                        </button>
                        <div
                           className="dropdown-menu"
                           aria-labelledby="dropdown1"
                        >
                           <a className="dropdown-item" href="#">
                              Action
                           </a>
                           <a className="dropdown-item" href="#">
                              Another action
                           </a>
                           <a className="dropdown-item" href="#">
                              Something else here
                           </a>
                        </div>
                     </div>
                  </div>
                  <div className="col-6">
                     <h6 className="white text-center topbar-h6">
                        PATIENT QUESTIONNAIRE
                     </h6>
                  </div>
                  <div className="col-3 text-right">
                     <div className="dropdown dropleft">
                        <button
                           onClick={this.go_away}
                           className="btn custom-dropdown"
                           type="button"
                           id="dropdown2"
                           data-toggle="dropdown"
                           aria-haspopup="true"
                           aria-expanded="false"
                        >
                           <span className="fa-stack fa-sm">
                              <i className="fa fa-circle fa-stack-2x" />
                              <i className="fa fa-ellipsis-v fa-stack-1x fa-inverse" />
                           </span>
                        </button>
                        <div
                           className="dropdown-menu"
                           aria-labelledby="dropdown2"
                        >
                           <a className="dropdown-item" href="#">
                              Action
                           </a>
                           <a className="dropdown-item" href="#">
                              Another action
                           </a>
                           <a className="dropdown-item" href="#">
                              Something else here
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
export default Header;
