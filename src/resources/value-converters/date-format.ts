import * as moment from 'moment';
export class DateFormatValueConverter {
  toView(value) {
    return moment(value).format('MM Do YYYY, h:mm')
  }

  fromView(value) {

  }
}
