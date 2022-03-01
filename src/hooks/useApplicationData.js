import React, { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ]).then((result) => {
      setState(prev => ({ ...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data }));

    })
  }, [])

  console.log('original state', state);

  const setDay = day => setState({ ...state, day });


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const oldAppointment = state.appointments[id].interview
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        if (!oldAppointment) {
          day.spots--;
        }
      }
      return day;
    })

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState({ ...state, appointments, days })
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

    const oldAppointment = state.appointments[id].interview
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        if (oldAppointment) {
          day.spots++;
        }
      }
      return day;
    })


    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days })
      })
    // .catch(err => { console.log(err); })

  }



  return ({
    state,
    setDay,
    bookInterview,
    cancelInterview
  })
};

export default useApplicationData;