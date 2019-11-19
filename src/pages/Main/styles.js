import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6666' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const MessageError = styled.p`
  margin-top: 10px;
  color: #ff6666;
  font-weight: bold;
  font-size: 12px;
`;

const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }

  to{
      transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #6650ae;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;

      div {
        justify-content: center;
        align-items: center;
      }
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;

export const DeleteButton = styled.button`
  background: white;
  color: #ff6666;
  border: 0;
  margin-left: 10px;
  vertical-align: middle;
`;
