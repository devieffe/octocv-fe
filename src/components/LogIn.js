import React, { useState } from 'react';

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    country: '',
    academlevel: '',
    edubg: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-form row justify-content-center">
      <div className="col-6 custom-container">
        <h2>Log in</h2>
        <p>Please fill in all the required fields.</p>
        <form onSubmit={handleSubmit}>
          
          <div className='mb-3'>
          <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="E-mail*"
              value={formData.email}
              onChange={handleChange}
              maxLength="50"
              required
            />
            </div>
            <div className='mb-3'>
             <label for="exampleInputEmail1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password*"
              value={formData.email}
              onChange={handleChange}
              maxLength="16"
              required
            />
          </div>
          <div className='mb-3'>
            <input type="submit" className="btn btn-dark" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
