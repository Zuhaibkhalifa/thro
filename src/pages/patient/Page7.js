import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner'
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import $ from 'jquery';
import axios from 'axios';
class Page7 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     console.log(this.validator);
     this.state = { 
     
      q1_ans:'',q2_ans:'',q3_ans:'',q4_ans:'', q5_ans:'',q6_ans:'',q5_sub_ans:''
    ,chkVal:'',loader:''
  };
  
  
    
    this.submitForm = this.submitForm.bind(this);
    this.valueChanged1 = this.valueChanged1.bind(this);
    this.valueChanged2 = this.valueChanged2.bind(this);
    
    var element = document.getElementById("body");
    element.classList.add("blue-bg");

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    try {
       axios.get('http://thrombolink.com/server/api/patient/page7LoadData',{
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
  var chk;
  if(document.getElementById("dvt1").checked === false 
  || document.getElementById("dvt2").checked === false 
  || document.getElementById("dvt3").checked === false 
  || document.getElementById("dvt4").checked === false){ 
chk=1;
  } 
  if(document.getElementById("dvt1").checked === true 
  || document.getElementById("dvt2").checked === true 
  || document.getElementById("dvt3").checked === true 
  || document.getElementById("dvt4").checked === true){
    chk=0;
  }
  console.log(chk);

  if(
    document.getElementById("mainoption1").checked === false
   && document.getElementById("mainoption2").checked === false
    && document.getElementById("mainoption3").checked === false
    && document.getElementById("mainoption4").checked === false
    && document.getElementById("optradio5").checked === false
    && document.getElementById("optradio6").checked === false
    ){
 
    this.setState({error1:'This field is required'});
    
    } else if(
      document.getElementById("optradio5").checked === true
     && chk===1){ 
  

      this.setState({error2:'This field is required',error1:''});
    
  } else {
  
    console.log(this.state);
    this.page7(this.state);
  //alert('hjgjgjhgjhghjh');
  this.props.history.push('/User/Page8');

  }
}

valueChanged1(e)
{

  this.setState({q1_ans:e.target.value});


    if(document.getElementById("optradio5").checked === true)  {
      

      document.getElementById("de").style.display = "block";
    } else {
      document.getElementById("de").style.display = "none";
    }
      

       
}


valueChanged2(e){
  this.setState({q1_ans:e.target.value});
  document.getElementById("optradio5").checked = false;
document.getElementById("de").style.display = "none";
if(document.getElementById("optradio6").checked === true)  {
 


  document.getElementById("optradio5").disabled= true;
  document.getElementById("mainoption3").disabled= true;
  document.getElementById("mainoption2").disabled= true;
  document.getElementById("mainoption1").disabled= true;
  document.getElementById("mainoption4").disabled= true;
} else {
  document.getElementById("optradio5").disabled= false;
  document.getElementById("mainoption3").disabled= false;
  document.getElementById("mainoption2").disabled= false;
  document.getElementById("mainoption1").disabled= false;
  document.getElementById("mainoption4").disabled= false;
  
}
}
      

       

page7(param){

  var param={
    cognitive_heart_failure:this.state.q1_ans,
    high_blood_pressure:this.state.q2_ans,
    diabetes:this.state.q3_ans,
    mitral_stenosis:this.state.q4_ans,
    stroke_or_mini_stroke:this.state.q5_ans,
    stroke_how_long:this.state.q5_sub_ans,
    none_of_above:this.state.q6_ans
  }
  console.log(param);
  server('patient/page7',param);
  //this.props.history.push('');
  }
  render() {
   
return (
<React.Fragment>
<Header />
{this.state.loader===1?
<div className="centered"><ReactSpinner type="border" color="bg-primary" size="5"  /></div> :''
  }
  <h1 className="text-center white main-heading">Potential Diagnosis</h1>
  <br />
  <br />
  <div className="bg-light blue-box">
    {" "}
    {/* white box */}
    {/* Default form login */}
    <form className="p-5" action="#!">
      <p className="blue">
        <b>
          Please Indicate if you have ever been diagnosed with any of the
          following
        </b>
      </p>
      <label className="radio-inline blue">
        Cognitive Heart Failure (ever)
      </label>
      <input type="checkbox" name="optradio" className="pull-right"
              onClick={this.valueChanged1} id="mainoption1"
              
              onChange={(e)=>this.setState({q1_ans:'Yes'})}

      
      />
   
      <br />
      <label className="radio-inline blue">
        High Blood Pressure (or have had high blood pressure in the past)
      </label>
      <input type="checkbox" name="optradio" className="pull-right"
          onClick={this.valueChanged1} id="mainoption2"
          onChange={(e)=>this.setState({q2_ans:'Yes'})} 
      />
       <br />
      
      <label className="radio-inline blue">Diabetes</label>
      <input type="checkbox" name="optradio" className="pull-right"
           onClick={this.valueChanged1} id="mainoption3"
           onChange={(e)=>this.setState({q3_ans:'Yes'})}
      />
      <br />
      <label className="radio-inline blue">Mitral Stenosis</label>
      <input type="checkbox" name="optradio" className="pull-right"
          onClick={this.valueChanged1} id="mainoption4"
          onChange={(e)=>this.setState({q4_ans:'Yes'})}
          />
      <br />
      <label className="radio-inline blue">Stroke or Mini-Stroke</label>
      <input
        type="checkbox"
        name="optradio"
        id="optradio5"
        className="pull-right"
        onClick={this.valueChanged1}
        onChange={(e)=>this.setState({q5_ans:'Yes'})}
      />
    
      <br />
      <div id="de">
      <p className="blue"><b>If So, how long ago</b></p>
              <label className="radio-inline blue">Less than 1 month ago</label>
              <input type="radio" name="dvt" id="dvt1" className="pull-right" 
              onChange={(e)=>this.setState({q5_sub_ans:'Less than 1 month ago'})}
              />
              <br />
              <label className="radio-inline blue">Between 1 and 3 months ago</label>
              <input type="radio" name="dvt" id="dvt2" className="pull-right" 
               onChange={(e)=>this.setState({q5_sub_ans:'Between 1 and 3 months ago'})}
              />
              <br />
              <label className="radio-inline blue">More than 3 months ago</label>
              <input type="radio" name="dvt" id="dvt3" className="pull-right" 
              onChange={(e)=>this.setState({q5_sub_ans:'More than 3 months ago<'})}
              />
              <br />
              <label className="radio-inline blue">Not Sure</label>
              <input type="radio" name="dvt" id="dvt4" className="pull-right" 
              onChange={(e)=>this.setState({q5_sub_ans:'Not Sure'})}
              />
               <div className="text-danger"> {this.state.error2!=='' ? this.state.error2: ''}</div>
            </div>
          
              <label className="radio-inline blue">None Of Above</label>
<input type="checkbox" name="optradio" id="optradio6" className="pull-right" 
    onChange={(e)=>this.setState({q6_ans:'None Of Above'})} onClick={this.valueChanged2} 
              />
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
  document.getElementById("de").style.display='none';
}

}
export default Page7;