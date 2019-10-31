import React, { PureComponent } from 'react';
import { CountHeader } from "../CountHeader";
import { Table } from "../Table";
import moment from "moment";
import PropTypes from 'prop-types';

export class Counter extends PureComponent {
  static propTypes = {
    timer: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    timeTotal: PropTypes.string.isRequired,
    start: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    resume: PropTypes.func.isRequired,
  };

  get columns() {
    return [
      { name: "Num", key: "num", type: "text" },
      { name: "tiempo", key: "time", type: "text" },
      { name: "fecha", key: "dateComponent", type: "component" },
    ];
  }

  render() {
    return (
      <>
        <CountHeader
          pause={ this.props.pause }
          resume={ this.props.resume }
          save={ this.props.save }
          start={ this.props.start }
          timer={ this.props.timer }
          count={ this.props.tasks.length }
          date={ this.props.date }
          title={ this.props.name }
          timeTotal={ this.props.timeTotal }
        />
        <Table
          style={ { marginTop: 20 } }
          rows={ this.props.tasks.map(item => ({
            ...item,
            dateComponent: (
              <div>
                <div>{ moment(item.date.start).format("DD/MM/YYYY") }</div>
                <div>
                  <span>{ moment(item.date.start).format("HH:mm:ss") }</span>
                  <span> - </span>
                  <span>{ moment(item.date.end).format("HH:mm:ss") }</span>
                </div>
              </div>
            )
          })) }
          columns={ this.columns }
        />
      </>
    )
  }
}
