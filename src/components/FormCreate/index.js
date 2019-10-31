import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FormCreate extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onChange = (e) => this.setState({ value: e.target.value });
  onClick = (e) => {
    if (!this.state.value.length) {
      alert("Escribe el nombre de la tarea")
      return;
    }
    this.props.onClick(this.state);
  };

  render() {
    return (
      <div className={ "FormCreate" }>
        <h2>Crear nueva tarea</h2>
        <input
          placeholder={ "Nombre de la tarea" }
          value={ this.state.value }
          onChange={ this.onChange }
        />
        <button
          onClick={ this.onClick }
        >
          Crear nueva tarea
        </button>
      </div>
    )
  }
}
