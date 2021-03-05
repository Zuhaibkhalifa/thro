import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner'
import $ from 'jquery';
import { Button,Modal } from 'react-bootstrap'
import Logo from '../../assets/img/3.png';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';

class Page16 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     console.log(this.validator);
    this.state = {  showHide : false,q1_ans : '',q2_ans : '',q3_ans : '',
    loader:''
  };
    
    this.submitForm = this.submitForm.bind(this);
    this.go_nurse = this.go_nurse.bind(this);
    


    var element = document.getElementById("body");
    element.classList.add("blue-bg");

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    try {
       axios.get('http://thrombolink.com/server/api/patient/page16LoadData',{
        headers: headers
      })
      .then((response) => {
        console.log(response);
      
        this.setState({loader:''});
      
      })
    } catch (error) {
      console.error(error);
      this.setState({loader:''});
     
    }
}
handleModalShowHide() {
  this.setState({ showHide: !this.state.showHide })

}
handleChange_procedure(value) {
  this.setState({ q1_ans: value });
 // this.setState({ weight: value });
}
redirect() {
  this.setState({ showHide: !this.state.showHide })
  this.props.history.push('/User/Section');

}
submitForm() {
  if(document.getElementById("notsure").checked === false && $('#procedure').val()===''){
    this.setState({error1:'This field is required'});

  } else if(document.getElementById("notsure").checked === false && $('#procedure_date').val()===''){
    this.setState({error1:''});
    this.setState({error2:'This field is required'});
  } else {

   

    this.setState({error1:'',error2:''});
    console.log(this.state);
   this.page16(this.state);
 


  this.handleModalShowHide();

  }
}

go_nurse(){
  alert('ss');
  this.props.history.push('/User/Section');
}
page16(){
  if(document.getElementById("notsure").checked === true)  {

    var param={
      type_of_procedure:this.state.q1_ans,
    }

  } else {

    var param={
      type_of_procedure:this.state.q1_ans,
      date_of_procedure:this.state.q2_ans
     
    }

  }
  
  console.log(param);
  server('patient/page16',param);
  //this.props.history.push('');
  }


  render() {
   
return (
<React.Fragment>
<Header />
{this.state.loader===1?
<div className="centered"><ReactSpinner type="border" color="bg-primary" size="5"  /></div> :''
  }
<Modal show={this.state.showHide} >
            
                    <Modal.Body className="blue-bg">       <div className="row">
              <div className="col-6 offset-3">
                <img
                  src={Logo}
                  className="img-fluid"
                  style={{ height: 200 }}
                />
              </div>
            </div>   <p className="white">

              Thank you for filling out the bridging  clinic patient
              application. Please pass the tablet to the nurse.
            </p>
     
                    <div className="row">
              <div className="col-6">
              
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-block big-btn-white"
                  data-dismiss="modal"
                  onClick={() => this.redirect()}>
                  OK
                </button>
              </div>
            </div>
                    </Modal.Body>
             
                </Modal>
<div>
  <h1 className="text-center white main-heading">Surgery</h1>
  <br />
  <br />
  <div className="bg-light blue-box">
    {" "}
    {/* white box */}
    {/* Default form login */}
    <form className="p-5" action="#!">
      <p className="blue">
        <b>Please select the type of Procedure</b>
      </p>
      
      <div id="t1">
      <input
            type="text"
            id="procedure_date"
            className="form-control mb-4 transparent-custom-input"
            value={this.state.q1_ans} 
            onChange={(e)=>this.setState({q1_ans:e.target.value})}

            


          />
      <div className="text-danger"> {this.state.error1!=='' ? this.state.error1: ''}</div>
        <br />
      <div className="row">
        <div className="col-12">
        <p className="blue">
        <b>Date of Procedure</b>
      </p>
        
        
          <input
            type="date"
            id="procedure_date"
            className="form-control mb-4 transparent-custom-input"
            value={this.state.q2_ans} 
            min="2021-03-02"
            onChange={(e)=>this.setState({q2_ans:e.target.value})}
          />
         <div className="text-danger"> {this.state.error2!=='' ? this.state.error2: ''}</div>
                <br />
        </div>
      </div>
      </div>
     
      <br />
      <p className="blue">
        <b>Note Sure</b>
      </p>
       
        
       
            <input
              type="checkbox"
              name="optradio"
              className="pull-right"
              id="notsure"
              value="Not Sure"
              onChange={(e)=>this.setState({q1_ans:"Not Sure"})}
            />
         
          <br />
       
     
    </form>
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
        <button className="page-link" onClick={goBack} tabIndex={-1}>
          <i className="fa fa-angle-double-left"></i>  Previous
          </button>
        </li>
        <li className="page-item">
        <li className="page-item">
        <button className="page-link"  onClick={this.submitForm}>
            Finish
          </button>
        </li>
        </li>
      </ul>
    </nav>
    <br />
    {/*---------------------------------------------------------------------*/}
    {/* Button trigger modal */}
    {/* Modal */}
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/*<div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>*/}
          <div className="modal-body blue-bg">
            <div className="row">
              <div className="col-6 offset-3">
                <img
                  src="img/3.png"
                  className="img-fluid"
                  style={{ height: 200 }}
                />
              </div>
            </div>
            <br />
            <p className="white">
              Thanks. you for filling out the bridiging clinic patient
              application. Please pass the tablet to the nurse.
            </p>
            <br />
            <br />
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-block big-btn-white"
                  data-dismiss="modal"
                >
                  CANCEL
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-block big-btn-white"
                  data-dismiss="modal"
                  
                >
                  OK
                </button>
              </div>
            </div>
          </div>
          {/*<div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary">Save changes</button>
		      </div>*/}
        </div>
      </div>
    </div>
  </div>
</div>
</React.Fragment>
);


}
componentDidMount(){
$(document).ready(function(){

  $('#notsure').change(function() {
    $('#t1').toggle(1000);
    $('#procedure').val('');
    $('#procedure_date').val('');
  
  
  });
  
  });
  var dtToday = new Date();
      
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();
  
  var maxDate = year + '-' + month + '-' + day;
  //alert(maxDate);
  $('#procedure_date').attr('max', maxDate);
}
}
export default Page16;