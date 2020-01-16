import { seedData } from "./seed";

export const store = {
  state: {
    seedData
  },
  getActiveDay() {
    return this.state.seedData.find(day => day.active);
  },
  getEventObj(dayId, eventDetails) {
    return this.state.seedData
      .find(day => day.id === dayId)
      .events.find(event => event.details === eventDetails);
  },
  setActiveDay(dayId) {
    this.state.seedData.map(dayObj => {
      dayObj.active = dayObj.id == dayId ? true : false;
    });
  },
  submitEvent(eventDetails) {
    this.getActiveDay().events.push({
      details: eventDetails,
      edit: false
    });
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    this.getEventObj(dayId, eventDetails).edit = true;
  },
  resetEditOfAllEvents() {
    this.state.seedData.map(day => {
      day.events.map(event => {
        event.edit = false;
      });
    });
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.seedData.find(day => day.id === dayId);

    const eventIndex = dayObj.events.findIndex(
      event => event.details === eventDetails
    );

    dayObj.events.splice(eventIndex, 1);
  },
  updateEvent(dayId, originalEventDetails, newEventDetails) {
    const eventObj = this.getEventObj(dayId, originalEventDetails);
    eventObj.details = newEventDetails;
    eventObj.edit = false;
  }
};
