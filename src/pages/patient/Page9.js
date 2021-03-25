import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import $ from 'jquery';
import { goBack } from '../../utils/user';
import { server } from '../../utils/functions';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner'
class Page9 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     console.log(this.validator);
    this.state = { 

     q1_ans: '',  q2_ans: '', q3_ans: '',
     q4_ans: '', dosage1: '', dosage2: '', dosage3: '', notsure1: '', notsure2: '', notsure3: '', 


     error11: '',loader:''};
    
    this.submitForm = this.submitForm.bind(this);
    this.chkOne = this.chkOne.bind(this);
    this.chkTwo = this.chkTwo.bind(this);
  
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



submitForm() {
      
  if(document.getElementById("no_med").checked === false && 
   document.getElementById("medicien3").checked === false && 
  document.getElementById("medicien2").checked === false && 
  document.getElementById("medicien1").checked === false) {
  this.setState({error1:'This field is required'});

  } else if( document.getElementById("medicien1").checked === true 
  && $('#dosage1').val() === '' &&  document.getElementById("notsure1").checked ===false ){
    this.setState({error1:'',error2:'This field is required'});

  } else if( document.getElementById("medicien2").checked === true 
  && $('#dosage2').val() === '' &&  document.getElementById("notsure2").checked ===false ){
    this.setState({error1:'',error2:'',error3:'This field is required'});

  } else if( document.getElementById("medicien3").checked === true 
  && $('#dosage3').val() === '' &&  document.getElementById("notsure3").checked ===false ){
    this.setState({error1:'',error2:'',error3:'',error4:'This field is required'});


  } else {
    console.log(this.state);
    this.page9(this.state);
this.props.history.push('/User/Page10');
  }
}
page9(){
  
  if(document.getElementById("no_med").checked === true)  {
    param.no=this.state.no_med;
 
    }  else {
      var param={};
   if(document.getElementById("medicien1").checked === true)  {
      param.dalteparin=this.state.q1_ans;
      param.dalteparin_dosage=this.state.dosage1;
      param.dalteparin_not_sure=this.state.notsure1;
    
  } 
   if(document.getElementById("medicien2").checked === true)  {
    param.enoxaparin=this.state.q2_ans;
    param.enoxaparin_dosage2=this.state.dosage2;
    param.enoxaparin_notsure2=this.state.notsure2;
    
   }
  
   if(document.getElementById("medicien3").checked === true)  {
    
    param.enoxaparin=this.state.q3_ans;
    param.enoxaparin_dosage1=this.state.dosage3;
    param.enoxaparin_not_sure=this.state.notsure3;
   }

 
    
  }
  

  server('patient/page9',param);
  //this.props.history.push('');
  }
func(){
  document.getElementById("de").style.display = "none";
 
}



chkOne(){
  this.setState({q1_ans:'Dalteparin (Fragmin)'});
  $('#one').toggle(1000);

}
chkTwo(){
  this.setState({q2_ans:'Enoxaparin (Lovenox)'});
  $('#two').toggle(1000);
}
chkFour(){
  this.setState({q3_ans:'Tinzaparin (Innohep)'});

   $('#four').toggle(1000);
 
}


no_med(){
  this.setState({
    q1_ans:'', q2_ans:'',q3_ans:'',q4_ans:'',

  dosage1:'',
  dosage2:'',
  dosage3:'',
  notsure1:'',
  notsure2:'',
  notsure3:'',
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
  <h1 className="text-center white main-heading">Current Medication - Heparin</h1>
  <br />
  <br />
  <div className="bg-light blue-box">
    {" "}
    {/* white box */}
    {/* Default form login */}
    <form className="p-5" action="#!" id="frm">
      <p className="blue">
        <b>Please choose if applicable</b>   </p>
    
      <div className="checkbox">
        <label className="blue">Dalteparin (Fragmin)</label>
        <input type="checkbox"  className="pull-right goption chk" 
        name="main_opt1"
          value="Dalteparin (Fragmin)"  onChange={this.chkOne} 
          id="medicien1"
        />
  
      </div>
      <div id="one">



      <label className="blue" htmlFor="monday">   Dosage in Units</label>
      
      <input
        type="number"
        id="dosage1"  min="0"
        className="form-control mb-4 transparent-custom-input"
       
       onChange={(e)=>this.setState({dosage1:e.target.value})}
      />
    
    
    <label className="radio-inline blue">Not Sure</label>
    <input type="radio" name="drugs" id="notsure1" className="pull-right" 
     value="Not Sure"  onChange={this.toggle}  onClick={(e)=>this.setState({notsure1:'Not Sure'})} 
     />
  
  <div className="text-danger"> {this.state.error2!=='' ? this.state.error2: ''}</div>
    
      </div>
    
         
      <div className="checkbox">
        <label className="blue">Enoxaparin (Lovenox)</label>
        <input type="checkbox"  className="pull-right goption chk" 
           value="Enoxaparin (Lovenox)"  onChange={this.chkTwo}
           id="medicien2" name="main_opt2"      
           />
      </div>
      <div id="two">
      <label className="blue" htmlFor="monday">   Dosage in Mg</label>
      
<input
  type="number"
  id="dosage2"  min="0"
  className="form-control mb-4 transparent-custom-input"
 
 onChange={(e)=>this.setState({dosage2:e.target.value})}
/>
  

    
  <label className="radio-inline blue">Not Sure</label>
    <input type="radio" name="drugs" id="notsure2" className="pull-right" 
     value="Not Sure"  onChange={this.toggle}  onClick={(e)=>this.setState({notesure2:'Not Sure'})} 
     />
  <div className="text-danger"> {this.state.error3!=='' ? this.state.error3: ''}</div>
    
      </div>
   
    
      <div className="checkbox">
        <label className="blue">Tinzaparin (Innohep)</label>
        <input type="checkbox"  className="pull-right goption chk" 
           value="Tinzaparin (Innohep)" onChange={this.chkFour}
           id="medicien3" name="main_opt14" 
           />
      </div>
      <div id="four">
     
      <label className="blue" htmlFor="monday">   Dosage in Units</label>
      
      <input
        type="number"
        id="dosage3"  min="0"
        className="form-control mb-4 transparent-custom-input"
       
       onChange={(e)=>this.setState({dosage3:e.target.value})}
      />
      
      
      
    
    <label className="radio-inline blue">Not Sure</label>
    <input type="radio" name="drugs" id="notsure3" className="pull-right" 
     value="Not Sure"  onChange={this.toggle}  onClick={(e)=>this.setState({notsure3:'Not Sure'})} 
     />
      <div className="text-danger"> {this.state.error4!=='' ? this.state.error4: ''}</div>
    
     </div>
      
      <div className="checkbox">
        <label className="blue">None of the above</label>
        <input type="checkbox"  className="pull-right goption"  onChange={(e)=>this.setState({q4_ans:e.target.value})}
     onClick={ this.no_med } name="main_opt5" 
          value="None of the above"  
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


 $('#no_med').click(function() {
  $(".chk").attr('disabled', !$("input[type='checkbox']").attr('disabled'));
});
}

}
export default Page9;