import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookList from "./components/BookList";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  changeShelf = (book, newShelf) => {
    if (newShelf === "none") {
      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== book.id)
      }));
    } else {
      book.shelf = newShelf;
      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== book.id).concat(book)
      }));
      BooksAPI.update(book, newShelf);
    }
  };

  searchBooks = query => {
    if (query.trim().length > 0) {
      BooksAPI.search(query).then(books => {
        let results = !books || books.error ? [] : [...books];
        this.setState({ searchResults: results });
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    return (
      <div className="app">
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <BookList
                books={this.state.books}
                changeShelf={this.changeShelf}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                changeShelf={this.changeShelf}
                searchBooks={this.searchBooks}
                searchResults={this.state.searchResults}
                books={this.state.books}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default BooksApp;
