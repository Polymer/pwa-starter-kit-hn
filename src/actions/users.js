export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const FAIL_USER = 'FAIL_USER';

export const fetchUser = (user) => (dispatch) => {
  if (user && !user.created_time && !user.isFetching) {
    dispatch(requestUser(user.id));
    return fetch(`https://node-hnapi.herokuapp.com/user/${user.id}`)
      .then(res => res.json())
      .then(data => dispatch(receiveUser(user.id, data)))
      .catch(() => dispatch(failUser(user.id)));
  }
};

const requestUser = (userId) => {
  return {
    type: REQUEST_USER,
    userId
  };
};

const receiveUser = (userId, data) => {
  return {
    type: RECEIVE_USER,
    userId,
    data
  };
};

const failuser = (userId) => {
  return {
    type: FAIL_USER,
    userId
  };
};
