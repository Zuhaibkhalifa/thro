import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import ReactSpinner from 'react-bootstrap-spinner'
import $ from 'jquery';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';

class Page13 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     
    this.state = { q1_ans: '',
       q1_ans_option: '', 
    q2_ans: '',
       q2_ans_option: '', 
    q3_ans: '',
     q3_ans_option: '', 
    q4_ans: '',
    q5_ans: '',
    q6_ans: '',
    q7_ans: '', 
    q7_ans_option: '' ,loader:''

  };
    
    this.submitForm = this.submitForm.bind(this);
    var element = document.getElementById("body");
    element.classList.add("blue-bg");

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    try {
       axios.get('http://thrombolink.com/server/api/patient/page13LoadData',{
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


toggleOptions2(){

  if(document.getElementById("optradio_not_sure_main").checked === true)  {
   document.getElementById("optradio_yes").disabled = true;
    document.getElementById("optradio_no").disabled = true;     
  } else {
 document.getElementById("optradio_yes").disabled = false;
    document.getElementById("optradio_no").disabled = false;
  
  }
}


toggleOptions(){

    if(document.getElementById("seven").checked === true)  {
     
     
      
      document.getElementById("one").disabled = true;
      document.getElementById("two").disabled = true;
      document.getElementById("three").disabled = true;     
      document.getElementById("four").disabled = true;
      document.getElementById("six").disabled = true;
      document.getElementById("oneone").disabled = true;
      document.getElementById("twotwo").disabled = true;
      document.getElementById("threethree").disabled = true;
      document.getElementById("oneone_freq1").disabled = true;
      document.getElementById("oneone_freq2").disabled = true;
      document.getElementById("oneone_freq3").disabled = true;
      document.getElementById("twotwo_freq1").disabled = true;
      document.getElementById("twotwo_freq2").disabled = true;
      document.getElementById("twotwo_freq3").disabled = true;
      document.getElementById("threethree_freq1").disabled = true;
      document.getElementById("threethree_freq2").disabled = true;
      document.getElementById("threethree_freq3").disabled = true;
      
      
   
    } else {
  
       
      document.getElementById("one").disabled = false;
      document.getElementById("two").disabled = false;
      document.getElementById("three").disabled = false;     
      document.getElementById("four").disabled = false;
      document.getElementById("six").disabled = false;
      document.getElementById("oneone").disabled = false;
      document.getElementById("twotwo").disabled = false;
      document.getElementById("threethree").disabled = false;
      document.getElementById("oneone_freq1").disabled = false;
      document.getElementById("oneone_freq2").disabled = false;
      document.getElementById("oneone_freq3").disabled = false;
      document.getElementById("twotwo_freq1").disabled = false;
      document.getElementById("twotwo_freq2").disabled = false;
      document.getElementById("twotwo_freq3").disabled = false;
      document.getElementById("threethree_freq1").disabled = false;
      document.getElementById("threethree_freq2").disabled = false;
      document.getElementById("threethree_freq3").disabled = false;

    }
  }



submitForm() {
  if(document.getElementById("one").checked === false && document.getElementById("two").checked === false && document.getElementById("three").checked === false && document.getElementById("four").checked === false && document.getElementById("six").checked === false && document.getElementById("seven").checked === false){
   
    this.setState({error1:'This field is required'});
   } else if(document.getElementById("optradio_yes").checked === false 
   && document.getElementById("optradio_no").checked === false 
   && document.getElementById("optradio_not_sure_main").checked === false){
this.setState({error5:'',error4:'',error2:'',error3:'',error1:'',error2:'This field is required'});
} else if(document.getElementById("one").checked === true && document.getElementById("oneone_freq1").checked === false && document.getElementById("oneone_freq2").checked === false && document.getElementById("oneone_freq3").checked === false){ 
  this.setState({error4:'',error2:'',error1:'',error1:'',error3:'This field is required'});
} else if(document.getElementById("two").checked === true && document.getElementById("twotwo_freq1").checked === false && document.getElementById("twotwo_freq2").checked === false && document.getElementById("twotwo_freq3").checked === false){ 
  this.setState({error4:'',error2:'',error3:'',error1:'',error4:'This field is required'});
 
} else if(document.getElementById("three").checked === true && document.getElementById("threethree_freq1").checked === false && document.getElementById("threethree_freq2").checked === false && document.getElementById("threethree_freq3").checked === false){ 
  this.setState({error4:'',error2:'',error3:'',error1:'',error5:'This field is required'});
} else if(document.getElementById("optradio_yes").checked === true && $('#whenDate').val()===''){ 
  this.setState({error4:'',error2:'',error3:'',error1:'',error5:'',error6:'This field is required'});




   } else {
  
    console.log(this.state);
    this.page13(this.state);
   this.props.history.push('/User/Page14');
  }
 
}
rdo
page13(){

var param={
    bleeding_requiring_treatment :this.state.q1_ans,
    bleeding_requiring_treatment_last_three_months :this.state.q1_ans_option,
    bleeding_from_stomach :this.state.q2_ans,
    bleeding_from_stomach_last_three_months :this.state.q2_ans_option,
    ulcer_in_stomach_or_bowel :this.state.q3_ans,
    ulcer_in_stomach_or_bowel_last_three_months:this.state.q3_ans_option,
    liver_disease :this.state.q4_ans,
    kidney_disease :this.state.q5_ans,
    not_sure :this.state.q6_ans,
    had_transfusion_in_last_three_months :this.state.q7_ans,
    had_transfusion_in_last_three_months_when :this.state.q7_ans_option
  }

  server('patient/page13',param);
  //this.props.history.push('');
  }
  render() {
   
return (
<React.Fragment>
<Header />
{this.state.loader===1?
<div className="centered"><ReactSpinner type="border" color="bg-primary" size="5"  /></div> :''
  }
<div>
  <h1 className="text-center white main-heading">
    Have you experienced any of the following
  </h1>
  <br />
  <br />
  <div className="bg-light blue-box">
    {" "}
    {/* white box */}
    {/* Default form login */}
    <form className="p-5" action="#!">
      <p className="blue">
        <b>Please choose if applicable</b>
      </p>
      <div className="checkbox">
        <label className="blue">
          Bleeding requiring treatment in hospital or emergency department?
        </label>
        <input
          type="checkbox"
          
          className="pull-right"
          id="one"
          name="rdo"
          value=""
       
          onChange={(e)=>this.setState({q1_ans:'Yes'})}
        />
      </div>
      <div className="checkbox" id="oneone">
        <label className="blue">
         
           Was it in the last 3 months?
        </label>
        <br />
         <label className="radio-inline blue">Yes</label>
        <input type="radio" name="prasugrel_dosage_freq" id="oneone_freq1" className="pull-right"
           defaultChecked={this.state.q1_ans_option === "Yes"}  onChange={(e)=>this.setState({q1_ans_option:'Yes'})}
           />
        <br />
        <label className="radio-inline blue">No</label>
        <input type="radio" name="prasugrel_dosage_freq" id="oneone_freq2" className="pull-right" 
           defaultChecked={this.state.q1_ans_option === "No"}  onChange={(e)=>this.setState({q1_ans_option:'No'})}
           />
       
        <br />
         <label className="radio-inline blue">Not Sure</label>
        <input type="radio" name="prasugrel_dosage_freq" id="oneone_freq3" className="pull-right" 
           defaultChecked={this.state.q1_ans_option === "Not Sure"}  onChange={(e)=>this.setState({q1_ans_option:'Not Sure'})}
           />
         
      </div>
      <div className="text-danger"> {this.state.error3!=='' ? this.state.error3: ''}</div>

      <div className="checkbox">
        <label className="blue">Bleeding from the stomach or bowel</label>
        <input
          type="checkbox"
         
          className="pull-right"
          id="two"
          name="rdo"
          value="Yes"
         
          onChange={(e)=>this.setState({q2_ans:'Yes'})}
        />
      </div>
      <div className="checkbox" id="twotwo">
        <label className="blue">
          {" "}
         Was it in the last 3 months?
        </label>
        
  <br />
 <label className="radio-inline blue">Yes</label>
        <input type="radio" name="bleeding_dosage_freq" id="twotwo_freq1" className="pull-right" 
          defaultChecked={this.state.q2_ans_option === "Yes"}  onChange={(e)=>this.setState({q2_ans_option:'Yes'})}
          />
        <br />
        <label className="radio-inline blue">No</label>
        <input type="radio" name="bleeding_dosage_freq" id="twotwo_freq2" className="pull-right" 
         defaultChecked={this.state.q2_ans_option === "No"}  onChange={(e)=>this.setState({q2_ans_option:'No'})}
         />
       
        <br />
    <label className="radio-inline blue">Not Sure</label>
        <input type="radio" name="bleeding_dosage_freq" id="twotwo_freq3" className="pull-right" 
         defaultChecked={this.state.q2_ans_option === "Not Sure"}  onChange={(e)=>this.setState({q2_ans_option:'Not Sure'})}
         />
         <div className="text-danger"> {this.state.error4!=='' ? this.state.error4: ''}</div>
      </div>
      
      <div className="checkbox">
        <label className="blue">Ulcer in the stomach or bowel?</label>
        <input
          type="checkbox"
          
          className="pull-right"
          id="three"
          value="Yes"
       
          onChange={(e)=>this.setState({q3_ans:'Yes'})}
        />
      </div>
     
      <div className="checkbox" id="threethree">
        <label className="blue">
      
          Was it in the last 3 months?
        </label>
       
         <br />
<label className="radio-inline blue">Yes</label>
        <input type="radio" name="ulcer_dosage_freq" id="threethree_freq1" className="pull-right" 
            defaultChecked={this.state.q3_ans_option === "Yes"}  onChange={(e)=>this.setState({q3_ans_option:'Yes'})}
            />
        <br />
       <label className="radio-inline blue">No</label>
        <input type="radio" name="ulcer_dosage_freq" id="threethree_freq2" className="pull-right" 
            defaultChecked={this.state.q3_ans_option === "No"}  onChange={(e)=>this.setState({q3_ans_option:'No'})}
            />
       
        <br />
     <label className="radio-inline blue">Not Sure</label>
        <input type="radio" name="ulcer_dosage_freq" id="threethree_freq3" className="pull-right" 
            defaultChecked={this.state.q3_ans_option === "Not Sure"}  onChange={(e)=>this.setState({q3_ans_option:'Not Sure'})}
            />
         <div className="text-danger"> {this.state.error5!=='' ? this.state.error5: ''}</div>
            <br /><br />
      </div>
      <div className="checkbox">
        <label className="blue">Liver Disease?</label>
        <input
          type="checkbox"
          
          className="pull-right"
          id="four"
          name="rdo"
        
          defaultChecked={this.state.q4_ans === "Yes"}    onChange={(e)=>this.setState({q4_ans:'Yes'})}
        />
      </div>
      <div className="checkbox" id="fourfour">
        <label className="blue">Kidney Disease?</label>
        <input
          type="checkbox"
          
          className="pull-right"
          id="six"
          name="rdo"
          defaultChecked={this.state.q5_ans === "Yes"}  onChange={(e)=>this.setState({q5_ans:'Yes'})}
        />
      </div>
      <div className="checkbox" id="fourfour">
        <label className="blue">Not Sure</label>
        <input
          type="checkbox"
          
          className="pull-right"
          id="seven"
          name="rdo"
          onClick={ this.toggleOptions}
          defaultChecked={this.state.q1_ans === "Yes"}  onChange={(e)=>this.setState({q6_ans:'Yes'})}
          
        />
         <div className="text-danger"> {this.state.error1!=='' ? this.state.error1: ''}</div>
      
      </div>
      <br />
      <label className="blue">
            <b>Have you had a transfusion in the last 3 months?</b>
          </label>
          <br />
          <label className="radio-inline blue">Yes</label>
          <input type="radio" name="optradio" id="optradio_yes" 
            className="pull-right"
            value="Yes"
            onChange={(e)=>this.setState({q7_ans:'Yes'})}
          />
          <br />
          <label className="radio-inline blue">No</label>
          <input type="radio" name="optradio" id="optradio_no" 
            className="pull-right"
            value="Yes"
            onChange={(e)=>this.setState({q7_ans:'Yes'})}
          />

<br />
          <label className="radio-inline blue">Not Sure</label>
          <input type="checkbox" name="optradio" id="optradio_not_sure_main" 
            className="pull-right"
            value="Yes" onClick={this.toggleOptions2}
            onChange={(e)=>this.setState({q7_ans:'Yes'})}
          />

           {this.validator.message('Question', this.state.q7_ans, 'required')}
      <div className="row">
      <div className="col-4" id="whr_date">
          {/* input */}
          <label className="blue">
            <b>When?</b>
          </label>
          <input
            type="date"
            className="form-control mb-4 transparent-custom-input"
            name="whenDate"
            id="whenDate"
            max=""
            value={this.state.q7_ans_option} 
            onChange={(e)=>this.setState({q7_ans_option:e.target.value})}
          />
                  <div className="text-danger"> {this.state.error6!=='' ? this.state.error6: ''}</div>
        </div>
        <div className="col-4">
          {/* input */}
        
        </div>
        <div className="col-4" id="">
          {/* input */}
        
        </div>
      </div>
      <div className="text-danger"> {this.state.error2!=='' ? this.state.error2: ''}</div>
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
</div>
</React.Fragment>
);


}

componentDidMount(){



  $(document).ready(function(){

    $('#oneone').hide();
    $('#twotwo').hide();
    $('#threethree').hide();
    
    $('#whr_date').hide();
    
    $('#one').click(function() {
       if($('#one').is(":checked")) { 
         $('#oneone').show(1000);
       
    
       
      
       } else {
    
        $('#oneone').hide(1000);
      } 
    });
    
    
    $('#two').click(function() {
       if($('#two').is(":checked")) { 
       
         $('#twotwo').show(1000);
        
       
        } else {
    
          $('#twotwo').hide(1000);
       } 
    });
    
      $('#three').click(function() {
       if($('#three').is(":checked")) { 
      
         $('#threethree').show(1000);
         
    
     
        } else {
    
          $('#threethree').hide(1000);
         
      } 
    
    });
    
    
      $('#four').click(function() {
       if($('#four').is(":checked")) { 
          
       
      } 
    
    });
    
    
      $('#optradio_yes').click(function() {
       if($('#optradio_yes').is(":checked")) { 
         $('#whr_date').show(1000);
      } 
    
    });
    
      $('#optradio_no').click(function() {
       if($('#optradio_no').is(":checked")) { 
         $('#whr_date').hide(1000);
      } 
    
    });
    
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var min;
     if(dd<10){  dd='0'+dd;  } 
        if(mm<10){ mm='0'+mm } 
    
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("whenDate").setAttribute("max", today);
    var d = new Date();
    console.log(d.toLocaleDateString());
    d.setMonth(d.getMonth() - 3);
    var min =d.toLocaleDateString();


    document.getElementById("whenDate").setAttribute("min", '2020-12-01');

  
     }); 	


  }
}
export default Page13;