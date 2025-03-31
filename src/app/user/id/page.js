'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getUserDetails } from '../../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import UserCard from '../../../components/UserCard';

export default function ViewUserPage() {
  // *set state for events
  const [users, setUsers] = useState([]);

  const { user } = useAuth();

  // *function to get all users
  const getAllTheUsers = () => {
    getAllUsers(user.id).then(setUsers);
    console.log(user.id);
  };

  // *make api call to get users
  useEffect(() => { 
    getAllTheUsers();
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/events/edit/new" passHref>
        <Button>Add User</Button>
      </Link>
      <div className="d-flex flex-wrap">{users.length === 0 ? <h2>You have not created any events</h2> : users.map((event) => <UserCard key={user.id} usersObj={event} onUpdate={getAllTheUsers} />)}</div>
    </div>
  );
}
