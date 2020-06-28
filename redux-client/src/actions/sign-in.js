import { successMessage, failurMessage } from './common-actions';

export const tokenUpdate = (data) => {
  return {
      type: 'UPDATE_TOKEN',
      payload: {
          data: data,
      }
  }
}

export const submit = (userData) => {
    return (dispatch) => {
        const url = 'http://localhost:8000/api/sign-in';
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 
                email: userData.signInEmail,
                password: userData.signInPassword
            }),
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'Login successful') {
                let actions = [tokenUpdate(jsonData.accessToken), successMessage(jsonData.message)]
                return actions.map(item => {
                    return dispatch(item);
                })
            }
            else if (jsonData.message === 'Password incorrect') {
                return dispatch(failurMessage(jsonData.message));
            }
            else if (jsonData.message === 'User not exist') {
                return dispatch(failurMessage(jsonData.message));
            }
            
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Please try again!'));
        }) 
    }
}
