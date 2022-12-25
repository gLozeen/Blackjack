import { observer } from "mobx-react";
import { StyledStandButton } from "./button.styled";
import { ActionButtonProps } from "./button.types";

export const StandButton = observer((props: ActionButtonProps) => (
  <StyledStandButton data-disabled={props.disabled} {...props}>
    Stand
  </StyledStandButton>
));
