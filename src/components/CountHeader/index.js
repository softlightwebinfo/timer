import React, { Component } from "react";
import { Flex } from "../Grid/Flex";
import { Col } from "../Grid/Col";
import PropTypes from 'prop-types';
import { CountTitle } from "../CountTitle";
import { FormatDate } from "../FormatDate";
import { Count } from "../Count";

export class CountHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      isPause: false,
    };
  }

  start = (e) => {
    this.setState({ isStart: true });
    this.props.start(e);
  };

  pause = (e) => {
    this.setState({ isPause: true, isStart: true });
    this.props.pause(e);
  };

  save = (e) => {
    this.setState({ isStart: false, isPause: false });
    this.props.save(e);
  };
  resume = (e) => {
    this.setState({ isStart: true, isPause: false });
    this.props.resume(e);
  };

  render() {
    return (
      <header className={ "CountHeader" }>
        <Flex>
          <Col>
            <div>
              <CountTitle
                title={ this.props.title }
              />
              <FormatDate
                date={ this.props.date }
              />
              <div className={ "CountHeader__totals" }>
                <span>{ this.props.count }</span>
                <span> - </span>
                <span>{ this.props.timeTotal }</span>
              </div>
            </div>
          </Col>
          <Col style={ { flexGrow: 0, display: "flex", alignItems: "center", flexDirection: "column" } }>
            <Count
              timer={ this.props.timer }
            />
            <div className={ "CountHeader__buttons" }>
              { (!this.state.isStart && !this.state.isPause) && (<button onClick={ this.start }>Empezar</button>) }
              { (this.state.isStart) && <button onClick={ this.save }>Guardar</button> }
              { (!this.state.isPause && this.state.isStart) && (<button onClick={ this.pause }>Pausar</button>) }
              { (this.state.isStart && this.state.isPause) && (<button onClick={ this.resume }>Reanudar</button>) }
            </div>
          </Col>
        </Flex>
      </header>
    );
  }
}

CountHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeTotal: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  timer: PropTypes.string.isRequired,
  start: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
};
