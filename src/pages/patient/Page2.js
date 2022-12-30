import React from 'react';
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import { server } from '../../utils/functions';
import ReactSpinner from 'react-bootstrap-spinner';

class Page2 extends React.Component {
   constructor(props) {
      super(props);

      this.validator = new SimpleReactValidator({
         messages: {
            age: 'That is not an email.'
         },
         element: (message, className) => <div className="text-danger">{message}</div>
      });

      console.log('Patient Page 2 - Constructor - Validator: ', this.validator);

      this.state = {
         age: '',
         weight: '',
         weight_unit: '',
         physicianName: '',
         weightSelected: '',
         unit_weight: '',
         genderSelected: '',
         gender: '',
         loader: '',
         patient_id: '',
         redirectButton: false,
         nurse_add: false
      };

      // Bind " this " ref to class to Methods/Functions
      this.isNumber = this.isNumber.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.redirectBackNurse = this.redirectBackNurse.bind(this);
      this.redirectNextPage = this.redirectNextPage.bind(this);

      var element = document.getElementById('body');
      element.classList.add('blue-bg');
   }

   redirectBackNurse() {
      this.submitForm();
   }

   redirectNextPage() {
      this.submitForm();
      if (this.props.location.state !== undefined) {
         this.props.history.push({
            pathname: '/Nurse/Nurse1',
            state: { patient_id: this.props.location.state.patient_id }
         });
      }
   }

   handleChange_weight(value) {
      this.setState({ weightSelected: value });
      // this.setState({ weight: value });
   }

   handleChange_gender(value) {
      console.log(value);
      this.setState({ genderSelected: value });
      this.setState({ gender: value });
   }

   submitForm() {
      if (this.validator.allValid()) {
         // alert('You submitted the form and stuff!');
         console.log('Patient Page 2 - submit form: ', this.state);

         //  if (this.state.redirectButton) {
         this.page2(this.state);
         this.props.history.push('/Nurse/Nurse1');
         //  } else {
         //     this.page2(this.state);
         //     this.props.history.push('/User/Page3');
         //  }
      } else {
         this.validator.showMessages();
         // rerender to show messages for the first time
         // you can use the autoForceUpdate option to do this automatically`
         this.forceUpdate();
      }
   }

   page2() {
      var param = {
         age: this.state.age,
         weight: this.state.weight,
         weight_unit: this.state.weight_unit,
         physicianName: this.state.physicianName,

         weightSelected: this.state.weightSelected,
         unit_weight: this.state.unit_weight,

         gender: this.state.gender,
         genderSelected: this.state.genderSelected,
         patient_id: this.state.patient_id
      };

      var a = server('patient/page2', param);
      console.log('Patient Page 2 - submit form - response: ', a);
   }

   //
   isNumber(e) {
      const numberRegx = /^[0-9\b]+$/;
      const { value, name } = e.target;

      if (value === '' || numberRegx.test(value)) {
         this.setState({ [name]: value });
      }
   }

   //
   //

   render() {
      return (
         <React.Fragment>
            <Header patient_id={this.state.patient_id} patient_add={this.state.patient_add} />
            {this.state.loader === 1 ? (
               <div className="centered">
                  <ReactSpinner type="border" color="bg-primary" size="5" />
               </div>
            ) : (
               ''
            )}
            <div>
               <h1 className="text-center white">
                  Preliminary <br /> Questions
               </h1>
               <br />
               <br />
               <div className="bg-light blue-box">
                  {' '}
                  {/* white box */}
                  {/* Default form login */}
                  <form className="p-5" action="#!">
                     {/* Email */}
                     <div className="form-row mb-4">
                        <div className="col-4">
                           {/* First name */}
                           <label htmlFor="age" className="blue">
                              <b>Age</b>
                           </label>
                           <input
                              type="text"
                              id="age"
                              name="age"
                              className="form-control blue-custom-input"
                              maxlengt="2"
                              value={this.state.age}
                              onChange={e => this.isNumber(e)}
                           />
                           {this.validator.message('age', this.state.age, [
                              'required',
                              { regex: '(1[89]|[2-9][0-9]|10[0-9]|110)' }
                           ])}
                        </div>
                        <div className="col-4">
                           {/* Last name */}
                           <label htmlFor="weight" className="blue">
                              <b>Weight</b>
                           </label>
                           <input
                              type="text"
                              id="weight"
                              name="weight"
                              value={this.state.weight}
                              className="form-control blue-custom-input"
                              onChange={this.isNumber}
                           />

                           {this.validator.message('Weight', this.state.weight, 'required')}
                           <div className="form-group"></div>
                        </div>
                        <div className="col-4">
                           <label htmlFor="weight" className="blue">
                              <b>Unit</b>
                           </label>
                           <select
                              className="form-control"
                              id="procedure"
                              value={this.state.weightSelected}
                              onChange={event => this.handleChange_weight(event.target.value)}
                           >
                              <option>Select Unit</option>
                              <option>lbs</option>
                              <option>Kg</option>
                           </select>
                           {this.validator.message('unit_weight', this.state.weightSelected, 'required')}
                        </div>
                     </div>

                     <div className="form-row mb-4">
                        <div className="col-4">
                           <label htmlFor="weight" className="blue">
                              <b>Gender</b>
                           </label>
                           <select
                              className="form-control"
                              id="procedure"
                              value={this.state.genderSelected}
                              onChange={event => this.handleChange_gender(event.target.value)}
                           >
                              <option>Select Gender</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                           </select>
                           {this.validator.message('gender', this.state.genderSelected, 'required')}
                        </div>
                        <div className="col-4">
                           <label htmlFor="age" className="blue">
                              <b>Physician Name</b>
                           </label>
                           <input
                              type="text"
                              id="physicianName"
                              className="form-control blue-custom-input"
                              defaultValue={this.state.physicianName}
                              onChange={e =>
                                 this.setState({
                                    physicianName: e.target.value
                                 })
                              }
                           />
                           {this.validator.message('Physician Name', this.state.physicianName, 'required')}
                        </div>
                     </div>
                  </form>
                  <nav aria-label="Page navigation example">
                     {!this.state.redirectButton ? (
                        <ul className="pagination justify-content-center">
                           <li className="page-item">
                              <button className="page-link" onClick={this.submitForm}>
                                 Next <i className="fa fa-angle-double-right"></i>
                              </button>
                           </li>
                        </ul>
                     ) : (
                        <ul className="pagination justify-content-center">
                           <li className="page-item">
                              <button className="page-link" onClick={this.redirectBackNurse} tabIndex={-1}>
                                 <i className="fa fa-angle-double-left"></i> Go Back
                              </button>
                           </li>
                           <li className="page-item">
                              <button className="page-link" onClick={this.redirectNextPage}>
                                 done <i className="fa fa-angle-double-right"></i>
                              </button>
                           </li>
                        </ul>
                     )}
                  </nav>
                  <br />
               </div>{' '}
               {/* //white box */}
            </div>
         </React.Fragment>
      );
   }
   componentDidMount() {
      if (this.props.location.state !== undefined) {
         this.setState({
            patient_id: this.props.location.state.patient_id,
            redirectButton: true,
            nurse_add: this.props.location.state.nurse_add ? true : false
         });
      }
   }
}
export default Page2;
