import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import PropTypes from 'prop-types'
class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
    state = {
        query: [],
        search: '',
        error: false
    }
    updateQuery = (s) => {
        this.setState(() => ({
            search: s.trim()
        }))

        s.trim() === '' ? (this.setState(() => ({
            query: [],
            error: true
        }))) :
            BooksAPI.search(s.trim())
                .then((books) => {

                    if (books == undefined || books.error == "empty query" || s.trim() == '') {
                        this.setState(() => ({
                            error: true,
                            query: []
                        }))
                    } else {
                        // check if books in search current, want or read
                        // compare to books in shelves (props)
                        let shelvesbooks = []
                        shelvesbooks = this.props.books !== undefined && this.props.books;
                        if (books !== undefined && shelvesbooks !== undefined) {
                            for (let i = 0; i < shelvesbooks.length; i++)
                                for (let j = 0; j < books.length; j++) {
                                    if (books[j].id == shelvesbooks[i].id) {
                                        books[j].shelf = shelvesbooks[i].shelf
                                    }
                                }
                        }
                        books !== undefined &&
                            this.setState(() => (
                                {
                                    query: books,
                                    error: false
                                }))
                    }
                })
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input autoFocus type="text" placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.error == true ?
                                <div>Books not found try search again</div> :
                                (
                                    //(this.state.query !== undefined && this.state.query.length > 0) &&
                                    this.state.query == undefined && this.state.query.length > 0 ?
                                        <div>Books not found</div> :
                                        (this.state.query !== undefined && this.state.query.length > 0) &&
                                        <Books books={this.state.query} changeShelf={this.props.changeShelf} />
                                )
                        }
                    </ol>
                </div>
            </div>)
    }
}
export default Search