import "components/Button.scss";
import React from "react";
import classNames from "classnames";


export default function Button(props) {
   // use classNames function import from the dependency to generate the className string
   let buttonClass = classNames('button', { 'button--confirm': props.confirm, 'button--danger': props.danger })

   return (
      <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
   );
}
