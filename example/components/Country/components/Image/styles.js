import styled from 'styled-components';

export const Image = styled.img`
    width: 35vmin;
    height: 35vmin;

    @media (max-width: 285px) {
        width: 20vmin;
        height: 20vmin;
    }

    @media (max-width: 190px) {
        display: none;
    }
`;
