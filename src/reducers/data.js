const INITIAL_STATE = {
  artists: [],
};

const data = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ARTISTS':
      return { ...state, artists: action.artists };
    default:
      return state;
  }
};

export default data;
