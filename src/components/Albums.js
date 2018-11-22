import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, setAlbums } from '../actions';
import { searchArtistAlbums } from '../api/spotify';

class Albums extends Component {
  componentWillMount() {
    if (!this.props.token) {
      const token = window.location.hash.match(/#(?:access_token)=([\S\s]*?)&/);
      if (token) {
        this.props.onSetToken(token[1]);
      } else {
        window.location.replace(window.location.origin);
      }
    }
    searchArtistAlbums(this.props.token, this.props.match.params.id).then(
      data => {
        if (typeof data.error === 'undefined') {
          return this.props.onSetAlbums(data.items);
        } else if (data.error.status === 401) {
          // TODO : Improve user experience
          window.location.replace(window.location.origin);
        }
      }
    );
  }
  render() {
    return (
      <div className="albums">
        {this.props.albums.map(albums => (
          <div key={albums.id}>{albums.name}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.token,
  albums: state.data.albums,
});

const mapDispatchToProps = dispatch => ({
  onSetToken: token => dispatch(setToken(token)),
  onSetAlbums: albums => dispatch(setAlbums(albums)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);
