import 'components/InterviewerListItem.scss'
import React from 'react';
import classNames from "classnames";


const InterviewerListItem = (props) => {

  let liClass = classNames('interviewers__item', { 'interviewers__item--selected': props.selected })

  // const clickHandler = (id) => {
  //   props.setInterviewer(id);
  // }
  // onClick={() => clickHandler(props.id)}>

  return (
    <li className={liClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ''}
    </li>
  )
};

export default InterviewerListItem;