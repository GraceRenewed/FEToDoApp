'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createCustomer, updateCustomer } from '../api/customerData';

// clears out the form after the user submits the form
const initialState = {
  name: '',
};

// pulls in user and object details
function UserProfileForm({ obj = initialState }) {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(initialState);
  const router = useRouter();

  // brings venue data in for editing the customer
  useEffect(() => {
    if (obj.userUid) setUserDetails(obj);
  }, [obj]);

  // Grants access to the customer object, destructing the name and the value of the form input
  const handleUserUpdate = (e) => {
    const { name, value } = e.target;
    // calling setCustomerDetails modifying prevState and spreading it
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // when submit button is pressed this function runs and prevents page from reloading
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...userDetails, id: user.id };
    // if the object already has an id then the updateCustomer function is called router pushes the updated information to the customer page-else it creates a new customer
    if (obj.id) {
      updateUser(payload).then(() => router.push(`/userProfiles`));
    } else {
      createUser(payload).then(() => {
        router.push(`/userProfiles`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} User Account</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Name" name="Name" value={userDetails.Name} onChange={handleUserUpdate} required />
      </FloatingLabel>

      <Button type="submit">{obj.id ? 'Update' : 'Create'} User Profile </Button>
    </Form>
  );
}

UserProfileForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default UserProfileForm;
