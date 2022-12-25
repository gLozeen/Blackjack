import styled from "@emotion/styled";

export const ActionButton = styled.div`
  font-weight: bold;
  user-select: none;
  height: 45px;
  width: 100px;
  background-color: #464e87;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: #4e568f;
      transform: scale(0.95);
    }
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
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const StyledHitButton = styled(ActionButton)`
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
`;

export const StyledStandButton = styled(ActionButton)`
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
  border-bottom-right-radius: 100%;
  border-bottom-left-radius: 100%;
`;

export const StyledBetButton = styled(ActionButton)`
  font-size: 24px;
  border-radius: 50%;
  height: 100px;
`;
