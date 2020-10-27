import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import ModalDay from '../Modal/ModalDay';
import ModalEvent from '../Modal/ModalEvent';
//import { getDays } from './getDays';
import Context from '../../context';

import './Calendar.scss';
import '../Modal/Modal.scss';
import '../Events/Events.scss';
import '../Form/Form.scss';

//let days = getDays();

//console.log(days);

class Calendar extends React.Component {
  state = {
    days: [{ day: 28, month: 8, year: 2020, id: "28.8.2020" },
           { day: 29, month: 8, year: 2020, id: "29.8.2020" },
           { day: 30, month: 8, year: 2020, id: "30.8.2020" },
           { day: 1, month: 9, year: 2020, id: "1.9.2020" },
           { day: 2, month: 9, year: 2020, id: "2.9.2020" },
           { day: 3, month: 9, year: 2020, id: "3.9.2020" },
           { day: 4, month: 9, year: 2020, id: "4.9.2020" },
           { day: 5, month: 9, year: 2020, id: "5.9.2020" },
           { day: 6, month: 9, year: 2020, id: "6.9.2020" },
           { day: 7, month: 9, year: 2020, id: "7.9.2020" },
           { day: 8, month: 9, year: 2020, id: "8.9.2020" },
           { day: 9, month: 9, year: 2020, id: "9.9.2020" },
           { day: 10, month: 9, year: 2020, id: "10.9.2020" },
           { day: 11, month: 9, year: 2020, id: "11.9.2020" },
           { day: 12, month: 9, year: 2020, id: "12.9.2020" },
           { day: 13, month: 9, year: 2020, id: "13.9.2020" },
           { day: 14, month: 9, year: 2020, id: "14.9.2020" },
           { day: 15, month: 9, year: 2020, id: "15.9.2020" },
           { day: 16, month: 9, year: 2020, id: "16.9.2020" },
           { day: 17, month: 9, year: 2020, id: "17.9.2020" },
           { day: 18, month: 9, year: 2020, id: "18.9.2020" },
           { day: 19, month: 9, year: 2020, id: "19.9.2020" },
           { day: 20, month: 9, year: 2020, id: "20.9.2020" },
           { day: 21, month: 9, year: 2020, id: "21.9.2020" },
           { day: 22, month: 9, year: 2020, id: "22.9.2020" },
           { day: 23, month: 9, year: 2020, id: "23.9.2020" },
           { day: 24, month: 9, year: 2020, id: "24.9.2020" },
           { day: 25, month: 9, year: 2020, id: "25.9.2020" },
           { day: 26, month: 9, year: 2020, id: "26.9.2020" },
           { day: 27, month: 9, year: 2020, id: "27.9.2020" },
           { day: 28, month: 9, year: 2020, id: "28.9.2020" },
           { day: 29, month: 9, year: 2020, id: "29.9.2020" },
           { day: 30, month: 9, year: 2020, id: "30.9.2020" },
           { day: 31, month: 9, year: 2020, id: "31.9.2020" },
           { day: 1, month: 10, year: 2020, id: "1.10.2020" }],
    events: new Map(),

    flagDay: false,
    flagEvent: false,
    flagEdit: false,

    id: '',
    eventIndex: null,

    time: '',
    title: '',
    members: '',
    text: '',

    timeEdit: '',
    titleEdit: '',
    membersEdit: '',
    textEdit: ''
  };

  on = {
    day: {
      show: (id) => this.setState({ flagDay: true, id: id }),
      hide: () => this.setState({ flagDay: false })
    },
    event: {
      show: (id, eventIndex) => this.setState({ flagEvent: true, flagEdit: false, id: id, eventIndex: eventIndex }),
      hide:               () => this.setState({ flagEvent: false, flagEdit: false }),
      add:    (id, newEvent) => {
        let events = this.state.events.get(id);
    
        if (events) {
          events.push(newEvent);
          this.setState(this.state.events.set(id, events));
        } else {
          this.setState(this.state.events.set(id, [newEvent]));
        }
      },
      remove: (id, eventIndex) => {
        let events = this.state.events.get(id);
           
        events.splice(eventIndex, 1);
        this.setState(this.state.events.set(id, events));
      },
      get:    (id) => {
        const events = this.state.events.get(id);
        console.log(events);
        console.log(this.state);
        console.log(this.state.events);
    
        return events;
      }
    },
    edit: {
      show: () => this.setState({ flagEdit: true }),
      hide: () => this.setState({ flagEdit: false }),
      //save: (id, eventIndex, newEvent) => this.setState(this.state.events.get(id).splice(eventIndex, 1, newEvent)),
    },
    form: {
      add: {
        title: (form) => this.setState({ title: form.target.value }),
        members: (form) => this.setState({ members: form.target.value }),
        time: (form) => this.setState({ time: form.target.value }),
        text: (form) => this.setState({ text: form.target.value }),
        submit: (form) => {
          let event = {
            time: this.state.time,
            title: this.state.title,
            members: this.state.members,
            text: this.state.text
          };

          console.log(form);

          if (this.state.title.length !== 0) {
            this.on.event.add(this.state.id, event);
          }

          form.preventDefault();
          form.target.reset();
        }
      },
      edit: {
        title: (form) => this.setState({ titleEdit: form.target.value }),
        members: (form) => this.setState({ membersEdit: form.target.value }),
        time: (form) => this.setState({ timeEdit: form.target.value }),
        text: (form) => this.setState({ textEdit: form.target.value }),
        submit: (form) => {
          let newEvent = {
            time: this.state.timeEdit,
            title: this.state.titleEdit,
            members: this.state.membersEdit,
            text: this.state.textEdit
          };

          console.log(form);

          if (this.state.titleEdit.length !== 0) {
            //this.on.edit.save(this.state.id, this.state.eventIndex, newEvent);
            this.setState(this.state.events.get(this.state.id).splice(this.state.eventIndex, 1, newEvent))
          }

          form.preventDefault();
          form.target.reset();
          this.setState({ flagEdit: false })
        }
      }
    }
  };

  render() {
    const { days, events, flagDay, flagEvent, flagEdit, eventIndex, id } = this.state;
    const on = this.on;

    return (
      <Context.Provider value={{ on, days, events, id, flagEvent, eventIndex, flagEdit }}>
        <div className="calendar">
          <CalendarHeader />
          <div className="calendar__grid">
            {days.map(data => <CalendarDay data={data} key={data.id}/>)}
          </div> 
          { flagDay && <ModalDay /> }
        </div>
      </Context.Provider>
    );
  }
}

export default Calendar;