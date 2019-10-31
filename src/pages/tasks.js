import React, { Component } from 'react';
import { Task } from "../components/Task";
import { Template } from "../components/Template";
import { Models } from "../setting/database";

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    const tasks = await Models.getAllTask();
    this.setState({
      tasks: tasks.rows.map(task => ({
        id: task.id,
        name: task.doc.name,
      }))
    });
  }

  onClick = (item) => {
    this.props.history.push(`/nueva/${ item.id }`)
  };

  render() {
    return (
      <Template>
        <div className={ "App__task" }>
          { this.state.tasks.map((task, index) => (
            <Task
              onClick={ () => this.onClick(task) }
              key={ task.id }
              name={ task.name }
            />
          )) }
        </div>
      </Template>
    );
  }
}
