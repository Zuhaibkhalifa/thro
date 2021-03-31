import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SimpleReactValidator from "simple-react-validator";
import { goBack } from "../../utils/user";
import { server } from "../../utils/functions";
import $ from "jquery";

import { domain } from "../../App";

class Page10 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => (
            <div className="text-danger">{message}</div>
         ),
      });
      console.log(this.validator);
      this.state = {
         q1_ans: "",
         q1_ans_monday: "",
         q1_ans_tuesday: "",
         q1_ans_wednesday: "",
         q1_ans_thursday: "",
         q1_ans_friday: "",
         q1_ans_other: "",
         q2_ans: "",
         q2_ans_monday: "",
         q2_ans_tuesday: "",
         q2_ans_wednesday: "",
         q2_ans_thursday: "",
         q2_ans_friday: "",
         q2_ans_other: "",
      };

      this.submitForm = this.submitForm.bind(this);
      var element = document.getElementById("body");
      element.classList.add("blue-bg");
      this.toggle = this.toggle.bind(this);
   }

   submitForm() {
      if (this.validator.allValid()) {
         //  alert('You submitted the form and stuff!');
         console.log(this.state);
         var c = this.state.q1_ans;
         this.page10(this.state);
         if (c === "Not Sure") {
            this.props.history.push("/User/Page11");
         } else {
            this.props.history.push("/User/Page12");
         }
      } else {
         this.validator.showMessages();
         // rerender to show messages for the first time
         // you can use the autoForceUpdate option to do this automatically`
         this.forceUpdate();
      }
   }

   warfarin() {
      if (document.getElementById("drugs1").checked === true) {
         $("#q1_ans_days1").show(1000);
      } else {
         $("#q1_ans_days1").hide(1000);
      }
   }
   acenocoumarol() {
      if (document.getElementById("drugs2").checked === true) {
         $("#q2_ans_days2").show(1000);
      } else {
         $("#q2_ans_days2").hide(1000);
      }
   }
   toggle(e) {
      this.setState({ q1_ans: "Not Sure" });
      $("#toggle_div").hide();
   }

   page10(param) {
      server("patient/page10", param);
      //  this.props.history.push('');
   }

   render() {
      return (
         <React.Fragment>
            <div className="blue-bg">
               <Header />
            </div>
            <h1 className="text-center white main-heading">Current Drugs</h1>
            <div className="bg-light blue-box">
               {" "}
               {/* white box */}
               {/* Default form login */}
               <form className="p-5" action="#!">
                  <p className="blue">
                     <b>Are you currently on any of these drugs?</b>
                  </p>
                  <label className="radio-inline blue">
                     Coumadin (Warfarin)
                  </label>
                  <input
                     type="radio"
                     name="drugs"
                     className="pull-right"
                     value="Coumadin (Warfarin)"
                     onClick={(e) =>
                        this.setState({ q1_ans: "Coumadin (Warfarin)" })
                     }
                     id="warfarin1"
                  />

                  <div id="toggle_div">
                     <p className="blue">
                        <b>Please input daily dosage amount in mg/day</b>
                     </p>

                     <br />
                     <div className="row">
                        <div className="col-3">
                           <label className="blue" htmlFor="monday">
                              Monday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="monday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q1_ans_monday: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="tuesday">
                              Tuesday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="tuesday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q1_ans_tuesday: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="wednesday">
                              Wednesday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="wednesday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q1_ans_wednesday: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="thursday">
                              Thursday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="thursday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q1_ans_thursday: e.target.value,
                                 })
                              }
                           />
                        </div>
                     </div>
                     <br />
                     <div className="row">
                        <div className="col-3">
                           <label className="blue" htmlFor="friday">
                              Friday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="friday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q1_ans_friday: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="saturday">
                              Saturday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="saturday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q1_ans_saturday: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="sunday">
                              Sunday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="sunday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q1_ans_sunday: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="other">
                              Other
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="other"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({ q1_ans_other: e.target.value })
                              }
                           />
                        </div>
                     </div>
                  </div>
                  <br />
                  <label className="radio-inline blue">
                     Sintrom (Acenocoumarol)
                  </label>
                  <input
                     type="radio"
                     name="drugs"
                     className="pull-right"
                     id="acenocoumarol1"
                     value="Sintrom (Acenocoumarol)"
                     onClick={(e) =>
                        this.setState({ q1_ans: "Sintrom (Acenocoumarol)" })
                     }
                  />

                  <span id="q2_ans_days2">
                     <p className="blue">
                        <b>Please input daily dosage amount in mg/day</b>
                     </p>

                     <div className="row">
                        <div className="col-3">
                           <label className="blue" htmlFor="monday">
                              Monday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="monday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_monday: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "Field",
                              this.state.q2_ans_monday,
                              "required"
                           )}
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="tuesday">
                              Tuesday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="tuesday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_tuesday: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "Field",
                              this.state.q2_ans_tuesday,
                              "required"
                           )}
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="wednesday">
                              Wednesday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="wednesday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_wednesday: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "Field",
                              this.state.q2_ans_wednesday,
                              "required"
                           )}
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="thursday">
                              Thursday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="thursday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_thursday: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "Field",
                              this.state.q2_ans_thursday,
                              "required"
                           )}
                        </div>
                     </div>
                     <br />
                     <div className="row">
                        <div className="col-3">
                           <label className="blue" htmlFor="friday">
                              Friday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="friday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_friday: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "Field",
                              this.state.q2_ans_friday,
                              "required"
                           )}
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="saturday">
                              Saturday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="saturday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_saturday: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "Field",
                              this.state.q2_ans_saturday,
                              "required"
                           )}
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="sunday">
                              Sunday
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="sunday"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({
                                    q2_ans_sunday: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "Field",
                              this.state.q2_ans_sunday,
                              "required"
                           )}
                        </div>
                        <div className="col-3">
                           <label className="blue" htmlFor="other">
                              Other
                           </label>
                           {/* input */}
                           <input
                              type="number"
                              id="other"
                              className="form-control mb-4 transparent-custom-input"
                              onChange={(e) =>
                                 this.setState({ q2_ans_other: e.target.value })
                              }
                           />
                        </div>
                     </div>
                  </span>
                  <br />
                  <label className="radio-inline blue">Not Sure</label>
                  <input
                     type="radio"
                     name="drugs"
                     id="not_sure"
                     className="pull-right"
                     value="Not Sure"
                     onChange={this.toggle}
                     onClick={(e) => this.setState({ q1_ans: "Not Sure" })}
                  />
                  <br />
                  {this.validator.message(
                     "Field",
                     this.state.q1_ans,
                     "required"
                  )}
                  <br />
               </form>
               {/* Default form login */}
               <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                     <li className="page-item">
                        <button
                           className="page-link"
                           onClick={goBack}
                           tabIndex={-1}
                        >
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
         </React.Fragment>
      );
   }
   componentDidMount() {
      document.getElementById("toggle_div").style.display = "none";
   }
}
export default Page10;
