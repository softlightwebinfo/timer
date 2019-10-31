import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export class Count extends PureComponent {
  render() {
    return (
      <div className={ "Count" }>
        { this.props.timer }
      </div>
    );
  }
}

Count.propTypes = {
  timer: PropTypes.string.isRequired,
};
