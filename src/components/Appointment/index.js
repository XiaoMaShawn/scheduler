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
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVING = "ERROR_SAVING";
const ERROR_DELETING = "ERROR_DELETING";


const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVING, true));
  };

  function onEdit() {
    transition(EDIT)
  }

  function onDelete() {
    transition(CONFIRM);

  };

  function onConfirm() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETING, true));
  };

  function onCancel() {
    back();
  }



  return (

    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => {
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

      {mode === DELETING && <Status message={'Deleting'} />}

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

      {mode === ERROR_SAVING && (<Error
        message={'Could not book appointment'}
        onClose={onCancel}
      />)}

      {mode === ERROR_DELETING && (<Error
        message={'Could not delete appointment'}
        onClose={onCancel}
      />)}


    </article>

  );
};

export default Appointment;
