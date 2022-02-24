import 'components/InterviewerList.scss'
import React from 'react';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {


  const interviewerArr = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem key={interviewer.id} avatar={interviewer.avatar} name={interviewer.name} selected={interviewer.id === props.value} setInterviewer={() => {
        props.onChange(interviewer.id)
      }} />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerArr}
      </ul>
    </section>
  );
};

export default InterviewerList;