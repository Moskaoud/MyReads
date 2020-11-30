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
        search: ''
    }
    updateQuery = (s) => {
        this.setState(() => ({
            search: s.trim()
        }))

        this.state.search.length === 0 ? (this.setState(() => ({
            query: []
        }))) :
            this.state.search !== undefined &&
            BooksAPI.search(this.state.search)
                .then((books) => {
                    console.log("XXX", books)
                    books !== undefined &&
                        this.setState(() => ({
                            query: books
                        }))
                })
    }
    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.search.length === 0 ?
                                <div>Search by title or author in search box</div> :
                                (
                                    (this.state.query !== undefined && this.state.query.length > 0) &&
                                    <Books books={this.state.query} changeShelf={this.props.changeShelf} />
                                )}
                    </ol>
                </div>
            </div>)
    }
}
export default Search