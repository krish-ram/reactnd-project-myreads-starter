import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const ShelfTypes = [
  { key: "currentlyReading", title: "Currently Reading" },
  { key: "wantToRead", title: "Want to Read" },
  { key: "read", title: "Read" }
];

class BookList extends Component {
  render() {
    const { books, changeShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {ShelfTypes.map(shelf => (
              <BookShelf
                key={shelf.key}
                shelf={shelf}
                books={books.filter(book => book.shelf === shelf.key)}
                changeShelf={changeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
            <button type="button">Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default BookList;
