import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';

const ArtistCard = ({ image, name, followers, popularity, onClick }) => (
  <Card onClick={onClick}>
    {image && <Image src={image} />}
    <Card.Content className="card-content">
      <Card.Header textAlign="left">{name}</Card.Header>
      <Card.Meta textAlign="left">
        <span>{followers} followers</span>
      </Card.Meta>
      <Card.Description />
    </Card.Content>
    <Card.Content textAlign="left" extra>
      {Stars(popularity)}
    </Card.Content>
  </Card>
);

const AlbumCard = ({ image, name, artists, date, tracks, onClick }) => (
  <Card>
    {image && <Image src={image} />}
    <Card.Content className="card-content">
      <Card.Header textAlign="left">{name}</Card.Header>
      <Card.Meta textAlign="left">
        <span>{artists}</span>
      </Card.Meta>
      <Card.Description />
    </Card.Content>
    <Card.Content textAlign="left" extra>
      <div className="date">{date}</div>
      <div>{tracks} tracks</div>
    </Card.Content>
    <Card.Content extra onClick={onClick}>
      <Button fluid color="green" icon labelPosition="right">
        Preview on Spotify
        <Icon name="spotify" />
      </Button>
    </Card.Content>
  </Card>
);

const Stars = popularity => {
  let stars = [];
  let nbStars = Math.floor(popularity / 20);
  for (let i = 0; i < 5; i++) {
    if (i < nbStars) {
      stars.push(<i key={i} className="large orange star icon active" />);
    } else {
      stars.push(
        <i key={i} className="large orange star outline icon active" />
      );
    }
  }
  return <div>{stars}</div>;
};

export { ArtistCard, AlbumCard };
