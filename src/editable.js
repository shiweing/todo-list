// Referencing https://medium.com/@vraa/inline-edit-using-higher-order-components-in-react-7828687c120c
import React from "react";
import { render } from "react-dom";
import "./styles.css";

class EditableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
  }

  edit = event => {
    event.persist();
    this.setState(
      {
        editing: true
      },
      () => event.target.focus()
    );
  };

  save = event => {
    event.persist();
    this.setState(
      {
        editing: false
      },
      () => this.props.edit(event.target.id, event.target.textContent)
    );
  };

  handleKeyDown = event => {
    const { key } = event;
    switch (key) {
      case "Enter":
      case "Escape":
        this.save(event);
        break;
    }
  };

  render() {
    const { editing } = this.state;
    return (
      <ul>
        {this.props.todos.map((todo, index) => (
          <li>
            <span
              id={index}
              onClick={this.edit}
              contentEditable={editing}
              onBlur={this.save}
              onKeyDown={this.handleKeyDown}
            >
              {todo}{" "}
            </span>
            <button id={index} onClick={this.props.delete}>
              X
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default EditableList;
