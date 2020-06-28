import { successMessage, failurMessage } from './common-actions';

export const submit = (userData) => {
    return (dispatch) => {
        const url = 'http://localhost:8000/api/sign-up';
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 
                first_name: userData.signUpFirstName,
                last_name: userData.signUpLastName,
                email: userData.signUpEmail,
                password: userData.signUpPassword
            }),
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'Account created successfully') {
                return dispatch(successMessage(jsonData.message));
            }
            else if (jsonData.message === 'Email already in use') {
                return dispatch(failurMessage(jsonData.message));
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Please try again!'));
        }) 
    }
}
