import { observer } from "mobx-react";
import { StyledHitButton } from "./button.styled";
import { ActionButtonProps } from "./button.types";

export const HitButton = observer((props: ActionButtonProps) => (
  <StyledHitButton data-disabled={props.disabled} {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </StyledHitButton>
));
