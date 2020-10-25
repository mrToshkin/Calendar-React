import React from 'react';
import Modal from '../Modal/Modal';
import Header from './Header';
import Day from './Day';
import { getDays } from './getDays';
import Context from '../../context';
import Events from '../Events/Events';

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
    id: '',
    modalIsOpen: false,
    events: new Map()
  };

  eventsForEvents = {
    setEvent: (id, newEvent) => {
      let events = this.state.events.get(id);
  
      if (events) {
        events.push(newEvent);
        this.setState(this.state.events.set(id, events))
      } else {
        this.setState(this.state.events.set(id, [newEvent]))
      }
    },
    removeEvent:(id, eventIndex) => {
      let events = this.state.events.get(id);
  
      events.splice(eventIndex, 1);
      this.setState(this.state.events.set(id, events))
    },
    getEvents: (id) => {
      const events = this.state.events.get(id);
      console.log(events);
      console.log(this.state.events);
  
      return events;
    },
  }

  modal = {
    open: (id) => this.setState({ modalIsOpen: true, id: id }),
    close: ()  => this.setState({ modalIsOpen: false })
  }

  onDayClick = (id) => this.modal.open(id);

  render() {
    const { days, modalIsOpen, id, events } = this.state;
    const { setEvent, removeEvent, getEvents } = this.eventsForEvents;

    return (
      <div className="calendar">
        
        {modalIsOpen &&
          <Context.Provider value={{ setEvent, removeEvent, getEvents, events, id }}>
            <Modal closeModal={this.modal.close} />
          </Context.Provider>
        }
        <Header />
        <div className="calendar__grid">
          {days.map(data => <Day data={data} openModal={this.onDayClick.bind(null, data.id)} key={data.id}/>)}
        </div>
      </div>
    )
  }
}

export default Calendar;