import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Col extends PureComponent {
  render() {
    return (
      <div className={ "Col" } style={ this.props.style }>
        { this.props.children }
      </div>
    )
  }
}

Col.propTypes = {
  style: PropTypes.object,
};
