import styled from 'styled-components';

export const Image = styled.img`
    width: 30vmin;
    height: 30vmin;

    @media (max-width: 600px) {
        width: 25vmin;
        height: 25vmin;
    }

    @media (max-width: 285px) {
        width: 20vmin;
        height: 20vmin;
    }

    @media (max-width: 190px) {
        display: none;
    }
`;
