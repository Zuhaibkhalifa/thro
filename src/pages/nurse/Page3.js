import React from 'react';
import { Link } from 'react-router-dom'
import Header from './NurseHeader';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import $ from 'jquery';
import { server } from '../../utils/functions';
import ReactSpinner from 'react-bootstrap-spinner'
let data;
class Page3 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     console.log(this.validator);
    this.state = { month_year: '',
    procedure: '',
    date_of_procedure: '',
    age: '',
    sex: '',
    weight: '', 
    indication_for_anticoagulation: '',
    chads_score_and_distribution: '',
    poc_inr: '',
    poc_creat: '', 
    hb: '',
    plt: '',
    details_on_recomemendation: '',
    understanding:'',
    completed_by: '',
     reviewed_by: ''
     ,loader:1,
     
     procedureSelected:'',weightSelected:'',patient_id:'',
     aspirin:'',
     aspirin_dosage:'',
     aspirin_dosage_time:'',
     plavix:'',
     plavix_dosage:'',
     plavix_dosage_time:'',
     brillinta:'',
     brillinta_dosage:'',
     brillinta_dosage_timie:'',
     effient:'',
     effient_dosage:'',
     effient_dosage_time:'',
     not_using_drugs:'',
     ulcer_in_stomach_or_bowel_last_three_months:'',
     had_transfusion_in_last_three_months_when:'',
     had_transfusion_in_last_three_months:'',
     liver_disease:'',
     lab_location_for_inr_test:'',

     pradaxa:'',
     pradaxa_dosage:'',
     xarelto:'',
     xarelto_dosage:'',
     xarelto_dosage_time:'',
     eliquis:'',
     eliquis_dosage:'',
     eliquis_dosage_time:'',

     edoxabon:'',
     edoxabon_dosage:'',
     edoxabon_dosage_time:'',
  };
    
    this.submitForm = this.submitForm.bind(this);


    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    try {
      
       axios.get('http://thrombolink.com/server/api/nurse/page5LoadData',{
        headers: headers
      })
      .then((response) => {
        this.setState({loader:''});
        console.log(response);
        console.log(response.data.success[0]);
        data=response.data.success[0];
         this.setState({loader:''});
       //  console.log(data);
if(data !==undefined){
 
  $('#patient_id').val(data.patient_id);
  $('#weight_selected1').val(data.weight_unit);
        $('#procedure').val(data.type_of_procedure);
        $('#date_of_procedure').val(data.date_of_procedure);
   
      
       this.setState({procedure:data.type_of_procedure,
        date_of_procedure:data.date_of_procedure,
        age:data.age,
        sex:data.gender,
        weight:data.weight,
        understanding:data.understanding,
        completed_by:data.who_is_completing_this_form,
        reviewed_by:data.reviewed_by,
        procedureSelected:data.gender,
      indication_for_anticoagulation:data.indication_for_anticoagulation,
      chads_score_and_distribution:data.chads_score_and_distribution,
      poc_creat:data.poc_creat,
      hb:data.hb,
      plt:data.plt,
      details_on_recomemendation:data.details_on_recomemendation,
      poc_inr:data.poc_inr,
      weightSelected:data.weight_unit,
      aspirin:data.aspirin,
      aspirin_dosage:data.aspirin_dosage,
      aspirin_dosage_time:data.aspirin_dosage_time,
      plavix:data.plavix,
      plavix_dosage:data.plavix_dosage,
      plavix_dosage_time:data.plavix_dosage_time,
      brillinta:data.brillinta,
      brillinta_dosage:data.brillinta_dosage,
      brillinta_dosage_timie:data.brillinta_dosage_timie,
      effient:data.effient,
      effient_dosage:data.effient_dosage,
      effient_dosage_time:data.effient_dosage_time,
      not_using_drugs:data.not_using_drugs,
      ulcer_in_stomach_or_bowel_last_three_months:data.ulcer_in_stomach_or_bowel_last_three_months,
      had_transfusion_in_last_three_months_when:data.had_transfusion_in_last_three_months_when,
      had_transfusion_in_last_three_months:data.had_transfusion_in_last_three_months,
      
      liver_disease:data.liver_disease,
      lab_location_for_inr_test:data.lab_location_for_inr_test,

      pradaxa:data.pradaxa,
      pradaxa_dosage:data.pradaxa_dosage,
      xarelto:data.xarelto,
      xarelto_dosage:data.xarelto_dosage,
      xarelto_dosage_time:data.xarelto_dosage_time,
      eliquis:data.eliquis,
      eliquis_dosage:data.eliquis_dosage,
      eliquis_dosage_time:data.eliquis_dosage_time,
      edoxabon:data.edoxabon,
      edoxabon_dosage:data.edoxabon_dosage,
      edoxabon_dosage_time:data.edoxabon_dosage_time,
      });
        
        console.log(this.state);

    
        console.log(this.state.had_transfusion_in_last_three_months);
    
         
}
      })
    } catch (error) {
      this.setState({loader:''});
      console.error(error);
      this.setState({loader:''});
     
     
    }
 
}

