import { observer } from "mobx-react";
import { ActionButton } from "./button.styled";
import { ActionButtonProps } from "./button.types";

export const SurrenderButton = observer((props: ActionButtonProps) => (
  <ActionButton {...props}>
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </ActionButton>
));
