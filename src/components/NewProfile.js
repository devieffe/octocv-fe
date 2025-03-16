import React, { useState } from 'react';

const ContactForm = () => {
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
    <div className="contact-form">
      <div>
        <h2>Sign up</h2>
        <p>Please fill in all the required fields.</p>
        <form onSubmit={handleSubmit}>
          <h3>Login info</h3>
          <div>
            <input
              type="email"
              className="input1"
              name="email"
              placeholder="E-mail*"
              value={formData.email}
              onChange={handleChange}
              maxLength="50"
              required
            />
            <label htmlFor="email" className="label2">E-mail*</label>
          </div>
          <div>
            <input
              type="password"
              className="input2"
              name="password"
              placeholder="Password*"
              value={formData.email}
              onChange={handleChange}
              maxLength="16"
              required
            />
            <label htmlFor="email" className="label2">Password*</label>
          </div>

          <h3>Personal data</h3>
          <div>
            <input
              type="text"
              className="input1"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              maxLength="50"
              required
            />
            <label htmlFor="name" className="label1">Name*</label>
          </div>
          <div className="select">
            <select
              name="country"
              className="input3"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="1">Israel</option>
            </select>
            <label htmlFor="subject" className="label3">Country*</label>
          </div>

          <h3>Educational information</h3>
          <div>
            <input
              type="text"
              className="input1"
              name="academlevel"
              placeholder="Academic level*"
              value={formData.name}
              onChange={handleChange}
              maxLength="150"
              required
            />
            <label htmlFor="name" className="label1">Academic level*</label>
          </div>
          <div>
            <input
              type="text"
              className="input1"
              name="edubg"
              placeholder="Educational backgroud*"
              value={formData.name}
              onChange={handleChange}
              maxLength="150"
              required
            />
            <label htmlFor="name" className="label1">Educational backgroud*</label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
