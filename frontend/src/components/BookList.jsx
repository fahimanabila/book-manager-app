import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteBook = async(bookId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/book/${bookId}`);
      getBooks();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="columns is-multiline">
          {books.map((b) => (
            <div className="column is-one-quarter" key={b.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img style={{ objectFit: 'cover' }} src={b.url} alt={`Image of ${b.title}`} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{b.title}</p>
                    </div>
                  </div>
                </div>
                <footer className="card-footer">
                  <Link to={`/editbook/${b.id}`} className="card-footer-item">Edit</Link>
                  <a className="card-footer-item" onClick={()=> deleteBook(b.id)}>Delete</a>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
