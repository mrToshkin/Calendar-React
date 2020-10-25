import moment from 'moment';

export function getDays() {
  moment.updateLocale('en', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week');
  const endDay = moment().endOf('month').endOf('week');
  let day = startDay.clone();
  let flag = true;

  function Data(day) {
    this.day = day._d.getDate();
    this.month = day._d.getMonth();
    this.year = day._d.getFullYear();
    this.id = `${this.day}.${this.month}.${this.year}`;
  };

  return (
    [...Array(35)].map(() => {
      if (flag) {
        flag = false;
        return new Data(day);
      } else {
        day._d.setDate(day._d.getDate() + 1);
        return new Data(day);
      }
    })
  );
}