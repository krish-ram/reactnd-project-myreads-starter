import React, { Component } from "react";

class BookShelfChanger extends Component {
  handleChange = e => {
    e.preventDefault();
    this.props.onChange(this.props.book, e.target.value);
  };
  render() {
    const { shelf } = this.props.book;
    return (
      <div className="book-shelf-changer">
        <select value={shelf || "none"} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}
export default BookShelfChanger;
