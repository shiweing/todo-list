// Referencing https://medium.com/@aghh1504/1-simple-react-todo-list-52186b62976b
import React from "react";
import ReactDOM from "react-dom";
import EditableList from "./editable.js";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_todo: "",
      todos: []
    };
  }

  onChange = event => {
    this.setState({ new_todo: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      new_todo: "",
      todos: [...this.state.todos, this.state.new_todo]
    });
  };

  todos_edit = (index, edited_todo) => {
    var new_todos = this.state.todos;
    new_todos[index] = edited_todo;
    this.setState({
      todos: new_todos
    });
  };

  onDelete = event => {
    var new_todos = this.state.todos;
    new_todos.splice(event.target.id, 1);

    this.setState({
      todos: new_todos
    });
  };

  render() {
    return (
      <div>
        <h1>TODOS</h1>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.new_todo} onChange={this.onChange} />
          <button>Submit</button>
        </form>
        <EditableList
          todos={this.state.todos}
          delete={this.onDelete.bind(this)}
          edit={this.todos_edit.bind(this)}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
