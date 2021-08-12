const BASE_URL = 'http://localhost:8000/sudoku/profile/'

const getUserProfile = async (userID, token) => {

  let data= await fetch(BASE_URL + `${userID}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
  });
  let response = await data.json();
  return await response;
};

const updateUserProfile = async (userID, userDataObject, token) => {
  let data = await fetch(BASE_URL + `${userID}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    body: JSON.stringify(userDataObject),
  });
  let response = data.json();
  return await response;
}


export { getUserProfile, updateUserProfile }