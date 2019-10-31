import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from "./pages/home";
import { Tasks } from "./pages/tasks";
import { New } from "./pages/new";
import { NewEdit } from "./pages/newEdit";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/nueva/:id" component={ NewEdit }/>
            <Route path="/nueva" component={ New }/>
            <Route path="/tareas" component={ Tasks }/>
            <Route path="/"  component={ Home }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
