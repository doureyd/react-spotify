import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, setSearch, setArtists } from '../actions';
import { searchArtists } from '../api/spotify';

class Artists extends Component {
  handleChange = e => {
    this.props.onSetSearch(e.target.value);
    if (e.target.value) {
      searchArtists(this.props.token, e.target.value).then(data =>
        this.props.onSetArtists(data.artists.items)
      );
    } else {
      this.props.onSetArtists([]);
    }
  };
  componentWillMount() {
    if (!this.props.token) {
      const token = window.location.hash.match(/#(?:access_token)=([\S\s]*?)&/);
      if (token) {
        this.props.onSetToken(token[1]);
      } else {
        window.location.replace(window.location.origin);
      }
    }
  }
  render() {
    return (
      <div className="artists">
        <div>
          <input
            type="search"
            placeholder="Search for an artists..."
            value={this.props.search}
            onChange={this.handleChange}
          />
        </div>
        <div>
          {this.props.artists.map(artist => (
            <div key={artist.id}>{artist.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.token,
  search: state.session.search,
  artists: state.data.artists,
});

const mapDispatchToProps = dispatch => ({
  onSetToken: token => dispatch(setToken(token)),
  onSetSearch: search => dispatch(setSearch(search)),
  onSetArtists: artists => dispatch(setArtists(artists)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Artists);
