import React, { useState } from 'react';
import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user-actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.style.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;
    
    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <FormInput 
                    name='email' 
                    type='email' 
                    value={email} 
                    label='Email'
                    handleChange={handleChange} 
                    required 
                />
                <FormInput 
                    name='password' 
                    type='password' 
                    value={password} 
                    label='Password'
                    handleChange={handleChange} 
                    required 
                />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);