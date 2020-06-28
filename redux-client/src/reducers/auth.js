const initialState = {
    userData: {},
    token: ''
};

// const tokenUpdateReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case 'UPDATE_TOKEN':
//             state.token = action.payload.data;
//             return {...state};

//         default:
//             return state;
//     }
// }
  
const textChangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_TEXT":
            state.userData[action.payload.field] = action.payload.text;
            return {...state};

        case 'UPDATE_TOKEN':
            state.token = action.payload.data;
            return {...state};
        
        default:
            return state;    
    }
};

export default textChangeReducer