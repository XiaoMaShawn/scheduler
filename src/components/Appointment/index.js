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
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"

const Appointment = (props) => {

  console.log('Appointment Props', props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    // console.log('second interview here', interview);
    // console.log('id is here', props.id);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };

  function onEdit() {
    transition(EDIT)
  }

  function onDelete() {
    transition(CONFIRM);
    // props.cancelInterview(props.id)
    // console.log('id here', props.id);
    // transition(EMPTY);
  };

  function onConfirm() {
    props.cancelInterview(props.id)
    transition(EMPTY);
  };

  function onCancel() {
    back();
  }



  return (

    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => {
        // console.log("Clicked onAdd");
        transition(CREATE);
      }} />}

      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          save={save}
          onCancel={() => {
            back();
          }} />)}

      {mode === SAVING && <Status message={'Saving'} />}

      {mode === CONFIRM && <Confirm
        message={'Are you sure you would like to delete?'}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />}

      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        save={save}
        onCancel={() => {
          back();
        }}
      />}

      {/* {{props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}} */}
    </article>

  );
};

export default Appointment;
