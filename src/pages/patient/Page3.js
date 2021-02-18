import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { server } from '../../utils/functions';
import { goBack } from '../../utils/user';
import ReactSpinner from 'react-bootstrap-spinner'



class Page3 extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="text-danger">{message}</div>
    });
     console.log(this.validator);
     
     this.state = { 
      user_id:localStorage.getItem('token'),
      q1_id:1,
      q1_ans:'',loader:''
      }
    
    this.submitForm = this.submitForm.bind(this);
    var element = document.getElementById("body");
    element.classList.add("blue-bg");

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
    try {
       axios.get('http://thrombolink.com/server/api/patient/page3LoadData',{
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

handleChange_weight(value) {
  this.setState({ weightSelected: value });
}


submitForm() {
  if (this.validator.allValid()) {
   // alert('You submitted the form and stuff!');
    console.log(this.state);
    this.page3(this.state);
   this.props.history.push('/User/Page4');
  } else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    // you can use the autoForceUpdate option to do this automatically`
    this.forceUpdate();
  }
}




page3(){

    var param={

      blood_clot_blood_thinner_interrupted:this.state.q1_ans
  }


server('patient/page3',param);

}

inputChangedHandler(e){
 
  console.log(this.state);
  
}



  render() {
   
return (
   
<React.Fragment>
<Header />
{this.state.loader===1?
<div className="centered"><ReactSpinner type="border" color="bg-primary" size="5"  /></div> :''
  }
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
      <h4 className="text-center blue">
        Have you had a blood clot while your blood thinner was interrupted?
      </h4>
      <br />
      <br />
      <label className="radio-inline blue">Yes</label>
      <input
        type="radio"
        name="optradio"
        id="optradio1"
        className="pull-right"
        onClick={(e)=>this.setState({q1_ans:'Yes'})} 
      />
      <br />
      <label className="radio-inline blue">No</label>
      <input
        type="radio"
        name="optradio"
        id="optradio2"
        className="pull-right"
        onClick={(e)=>this.setState({q1_ans:'No'})} 
      />
      <br />
      <label className="radio-inline blue">I do not know</label>
      <input
        type="radio"
        name="optradio"
        id="optradio3"
        className="pull-right"
        onClick={(e)=>this.setState({q1_ans:'I do not know'})} 
      />
       {this.validator.message('Question', this.state.q1_ans, 'required')}
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
}
export default Page3;