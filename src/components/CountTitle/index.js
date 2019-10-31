import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
export class CountTitle extends PureComponent {
  render() {
    return (
      <div className={ "CountTitle" }>
        <Link to={ "/tareas" }><span dangerouslySetInnerHTML={ { __html: "&larr; volver" } }/></Link>
        <span>{ this.props.title }</span>
      </div>
    )
  }
}

CountTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
