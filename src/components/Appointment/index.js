import './styles.scss'


import React from 'react';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error'
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("Clicked onAdd");
        transition(CREATE);

      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {
        console.log('cancel is clicked');
        back();
      }} />}
      {/* {{props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}} */}
    </article>

  );
};

export default Appointment;
