'use client';

import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-duplicates
import Button from 'react-bootstrap/card';
// eslint-disable-next-line import/no-duplicates
import Card from 'react-bootstrap/card';
import Link from 'next/link';

function UserCard({ usersObj }) {
  const { user } = useAuth();

  const isOwner = !usersObj.id || usersObj.id === user.id;

  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={usersObj.imageUrl} alt={usersObj.artist} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {usersObj.name}
        </Card.Title>

      </Card.Body>
    </Card>
  );
}

UserCardCard.propTypes = {
  usersObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default UserCard;
