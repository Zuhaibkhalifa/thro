import axios from 'axios';
import $ from 'jquery';
import { domain } from './../App';

//

export const server = (url, param) => {
    var token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
    };

    axios
        .post(domain + '/api/' + url, param, {
            headers: headers,
        })
        .then((response) => {
            console.log('./function.js - Server func - Success response: ', response);
            return 'done';
        })
        .catch((err) => {
            // what now?
            console.log('./function.js - Server func - response Error: ', err);

            if (err.response) {
                console.log(
                    './function.js - Server func - response Error msg: ',
                    err.response.data.message
                );
                //   this.setState({errorMsg:err.response.data.message});
                // client received an error response (5xx, 4xx)
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
            return 'error';
        });

    //  return page;
};

export const getServer = async (url) => {
    var token = localStorage.getItem('token');
    console.log(token);

    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
    };
    try {
        return await axios
            .get(domain + '/api/' + url, {
                headers: headers,
            })
            .then((response) => {
                console.log(response);

                return 'done';
            });
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const showLoader = () => {
    // alert('q');
    $('#th_loader').html('<ReactSpinner type="border" color="white" size="5" className="" />');
};
export const hideLoader = () => {
    $('#th_loader').html('');
};
