const CLIENT_ID = '3ce2dd0949bb44b3aa6a907d0be4a074';
const REDIRECT_URI = `${window.location.origin}/artists`;
const LOGIN_URI = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&state=123`;

export { LOGIN_URI };
