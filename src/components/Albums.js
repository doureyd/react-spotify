import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, setAlbums } from '../actions';
import { searchArtistAlbums } from '../api/spotify';
import { AlbumCard } from './Cards';

import { Grid, Card, Header, Container } from 'semantic-ui-react';

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
      <Container style={{ paddingTop: '50px' }}>
        <Grid container className="albums">
          <Grid.Column>
            <Header as="h2">{this.props.artist}</Header>
            <Header
              as="h3"
              disabled
              style={{ marginTop: '0px', marginBottom: '40px' }}
            >
              Albums
            </Header>
            <Card.Group className="ui four doubling stackable cards">
              {this.props.albums.map(album => (
                <AlbumCard
                  name={album.name}
                  image={
                    (album.images.length &&
                      typeof album.images[0].url != 'undefined' &&
                      album.images[0].url) ||
                    'https://goo.gl/wTGLFL'
                  }
                  artists={album.artists.map(artist => artist.name).join(', ')}
                  date={album.release_date}
                  tracks={album.total_tracks}
                  onClick={() => window.open(album.external_urls.spotify)}
                  key={album.id}
                />
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.token,
  albums: state.data.albums,
  artist: state.session.artist,
});

const mapDispatchToProps = dispatch => ({
  onSetToken: token => dispatch(setToken(token)),
  onSetAlbums: albums => dispatch(setAlbums(albums)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);
