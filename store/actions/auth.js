export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGiVKUJMXgC4OXkTo802x0Jtt7LEaQieE'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message = 'Algo deu errado!';
    
                if (errorId === 'EMAIL_EXISTS') {
                    message = 'Esse email já está cadastrado!';
                }
                throw new Error(message);
            }

        const resData = await response.json();
        console.log(resData);
        dispatch({ 
            type: SIGNUP,
            token: resData.idToken,
            userId: resData.localId
         });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGiVKUJMXgC4OXkTo802x0Jtt7LEaQieE'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Algo deu errado!';

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'Esse email não está cadastrado!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Senha inválida'
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({ 
            type: LOGIN,
            token: resData.idToken,
            userId: resData.localId
         });
    };
};