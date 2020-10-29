import React from 'react';
import Context from '../../context';
import moment from 'moment';
import 'moment/locale/ru';

import CalendarHeader from './CalendarHeader';
import CalendarFooter from './CalendarFooter';
import CalendarDay from './CalendarDay';
import ModalDay from '../Modal/ModalDay';
import { getDays } from './getDays';

import './styles.scss';

const MAX_MONTH = 11;
const MIN_MONTH = 0;
const DAY_NAMES = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const initDay = moment().date();
const initMonth = moment().month();
const initYear = moment().year();

class Calendar extends React.Component {
  state = {
    days: getDays(initMonth, initYear),
    day: initDay,
    month: initMonth,
    year: initYear,
    events: new Map(),

    flagDay: false,
    flagEvent: false,
    flagEdit: false,

    id: '',
    eventIndex: null,

    title: '',
    members: '',
    time: '',
    text: '',

    titleEdit: '',
    membersEdit: '',
    timeEdit: '',
    textEdit: ''
  };

  on = {
    mock: {
      add: (id, newEvent) => {
        let { events } = this.state;
        let dayEvents = events.get(id);

        if (dayEvents) {
          dayEvents.push(newEvent);
          events.set(id, dayEvents);
        } else {
          events.set(id, [newEvent])
        }

        this.setState({ events, title: '', members: '', time: '', text: '' });
      },
      get: (id) => {
        const events = this.state.events.get(id);
        console.log(events);
        console.log(this.state);
        console.log(this.state.events);

        return events;
      }
    },
    header: {
      month: {
        prev: () => {
          let month = this.state.month;
          let year = this.state.year;

          (month === MIN_MONTH) ? 
            this.setState({ month: MAX_MONTH, days: getDays(MAX_MONTH, year - 1), year: year - 1 }) :
            this.setState({ month: month - 1, days: getDays(month - 1, year) })
        },
        select: (sel) => {
          let month = moment(sel.target.value, 'MMMM').month();
          let year = this.state.year;

          this.setState({ month: month, days: getDays(month, year) })
        },
        next: () => {
          let month = this.state.month;
          let year = this.state.year;

          (month === MAX_MONTH) ?
            this.setState({ month: MIN_MONTH, days: getDays(MIN_MONTH, year + 1), year: year + 1 }) :
            this.setState({ month: month + 1, days: getDays(month + 1, year) })
        },
      },
      year: {
        prev: () => {
          let month = this.state.month;
          let year = this.state.year;

          this.setState({ year: year - 1, days: getDays(month, year - 1) })
        },
        select: (sel) => {
          let month = this.state.month;
          let year = Number(sel.target.value);

          this.setState({ year: year, days: getDays(month, year)})
        },
        next: () => {
          let month = this.state.month;
          let year = this.state.year;

          this.setState({ year: year + 1, days: getDays(month, year + 1) })
        },
      }
    },
    day: {
      show: (id) => this.setState({ flagDay: true, id: id }),
      hide:   () => this.setState({ flagDay: false })
    },
    event: {
      show: (id, eventIndex) => this.setState({ flagEvent: true,  flagEdit: false, id: id, eventIndex: eventIndex }),
      hide:               () => this.setState({ flagEvent: false, flagEdit: false }), 
      remove: (id, eventIndex) => {
        let events = this.state.events.get(id);
           
        events.splice(eventIndex, 1);
        this.setState(this.state.events.set(id, events));
      }   
    },
    edit: {
      show: () => this.setState({ flagEdit: true }),
      hide: () => this.setState({ flagEdit: false }),
    },
    form: {
      input: (input) => {
        console.log(input.target.name);
        this.setState({ [input.target.name]: input.target.value })
      },
      submit: {
        add: (form) => {
          let { events, id, title, members, time, text } = this.state;
          let dayEvents = events.get(id);
          const newEvent = { title, members, time, text };

          if (dayEvents) {
            dayEvents.push(newEvent);
            events.set(id, dayEvents);
          } else {
            events.set(id, [newEvent])
          }

          form.preventDefault();
          form.target.reset();
          this.setState({ events, title: '', members: '', time: '', text: '' });
        },
        edit: (form) => {
          let { events, id, titleEdit, membersEdit, timeEdit, textEdit, eventIndex } = this.state;
          let event = events.get(id)[eventIndex];
          let isNew = (a, b) => (a === '') ? b : a;
          let newEvent = {
            title: isNew(titleEdit, event.title),
            members: isNew(membersEdit, event.members),
            time: isNew(timeEdit, event.time),
            text: isNew(textEdit, event.text)
          };

          events.get(id).splice(eventIndex, 1, newEvent);

          form.preventDefault();
          form.target.reset();
          this.setState({ events, titleEdit: '', membersEdit: '', timeEdit: '', textEdit: '', flagEdit: false });
        }
      }
    }
  };

  
  render() {
    const { days, day, month, year, events, flagDay, flagEvent, flagEdit, eventIndex, id } = this.state;
    const on = this.on;
    moment.locale('ru');

    const hasEvents = id => (
      Array.isArray(events.get(id)) ?
        events.get(id).some(even => even) :
        false
    );
    const markDay = week => ({
      unmonth: (week.month - 1 !== month),
      today: (week.day === initDay && week.month - 1 === initMonth && week.year === initYear),
      hasEvents: hasEvents(week.id)
    });

    return (
      <Context.Provider value={{ on, day, days, month, year, events, id, flagEvent, eventIndex, flagEdit, hasEvents }}>
        <div className="calendar">
          <CalendarHeader />
          <table className="calendar__body">
            <thead>
              <tr>{DAY_NAMES.map(name => <th key={name}>{name}</th>)}</tr>
            </thead>
            <tbody>
              {days.map((arr, i) => 
                <tr key={i}>
                  {arr.map(week => 
                    <CalendarDay markDay={markDay(week)} week={week} key={week.id} />
                  )}
                </tr>
              )}
            </tbody>
          </table> 
          { flagDay && <ModalDay /> }
          <CalendarFooter />
        </div>
      </Context.Provider>
    );
  }
}

export default Calendar;