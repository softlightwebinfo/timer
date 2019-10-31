import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ "App__menu" }>
        <Link to="/tareas">Listar Tareas</Link>
        <Link to="/nueva">Añadir nueva tarea</Link>
      </div>
    );
  }
}
