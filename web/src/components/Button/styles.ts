import Styled from 'styled-components';
import { shade } from 'polished';

export const Container = Styled.button`
    background: #FF9000;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    width: 100%;
    color: #312e38;
    height: 56px;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }
`;