import moment from 'moment';

export function getDays(month, year) {
  const startDay = moment([year, month]).startOf('month').startOf('week');
  //const endDay = moment().endOf('month').endOf('week');
  let day = startDay.clone();
  let flag = true;

  function Data(day) {
    this.day = day._d.getDate();
    this.month = day._d.getMonth() + 1;
    this.year = day._d.getFullYear();
    this.id = `${this.year}-${this.month}-${this.day}`;
  };

  return (
    [...Array(5)].map(() => {
      return [...Array(7)].map(() =>{
        if (flag) {
          flag = false;
          return new Data(day);
        } else {
          day._d.setDate(day._d.getDate() + 1);
          return new Data(day);
        }
      })
    })
  );
}