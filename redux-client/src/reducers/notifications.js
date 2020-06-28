const initialState = {
    notifications: {}
  };
  
const notifications = (state = initialState, action) => {
    switch (action.type) {
        case "ERROR":
            state.notifications = {...action.payload}
            return {...state};
        
        case "SUCCESS":
            state.notifications = {...action.payload}
            return {...state};
        
        default:
            return state;    
    }
};

export default notifications;