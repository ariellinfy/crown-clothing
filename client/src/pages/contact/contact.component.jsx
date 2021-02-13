import React, { useState } from 'react';
import { connect } from 'react-redux';
import { contactStart } from '../../redux/contact/contact-actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './contact.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const ContactPage = ({ contactStart }) => {
    const [userMessage, setMessage] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const { name, email, message } = userMessage;
    
    const handleSubmit = async event => {
        event.preventDefault();
        contactStart({name, email, message});
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setMessage({ ...userMessage, [name]: value});
    };
    const address = <FontAwesomeIcon icon={faMapMarkerAlt} />
    const phone = <FontAwesomeIcon icon={faPhone} />
    const mail = <FontAwesomeIcon icon={faEnvelope} />
    const twitter = <FontAwesomeIcon icon={faTwitter} />
    const facebook = <FontAwesomeIcon icon={faFacebookSquare} />
    const instagram = <FontAwesomeIcon icon={faInstagram} />

    return (
        <div className='contact-page'>
            <h2 className='title'>Get In Touch</h2>
            <div className='form-container'>
                <form className='contact-form' onSubmit={handleSubmit}>
                    <FormInput
                        type='text'
                        name='name'
                        value={name}
                        handleChange={handleChange}
                        label='Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        handleChange={handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='text'
                        name='message'
                        value={message}
                        handleChange={handleChange}
                        label='Message'
                        required
                    />
                    <CustomButton type='submit' className='center'>Send Message</CustomButton>
                </form>
                <div className='more-contact'>
                    <div className='option'>
                        <span className='icon'>{address}</span>
                        <span className='block'>CROWN CLOTHINGS<br />
                        1234 Royal Street Suite #5678<br />
                        Calgary, AB A0B 1C2
                        </span>
                    </div>
                    <div className='option'>
                        <span className='icon'>{phone}</span>
                        <span className='block'>(123) 456-7890</span>
                    </div>
                    <div className='option'>
                        <span className='icon'>{mail}</span>
                        <span className='block'>information@crown.com</span>
                    </div>
                    <div className='option'>
                        <span className='icon'>{twitter}</span>
                        <span className='block'><a href='https://www.twitter.com/'>twitter.com/crown-clothings</a></span>
                    </div>
                    <div className='option'>
                        <span className='icon'>{facebook}</span>
                        <span className='block'><a href='https://www.facebook.com/'>facebook.com/crown-clothings</a></span>
                    </div>
                    <div className='option'>
                        <span className='icon'>{instagram}</span>
                        <span className='block'><a href='https://www.instagram.com/'>instagram.com/crown-clothings</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    contactStart: userMessage => dispatch(contactStart(userMessage))
});

export default connect(null, mapDispatchToProps)(ContactPage);



 






