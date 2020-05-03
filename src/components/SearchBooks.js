import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "../helper";
import Book from "./Book";
class SearchBooks extends Component {
  state = {
    searchQuery: ""
  };

  search = e => {
    e.preventDefault();
    this.setState({ searchQuery: e.target.value });
    this.dSearch(e.target.value);
  };

  dSearch = debounce(value => this.props.searchBooks(value), 300);

  updateShelf(searchResults, books) {
    return searchResults.map(book => {
      books.forEach(bk => {
        if (bk.id === book.id) {
          book.shelf = bk.shelf;
        }
      });
      return book;
    });
  }
  componentWillUnmount = () => {
    this.props.searchBooks("");
  };

  render() {
    const { searchResults, changeShelf, books } = this.props;
    const shelfUpdatedBooks = this.updateShelf(searchResults, books);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchQuery}
              placeholder="Search by title or author"
              onChange={this.search}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {shelfUpdatedBooks.map(book => (
              <Book key={book.id} book={book} changeShelf={changeShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBooks;
