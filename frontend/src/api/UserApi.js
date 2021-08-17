const login = (userObject) => {
  try
  {   return fetch('http://localhost:8000/token_auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }).then(res => res)
  }
  catch (err) {
    console.error(err);
    return null;
  }
};

const getLoggedInUser = (token) => {
  try {
     return fetch('http://localhost:8000/core/current_user/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    }
   }).then(res => res)
  }
  catch (err) {
    console.error(err);
    return null;
  }
 
};

const signupUser = (userObject) => {
  try {
    return fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
     }).then(res => res)
  }

  catch (err) {
    console.error(err);
    return null;
  }
};

export { login, getLoggedInUser, signupUser }

