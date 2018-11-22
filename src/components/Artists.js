import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setToken, setSearch, setArtists, setSelectedArtist } from '../actions';
import { searchArtists } from '../api/spotify';
import { debounce } from '../api/utils';

import { Grid, Card } from 'semantic-ui-react';
import { ArtistCard } from './Cards';
import './Artists.css';

class Artists extends Component {
  handleChange = e => {
    this.props.onSetSearch(e.target.value);
    if (e.target.value) {
      searchArtists(this.props.token, e.target.value).then(data => {
        if (typeof data.error === 'undefined') {
          return this.props.onSetArtists(data.artists.items);
        } else if (data.error.status === 401) {
          // TODO : Improve user experience
          window.location.replace(window.location.origin);
        }
      });
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
      <Grid container className="artists" centered>
        <Grid.Row>
          <input
            className="artists-input"
            type="search"
            placeholder="Search for an artists..."
            value={this.props.search}
            onChange={this.handleChange}
          />
        </Grid.Row>
        <Grid.Row>
          <Card.Group className="ui four doubling stackable cards">
            {this.props.artists.map(artist => (
              <ArtistCard
                name={artist.name}
                image={
                  (artist.images.length &&
                    typeof artist.images[0].url != 'undefined' &&
                    artist.images[0].url) ||
                  'https://goo.gl/wTGLFL'
                }
                followers={artist.followers.total}
                popularity={artist.popularity}
                onClick={() => {
                  this.props.onSetSelectedArtist(artist.name);
                  this.props.history.push(`/albums/${artist.id}`);
                }}
                key={artist.id}
              />
            ))}
          </Card.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.token,
  search: state.session.search,
  artist: state.session.artist,
  artists: state.data.artists,
});

const mapDispatchToProps = dispatch => ({
  onSetToken: token => dispatch(setToken(token)),
  onSetSearch: search => dispatch(setSearch(search)),
  onSetSelectedArtist: artist => dispatch(setSelectedArtist(artist)),
  onSetArtists: debounce(artists => dispatch(setArtists(artists)), 500),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artists)
);
