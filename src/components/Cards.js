import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export const ArtistCard = ({ image, name, followers, popularity, onClick }) => (
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