handleChange_procedure(value) {
  this.setState({ procedureSelected: value });
}

submitForm() {
  if (this.validator.allValid()) {

   this.props.history.push('/Nurse/Nurse4');
  //  alert('You submitted the form and stuff!');
    console.log(this.state);
    this.page5(this.state);
  } else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    // you can use the autoForceUpdate option to do this automatically`
    this.forceUpdate();
  }
}


page5(param){

  var param={


    procedure:this.state.procedure,
    date_of_procedure:this.state.date_of_procedure,
    age:this.state.age,
    gender:this.state.procedureSelected,
    weight:this.state.weight,
    indication_for_anticoagulation:this.state.indication_for_anticoagulation,
    chads_score_and_distribution:this.state.chads_score_and_distribution,
    poc_creat:this.state.poc_creat,
    hb:this.state.hb,
    plt:this.state.plt,
    poc_inr:this.state.poc_inr,
     details_on_recomemendation:this.state.details_on_recomemendation,
      understanding:this.state.understanding,
      who_is_completing_this_form:this.state.completed_by,
       reviewed_by:this.state.reviewed_by
}
console.log(param);
  server('nurse/page5',param);
    }

    
    handleChange_weight(value) {
      this.setState({ weightSelected: value });
     // this.setState({ weight: value });
    }
    handle_procedure(value) {
      this.setState({ procedure: value });
     // this.setState({ weight: value });
    }
