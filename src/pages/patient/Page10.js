import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import $ from 'jquery';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner'
class Page10 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     console.log(this.validator);
     this.state = { q1_ans: '', 
     q1_ans_monday: '',
      q1_ans_tuesday: '',
       q1_ans_wednesday: '', 
       q1_ans_thursday: '', 
       q1_ans_friday: ''
 , q1_ans_other: '', 
 q2_ans: '',
 q2_ans_monday: '',
 q2_ans_tuesday: '',
  q2_ans_wednesday: '', 
  q2_ans_thursday: '', 
  q2_ans_friday: ''
 , q2_ans_other: '',loader:1
 };
    
    this.submitForm = this.submitForm.bind(this);
    var element = document.getElementById("body");
    element.classList.add("blue-bg");
    this.toggle = this.toggle.bind(this);


    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    try {
       axios.get('http://thrombolink.com/server/api/patient/page10LoadData',{
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



submitForm() {
  if(document.getElementById("drugs1").checked === false && document.getElementById("acenocoumarol1").checked === false && document.getElementById("not_sure").checked === false && document.getElementById("none").checked === false){
    this.setState({error1:'This field is required'});
  } else  if(document.getElementById("drugs1").checked === true &&  $('#drugs1_monday').val()==='') {
    this.setState({error2:'This field is required'});
  } else  if(document.getElementById("drugs1").checked === true &&  $('#drugs1_tuesday').val()==='') {
    this.setState({error3:'This field is required'});
  } else  if(document.getElementById("drugs1").checked === true &&  $('#drugs1_wednesday').val()==='') {
    this.setState({error4:'This field is required'});
  } else  if(document.getElementById("drugs1").checked === true &&  $('#drugs1_thursday').val()==='') {
    this.setState({error5:'This field is required'});
  } else  if(document.getElementById("drugs1").checked === true &&  $('#drugs1_friday').val()==='') {
    this.setState({error6:'This field is required'});
  } else  if(document.getElementById("drugs1").checked === true &&  $('#drugs1_saturday').val()==='') {
    this.setState({error7:'This field is required'});
  } else  if(document.getElementById("drugs1").checked === true &&  $('#drugs1_sunday').val()==='') {
    this.setState({error8:'This field is required'});

  } else  if(document.getElementById("acenocoumarol1").checked === true &&  $('#acenocoumarol1_monday').val()==='') {
    this.setState({error9:'This field is required'});
  } else  if(document.getElementById("acenocoumarol1").checked === true &&  $('#acenocoumarol1_tuesday').val()==='') {
    this.setState({error10:'This field is required'});
  } else  if(document.getElementById("acenocoumarol1").checked === true &&  $('#acenocoumarol1_wednesday').val()==='') {
    this.setState({error11:'This field is required'});
  } else  if(document.getElementById("acenocoumarol1").checked === true &&  $('#acenocoumarol1_thursday').val()==='') {
    this.setState({error12:'This field is required'});
  } else  if(document.getElementById("acenocoumarol1").checked === true &&  $('#acenocoumarol1_friday').val()==='') {
    this.setState({error13:'This field is required'});
  } else  if(document.getElementById("acenocoumarol1").checked === true &&  $('#acenocoumarol1_saturday').val()==='') {
    this.setState({error14:'This field is required'});
  } else  if(document.getElementById("acenocoumarol1").checked === true &&  $('#acenocoumarol1_sunday').val()==='') {
    this.setState({error15:'This field is required'});
 
    } else  if(document.getElementById("not_sure").checked === true) {
      this.page10();
      this.props.history.push('/User/Page11');
  
    } else {
      this.page10();
      this.props.history.push('/User/Page11');
}
}

warfarin() {
//  alert('uyyuyuy');
  if(document.getElementById("drugs1").checked === true){
 //  alert('11111111111');
  $('#q1_ans_days1').show(1000);
  $('#q2_ans_days2').hide(1000);
  } else {
    $('#q1_ans_days1').hide(1000);
    
  }
}
acenocoumarol() {
 // alert('uyyuyuy');
  if(document.getElementById("acenocoumarol1").checked === true){
  //  alert('22222222222');
    $('#q2_ans_days2').show(1000);
    $('#q1_ans_days1').hide(1000);
    } else {
      $('#q2_ans_days2').hide(1000);
      
    }
}
toggle(e){
  this.setState({q1_ans:'Not Sure'});
   
  $('#q1_ans_days1').hide(1000);
  $('#q2_ans_days2').hide(1000);
}

page10(){

  var param={
    coumadin:this.state.q1_ans,
    coumadin_monday:this.state.q1_ans_monday,
    coumadin_tuesday:this.state.q1_ans_tuesday,
    coumadin_wednesday:this.state.q1_ans_wednesday,
    coumadin_thursday:this.state.q1_ans_thursady,
    coumadin_friday:this.state.q1_ans_friday,
    coumadin_saturday:this.state.q1_ans_saturday,
    coumadin_sunday:this.state.q1_ans_sunday,
    sintrom:this.state.q2_ans,
    sintrom_monday:this.state.q2_ans_monday,
    sintrom_tuesday:this.state.q2_ans_tuesday,
    sintrom_wednesday:this.state.q2_ans_wednesday,
    sintrom_thursday:this.state.q2_ans_thursady,
    sintrom_friday:this.state.q2_ans_friday,
    sintrom_saturday:this.state.q2_ans_saturday,
    sintrom_sunday:this.state.q2_ans_sunday
  }
  server('patient/page10',param);
//  this.props.history.push('');
  }

  
  render() {
   
return (
<React.Fragment>
<div className="blue-bg">
<Header />
{this.state.loader===1?
<div className="centered"><ReactSpinner type="border" color="bg-primary" size="5"  /></div> :''
  }
</div>
<h1 className="text-center white main-heading">
Current Drugs
  </h1>
<div className="bg-light blue-box">
  {" "}
  {/* white box */}
  {/* Default form login */}
  <form className="p-5" action="#!">
    <p className="blue">
      <b>Are you currently on any of these drugs?</b>
    </p>
    <label className="radio-inline blue">Coumadin (Warfarin)</label>
    <input type="radio" name="drugs" className="pull-right" 
     value="Coumadin (Warfarin)"  onClick={(e)=>this.setState({q1_ans:'Coumadin (Warfarin)'})} id="warfarin1"
    onChange={ this.warfarin } id="drugs1"
    />

<div id="q1_ans_days1">
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
          id="drugs1_monday"  min="0"
          className="form-control mb-4 transparent-custom-input"
         
         onChange={(e)=>this.setState({q1_ans_monday:e.target.value})}
        />
          <div className="text-danger"> {this.state.error2!=='' ? this.state.error2: ''}</div>
      
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="tuesday">
          Tuesday
        </label>
        {/* input */}
        <input
          type="number"
          id="drugs1_tuesday"
          min="0"
          className="form-control mb-4 transparent-custom-input"
        
      onChange={(e)=>this.setState({q1_ans_tuesday:e.target.value})}
        />
    <div className="text-danger"> {this.state.error3!=='' ? this.state.error3: ''}</div>
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="wednesday">
          Wednesday
        </label>
        {/* input */}
        <input
          type="number"
          id="drugs1_wednesday"
          min="0"
          className="form-control mb-4 transparent-custom-input"
           onChange={(e)=>this.setState({q1_ans_wednesday:e.target.value})}
        />
             <div className="text-danger"> {this.state.error4!=='' ? this.state.error4: ''}</div>
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="thursday">
          Thursday
        </label>
        {/* input */}
        <input
          type="number"
          id="drugs1_thursday"
          min="0"
          className="form-control mb-4 transparent-custom-input"
         
          onChange={(e)=>this.setState({q1_ans_thursday:e.target.value})}
        />
            <div className="text-danger"> {this.state.error5!=='' ? this.state.error5: ''}</div>
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
          id="drugs1_friday"
          min="0"
          className="form-control mb-4 transparent-custom-input"
           onChange={(e)=>this.setState({q1_ans_friday:e.target.value})}
        />
            <div className="text-danger"> {this.state.error6!=='' ? this.state.error6: ''}</div>
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="saturday">
          Saturday
        </label>
        {/* input */}
        <input
          type="number"
          id="drugs1_saturday"
          min="0"
          className="form-control mb-4 transparent-custom-input"
       onChange={(e)=>this.setState({q1_ans_saturday:e.target.value})}
        />
           <div className="text-danger"> {this.state.error7!=='' ? this.state.error7: ''}</div>
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="sunday">
          Sunday
        </label>
        {/* input */}
        <input
          type="number"
          id="drugs1_sunday"
          min="0"
          className="form-control mb-4 transparent-custom-input"
          onChange={(e)=>this.setState({q1_ans_sunday:e.target.value})}
        />
        <div className="text-danger"> {this.state.error8!=='' ? this.state.error8: ''}</div>
      </div>
      <div className="col-3">
       
       
         
      </div>
    </div>
    </div>
    <br />
    <label className="radio-inline blue">Sintrom (Acenocoumarol)</label>
    <input type="radio" name="drugs" className="pull-right" id="acenocoumarol1"
     value="Sintrom (Acenocoumarol)" onClick={(e)=>this.setState({q1_ans:'Sintrom (Acenocoumarol)'})} 
     onChange={ this.acenocoumarol }
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
          id="acenocoumarol1_monday"
          className="form-control mb-4 transparent-custom-input"
          min="0"
         
         onChange={(e)=>this.setState({q2_ans_monday:e.target.value})}
        />
         <div className="text-danger"> {this.state.error9!=='' ? this.state.error9: ''}</div>
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="tuesday">
          Tuesday
        </label>
        {/* input */}
        <input
          type="number"
          id="acenocoumarol1_tuesday"
          className="form-control mb-4 transparent-custom-input"
          min="0"
        
      onChange={(e)=>this.setState({q2_ans_tuesday:e.target.value})}
        />
             <div className="text-danger"> {this.state.error10!=='' ? this.state.error10: ''}</div>
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="wednesday">
          Wednesday
        </label>
        {/* input */}
        <input
          type="number"
          id="acenocoumarol1_wednesday"
          className="form-control mb-4 transparent-custom-input"
           onChange={(e)=>this.setState({q2_ans_wednesday:e.target.value})}
           min="0"
        />
               <div className="text-danger"> {this.state.error11!=='' ? this.state.error11: ''}</div>
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="thursday">
          Thursday
        </label>
        {/* input */}
        <input
          type="number"
          id="acenocoumarol1_thursday"
          className="form-control mb-4 transparent-custom-input"
          min="0"
         
          onChange={(e)=>this.setState({q2_ans_thursday:e.target.value})}
        />
            <div className="text-danger"> {this.state.error12!=='' ? this.state.error12: ''}</div>
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
          min="0"
          id="acenocoumarol1_friday"
          className="form-control mb-4 transparent-custom-input"
           onChange={(e)=>this.setState({q2_ans_friday:e.target.value})}
        />
          <div className="text-danger"> {this.state.error13!=='' ? this.state.error13: ''}</div>    
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="saturday">
          Saturday
        </label>
        {/* input */}
        <input
          type="number"
          id="acenocoumarol1_saturday"
          className="form-control mb-4 transparent-custom-input"
       onChange={(e)=>this.setState({q2_ans_saturday:e.target.value})}
       min="0"
        />
             <div className="text-danger"> {this.state.error14!=='' ? this.state.error14: ''}</div>  
      </div>
      <div className="col-3">
        <label className="blue" htmlFor="sunday">
          Sunday
        </label>
        {/* input */}
        <input
          type="number"
          id="acenocoumarol1_sunday"
          className="form-control mb-4 transparent-custom-input"
          onChange={(e)=>this.setState({q2_ans_sunday:e.target.value})}
          min="0"
        />
        <div className="text-danger"> {this.state.error15!=='' ? this.state.error15: ''}</div>
      </div>
      <div className="col-3">
        
         
      </div>
    </div>
    </span>
    <br />
    <label className="radio-inline blue">Not Sure</label>
    <input type="radio" name="drugs" id="not_sure" className="pull-right" 
     value="Not Sure"  onChange={this.toggle}  onClick={(e)=>this.setState({q1_ans:'Not Sure'})} 
     />
    <br /> 
    <label className="radio-inline blue">None of Above</label>
    <input type="radio" name="drugs" id="none" className="pull-right" 
     value="Not Sure"  onChange={this.toggle}  onClick={(e)=>this.setState({q1_ans:'None of Above'})} 
     />
    <br />
    <div className="text-danger"> {this.state.error1!=='' ? this.state.error1: ''}</div>
  </form>
  {/* Default form login */}
  <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
      <li className="page-item">
      <button className="page-link" onClick={goBack} tabIndex={-1}>
          <i className="fa fa-angle-double-left"></i>    Previous
          </button>
      </li>
      <li className="page-item">
      <button className="page-link"  onClick={this.submitForm}>
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
componentDidMount(){
  document.getElementById("q1_ans_days1").style.display='none';
  document.getElementById("q2_ans_days2").style.display='none';
  
  
}
}
export default Page10;