import React from 'react';
import Modal from '../Modal/Modal';
import Header from './Header';
import Day from './Day';
import { getDays } from './getDays';

import './calendar.scss';

class Calendar extends React.Component {
  static defaultProps = {
    dayEvents: [],
    //date: new Date(),
    //years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  };

  state = {
    days: getDays(),
    modalIsOpen: false,
    events: new Map()
  };

  setEvent = (text) => {
    this.setState(this.state.events.set("that key", [{
      title: 'fuck',
      id: Date.now(),
      completed: false
    }]))
  }

  getEvent = (key) => {
    console.log(this.state.events.get(key));
    console.log(this.state.events);
  }

  openModalHandler = () => this.setState({ modalIsOpen: true })
  closeModalHandler = () => this.setState({ modalIsOpen: false })

  render() {
    const { days, modalIsOpen, events } = this.state;

    return (
      <div className="calendar">
        <button onClick={() => this.setEvent( 'textsdsdas')}>set</button>
        <button onClick={() => this.getEvent( "that key")}>get</button>
        {modalIsOpen &&
          <Modal closeModal={this.closeModalHandler} />
        }
        <Header />
        <div className="calendar__grid">
          {days.map(data => <Day data={data} openModal={this.openModalHandler} key={data.id}/>)}
        </div>
      </div>
    )
  }
}

export default Calendar;