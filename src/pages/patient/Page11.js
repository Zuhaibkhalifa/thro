import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import $ from 'jquery';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner'
class Page11 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     console.log(this.validator);
    this.state = { 

      qChk:'',q1_ans: '', q2_ans: '',  q3_ans: '',  q4_ans: '',  q5_ans: '',
      drug1: '', drug2: '', drug3: '', drug4: '',
     frequency1: '', frequency2: '',frequency3: '', frequency4: '',

     error1: '', 
     error2: '', 
     error3: '', 
     error4: '', 
     error5: '', 
     error6: '', 
     error7: '', 
     error8: '', 
     error9: '', 
     error8: '',
     error10: '', 
     error11: '',loader:''

  };
    
    this.submitForm = this.submitForm.bind(this);
    this.chkOne = this.chkOne.bind(this);
    this.chkTwo = this.chkTwo.bind(this);
    this.chkThree = this.chkThree.bind(this);
    this.chkFour = this.chkFour.bind(this);

    this.no_med = this.no_med.bind(this);
    
    var element = document.getElementById("body");
    element.classList.add("blue-bg");


    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    try {
       axios.get('http://thrombolink.com/server/api/patient/page11LoadData',{
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



aspirin_dose2() {
  if(document.getElementById("aspirin_dose2").checked === true){
    $('#aspirin_dose_other').show(1000);
  } else {
    $('#aspirin_dose_other').hide(1000);
  }
}
plavix_dose2() {
  if(document.getElementById("plavix_dose2").checked === true){
    $('#plavix_dose_other').show(1000);
  } else {
    $('#plavix_dose_other').hide(1000);
  }
}
brillinta_dosage_freq2() {
  if(document.getElementById("brillinta_dosage_freq2").checked === true){
    $('#brillinta_dosage_other').show(1000);
  } else {
    $('#brillinta_dosage_other').hide(1000);
  }
}

submitForm() {
      
  if(document.getElementById("no_med").checked === false && document.getElementById("medicien_4").checked === false && document.getElementById("medicien_3").checked === false && document.getElementById("medicien_2").checked === false && document.getElementById("medicien_1").checked === false) {

    this.setState({error1:'This field is required'});
    
  } else if(document.getElementById("medicien_1").checked === true && !$("input[name='aspirin_dose']:checked").val()){

    this.setState({error1:''});
    this.setState({error2:'This field is required'});

  } else if(document.getElementById("aspirin_dose2").checked === true && $('#asprin_dosage_other111').val()===''){

    this.setState({error2:''});
    this.setState({error3:'This field is required'});
  } else if(document.getElementById("medicien_2").checked === true && !$("input[name='plavix_dose']:checked").val()){

    this.setState({error3:''});
    this.setState({error4:'This field is required'});

  } else if(document.getElementById("plavix_dose2").checked === true && $('#plavix_dose_other_opt').val()===''){

    this.setState({error4:''});
    this.setState({error5:'This field is required'});
     
  } else if(document.getElementById("medicien_3").checked === true && !$("input[name='brillinta_dosage_mg']:checked").val()){

    this.setState({error5:''});
    this.setState({error6:'This field is required'});  

  } else if($("input[name='brillinta_dosage_mg']:checked").val() && !$("input[name='brillinta_dosage_freq']:checked").val()){

    this.setState({error6:''});
    this.setState({error7:'This field is required'});  
       
  } else if(document.getElementById("brillinta_dosage_freq2").checked === true && $('#brillinta_dosage_freq2_opt').val()===''){

    this.setState({error7:''});
    this.setState({error8:'This field is required'});  
       
  } else if(document.getElementById("medicien_4").checked === true && !$("input[name='prasugrel_dosage']:checked").val()){

    this.setState({error8:''});
    this.setState({error9:'This field is required'});  

  } else if(document.getElementById("prasugrel_dosage3").checked === true && $('#prasugrel_dosage3_opt').val()===''){
    this.setState({error1:''});
    this.setState({error2:''});
    this.setState({error3:''});
    this.setState({error4:''});
    this.setState({error5:''});
    this.setState({error6:''});
    this.setState({error7:''});
    this.setState({error8:''});
    this.setState({error9:''});

    this.setState({error10:'This field is required'});  


  } else if($("input[name='prasugrel_dosage']:checked").val() && !$("input[name='prasugrel_dosage_freq']:checked").val()){

    this.setState({error1:''});
    this.setState({error2:''});
    this.setState({error3:''});
    this.setState({error4:''});
    this.setState({error5:''});
    this.setState({error6:''});
    this.setState({error7:''});
    this.setState({error8:''});
    this.setState({error9:''});
    this.setState({error10:''});
    this.setState({error11:'This field is required'});  

       

       
  } else {
    console.log(this.state);
    this.page11(this.state);
this.props.history.push('/User/Page12');
  }
}
page11(){
  
  if(document.getElementById("no_med").checked === true)  {
  
   var param={not_using_drugs:this.state.q5_ans};
    }  else {
      var param={};
   if(document.getElementById("medicien_1").checked === true)  {
   
  
      param.aspirin=this.state.q1_ans;
      param.aspirin_dosage=this.state.drug2;
      param.aspirin_dosage_time=this.state.frequency1;
    
  } 
   if(document.getElementById("medicien_2").checked === true)  {
    param.plavix=this.state.q2_ans;
    param.plavix_dosage=this.state.drug2;
    param.plavix_dosage_time=this.state.frequency2;
   }
  
   if(document.getElementById("medicien_3").checked === true)  {
    param.brillinta=this.state.q3_ans;
    param.brillinta_dosage=this.state.drug3;
    param.brillinta_dosage_timie=this.state.frequency3;
   }

   if(document.getElementById("medicien_4").checked === true)  {
    param.effient=this.state.q4_ans;
    param.effient_dosage=this.state.drug4;
    param.effient_dosage_time=this.state.frequency4;
   }
    
  }
  server('patient/page11',param);
  //this.props.history.push('');
  }
func(){
  document.getElementById("de").style.display = "none";
  if($('.goption:checked').length > 2) {

      this.checked = false;
      alert('You can select only 2 medicien');
  }
}



chkOne(){
  this.setState({q1_ans:'Aspirin (ASA)'});
  $('#one').toggle(1000);

}
chkTwo(){
  this.setState({q2_ans:'Plavix (Clopidogrel)'});
  $('#two').toggle(1000);
}
chkThree(){
  this.setState({q3_ans:'Brillinta (Ticagrelor)'});

   $('#three').toggle(1000);
 
}
chkFour(){
  this.setState({q4_ans:'Effient (Prasugrel)'});

   $('#four').toggle(1000);
}

no_med(){
  this.setState({q1_ans:'',
  q1_ans:'',
  q2_ans:'',
  q3_ans:'',
  q4_ans:'',
  q5_ans:'',
  drug1:'',
  drug2:'',
  frequency1:'',
  frequency2:''
});
}
  render() {
   
return (
<React.Fragment>
  
<Header />
{this.state.loader===1?
<div className="centered"><ReactSpinner type="border" color="bg-primary" size="5"  /></div> :''
  }
<div>
  <h1 className="text-center white main-heading">Antiplatelets</h1>
  <br />
  <br />
  <div className="bg-light blue-box">
    {" "}
    {/* white box */}
    {/* Default form login */}
    <form className="p-5" action="#!" id="frm">
      <p className="blue">
        <b>Please choose if applicable</b>
      </p>
      <p className="blue" style={{ fontSize: 14, marginTop: "-20px" }}>
        SELECT UP TO 2
      </p>
      <div className="checkbox">
        <label className="blue">Aspirin (ASA)</label>
        <input type="checkbox"  className="pull-right goption chk" 
        name="main_opt1"
          value="Aspirin (ASA)"  onChange={this.chkOne} 
          id="medicien_1"
        />
      </div>
      <div id="one">
      <label className="radio-inline blue">81 mg</label>
        <input type="radio" name="aspirin_dose" id="aspirin_dose1" className="pull-right" 
        onChange={(e)=>this.setState({drug1:'81 mg'})} onClick={this.aspirin_dose2}/>
        <br />
        <label className="radio-inline blue">Other</label>
        <input type="radio" name="aspirin_dose" id="aspirin_dose2" className="pull-right" 
        onClick={this.aspirin_dose2}/>
        <br />
      
      <div className="row" id="aspirin_dose_other">
      
        <div className="col-6">
          {/* input */}
          <p className="blue" style={{ opacity: "0.5" }}>
        <b>Please specify dosage and frequency of DRUG </b>
      </p>
          <input
            type="number"
            id="asprin_dosage_other111"
            className="form-control mb-4 transparent-custom-input"
            placeholder="Dose (mg)"
           
            onChange={(e)=>this.setState({drug1:e.target.value})}
          />
             <div className="text-danger"> {this.state.error3!=='' ? this.state.error3: ''}</div>
        </div>
        <div className="col-6">
          {/* input */}
        
        </div>
      </div>
      <label className="radio-inline blue">Once daily</label>
        <input type="radio" name="aspirin_dose_time" id="aspirin_freq1" className="pull-right" 
         onChange={(e)=>this.setState({frequency1:'Once daily'})} 
         />
        <br />
        <label className="radio-inline blue">Twice daily</label>
        <input type="radio" name="aspirin_dose_time" id="aspirin_freq2" className="pull-right"
         onChange={(e)=>this.setState({frequency1:'Twice daily'})}  />
        <br />
        <label className="radio-inline blue">Not Sure</label>
        <input type="radio" name="aspirin_dose_time" id="aspirin_freq" className="pull-right"
         onChange={(e)=>this.setState({frequency1:'Not Sure'})} />
        <br />

        <div className="text-danger"> {this.state.error2!=='' ? this.state.error2: ''}</div>
      </div>
    
         
      <div className="checkbox">
        <label className="blue">Plavix (Clopidogrel)</label>
        <input type="checkbox"  className="pull-right goption chk" 
           value="Plavix (Clopidogrel)"  onChange={this.chkTwo}
           id="medicien_2" name="main_opt2"      
           />
      </div>
      <div id="two">
      <label className="radio-inline blue">75 mg</label>
        <input type="radio" name="plavix_dose" id="plavix_dose1" className="pull-right" 
         onChange={(e)=>this.setState({drug2:'75 mg'})} onClick={this.plavix_dose2}
         />
        <br />
        <label className="radio-inline blue">Other</label>
        <input type="radio" name="plavix_dose" id="plavix_dose2" className="pull-right" 
       onClick={this.plavix_dose2} />
        <br />
      <div className="row" id="plavix_dose_other">
        <div className="col-6">
          {/* input */}
          <p className="blue" style={{ opacity: "0.5" }}>
        <b>Please specify dosage and frequency of DRUG</b>
      </p>
          <input
            type="text"
            id="plavix_dose_other_opt"
            className="form-control mb-4 transparent-custom-input"
            placeholder="Dose (mg)"
            onChange={(e)=>this.setState({drug2:e.target.value})}
          />
         <div className="text-danger"> {this.state.error5!=='' ? this.state.error5: ''}</div>
        </div>
        <div className="col-6">
          {/* input */}
         
        </div>
      </div>
      <label className="radio-inline blue">Once daily</label>
        <input type="radio" name="plavix_dose_time" id="Plavix_freq1" className="pull-right" 
           onChange={(e)=>this.setState({frequency2:'Once daily'})}
           />
        <br />
        <label className="radio-inline blue">Twice daily</label>
        <input type="radio" name="plavix_dose_time" id="Plavix_freq2" className="pull-right" 
        onChange={(e)=>this.setState({frequency2:'Twice daily'})} />
        <br />
        <label className="radio-inline blue">Not Sure</label>
        <input type="radio" name="plavix_dose_time" id="Plavix_freq3" className="pull-right"
         onChange={(e)=>this.setState({frequency2:'Not Sure'})} />
        <br />

        <br />
        <div className="text-danger"> {this.state.error4!=='' ? this.state.error4: ''}</div>
      </div>
      <div className="checkbox">
        <label className="blue">Brillinta (Ticagrelor)</label>
        <input type="checkbox"  className="pull-right goption chk" 
           value="Brillinta (Ticagrelor)"  onChange={this.chkThree}
           id="medicien_3" name="main_opt13" 
     
           />
      </div>
     
      <div id="three">
    
     
      <label className="radio-inline blue">60 mg</label>
        <input type="radio" name="brillinta_dosage_mg" id="brillinta_dosage_mg1" className="pull-right" 
          onChange={(e)=>this.setState({drug3:'60 mg'})} />
        <br />
        <label className="radio-inline blue">90 mg</label>
        <input type="radio" name="brillinta_dosage_mg" id="brillinta_dosage_m2" className="pull-right" 
        onChange={(e)=>this.setState({drug3:'90 mg'})} />
        <div className="text-danger"> {this.state.error6!=='' ? this.state.error6: ''}</div>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label className="radio-inline blue">Twice daily</label>
        <input type="radio" name="brillinta_dosage_freq" id="brillinta_dosage_freq1" className="pull-right" 
        onChange={(e)=>this.setState({frequency3:'90 mg'})}      onClick={this.brillinta_dosage_freq2}/>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label className="radio-inline blue">Other</label>
        <input type="radio" name="brillinta_dosage_freq" id="brillinta_dosage_freq2" className="pull-right"
        onClick={this.brillinta_dosage_freq2} />
        <div className="text-danger"> {this.state.error7!=='' ? this.state.error7: ''}</div>
        <br />
        <div className="row" id="brillinta_dosage_other">
        <div className="col-6">
        <p className="blue" style={{ opacity: "0.5" }}>
        <b>Please specify dosage and frequency of DRUG</b>
      </p>
          {/* input */}
          <input
          id="brillinta_dosage_freq2_opt"
            type="text"
            className="form-control mb-4 transparent-custom-input"
            placeholder="Dose (mg)"
            onChange={(e)=>this.setState({frequency3:e.target.value})}
          />
             <div className="text-danger"> {this.state.error8!=='' ? this.state.error8: ''}</div>
        </div>
        <div className="col-6">
 
        </div>
      </div>

      </div>
      <div className="checkbox">
        <label className="blue">Effient (Prasugrel)</label>
        <input type="checkbox"  className="pull-right goption chk" 
           value="ffient (Prasugrel)<" onChange={this.chkFour}
           id="medicien_4" name="main_opt14" 
           />
      </div>
      <div id="four">
     
      <label className="radio-inline blue">5 mg</label>
        <input type="radio" name="prasugrel_dosage" id="prasugrel_dosage1" className="pull-right" 
        onChange={(e)=>this.setState({drug4:'5 mg'})}
        />
        <br />
        <label className="radio-inline blue">10 mg</label>
        <input type="radio" name="prasugrel_dosage" id="prasugrel_dosage2" className="pull-right"
          onChange={(e)=>this.setState({drug4:'10 mg'})} />

        <br />
        <label className="radio-inline blue">Other</label>
        <input type="radio" name="prasugrel_dosage" id="prasugrel_dosage3" className="pull-right" />
        <div className="text-danger"> {this.state.error9!=='' ? this.state.error9: ''}</div>
        <br />
        <span id="efffient_other">
        <p className="blue" style={{ opacity: "0.5" }}>
        <b>Please specify dosage and frequency of DRUG</b>
      </p>
        <input
            type="text"
            id="prasugrel_dosage3_opt"
            className="form-control mb-4 transparent-custom-input"
            placeholder="Dose (mg)"
            onChange={(e)=>this.setState({drug4:e.target.value})}
          />
             <div className="text-danger"> {this.state.error10!=='' ? this.state.error10: ''}</div>
       </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label className="radio-inline blue">Twice daily</label>
        <input type="radio" name="prasugrel_dosage_freq" id="prasugrel_dosage_freq1" className="pull-right"
           onChange={(e)=>this.setState({frequency4:'Twice daily'})} />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label className="radio-inline blue">Other</label>
        <input type="radio" name="prasugrel_dosage_freq" id="prasugrel_dosage_freq2" className="pull-right" 
        onChange={(e)=>this.setState({frequency4:'Other'})}/>
        <br />
        <div className="text-danger"> {this.state.error11!=='' ? this.state.error11: ''}</div>
        <div className="text-danger"> {this.state.error5!=='' ? this.state.error5: ''}</div>
      </div>
     
      
      <div className="checkbox">
        <label className="blue">No, I am not on any of these medications</label>
        <input type="checkbox"  className="pull-right"  onChange={(e)=>this.setState({q5_ans:e.target.value})}
     onClick={ this.no_med } name="main_opt5" 
          value="No, I am not on any of these medications"  
          id="no_med"
        />
      </div>
      <div className="text-danger"> {this.state.error1!=='' ? this.state.error1: ''}</div>
      <br />
      <br />
      <div className="row">
        <div className="col-6">
          {/* input */}
    
        </div>
        <div className="col-6">
          {/* input */}
        
        </div>
      </div>
    
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

  $('#one').hide();
  $('#two').hide();
   $('#three').hide();
   $('#four').hide();
   $('#aspirin_dose_other').hide();
   $('#plavix_dose_other').hide();
   $('#brillinta_dosage_other').hide();
   $('#efffient_other').hide();
   
  $('.goption').click(function() {
    if($('.goption:checked').length > 2) {
        this.checked = false;
       }
});


 
$('#plavix_dose2').click(function() {
  $('#plavix_dose_other').toggle(1000)
});

$('#brillinta_dosage_freq2').click(function() {
  $('#brillinta_dosage_other').toggle(1000)
});
$('#prasugrel_dosage3').click(function() {
  $('#efffient_other').toggle(1000)
});
 $('#no_med').click(function() {
  $(".chk").prop("checked", false);
  $("input[type='radio']").prop("checked", false);
  $(".chk").attr('disabled', !$("input[type='checkbox']").attr('disabled'));
  $("input[type='radio']").attr('disabled', !$("input[type='radio']").attr('disabled'));

});
}

}
export default Page11;