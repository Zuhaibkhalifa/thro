import React from "react";
import { Link } from "react-router-dom";
import ReactSpinner from "react-bootstrap-spinner";
import SimpleReactValidator from "simple-react-validator";

import $ from "jquery";
import axios from "axios";

import Header from "./NurseHeader";
import { server } from "../../utils/functions";
import { Button, Modal } from "react-bootstrap";
import Logo from "../../assets/img/3.png";
import { domain } from "../../App";

//

let data;
class Page6 extends React.Component {
   constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
         element: (message, className) => (
            <div className="text-danger">{message}</div>
         ),
      });
      console.log(this.validator);
      this.state = { email: "", loader: "", showHide: "" };

      this.submitForm = this.submitForm.bind(this);
      this.handleModalShowHide = this.handleModalShowHide.bind(this);

      const headers = {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: "Bearer " + localStorage.getItem("token"),
      };
      try {
         axios
            .get(domain + "/api/nurse/page8LoadData", {
               headers: headers,
            })
            .then((response) => {
               console.log(response.data.success[0]);
               data = response.data.success[0];
               this.setState({ loader: "" });
            });
      } catch (error) {
         console.error(error);
         this.setState({ loader: "" });
      }
   }

   handleModalShowHide() {
      this.setState({ showHide: !this.state.showHide });
   }

   submitForm() {
      // this.props.history.push('/Nurse/Nurse7');

      window.print();
   }

   page8(param) {
      server("nurse/page8", param);
   }

   render() {
      return (
         <React.Fragment>
            <Header />
            {this.state.loader === 1 ? (
               <div className="centered">
                  <ReactSpinner type="border" color="blue" size="5" />
               </div>
            ) : (
               ""
            )}

            <Modal show={this.state.showHide}>
               <Modal.Body className="blue-bg">
                  {" "}
                  <div className="row">
                     <div className="col-6 offset-3">
                        <img
                           src={Logo}
                           className="img-fluid"
                           style={{ height: 200 }}
                        />
                     </div>
                  </div>{" "}
                  <p className="white">
                     Thank you for completing the Bridging Form, Please keep a
                     copy of the Medication Schedule for your records.
                  </p>
                  <div className="row">
                     <div className="col-6"></div>
                     <div className="col-6">
                        <button
                           type="button"
                           className="btn btn-secondary btn-block big-btn-white"
                           data-dismiss="modal"
                           onClick={this.handleModalShowHide}
                        >
                           OK
                        </button>
                     </div>
                  </div>
               </Modal.Body>
            </Modal>

            <div className="container">
               <h2 className="text-center myHeading">Dosage Schedule</h2>
               <h3 className="text-center myHeading">(Drug names)</h3>
               <br />
               <br />

               <div className="jumbotron">
                  <br />
                  <br />
                  {/*-----------------------------------------------------------------------------------------------*/}
                  <div className="table-responsive">
                     <table className="table table-striped text-center">
                        <thead>
                           <tr className="">
                              <th scope="col">Date</th>
                              <th scope="col">Lovenox Time</th>
                              <th scope="col">Warfarin Time</th>
                              <th scope="col">Lovenox Dosage</th>
                              <th scope="col">Warfarin Dosage</th>
                              <th scope="col">Comment</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <th scope="row">T - 3</th>
                              <td>
                                 8:00 AM
                                 <br />
                                 8:00 PM
                              </td>
                              <td>No warfarin</td>
                              <td>1 needle </td>
                              <td>Warfarin</td>
                              <td>Comment</td>
                           </tr>
                           <tr>
                              <th scope="row">T - 2</th>
                              <td>
                                 8:00 AM
                                 <br />
                                 8:00 PM
                              </td>
                              <td>No warfarin</td>
                              <td>1 needle</td>
                              <td />
                              <td>Comment</td>
                           </tr>
                           <tr>
                              <th scope="row">T - 1</th>
                              <td>
                                 8:00 AM
                                 <br />
                                 8:00 PM
                              </td>
                              <td>No warfarin</td>
                              <td>1 needle</td>
                              <td>Warfarin</td>
                              <td />
                           </tr>
                           <tr>
                              <th scope="row">
                                 T /{" "}
                                 <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                 />
                              </th>
                              <td>
                                 8:00 AM
                                 <br />
                                 8:00 PM
                              </td>
                              <td>No warfarin</td>
                              <td>1 needle</td>
                              <td>_ mg x _</td>
                              <td />
                           </tr>
                           <tr>
                              <th scope="row">T + 1</th>
                              <td>No lovenox</td>
                              <td>6:00 PM</td>
                              <td />
                              <td>_ mg x _</td>
                              <td>Comment</td>
                           </tr>
                           <tr>
                              <th scope="row">T + 2</th>
                              <td>
                                 8:00 AM
                                 <br />
                                 8:00 PM
                              </td>
                              <td>6:00 PM</td>
                              <td>1 needle</td>
                              <td>_ mg x _</td>
                              <td />
                           </tr>
                           <tr>
                              <th scope="row">T + 3</th>
                              <td>
                                 8:00 AM
                                 <br />
                                 8:00 PM
                              </td>
                              <td>6:00 PM</td>
                              <td>1 needle</td>
                              <td>_ mg x _</td>
                              <td>Comment</td>
                           </tr>
                           <tr>
                              <th scope="row">T + 4</th>
                              <td>
                                 8:00 AM
                                 <br />
                                 8:00 PM
                              </td>
                              <td>6:00 PM</td>
                              <td>1 needle</td>
                              <td>_ mg x _</td>
                              <td />
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <br /> <br />
                  <div className="row">
                     <div className="col-4">
                        <Link
                           to="/Nurse/Nurse5"
                           className="btn btn-outline-primary  btn-block"
                        >
                           Back
                        </Link>
                     </div>

                     <div className="col-4">
                        <button
                           onClick={this.submitForm}
                           className="btn btn-primary btn-block"
                        >
                           Print
                        </button>
                     </div>

                     <div className="col-4">
                        <button
                           onClick={this.handleModalShowHide}
                           className="btn btn-primary btn-block"
                        >
                           Next
                        </button>
                     </div>
                  </div>
               </div>
               <br />
            </div>
         </React.Fragment>
      );
   }
   componentDidMount() {}
}
export default Page6;
