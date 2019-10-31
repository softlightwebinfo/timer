import React, { PureComponent } from 'react';
import { Header } from "../Header";
import PropTypes from 'prop-types';

export class Template extends PureComponent {

  render() {
    return (
      <div className={ "Template" }>
        { !this.props.hideMenu && (<Header/>) }
        { this.props.children }
      </div>
    );
  }
}

Template.propTypes = {
  hideMenu: PropTypes.bool
};
