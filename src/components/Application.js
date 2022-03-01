import "components/Application.scss";
import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";

// import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
// import useVisualMode from "hooks/useVisualMode";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

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
