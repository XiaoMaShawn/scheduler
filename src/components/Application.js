import "components/Application.scss";
import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
// import Show from './Show';

import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
// import useVisualMode from "hooks/useVisualMode";


export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState((prev) => ({ ...prev, days }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        // console.log(response.data);
        setState({ ...state, appointments })
      })
    //you dont need the .catch part if you will have it in your save function(in your appointment index file ), same issues with the cancelInterview below
    // .catch(err => { console.log(err); })
  }


  function cancelInterview(id) {
    // console.log("second id", id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments })
      })
    // .catch(err => { console.log(err); })

  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ]).then((result) => {
      setState(prev => ({ ...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data }));

    })
  }, [])

  //use selector function to get the parsed appointments data
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log('appointments', dailyAppointments);

  //use selector function to get the parsed interviewers data
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  // console.log('interviewers', dailyInterviewers);

  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview)

    // console.log('interview here', interview);
    // console.log('appointment here', appointment);

    return (<Appointment
      {...appointment}
      key={appointment.id}
      interview={interview}
      interviewers={dailyInterviewers} bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />)
  });



  //example for a single axios.get request
  // useEffect(() => {
  //   axios.get('/api/days').then(respose => {
  //     // console.log(respose.data);
  //     // setDays(respose.data)
  //   })
  // }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
