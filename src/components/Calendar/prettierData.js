const  monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const  weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export function prettierData(days, id) {
  for (let data of days) {
    if (data.id === id) {
      return `${data.day}.${data.month}.${data.year}`
    }
  }
}