render() { 
return (
<React.Fragment>
<Header />
{this.state.loader===1?
<div className="centered"><ReactSpinner type="border" color="blue" size="5"  /></div> :''
  }
<div className="container">

<h3 className="text-center myHeading">Final Report</h3>
<br />
  {/* container */}
  <div className="jumbotron">
   
  <h4> Patient Information</h4>
    <br />
   
    <div className="row">
      
      <div className="col-6">
     
      <label htmlFor="usr">Pt Id  </label>
      </div>
   
    <div className="col-6 text-left">
    <input type="text" disabled
          id="patient_id"
          className="form-control"  defaultValue={this.state.patient_id} onChange={(e)=>this.setState({patient_id:e.target.value})}
      />

      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-6">
        <div className="form-group">
          <label htmlFor="usr">Procedure </label>
          <select  id="procedure" className="custom-select"   value={this.state.q1_ans}
       onChange={event => this.handle_procedure(event.target.value)}>
          <option value="Select Surgery">Select Surgery</option>
          <optgroup label="Neurosurgery/Spine">
<option value="Neuraxial procedure (high)
">Neuraxial procedure (high)
</option>
<option value="Neurosurgery or Spinal Surgery (high)
">Neurosurgery or Spinal Surgery (high)
</option>
</optgroup>

<optgroup label="GI/abdominal">
<option value="Abdominal surgery (mod)">Abdominal surgery (mod)</option>
<option value="Gastroscopy or colonoscopy without biopsy (mod)">Gastroscopy or colonoscopy without biopsy (mod)</option>
<option value="Gastroscopy or colonoscopy with biopsy (low)">Gastroscopy or colonoscopy with biopsy (low)</option>
<option value="Intestinal anastomosis (high)">Intestinal anastomosis (high)</option>
<option value="Extensive cancer surgery (e.g. liver/pancreas) (high)">Extensive cancer surgery (e.g. liver/pancreas) (high)</option>
</optgroup>

<optgroup label="Lung/Thoracic (non-cardiac)">
<option value="Lung resection (high)">Lung resection (high)</option>
<option value="Other intrathoracic surgery (mod)">Other intrathoracic surgery (mod)</option>
</optgroup>
<optgroup label="Orthopedic">
<option value="Major orthopedic surgery (high">Major orthopedic surgery (high</option>
<option value="Other orthopedic surgery (mod)">Other orthopedic surgery (mod)</option>

</optgroup>

<optgroup label="Eye">
<option value="Cataract surgery (low)">Cataract surgery (low)</option>
<option value="Non-cataract ophthalmological surgery (mod)">Non-cataract ophthalmological surgery (mod)</option>
</optgroup>

<optgroup label="Dental">
<option value="Complex dental procedure (e.g. multiple tooth extractions) (mod)">Complex dental procedure (e.g. multiple tooth extractions) (mod)</option>
<option value="Dental other than multiple tooth extractions or maxillofacial surgery (low)">Dental other than multiple tooth extractions or maxillofacial surgery (low)</option>
</optgroup>
<optgroup label="Plastic surgery">
<option value="Reconstructive plastic surgery (high)">Reconstructive plastic surgery (high)</option>
<option value="Other plastic surgery">Other plastic surgery</option>
</optgroup>
<optgroup label="Cardiac or vascular">
<option value="Cardiac surgery (high)">Cardiac surgery (high)</option>
<option value="Coronary angiography (low)">Coronary angiography (low)</option>
<option value="Permanent pacemaker or ICD placement (if patient is on apixaban, edoxaban, rivaroxaban, or dabigatran – mod, if on any other drugs - low)">Permanent pacemaker or ICD placement (if patient is on apixaban, edoxaban, rivaroxaban, or dabigatran – mod, if on any other drugs - low)</option>
<option value="Major vascular surgery (aortic aneurysm repair, aortofemoral bypass) (high)">Major vascular surgery (aortic aneurysm repair, aortofemoral bypass) (high)</option>
<option value="Other vascular surgery (mod)">Other vascular surgery (mod)</option>
</optgroup>

<optgroup label="Needle biopsy">
<option value="Kidney biopsy (high)">Kidney biopsy (high)</option>
<option value="Prostate biopsy (high)">Prostate biopsy (high)</option>
<option value="Cervical cone biopsy (high)">Cervical cone biopsy (high)</option>
<option value="Pericardiocentesis (high)">Pericardiocentesis (high)</option>
<option value="Colonic polypectomy (high)">Colonic polypectomy (high)</option>
<option value="Bone marrow biopsy (mod)">Bone marrow biopsy (mod)</option>
<option value="Lymph node biopsy (mod)">Lymph node biopsy (mod)</option>
<option value="Low-risk procedures (e.g. thoracentesis, paracentesis, arthrocentesis) (low)">Low-risk procedures (e.g. thoracentesis, paracentesis, arthrocentesis) (low)</option>

</optgroup>

<optgroup label="Urological">
<option value="Urological surgery (high)">Urological surgery (high)</option>

</optgroup>
<optgroup label="Urological">
<option value="Other general surgery (e.g. breast) (mod)">Other general surgery (e.g. breast) (mod)</option>
<option value="Extensive cancer surgery (high)">Extensive cancer surgery (high)</option>
</optgroup>


</select>

       {this.validator.message('', this.state.procedure, 'required')}
         </div>
      </div>
      <div className="col-6">
        <div className="form-group">
          <label htmlFor="usr">Date of Procedure</label>
          <input type="date" 
          id="date_of_procedure"
          className="form-control"  defaultValue={this.state.date_of_procedure} onChange={(e)=>this.setState({date_of_procedure:e.target.value})}
      />
           {this.validator.message('', this.state.date_of_procedure, 'required')}
            </div>
      </div>
    </div>

    <div className="row">
      <div className="col-4">
        <div className="form-group">
          <label htmlFor="usr">Age </label>
          <input type="number" 
           id="age"
          className="form-control"   defaultValue={this.state.age} onChange={(e)=>this.setState({age:e.target.value})}
      />
      {this.validator.message('', this.state.age, 'required')}
         </div>
      </div>

      <div className="col-4">
        <div className="form-group">
          <label htmlFor="usr">Sex </label>
          <select className="form-control" id="sex" 
         value={this.state.procedureSelected}
         onChange={event => this.handleChange_procedure(event.target.value)}
         >
 <option>Select Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
      </select>
    {this.validator.message('', this.state.procedureSelected, 'required')}
    
         </div>
      </div>
      <div className="col-2">
        <div className="form-group">
          <label htmlFor="usr">Weight</label>
          <input type="number" 
          id="weight"
          className="form-control"   defaultValue={this.state.weight} onChange={(e)=>this.setState({weight:e.target.value})}
      />
           {this.validator.message('', this.state.weight, 'required')}

           
            </div>
      </div>

      <div className="col-2">
        <div className="form-group">
          <label htmlFor="usr">Unit</label>
          <select className="form-control" id="weight_selected1"
            value={this.state.weightSelected}
            onChange={event => this.handleChange_weight(event.target.value)}
          >
            <option>Select Unit</option>
            <option>Pound</option>
            <option>KG</option>
          </select>
          {this.validator.message('unit_weight', this.state.weightSelected, 'required')}

           
            </div>
      </div>
    </div>

    <div className="row">
      <div className="col-12">
        <div className="form-group">
        <h4>Indication(s) for Anticoagulation </h4>
          <input type="text" className="form-control"  defaultValue={this.state.indication_for_anticoagulation} onChange={(e)=>this.setState({indication_for_anticoagulation:e.target.value})}
      id="indication_for_anticoagulation"
     />
      {this.validator.message('', this.state.indication_for_anticoagulation, 'required')}
         </div>
      </div>
 </div>

 <div className="row">
      <div className="col-12">
        <div className="form-group">
          <label htmlFor="usr">CHADS Score And Distribution </label>
          <input type="text" className="form-control"   defaultValue={this.state.chads_score_and_distribution} onChange={(e)=>this.setState({chads_score_and_distribution:e.target.value})}
     id="chads_score_and_distribution"
     />
       {this.validator.message('', this.state.chads_score_and_distribution, 'required')}
         </div>
      </div>
 </div>

 <div className="row">
      <div className="col-12">
        <div className="form-group">
        <h4>Anticoagulation Information </h4>
          <div
          
style={{ backgroundColor: "#8ebce0", paddingLeft: 20, paddingTop: 5, paddingBottom: 10}}
>

<h5 style={{ color: "white" }}> What Lab They Use  { this.state.lab_location_for_inr_test !== null ? <span className="text-right" style={{ color: "green" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ this.state.lab_location_for_inr_test} </span> : ''}<br/>
  </h5>
<h5 style={{ color: "white" }} className="text-center">Current Dosing </h5>
</div>
<div className="table-responsive">
      <table className="table table-striped text-center">
        <thead>
        </thead>
        <tbody>
      

        { this.state.pradaxa !== null ? <tr style={{ color: "white" }}> <td>{ this.state.pradaxa } </td>
  <td>{ this.state.pradaxa_dosage }</td>
  <td></td>
</tr> : ''}

{ this.state.xarelto !== null ? <tr style={{ color: "white" }}> <td>{ this.state.xarelto } </td>
  <td>{ this.state.xarelto_dosage }</td>
  <td>{ this.state.xarelto_dosage_time }</td>
</tr> : ''}

{ this.state.eliquis !== null ? <tr style={{ color: "white" }}> <td>{ this.state.eliquis } </td>
  <td>{ this.state.eliquis_dosage }</td>
  <td>{ this.state.eliquis_dosage_time }</td>
</tr> : ''}

{ this.state.edoxabon !== null ? <tr style={{ color: "white" }}> <td>{ this.state.edoxabon } </td>
  <td>{ this.state.edoxabon_dosage }</td>
  <td>{ this.state.edoxabon_dosage_time }</td>
</tr> : ''}
   
    </tbody>
      </table>

    
     
    </div>
         </div>
      </div>
 </div>

 <div className="row">
      <div className="col-12">
        <div className="form-group">
        <h4>Antiplatelet Information </h4>
          <div
style={{
  backgroundColor: "#8ebce0", paddingLeft: 20, paddingTop: 5, paddingBottom: 10
}}
>

<h5 style={{ color: "white" }}>Medical Dose /  Frequency</h5>

</div>
<div className="table-responsive">
      <table className="table table-striped text-center">
        <thead>
        </thead>
        <tbody>
        { this.aspirin !== null  ? <tr style={{ color: "white" }}> <td>{ this.state.aspirin } </td>
  <td>{ this.state.aspirin_dosage }</td>
  <td>{ this.state.aspirin_dosage_time }</td>
</tr> : ''}
{ this.state.brillinta !== null ? <tr style={{ color: "white" }}> <td>{ this.state.brillinta } </td>
  <td>{ this.state.brillinta_dosage }</td>
  <td>{ this.state.brillinta_dosage_timie }</td>
</tr> : ''}

{ this.state.effient !== null ? <tr style={{ color: "white" }}> <td>{ this.state.effient } </td>
  <td>{ this.state.effient_dosage }</td>
  <td>{ this.state.effient_dosage_time }</td>
</tr> : ''}

{ this.state.plavix !== null ? <tr style={{ color: "white" }}> <td>{ this.state.plavix } </td>
  <td>{ this.state.plavix_dosage }</td>
  <td>{ this.state.plavix_dosage_time }</td>
</tr> : ''}
      
{ this.state.not_using_drugs === '' ? <tr style={{ color: "white" }}> <td> N/A </td>
  <td>N/A</td>
  <td>N/A</td>
</tr> : ''}

     
        
        </tbody>
      </table>

    
     
    </div>
         </div>
      </div>
 </div>
 <h4>Recent Bloodwork</h4>
 <div className="row">
      <div className="col-6">
        <div className="form-group">
          <label htmlFor="usr">POC -INR </label>
          <div className="row">
          <div className="col-6">
          <input type="date" className="form-control" id="usr"  defaultValue={this.state.poc_inr} onChange={(e)=>this.setState({poc_inr:e.target.value})}
        id="poc_inr"
      />
            </div>
            <div className="col-6">
            <input type="text" className="form-control" id="usr"  defaultValue={this.state.poc_inr} onChange={(e)=>this.setState({poc_inr:e.target.value})}
        id="poc_inr"
      />
            </div>
            </div>
             {this.validator.message('', this.state.poc_inr, 'required')}
         </div>
      </div>

      <div className="col-6">
        <div className="form-group">
          <label htmlFor="usr">POC - CREAT </label>
    
        <div className="row">
          <div className="col-6">
          <input type="date" className="form-control"  defaultValue={this.state.poc_creat} onChange={(e)=>this.setState({poc_creat:e.target.value})}
     id="poc_creat"
     />
            </div>
            <div className="col-6">
            <input type="text" className="form-control"  defaultValue={this.state.poc_creat} onChange={(e)=>this.setState({poc_creat:e.target.value})}
     id="poc_creat"
     />
            </div>
            </div>
      {this.validator.message('', this.state.poc_creat, 'required')}
         </div>
      </div>
    
    </div>


    <div className="row">
      <div className="col-6">
        <div className="form-group">
          <label htmlFor="usr">Hb </label>

          <div className="row">
          <div className="col-6">
          <input type="date" id="hb" className="form-control"  defaultValue={this.state.hb} onChange={(e)=>this.setState({hb:e.target.value})}
      />
            </div>
            <div className="col-6">
            <input type="text" id="hb" className="form-control"  defaultValue={this.state.hb} onChange={(e)=>this.setState({hb:e.target.value})}
      />
            </div>
            </div>
       
       {this.validator.message('', this.state.hb, 'required')}
         </div>
      </div>

      <div className="col-6">
        <div className="form-group">
          <label htmlFor="usr">Plt </label>

          <div className="row">
          <div className="col-6">
          <input type="date" className="form-control"  defaultValue={this.state.plt} onChange={(e)=>this.setState({plt:e.target.value})}
      id="plt"
      />
            </div>
            <div className="col-6">
            <input type="text" className="form-control"  defaultValue={this.state.plt} onChange={(e)=>this.setState({plt:e.target.value})}
      id="plt"
      />
            </div>
            </div>

      
          {this.validator.message('', this.state.plt, 'required')}
         </div>
      </div>
    
    </div>

 
    <h4>Flags</h4>
    
    <div className="row">
      
      <div className="col-4">
      <div className="alert myDanger" role="alert">
      <span className="white"> Liver Dz</span>
</div>  

 <h6 className="text-center">{this.state.liver_disease }</h6>
      </div>

      <div className="col-4">
      <div className="alert myDanger" role="alert">
      <span className="white">  Transfusion in last 3 months</span>
      
</div>
<h6 className="text-center">{this.state.had_transfusion_in_last_three_months } at {this.state.had_transfusion_in_last_three_months_when }</h6>
     </div>
   
    <div className="col-4">
    <div className="alert myDanger" role="alert">
<span className="white"> Ulcer within last 3 months</span>

</div>
<h6 className="text-center">{this.state.ulcer_in_stomach_or_bowel_last_three_months }</h6>
      </div>
    </div>
    <br />
    <h6>Aditional Information</h6>
    <div className="row">

<div className="col-12">
  <div className="form-group">
    <label htmlFor="usr">Details on recomemendation</label>
    <input type="text" className="form-control"  defaultValue={this.state.details_on_recomemendation} onChange={(e)=>this.setState({details_on_recomemendation:e.target.value})}
  id="details_on_recomemendation"
/>
{this.validator.message('', this.state.details_on_recomemendation, 'required')}
      </div>
</div>
</div>
<div className="row">
      
      <div className="col-12">
      <span>Form completed by 
      <input type="text" className="form-control"  defaultValue={this.state.completed_by} onChange={(e)=>this.setState({completed_by:e.target.value})}
id="completed_by"
/>
</span> 

</div>
      
      </div>
    
   

<div className="row">
      <div className="col-12">
      <span>Understanding 
        
      <input type="text" className="form-control"  defaultValue={this.state.understanding} onChange={(e)=>this.setState({understanding:e.target.value})}
id="understanding"
/>
        </span> 
</div>
</div>

<div className="row">
      <div className="col-12">
      <span>Reviewed By <input type="text"
      id="reviewed_by"
      className="form-control"  defaultValue={this.state.reviewed_by} onChange={(e)=>this.setState({reviewed_by:e.target.value})}
/></span> 
{this.validator.message('', this.state.reviewed_by, 'required')}
</div>
</div>



    <br />
   
   
    <br />
    <div className="row">
      
      <div className="col-4">
      <Link to="/Nurse/Nurse2" className="btn btn-outline-primary  btn-block">
Back
</Link>
      
      </div>

      <div className="col-4">
     
      
     </div>
   
    <div className="col-4">
    <button onClick={this.submitForm} className="btn btn-primary btn-block">
Accept
</button>
      </div>
    </div>
  </div>

  <br />
  
</div>
</React.Fragment>
);


}
componentDidMount(){

}
}
export default Page3;