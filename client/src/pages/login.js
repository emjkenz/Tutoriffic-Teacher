import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Row, Col } from 'antd';
import { useMutation } from '@apollo/client';


const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData }
      });

      if (!data.loginUser) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await data.loginUser;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }


  setUserFormData({
    username: '',
    email: '',
    password: '',
    });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', marginTop: '-200px' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={styles.loginSignupBox}>
          <Link to="/signup">← Go to Signup</Link>
          <h2 style={styles.loginSignupHeading}>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div style={styles.formRow}>
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
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

export default LoginForm;