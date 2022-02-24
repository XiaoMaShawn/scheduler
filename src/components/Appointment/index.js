import './styles.scss'

import React from 'react';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error'
// import Form from './Form';

const Appointment = (props) => {
  return (

    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>

  );
};

export default Appointment;
