import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import Search from './Search'
import { Link, Route } from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {

        this.setState(() => ({
          books: books
        }))
      })
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        // update shelf after onchange action
        book.shelf = shelf;
        this.setState(pre => ({
          //remove old book and add updated one 
          //you notice this when refresh
          //try books: pre.books
          books: pre.books.filter(b => b.id !== book.id).concat(book)
        }))
      })
  }
  render() {

    return (
      <div className="app">
        <Route exact path='/search' render={() => <Search changeShelf={this.changeShelf} books={this.state.books}/>} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Books books={this.state.books.filter(b => b.shelf === 'currentlyReading')} changeShelf={this.changeShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Books books={this.state.books.filter(b => b.shelf === 'wantToRead')} changeShelf={this.changeShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Books books={this.state.books.filter(b => b.shelf === 'read')} changeShelf={this.changeShelf} />
                </div>
              </div>
            </div>
            <div className="open-search" >

              <Link className="open-search" to='/search'>
                <button >Add Book
                  </button>
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
