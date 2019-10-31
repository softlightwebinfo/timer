import React, { Component } from 'react';
import { Template } from "../components/Template";
import { Counter } from "../components/Counter";
import { Models } from "../setting/database";
import moment from "moment";

const electron = require('electron');

export class NewEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      tasks: [],
      id: null,
      start: null,
    };
    this.timerInterval = null;
  }

  async componentDidMount() {
    let tasks = [];
    const task = await Models.getTask(this.props.match.params.id);
    this.mount(task);
    this.watch();
  }

  mount(task) {
    const tasks = task.tasks.map((task, index) => ({
      num: index + 1,
      id: index,
      time: task.timer,
      date: {
        start: task.start,
        end: task.end,
      }
    }));
    this.setState({
      tasks,
      name: task.name,
      id: task._id,
      date: task.created_at,
    });
  }

  watch() {
    Models.watchAddTimer((change) => {
      this.mount(change.doc);
    });
  }

  get timeTotal() {
    if (!this.state.tasks.length) return "00:00:00";
    const times = this.state.tasks.map(item => item.time);
    const totalDurations = times.reduce((prev, cur) => moment.duration(cur).add(prev));
    if (totalDurations.asMilliseconds) {
      return moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss")
    }
    return totalDurations;
  }

  calculateDays(startDate, endDate) {
    return moment.utc(endDate.diff(startDate)).format("HH:mm:ss");
  }

  get timer() {
    if (this.state.start) {
      return this.calculateDays(this.state.start.first, this.state.start.now)
    }
    return "00:00:00";
  }

  componentWillUnmount() {
    this.stop()
  }

  stop() {
    clearInterval(this.timerInterval);
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

  timerCount = () => {
    this.setState(e => ({
      start: {
        ...e.start,
        now: moment(e.start.now).add(1, "seconds"),
      }
    }))
  };

  start = () => {
    const now = moment();
    this.setState({
      start: {
        first: now,
        now,
      },
    });
    this.timerInterval = setInterval(this.timerCount, 1000);
  };

  save = async () => {
    this.stop();
    const save = await Models.createTimer(this.state.id, {
      start: this.state.start.first.format("YYYY-MM-DD HH:mm:ss"),
      end: moment().format("YYYY-MM-DD HH:mm:ss"),
      timer: this.timer
    });
    this.setState({
      start: null,
    });
  };
  pause = () => {
    this.stop();
  };
  resume = () => {
    this.timerInterval = setInterval(this.timerCount, 1000);
  };

  render() {
    return (
      <Template hideMenu={ this.state.newForm }>
        <div className={ "App__new" }>
          <Counter
            resume={ this.resume }
            start={ this.start }
            save={ this.save }
            pause={ this.pause }
            timer={ this.timer }
            timeTotal={ this.timeTotal }
            date={ this.state.date }
            name={ this.state.name }
            tasks={ this.state.tasks }
          />
        </div>
      </Template>
    );
  }
}
