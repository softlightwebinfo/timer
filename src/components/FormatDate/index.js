import React, { PureComponent } from 'react';
import moment from 'moment';
export class FormatDate extends PureComponent {
  get format() {
    return moment(this.props.date).format("DD/MM/YYYY")
  }

  render() {
    return (
      <span className={ "FormatDate" }>
        { this.format }
      </span>
    );
  }
}
