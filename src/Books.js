import React from 'react'
import PropTypes from 'prop-types'

function Books(props) {
  let shelf = props.books;

  return <div className="bookshelf-books">
    <ol className="books-grid">      
      {shelf.map((cr) => (

        <li key={cr.id}>
          <div className="book">
            <div className="book-top">

              <div className="book-cover" style={{
                width: 128, height: 193,
                backgroundImage: `url(${cr.imageLinks && cr.imageLinks.thumbnail ? cr.imageLinks.thumbnail : 'No Thumbnail'})`
              }}></div>
              <div className="book-shelf-changer">
                <select value={cr.shelf ? cr.shelf : 'none'} onChange={(e) => props.changeShelf(cr, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading" onClick={(e) => props.changeShelf(cr, e.target.value)}>Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{cr.title}</div>
            <div className="book-authors">{cr.authors ? cr.authors.map((a) => a).join(', ') : 'missing author'}</div>

          </div>
        </li>

      ))}
    </ol>
  </div>
}
Books.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};

export default Books