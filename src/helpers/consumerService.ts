import axios from 'axios';
import store from '../store/index';

import { IApiMethod, IApiThrowResponse } from '../models/utilitiesModel';

export function serviceConsumer(tranId: string, ApiData: IApiMethod, body: any, returnFilter: string | null, Posttype: number = 0, AuthorizationKey: string = '') {

    if (ApiData) {

        console.log(tranId + '_body => ', body);
        if (body != null) {
            if (!(body instanceof FormData))
                body = JSON.parse(JSON.stringify(body).replace(/"\s+|\s+"/g, '"'));
            console.log(tranId + '_body after trim =>', body);
        }

        console.log(tranId + '_serviceConsumer=>', arguments.length, ApiData, body, returnFilter, Posttype);

        let url = ApiData.url;

        const axiosOptions = {
            headers: {
                "Content-Type": "application/json",
                "tranId": tranId
            }
        };
        let optionsdata;

        if (ApiData.type === 'GET') {
            optionsdata = {
                params: body,
                headers: AuthorizationKey === '' ? axiosOptions.headers : {
                    "Content-Type": "application/json",
                    "tranId": tranId
                }
            };

            return axios.get(url, optionsdata).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return returnFilter ? response.data[returnFilter] : response.data;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCrequest=>", err);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCelse", err);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });
        }
        else if (ApiData.type === "PUT") {
            Posttype = Posttype ? Posttype : 0;
            const axiosOptionsPUT = Posttype === 1 ? {
                headers: {
                    "tranId": tranId
                }
            } : axiosOptions;

            return axios.put(url, body, axiosOptionsPUT).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return returnFilter ? response.data[returnFilter] : response.data;;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCrequest=>", err.request);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCelse", err.message);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });

        }
        else if (ApiData.type === "POST") {
            Posttype = Posttype ? Posttype : 0;
            const axiosOptionsPOST = Posttype === 1 ? {
                headers: {
                    "tranId": tranId
                }
            } : axiosOptions;

            return axios.post(url, body, axiosOptionsPOST).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return returnFilter ? response.data[returnFilter] : response.data;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCrequest=>", err.request);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCelse", err.message);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });

        }
        else if (ApiData.type === "DELETE") {
            optionsdata = {
                params: body,
                headers: axiosOptions.headers
            };
            return axios.delete(url, optionsdata).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return returnFilter ? response.data[returnFilter] : response.data;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCrequest=>", err.request);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCelse", err.message);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });
        }
        else {
            let apiThrowResponse = { status: false, statuscode: 401, messages: 'rquest Urls type not found' } as IApiThrowResponse;
            throw apiThrowResponse;
        }


    }
    else {
        let apiThrowResponse = { status: false, statuscode: -1, messages: 'rquest Urls not found' } as IApiThrowResponse;
        throw apiThrowResponse;

    }

}

export function serviceConsumerWithHeaders(ApiData: IApiMethod, body: any) {


    if (ApiData) {

        console.log('body => ', body);
        if (body != null) {
            if (!(body instanceof FormData))
                body = JSON.parse(JSON.stringify(body).replace(/"\s+|\s+"/g, '"'));
            console.log('body after trim =>', body);
        }
        const axiosOptions = {
            headers: {
                "Content-Type": "application/json",
                //"Authorization": this.tokenInfo.tokenKey,
            }
        };
        let optionsdata;

        if (ApiData.type === 'GET') {
            optionsdata = {
                params: body,
                headers: axiosOptions.headers
            };
            return axios.get(ApiData.url, optionsdata).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCHresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCHrequest=>", err.request);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCHelse", err.message);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });
        }
        else if (ApiData.type === "PUT") {
            return axios.put(ApiData.url, body, axiosOptions).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCHresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCHrequest=>", err.request);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCHelse", err.message);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });
        }
        else if (ApiData.type === "POST") {
            return axios.post(ApiData.url, body, axiosOptions).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCHresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCHrequest=>", err.request);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCHelse", err.message);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });
        }
        else if (ApiData.type === "DELETE") {
            optionsdata = {
                params: body,
                headers: axiosOptions.headers
            };
            return axios.delete(ApiData.url, optionsdata).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                return response;
            }).catch(err => {
                if (err.response) {
                    // Request made and server responded
                    console.log("AxiosCatchSCHresponse=>", err.response);
                    let response = err.response.data;
                    let apiThrowResponse = { status: false, statuscode: response.status, messages: response.messages ? response.messages : (response.message ? response.message : 'ServerError'), error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log("AxiosCatchSCHrequest=>", err.request);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("AxiosCatchSCHelse", err.message);
                    let apiThrowResponse = { status: false, statuscode: 500, messages: 'ServerError', error: err } as IApiThrowResponse;
                    throw apiThrowResponse;
                }
            });
        }
        else {
            let apiThrowResponse = { status: false, statuscode: -1, messages: 'rquest Urls type not found' } as IApiThrowResponse;
            throw apiThrowResponse;
        }

    }
    else {
        let apiThrowResponse = { status: false, statuscode: -1, messages: 'rquest Urls not found' } as IApiThrowResponse;
        throw apiThrowResponse;

    }

}

