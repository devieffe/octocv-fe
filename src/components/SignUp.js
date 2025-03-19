import React, { useState } from 'react';

const SignUp = () => {
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
        <h2>Sign up</h2>
        <p>Please fill in all the required fields.</p>
        <form onSubmit={handleSubmit}>
          
          <h3>Login info</h3>
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

          <h3>Personal data</h3>
          <div className='mb-3'>
          <label for="exampleInputEmail1" className="form-label">Your name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              maxLength="50"
              required
            />
          </div>
          <div class="mb-3">
          <label for="exampleInputEmail1" className="form-label">Your country</label>
            <select
              name="country"
              className="form-selected"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="1">Israel</option>
            </select>
          </div>

          <h3>Educational information</h3>
          <div className='mb-3'>
          <label for="exampleInputEmail1" className="form-label">Academic level
          </label>
            <input
              type="text"
              className="form-control"
              name="academlevel"
              placeholder=""
              value={formData.name}
              onChange={handleChange}
              maxLength="150"
              required
            />
          </div>
          <div className='mb-3'>
          <label for="exampleInputEmail1" className="form-label">Educational backgroud</label>
            <input
              type="text"
              className="form-control"
              name="edubg"
              placeholder=""
              value={formData.name}
              onChange={handleChange}
              maxLength="150"
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

export default SignUp;
