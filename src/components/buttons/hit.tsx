import { observer } from "mobx-react";
import { StyledHitButton } from "./button.styled";
import { ActionButtonProps } from "./button.types";

export const HitButton = observer((props: ActionButtonProps) => (
  <StyledHitButton data-disabled={props.disabled} {...props}>
    Hit
  </StyledHitButton>
));
