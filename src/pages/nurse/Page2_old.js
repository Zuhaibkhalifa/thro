import React from "react";
import { Link } from "react-router-dom";
import ReactSpinner from "react-bootstrap-spinner";
import SimpleReactValidator from "simple-react-validator";

import $ from "jquery";
import Header from "./NurseHeader";

import { server } from "../../utils/functions";
import { domain } from "../../App";

//

class Page2_old extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => (
            <div className="text-danger">{message}</div>
         ),
      });
      console.log(this.validator);
      this.state = {
         date: "",
         poc_inr_date: "",
         poc_create_date: "",
         hgb_date: "",
         platelets_date: "",
         Creatine_date: "",
         gender: "",
         creatine: "",
         lab_result: "",
         loader: 1,
      };

      this.submitForm = this.submitForm.bind(this);
      this.selectAll = this.selectAll.bind(this);
   }

   selectAll = () => {};

   submitForm() {
      if (this.validator.allValid()) {
         //  alert('You submitted the form and stuff!');
         console.log(this.state);
         //  this.getSignup(this.state);
         this.props.history.push("/Nurse/Nurse6");
      } else {
         this.validator.showMessages();
         // rerender to show messages for the first time
         // you can use the autoForceUpdate option to do this automatically`
         this.forceUpdate();
      }
   }

   page2(param) {
      server("nurse/page2", param);
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
                  ""
               )}{" "}
               {/* container */}
               <div className="jumbotron">
                  <h1 className="display-4">For nurses use</h1>
                  <p>
                     <b>LAB RESULT</b>
                  </p>
                  <br />
                  <br />
                  <div className="row">
                     <div className="col-6">
                        <div className="form-group">
                           <label htmlFor="usr">Date</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              defaultValue={this.state.date}
                              onChange={(e) =>
                                 this.setState({ date: e.target.value })
                              }
                           />
                           {this.validator.message(
                              "",
                              this.state.date,
                              "required"
                           )}
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <button
                              type="button"
                              className="btn btn-primary btn-lg col-12"
                              id="alldate"
                           >
                              SAME DATE FOR ALL
                           </button>
                        </div>
                     </div>
                  </div>
                  <br />
                  <div className="row">
                     <div className="col-6">
                        <div className="form-group">
                           <h4 className="black text-center">DD-MM-YY</h4>
                           <label htmlFor="usr">POC-INR</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              placeholder="XXXX"
                              defaultValue={this.state.poc_inr_date}
                              onChange={(e) =>
                                 this.setState({ poc_inr_date: e.target.value })
                              }
                           />

                           {this.validator.message(
                              "",
                              this.state.poc_inr_date,
                              "required"
                           )}
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <h4 className="black text-center">DD-MM-YY</h4>
                           <label htmlFor="usr">POC-CREATE</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              placeholder="XXXX"
                              defaultValue={this.state.poc_create_date}
                              onChange={(e) =>
                                 this.setState({
                                    poc_create_date: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "poc_inr_date",
                              this.state.poc_create_date,
                              "required"
                           )}
                        </div>
                     </div>
                  </div>
                  <br />
                  <div className="row">
                     <div className="col-6">
                        <div className="form-group">
                           <h4 className="black text-center">DD-MM-YY</h4>
                           <label htmlFor="usr">INR</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              placeholder="XXXX"
                              value={this.state.procedureSelected}
                              onChange={(event) =>
                                 this.handleChange_procedure(event.target.value)
                              }
                              defaultValue={this.state.poc_create_date}
                              onChange={(e) =>
                                 this.setState({
                                    poc_create_date: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "",
                              this.state.poc_create_date,
                              "required"
                           )}
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <h4 className="black text-center">DD-MM-YY</h4>
                           <label htmlFor="usr">Hgb</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              placeholder="XXXX"
                              defaultValue={this.state.hgb_date}
                              onChange={(e) =>
                                 this.setState({ hgb_date: e.target.value })
                              }
                           />
                           {this.validator.message(
                              "",
                              this.state.hgb_date,
                              "required"
                           )}
                        </div>
                     </div>
                  </div>
                  <br />
                  <div className="row">
                     <div className="col-6">
                        <div className="form-group">
                           <h4 className="black text-center">DD-MM-YY</h4>
                           <label htmlFor="usr">Platelets</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              placeholder="XXXX"
                              defaultValue={this.state.platelets_date}
                              onChange={(e) =>
                                 this.setState({
                                    platelets_date: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "",
                              this.state.platelets_date,
                              "required"
                           )}
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <h4 className="black text-center">DD-MM-YY</h4>
                           <label htmlFor="usr">Creatine</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              placeholder="XXXX"
                              defaultValue={this.state.Creatine_date}
                              onChange={(e) =>
                                 this.setState({
                                    Creatine_date: e.target.value,
                                 })
                              }
                           />
                           {this.validator.message(
                              "",
                              this.state.platelets_date,
                              "required"
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-6">
                        <div className="form-group">
                           <h4 className="black text-center">Lab RESULT</h4>
                           <label htmlFor="usr">Lab RESULT</label>
                           <input
                              type="date"
                              className="form-control"
                              id="usr"
                              placeholder="XXXX"
                              defaultValue={this.state.lab_result}
                              onChange={(e) =>
                                 this.setState({ lab_result: e.target.value })
                              }
                           />
                           {this.validator.message(
                              "",
                              this.state.lab_result,
                              "required"
                           )}
                        </div>
                     </div>
                     <div className="col-6"></div>
                  </div>
                  <br />
                  <br />
                  <h4 className="black">Creatine Clearance</h4>
                  <br />
                  <div className="row">
                     {" "}
                     {/* row 1 */}
                     <div className="col-md-4">
                        {" "}
                        {/* column */}
                        <div className="custom-control custom-radio text-center">
                           <input
                              type="radio"
                              className="custom-control-input "
                              id="defaultUnchecked"
                              name="defaultExampleRadios1"
                              onClick={(e) => this.setState({ gender: "Male" })}
                           />
                           <label
                              className="custom-control-label"
                              htmlFor="defaultUnchecked"
                           >
                              {" "}
                              <span className="fa fa-male fa-2x color-primary"></span>
                           </label>
                        </div>
                     </div>{" "}
                     {/* //column */}
                     <div className="col-md-4">
                        {" "}
                        {/* column */}
                        <div className="custom-control custom-radio text-center">
                           <input
                              type="radio"
                              className="custom-control-input"
                              id="defaultUnchecked1"
                              name="defaultExampleRadios1"
                              onClick={(e) =>
                                 this.setState({ gender: "Female" })
                              }
                           />
                           <label
                              className="custom-control-label"
                              htmlFor="defaultUnchecked1"
                           >
                              <span className="fa fa-female fa-2x"></span>
                           </label>
                        </div>
                     </div>{" "}
                     {/* //column */}
                     <div className="col-md-4">
                        {" "}
                        {/* column */}
                        <div className="custom-control custom-radio text-center">
                           <input
                              type="radio"
                              className="custom-control-input"
                              id="defaultUnchecked2"
                              name="defaultExampleRadios1"
                              onClick={(e) =>
                                 this.setState({ gender: "Middle" })
                              }
                           />
                           <label
                              className="custom-control-label"
                              htmlFor="defaultUnchecked2"
                           >
                              <span className="fa fa-circle-o fa-2x"></span>
                           </label>
                        </div>
                     </div>{" "}
                     {/* //column */}
                  </div>{" "}
                  {/* //row 1 */}
                  <br />
                  <br />
                  <div className="form-group">
                     <p style={{ color: "grey", marginLeft: "60%" }}></p>
                     <input
                        type="text"
                        className="form-control"
                        id="usr"
                        placeholder="Urine creatinine: 7 - 14 mmol/24h xxxx "
                        defaultValue={this.state.creatine}
                        onChange={(e) =>
                           this.setState({ creatine: e.target.value })
                        }
                     />
                     {this.validator.message(
                        "",
                        this.state.creatine,
                        "required"
                     )}
                     <br />
                     <h5>Creatine = xxxx</h5>
                  </div>
               </div>{" "}
               {/* //Jumbotron */}
               <br />
               <Link to="/Nurse/Nurse1" className="previous round np-btn">
                  <i className="fa fa-chevron-left" aria-hidden="true" />
               </Link>
               <button
                  onClick={this.submitForm}
                  className="previous round np-btn pull-right"
               >
                  <i className="fa fa-chevron-right" aria-hidden="true" />
               </button>
            </div>
         </React.Fragment>
      );
   }
   componentDidMount() {
      $("#alldate").click(function () {
         $("input[type='date']").trigger("click");
         $("input[type='date']").val($("#usr").val());
      });
   }
}

export default Page2_old;
