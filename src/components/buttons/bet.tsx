import { observer } from "mobx-react";
import { StyledBetButton } from "./button.styled";
import { ActionButtonProps } from "./button.types";

export const BetButton = observer((props: ActionButtonProps) => (
  <StyledBetButton data-disabled={props.disabled} {...props}>
    Bet
  </StyledBetButton>
));
