const initialState = {
    userInfo: {},
    userList: [],
    messages: [],
    sender_id: '',
    receiver_id: 25,
    messageToSend: '',
    searchList: []
  };
  
const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER_INFO":
            state.userInfo = {...action.payload.data}
            return {...state};
        
        case "USER_LIST":
            state.userList = [...action.payload.data]
            return {...state};

        case "SEARCH_LIST":
            state.searchList = [...action.payload.data]
            return {...state};
    

        case "GET_MESSAGE":
            state.messages = [...action.payload.data]
            return {...state};

        case "GET_SENDER":
            state.sender_id = action.payload.data
            return {...state};
        
        case "GET_RECEIVER":
            state.receiver_id = action.payload.data
            return {...state};

        case "CHANGE_MESSAGE":
            state.messageToSend = action.payload.data
            return {...state};
    
        default:
            return state;    
    }
};

export default userInfoReducer;