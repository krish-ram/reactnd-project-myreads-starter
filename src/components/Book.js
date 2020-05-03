import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";

class Book extends Component {
  render() {
    const { changeShelf, book } = this.props;
    const { title, imageLinks, authors, id } = book;
    return (
      <li key={id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  imageLinks ? imageLinks.thumbnail : ""
                })`
              }}
            ></div>
            <BookShelfChanger book={book} onChange={changeShelf} />
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {authors && authors.length ? authors.join(", ") : "Unknown"}
          </div>
        </div>
      </li>
    );
  }
}
export default Book;
