import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden, selectCartItems } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user-actions';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.style';

const Header = ({ currentUser, hidden, signOutStart, cartItems }) => {
    const handleSignOut = () => {
        signOutStart({currentUser, cartItems});
    }
    
    return (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/contact'>CONTACT</OptionLink>
            {
                currentUser ?
                (<OptionLink as='div' onClick={handleSignOut}>SIGN OUT</OptionLink>)
                :
                (<OptionLink to='/signin'>SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
)}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
    cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
    signOutStart: userInfo => dispatch(signOutStart(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);