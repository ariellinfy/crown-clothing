import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Open Sans Condensed';
        padding: 20px 60px 70px;

        @media screen and (max-width: 800px) {
            padding: 15px;
        }
    }

    a {
        text-decoration: none;
        color: black;
    }
`;