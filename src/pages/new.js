import React, { Component } from 'react';
import { Template } from "../components/Template";
import { CountHeader } from "../components/CountHeader";
import { Table } from "../components/Table";
import moment from "moment";
import { Counter } from "../components/Counter";
import { FormCreate } from "../components/FormCreate";
import { Models } from "../setting/database";
import PouchDB from 'pouchdb';
import { Route } from 'react-router-dom';

const electron = require('electron');

export class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "HD-300",
      date: "2019-10-22 08:10:10",
      tasks: [],
      newForm: false,
      id: null,
    };
  }

  componentDidMount() {
    let tasks = [];

    for (let i = 0; i < 10; i++) {
      tasks = [...tasks, {
        num: i + 1,
        id: i,
        time: "00:00:00",
        date: {
          start: "2019/10/22 08:30",
          end: "2019/10/22 09:30",
        }
      }]
    }
    this.setState({
      tasks,
    });
  }

  get timeTotal() {
    return "00:00:00";
  }

  get timer() {
    const timer = "00:00:00";
    return timer;
  }

  create = async (data) => {
    this.setState({
      ...data,
    });
    try {
      const { id } = await Models.createTask(data);
      this.props.history.push(`/nueva/${ id }`)
    } catch (e) {
      console.log(e);
      alert("No se ha podido crear la tarea");
    }
  };

  render() {
    return (
      <Template hideMenu={ this.state.newForm }>
        <div className={ "App__new" }>
          { !this.state.newForm && (
            <FormCreate
              onClick={ this.create }
            />
          ) }
          { this.state.newForm && (
            <Counter
              timer={ this.timer }
              timeTotal={ this.timeTotal }
              date={ this.state.date }
              name={ this.state.name }
              tasks={ this.state.tasks }
            />
          ) }
        </div>
      </Template>
    );
  }
}
