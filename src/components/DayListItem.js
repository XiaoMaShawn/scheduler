import "components/DayListItem.scss"
import React from "react";
import classNames from "classnames";

const DayListItem = function(props) {

  const onClick = () => { props.setDay(props.name) };

  //set the className for <li>
  let liClass = classNames('day-list__item', { 'day-list__item--selected': props.selected, 'day-list__item--full': !props.spots })

  //make a function to format the 'spots remaining' result
  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots';
    }
    if (spots === 1) {
      return '1 spot';
    }
    return `${spots} spots`;
  }

  return (
    <li data-testid='day' onClick={onClick} className={liClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}

export default DayListItem;