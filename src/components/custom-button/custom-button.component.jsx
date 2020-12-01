import React from 'react';
import { CustomButtonContainer } from './custom-button.style';

const CustomButtom = ({children, ...otherProps}) => (
    <CustomButtonContainer {...otherProps}>
        {children}
    </CustomButtonContainer>
);

export default CustomButtom;