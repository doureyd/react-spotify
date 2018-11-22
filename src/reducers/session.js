const INITIAL_STATE = {
  token: null,
  search: '',
};

const session = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ARTIST':
      return { ...state, artist: action.artist };
    case 'SET_TOKEN':
      return { ...state, token: action.token };
    case 'SET_SEARCH':
      return { ...state, search: action.search };
    default:
      return state;
  }
};

export default session;
