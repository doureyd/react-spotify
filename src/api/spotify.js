const CLIENT_ID = '3ce2dd0949bb44b3aa6a907d0be4a074';
const REDIRECT_URI = `${window.location.origin}/artists`;
const LOGIN_URI = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&state=123`;

const searchArtists = (access_token, name) => {
  console.log(access_token, name);
  return fetch(
    `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=50&offset=0`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + access_token,
      },
    }
  ).then(resp => resp.json());
};

export { LOGIN_URI, searchArtists };
