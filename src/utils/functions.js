import axios from 'axios';
import { logout } from './user/index';
import $ from 'jquery';
import ReactSpinner from 'react-bootstrap-spinner'
export const server = (url,param) => {
  var token=localStorage.getItem('token');
var page;
console.log(token);

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization' : 'Bearer ' + token
}


  axios.post('http://thrombolink.com/server/api/'+url, param, {
    headers: headers
  })

.then((response) => {
  console.log(response);

  return 'done';

}).catch(err => {
  // what now?
  console.log(err);
  if (err.response) {
    console.log(err.response.data.message);
 //   this.setState({errorMsg:err.response.data.message});
    // client received an error response (5xx, 4xx)
  } else if (err.request) {
    // client never received a response, or request never left
  } else {
    // anything else
  }
  return 'error';
})

  return page;
  
}


export const getServer = async (url) => {

  var token=localStorage.getItem('token');
  var page;
  console.log(token);
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : 'Bearer ' + token
  }
  try {
    return await axios.get('http://thrombolink.com/server/api/'+url,{
      headers: headers
    })
    .then((response) => {
      console.log(response);
    
      return 'done';
    
    })
  } catch (error) {
    console.error(error);
    return error;
   
  }
}

export const showLoader =  () => {
 // alert('q');
  $('#th_loader').html('<ReactSpinner type="border" color="white" size="5" className="" />');

}
export const hideLoader =  () => {
  $('#th_loader').html('');

}