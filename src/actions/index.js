export const setToken = token => ({
  type: 'SET_TOKEN',
  token,
});

export const setSearch = search => ({
  type: 'SET_SEARCH',
  search,
});

export const setArtists = artists => ({
  type: 'SET_ARTISTS',
  artists,
});

export const setSelectedArtist = artist => ({
  type: 'SET_SELECTED_ARTIST',
  artist,
});

export const setAlbums = albums => ({
  type: 'SET_ALBUMS',
  albums,
});
