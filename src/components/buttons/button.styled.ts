import styled from "@emotion/styled";

export const ActionButton = styled.div`
height: 50px;
width: 50px;
background-color: #464e87;
border-radius: 5px;
cursor: pointer;
transition: 0.3s;
&:hover {
  background-color: #4e568f;
  transform: scale(0.9);
}
color: white;
display: flex;
justify-content: center;
align-items: center;
padding: 20%;
`;

export const Buttons = styled.div`
position: absolute;
bottom: -5%;
right: -40%;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 5px;
`;