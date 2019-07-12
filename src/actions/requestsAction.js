import axios from 'axios';

import
      
       { 
          GET_REQUESTS,
          GET_REQUESTBYNO,
          GET_LASTRISNO,
          REQUESTS_LOADING,
          REQUEST_LOADING,
          ADD_REQUEST,
          REQUEST_ADDING,
          UPDATE_REQUEST
       }
      
       from './../types/requestsTypes';

export const getRequests = (officeName, xauthtoken) => dispatch => {

    dispatch(setRequestsLoading());

    let config = {
        headers: {
          'x-auth-token': xauthtoken,
        }
    }

    axios.get(`http://localhost:7777/opstocks/api/request/office/${officeName}`,  config)
      .then(res => dispatch({
          type: GET_REQUESTS,
          payload: res.data
      }))
      .catch((err) => {
          alert('Something went wrong... ' + err);
      })
}

export const getRISLastNo = (xauthtoken) => dispatch => {

    dispatch(getRISLastNo());

    let config = {
      headers: {
        'x-auth-token': xauthtoken,
      }
    }

    axios.get('http://localhost:7777/opstocks/api/request/lastno', config)
      .then(res => dispatch({
          type: GET_LASTRISNO,
          payload: res.data
      }))
      .catch((err) => {
          alert('Something went wrong... ' + err);
      })
}

export const addRequest = (officeName,
                           newRISNo,
                           arrayOfItems,
                           isRequestSubmittedAlready,
                           xauthtoken) => dispatch => {

    dispatch(setRequestAdding());
    
    let config = {
        headers: {
          'x-auth-token': xauthtoken,
        }
    }

    axios.post('http://localhost:7777/opstocks/api/request',
    {
         requestNo: newRISNo,
         reqOffice: officeName,
         items: arrayOfItems,
         wasInitiallyUpdated: false,
         isRequestSubmittedAlready,
         isRequestCompletedAndServed: false
    }, 
    
      config
      
    ).then(res => dispatch({
         type: ADD_REQUEST,
         payload: res.data
    }))
    .catch((err) => {
         alert('Something went wrong... ' + err)
   })

}

export const updateRequest = (items, requestNo, xauthtoken) => dispatch => {

    dispatch(setRequestUpdating());

    let config = {
      headers: {
        'x-auth-token': xauthtoken,
      }
    }

    axios.put(`http://localhost:7777/opstocks/api/request/no/${requestNo}`,
    {
      items
    },

      config

    ).then(res => dispatch({
        type: UPDATE_REQUEST,
        payload: res.data
    }))
    .catch((err) => {
        alert('Something went wrong... ' + err)
    })

}




export const setRequestsLoading = () => { 
    return {
       type: REQUESTS_LOADING
    }
}

export const setRequestLoading = () => { 
  return {
     type: REQUEST_LOADING
  }
}

export const setRequestAdding = () => { 
    return {
       type: REQUEST_ADDING
    }
}

export const getRequestLastNo = () => {
    return {
       type: GET_LASTRISNO  
    }  
}

export const setRequestUpdating = () => {
    return {
      type: UPDATE_REQUEST
    }
}

