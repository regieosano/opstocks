import
      
       { 
          GET_REQUESTS,
          GET_LASTRISNO,
          ADD_REQUEST,
          UPDATE_REQUEST
       }
      
       from './../types/requestsTypes';

const initialState = {

        requests: [],
        items: [],
        lastRISNo: null,
        loading: true,
        adding: true,
        updating: true 
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REQUESTS:
            return {
                ...state,
                requests: action.payload,
                loading: false
            };
   
        case ADD_REQUEST:
            return {
                ...state,
                requests: [action.payload, ...state.requests],
                adding: false
            }
        case GET_LASTRISNO:
            return {
                ...state,
                lastRISNo: action.payload,
                loading: false
            }
        case UPDATE_REQUEST:
            return {
                ...state,
                items: action.payload,
                updating: false
            }  
      
        default:
            return state;
    }
}