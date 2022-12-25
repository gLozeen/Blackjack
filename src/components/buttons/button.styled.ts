import styled from "@emotion/styled";

export const ActionButton = styled.div`
  user-select: none;
  height: 42px;
  width: 42px;
  background-color: #464e87;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: #4e568f;
      transform: scale(0.9);
    }
  }

  &[data-disabled="true"] {
    pointer-events: none;
    cursor: none;
    background-color: rgb(40, 45, 81);
  }

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20%;
`;

export const Buttons = styled.div`
  position: absolute;
  bottom: 2%;
  right: 2%;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

export const StyledHitButton = styled(ActionButton)`
  border-top-left-radius: 60%;
  border-top-right-radius: 30%;
  border-bottom-left-radius: 30%;
`;

export const StyledStandButton = styled(ActionButton)`
  border-bottom-left-radius: 60%;
  border-top-left-radius: 30%;
  border-bottom-right-radius: 30%;
`;

export const StyledBetButton = styled(ActionButton)`
  border-top-left-radius: 30%;
  border-top-right-radius: 60%;
  border-bottom-right-radius: 30%;
`;
