const INITIAL_STATE = {
  artists: [],
  albums: [],
};

const data = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ARTISTS':
      return { ...state, artists: action.artists };
    case 'SET_ALBUMS':
      return { ...state, albums: action.albums };
    default:
      return state;
  }
};

export default data;
