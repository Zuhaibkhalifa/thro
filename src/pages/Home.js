import React from "react";
import { Link } from "react-router-dom";
import signinImg from ".././assets/img/1.png";
import logo from ".././assets/img/logo.png";
import { login, isLogin } from "../utils/user";

class Home extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      if (isLogin()) {
         this.props.history.push("/User/Section");
      }
      return (
         <div className="blue-bg">
            <div className="container">
               <div className="row text-center">
                  <div className="col-12">
                     <img src={logo} className="img-fluid red-logo" />
                  </div>
               </div>
               <div className="row text-center">
                  <div className="col-md-6 offset-md-3">
                     <Link to="/Signin">
                        <img src={signinImg} className="img-fluid" />
                     </Link>
                  </div>
               </div>
               <div className="row text-center">
                  <div className="col-md-6 offset-md-3"></div>
               </div>
            </div>
         </div>
      );
   }
}
export default Home;
