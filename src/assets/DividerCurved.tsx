import * as React from "react";
export const DividerCurved = (props) => (
  <svg
    width={props.width}
    height={72}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 79L1556 29V0H0V79Z" fill={props.color} />
  </svg>
);
