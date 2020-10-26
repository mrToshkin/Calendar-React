import React from 'react';
import Modal from '../Modal/Modal';
import Header from './Header';
import Day from './Day';
import { getDays } from './getDays';
import Context from '../../context';

import './calendar.scss';

class Calendar extends React.Component {
  /* static defaultProps = {
    dayEvents: [],
    //date: new Date(),
    //years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  }; */
  state = {
    days: getDays(),
    modalIsOpen: false,
    events: new Map(),

    id: '',
    time: '',
    title: '',
    members: '',
    text: ''
  };

  on = {  
    event: {
      add: (id, newEvent) => {
        let events = this.state.events.get(id);
    
        if (events) {
          events.push(newEvent);
          this.setState(this.state.events.set(id, events));
        } else {
          this.setState(this.state.events.set(id, [newEvent]));
        }
      },
      remove:(id, eventIndex) => {
        let events = this.state.events.get(id);
           
        events.splice(eventIndex, 1);
        this.setState(this.state.events.set(id, events));
        /* if (events.length === 1) {
          this.setState(this.state.events.delete(id));
        } else {
        } */
      },
      /* edit:(id, eventIndex) => {
        let events = this.state.events.get(id);
    
        events.splice(eventIndex, 1);
        this.setState(this.state.events.set(id, events));
      }, */
      get: (id) => {
        const events = this.state.events.get(id);
        console.log(events);
        console.log(this.state);
        console.log(this.state.events);
        console.log('Пустой массив:' + !events.some(even => even));
    
        return events;
      },
    },
    form: {
      //input: (e) => this.setState({`${e.target.input.id}`: e.target.value}),
      title: (e) => this.setState({ title: e.target.value }),
      members: (e) => this.setState({ members: e.target.value }),
      time: (e) => this.setState({ time: e.target.value }),
      text: (e) => this.setState({ text: e.target.value }),
      submit: (e) => {
        let event = {
          time: this.state.time,
          title: this.state.title,
          members: this.state.members,
          text: this.state.text
        };
  
        console.log(e);
  
        this.on.event.add(this.state.id, event);
        e.preventDefault();
      }
    },
    modal: {
      open: (id) => this.setState({ modalIsOpen: true, id: id }),
      close: ()  => this.setState({ modalIsOpen: false })
    },
    day: { click: (id) => this.on.modal.open(id) }
  };

  render() {
    const { days, modalIsOpen, id, events } = this.state;
    const on = this.on;

    return (
      <div className="calendar">     
        {modalIsOpen &&
          <Context.Provider value={{ on, events, id }}>
            <Modal closeModal={on.modal.close} />
          </Context.Provider>
        }
        <Header />
        <div className="calendar__grid">
          {days.map(data => <Day data={data} openModal={on.day.click.bind(null, data.id)} key={data.id}/>)}
        </div>
      </div>
    );
  }
}

export default Calendar;