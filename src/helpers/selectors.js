
export function getAppointmentsForDay(state, day) {

  if (!state.days || !day) {
    return [];
  }

  //... returns an array of appointments for that day
  //the filter give back an array, so you need the index for it even if there is only one element in the new array
  // const objOfDay = state.days.filter((singleDay) => singleDay.name === day)[0];
  const objOfDay = state.days.find((singleDay) => singleDay.name === day);

  if (!objOfDay) {
    return [];
  }

  const appId = objOfDay.appointments;

  let result = appId.map((id) => {
    if (state.appointments[id]) {
      return state.appointments[id];

    }
    return [];
  });
  return result;

};

export function getInterviewersForDay(state, day) {

  if (!state.days || !day) {
    return [];
  }

  const objOfDay = state.days.find((singleDay) => singleDay.name === day);

  if (!objOfDay) {
    return [];
  }

  const interviewersId = objOfDay.interviewers;

  let result = interviewersId.map((id) => {
    if (state.interviewers[id]) {
      return state.interviewers[id];
    }
    return [];
  });
  return result;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const id = interview.interviewer;
  const interviewerData = state.interviewers[id];
  return ({ ...interview, interviewer: interviewerData })
}