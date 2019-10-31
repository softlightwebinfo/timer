import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

export class Task extends PureComponent {
  render() {
    return (
      <div onClick={ this.props.onClick } className={ "Task" }>
        <p>{ this.props.name }</p>
      </div>
    );
  }
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
