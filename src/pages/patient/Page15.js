import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SimpleReactValidator from "simple-react-validator";
import ReactSpinner from "react-bootstrap-spinner";
import $ from "jquery";
import { goBack } from "../../utils/user";
import { server } from "../../utils/functions";
import axios from "axios";

import { domain } from "../../App";

class Page15 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => <div className="text-danger">{message}</div>,
      });
      console.log(this.validator);
      this.state = {
         q1_ans: "",
         cancer: "",
         radiation: "",
         radiation_ongoing: "",
         chemotherapy: "",
         chemotherapy_ongoing: "",
         chemotherapy_finished: "",
         error1: "",
         error2: "",
         error3: "",
         error4: "",
         error5: "",
         loader: "",
      };

      this.submitForm = this.submitForm.bind(this);
      var element = document.getElementById("body");
      element.classList.add("blue-bg");

      const headers = {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: "Bearer " + localStorage.getItem("token"),
      };
      try {
         axios
            .get(domain + "/api/patient/page15LoadData", {
               headers: headers,
            })
            .then((response) => {
               console.log(response);
               this.setState({ loader: "" });
            });
      } catch (error) {
         console.error(error);
         this.setState({ loader: "" });
      }
   }

   submitForm() {
      if (!$("input[name='optradio']:checked").val()) {
         this.setState({ error0: "This field is required" });
      } else if (document.getElementById("yes").checked === true && $("#cancer").val() == "") {
         this.setState({ error1: "This field is required" });
         this.setState({ error0: "" });
      } else if (
         document.getElementById("yes").checked === true &&
         document.getElementById("radaition").checked === false
      ) {
         this.setState({ error2: "This field is required" });
         this.setState({ error1: "" });
      } else if (
         document.getElementById("radaition").checked === true &&
         document.getElementById("radiation_ongoing").checked === false
      ) {
         this.setState({ error3: "This field is required" });
         this.setState({ error1: "" });
         this.setState({ error2: "" });
      } else if (
         document.getElementById("chemo").checked === true &&
         !$("input[name='chemotherapy_sub_opt']:checked").val()
      ) {
         this.setState({ error4: "This field is required" });
         this.setState({ error3: "" });
         this.setState({ error2: "" });
         this.setState({ error1: "" });
      } else {
         console.log(this.state);
         this.page15(this.state);
         this.props.history.push("/User/Page16");
      }
   }

   //
   page15() {
      let param = {};
      if (document.getElementById("no").checked === true) {
         param = {
            being_treated_cancer: this.state.q1_ans,
         };
      } else {
         param = {
            being_treated_cancer: this.state.q1_ans,
            cancer: this.state.cancer,
            radiation: this.state.radiation,
            radiation_ongoing: this.state.radiation_ongoing,
            chemotherapy: this.state.chemotherapy,
            chemotherapy_ongoing: this.state.chemotherapy_ongoing,
            chemotherapy_finished: this.state.chemotherapy_finished,
         };
      }

      server("patient/page15", param);
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
               ""
            )}
            <div>
               <h1 className="text-center white main-heading">Cancer</h1>
               <br />
               <br />
               <div className="bg-light blue-box">
                  {" "}
                  {/* white box */}
                  {/* Default form login */}
                  <form className="p-5" action="#!">
                     <p className="blue">
                        <b>Are you being treated with cancer?</b>
                     </p>
                     <label className="radio-inline blue">Yes</label>
                     <input
                        type="radio"
                        name="optradio"
                        className="pull-right"
                        id="yes"
                        value="Yes"
                        onChange={(e) => this.setState({ q1_ans: "Yes" })}
                     />
                     <br />
                     <div id="show_data">
                        {/* input */}

                        <input
                           type="text"
                           id="cancer"
                           className="form-control"
                           placeholder="Specify cancer type"
                           defaultValue={this.state.cancer}
                           onChange={(e) => this.setState({ cancer: e.target.value })}
                        />

                        <div className="text-danger">
                           {" "}
                           {this.state.error1 !== "" ? this.state.error1 : ""}
                        </div>
                        <br />
                        <div className="checkbox">
                           <label className="blue">Radiation </label>
                           <input
                              type="checkbox"
                              defaultValue
                              className="pull-right"
                              id="radaition"
                              name="rdo_box"
                              onChange={(e) => this.setState({ radiation: "Yes" })}
                           />
                           <div className="text-danger">
                              {" "}
                              {this.state.error2 !== "" ? this.state.error2 : ""}
                           </div>
                        </div>
                        <div id="radaition_opt">
                           <div className="checkbox">
                              <label className="blue"> &nbsp; &nbsp; &nbsp; Ongoing</label>
                              <input
                                 type="checkbox"
                                 defaultValue
                                 className="pull-right"
                                 id="radiation_ongoing"
                                 onChange={(e) => this.setState({ radiation_ongoing: "Yes" })}
                              />
                           </div>
                           <div className="text-danger">
                              {" "}
                              {this.state.error3 !== "" ? this.state.error3 : ""}
                           </div>
                        </div>
                        <div className="checkbox">
                           <label className="blue">Chemotherapy</label>
                           <input
                              type="checkbox"
                              defaultValue
                              className="pull-right"
                              id="chemo"
                              name="rdo_box"
                              onChange={(e) => this.setState({ chemotherapy: "Yes" })}
                           />
                           <div className="text-danger">
                              {" "}
                              {this.state.error4 !== "" ? this.state.error4 : ""}
                           </div>
                        </div>
                        <div id="chemo_opt">
                           <div className="checkbox">
                              <label className="blue"> &nbsp; &nbsp; &nbsp; Ongoing</label>
                              <input
                                 type="radio"
                                 defaultValue
                                 className="pull-right"
                                 name="chemotherapy_sub_opt"
                                 onChange={(e) =>
                                    this.setState({
                                       chemotherapy_ongoing: "Yes",
                                    })
                                 }
                              />
                           </div>
                           <div className="checkbox">
                              <label className="blue"> &nbsp; &nbsp; &nbsp; Finished</label>
                              <input
                                 type="radio"
                                 defaultValue
                                 className="pull-right"
                                 name="chemotherapy_sub_opt"
                                 onChange={(e) =>
                                    this.setState({
                                       chemotherapy_finished: "Yes",
                                    })
                                 }
                              />
                              <div className="text-danger">
                                 {" "}
                                 {this.state.error5 !== "" ? this.state.error5 : ""}
                              </div>
                           </div>
                        </div>
                     </div>
                     <br></br>
                     <label className="radio-inline blue">No</label>
                     <input
                        type="radio"
                        name="optradio"
                        className="pull-right"
                        id="no"
                        value="No"
                        onChange={(e) => this.setState({ q1_ans: "No" })}
                     />
                     <div className="text-danger">
                        {" "}
                        {this.state.error0 !== "" ? this.state.error0 : ""}
                     </div>
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

   //
   componentDidMount() {
      $(document).ready(function () {
         $("#show_data").hide();
         $("#chemo_opt").hide();
         $("#radaition_opt").hide();

         $("#yes").click(function () {
            $("#show_data").show(1000);
         });

         $("#no").click(function () {
            $("#show_data").hide(1000);
         });

         $("#radaition").click(function () {
            $("#chemo_opt").hide(1000);
            $("#radaition_opt").show(1000);
         });

         $("#chemo").click(function () {
            $("#chemo_opt").show(1000);
            //	$('#radaition_opt').hide(1000);
         });
      });
   }
}
export default Page15;
