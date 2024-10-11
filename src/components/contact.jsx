import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const initialState = {
  first_name: "",
  last_name: "",
  email_address: "",
  phone_number: "",
  message: "",
};
export const Contact = (props) => {
  const [{ first_name, last_name, email_address, phone_number, message }, setState] = useState(initialState);
  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(first_name, last_name, email_address, phone_number, message);    
    
    emailjs.send('service_1qz6r98', 'template_ftqv0s1', {
      to_name: 'CareOne Concierge',
      from_name: 'Patients',
      message_html: `
        <h1>Welcome to Our Service!</h1>
        <p>We're glad to have you onboard. This email will never change!</p>
      `,
      reply_to: 'flydev515@gmail.com',
    }, '2FaN7pA8DkiC9oU9r')
    .then((result) => {
      console.log('Email sent:', result.text);
    }, (error) => {
      console.log('Error:', error.text);
    });

  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2 className="text-[17px]">Contact Us</h2>
                <p className="text-[18px]">
                  Today and one of our clinical team will respond to you right away and answer your questions.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                        placeholder="First Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email_address"
                    name="email_address"
                    className="form-control"
                    placeholder="Email Address"
                    required
                    onChange={handleChange}
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                    onChange={handleChange}
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="flex">
                  <FormControlLabel
                    label="I am currently a Medicare or Medicare Advantage member"
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheck}
                        sx={{ 
                          transform: 'scale(1.5)', // Resize the checkbox
                        }}
                        color="default"
                      />
                    }
                    sx={{
                      '.MuiFormControlLabel-label': {
                        fontSize: '18px', // Change label font size
                      },
                    }}
                  />
                </div>
                <div className="mb-5">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"
                      sx={{ fontSize: '18px', color: 'white' }}
                    >
                      I would like more information and I would like to be contacted by (Choose One):
                    </FormLabel>
                    <div className="ml-[127px]">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ 
                          transform: 'scale(1.5)', // Resize the checkbox
                        }}
                        color="default"
                      >
                        <FormControlLabel value="email" control={<Radio />} label="Email" />
                        <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                      </RadioGroup>
                    </div>
                  </FormControl>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                    maxLength={255}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg" disabled={!checked}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3 className="text-[17px] font-bold">Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.linkedin : "/"}>
                      <i className="fa fa-linkedin-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.instagram : "/"}>
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            Copyright © 2024 CareONE Concierge – All Rights Reserved{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
