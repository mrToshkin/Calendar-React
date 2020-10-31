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

moment.locale('ru');

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: getDays(initMonth, initYear),
      day: initDay,
      month: initMonth,
      year: initYear,
      events: {},

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
  };

  on = {
    mock: {
      add: (id, newEvent) => {
        let { events } = this.state;

        events[id] ? events[id].push(newEvent) : events[id] = [newEvent];

        this.setState({ events, title: '', members: '', time: '', text: '' });
        localStorage.setItem('calendar', JSON.stringify(events));
      },
      get: id => {
        const events = this.state.events[id];
        console.log(events);
        console.log(this.state);
        console.log(this.state.events);

        return events;
      }
    },
    header: {
      month: {
        prev: () => {
          let { month, year } = this.state;

          (month === MIN_MONTH) ? 
            this.setState({ month: MAX_MONTH, days: getDays(MAX_MONTH, year - 1), year: year - 1 }) :
            this.setState({ month: month - 1, days: getDays(month - 1, year) })
        },
        select: select => {
          let month = moment(select.target.value, 'MMMM').month();
          let { year } = this.state;

          this.setState({ month, days: getDays(month, year) })
        },
        next: () => {
          let { month, year } = this.state;

          (month === MAX_MONTH) ?
            this.setState({ month: MIN_MONTH, days: getDays(MIN_MONTH, year + 1), year: year + 1 }) :
            this.setState({ month: month + 1, days: getDays(month + 1, year) })
        },
      },
      year: {
        prev: () => {
          let { month, year } = this.state;

          this.setState({ year: year - 1, days: getDays(month, year - 1) })
        },
        select: select => {
          let { month } = this.state;
          let year = Number(select.target.value);

          this.setState({ year, days: getDays(month, year)})
        },
        next: () => {
          let { month, year } = this.state;

          this.setState({ year: year + 1, days: getDays(month, year + 1) })
        },
      }
    },
    day: {
      show: id => this.setState({ flagDay: true, id }),
      hide: () => this.setState({ flagDay: false })
    },
    event: {
      show: (id, eventIndex) => this.setState({ flagEvent: true,  flagEdit: false, id, eventIndex }),
      hide:               () => this.setState({ flagEvent: false, flagEdit: false }), 
      remove: (id, eventIndex) => {
        let { events } = this.state;
        const { hasEvents } = this.methods;
           
        events[id].splice(eventIndex, 1);
        if (!hasEvents(id)) {
          delete events[id]
          this.setState({ flagEvent: false, flagEdit: false, });
        }

        this.setState({ events });
        localStorage.setItem('calendar', JSON.stringify(events));
      }   
    },
    edit: {
      show: () => this.setState({ flagEdit: true, titleEdit: '', membersEdit: '', timeEdit: '', textEdit: '' }),
      hide: () => this.setState({ flagEdit: false }),
    },
    form: {
      input: input => this.setState({ [input.target.name]: input.target.value }),
      submit: {
        add: form => {
          let { events, id, title, members, time, text } = this.state;
          const newEvent = { title, members, time, text };

          events[id] ? events[id].push(newEvent) : events[id] = [newEvent];

          form.preventDefault();
          form.target.reset();

          this.setState({ events, title: '', members: '', time: '', text: '' });
          localStorage.setItem('calendar', JSON.stringify(events));
        },
        edit: form => {
          let { events, id, titleEdit, membersEdit, timeEdit, textEdit, eventIndex } = this.state;
          let event = events[id][eventIndex];
          let isNew = (a, b) => (a === '') ? b : a;
          let newEvent = {
            title: isNew(titleEdit, event.title),
            members: isNew(membersEdit, event.members),
            time: isNew(timeEdit, event.time),
            text: isNew(textEdit, event.text)
          };

          events[id].splice(eventIndex, 1, newEvent);

          form.preventDefault();
          form.target.reset();

          this.setState({ events, titleEdit: '', membersEdit: '', timeEdit: '', textEdit: '', flagEdit: false });
          localStorage.setItem('calendar', JSON.stringify(events));
        }
      }
    }
  };

  methods = {
    hasEvents: id => {
      return (
        Array.isArray(this.state.events[id]) ?
          this.state.events[id].some(even => even) :
          false
      )
    },
    markDay: week => ({
      unmonth: (week.month - 1 !== this.state.month),
      today: (week.day === initDay && week.month - 1 === initMonth && week.year === initYear),
      hasEvents: this.methods.hasEvents(week.id)
    })
  };

  componentDidMount() {
    const events = localStorage.getItem('calendar') ? 
      JSON.parse(localStorage.getItem('calendar')) :
      {};
    this.setState({ events });
  }
  
  /* shouldComponentUpdate(nextProps, nextState) {
    return this.state.events !== nextState.events
  } */
 
  render() {    
    const { days, day, month, year, events, flagDay, flagEvent, flagEdit, eventIndex, id } = this.state;
    const { hasEvents, markDay } = this.methods;
    const on = this.on;

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