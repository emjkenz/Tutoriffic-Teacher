import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Row, Col } from 'antd';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', marginTop: '-115px' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={styles.loginSignupBox}>
          <Link to="/login">← Go to Login</Link>
          <h2 style={styles.loginSignupHeading}>Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div style={styles.formRow}>
              <label htmlFor="firstName">First Name:</label>
              <input
                placeholder="First"
                name="firstName"
                type="text"
                id="firstName"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <label htmlFor="lastName">Last Name:</label>
              <input
                placeholder="Last"
                name="lastName"
                type="text"
                id="lastName"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <label htmlFor="email">Email:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
}

const styles = {
  loginSignupBox: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
  loginSignupHeading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  formRow: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default Signup;


