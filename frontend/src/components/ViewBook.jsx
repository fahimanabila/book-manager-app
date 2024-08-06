import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchTerm, sortColumn, sortDirection, startDate, endDate, category]);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/book/${bookId}`);
      getBooks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterAndSortBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        Object.values(book).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((book) => {
        const publicationDate = new Date(book.publication_date);
        return (
          publicationDate >= new Date(startDate) && publicationDate <= new Date(endDate)
        );
      });
    }

    if (category) {
      filtered = filtered.filter((book) => book.category === parseInt(category));
    }

    const sorted = filtered.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredBooks(sorted);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleSort = (column) => {
    const newSortDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newSortDirection);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = () => {
    filterAndSortBooks(); // Apply the filter and sorting whenever category or date range changes
  };

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    <div className="container">
      <h1 className="title is-3 mt-5">List of Books</h1>
      <div className="box">
        <div className="field mb-3">
          <label className="label">Search Data:</label>
          <div className="control">
            <input
              type="text"
              placeholder="Search Data..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input"
            />
          </div>
        </div>
        <div className="field mb-3">
          <label className="label">Book Category Filter:</label>
          <div className="columns">
            <div className="column">
              <div className="select">
                <select
                  name="category"
                  className="select"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="field mb-3">
          <label className="label">Publication Date Range:</label>
          <div className="columns">
            <div className="column">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input"
              />
            </div>
            <div className="column">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input"
              />
            </div>
            <div className="column">
              <button onClick={handleFilterChange} className="button is-primary">Filter</button>
            </div>
          </div>
        </div>
        {filteredBooks.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>
                    ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('title')}>
                    Title {sortColumn === 'title' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('author')}>
                    Author {sortColumn === 'author' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('publication_date')}>
                    Publication Date {sortColumn === 'publication_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('publisher')}>
                    Publisher {sortColumn === 'publisher' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('number_of_pages')}>
                    Number of Pages {sortColumn === 'number_of_pages' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('category')}>
                    Category {sortColumn === 'category' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publication_date}</td>
                    <td>{book.publisher}</td>
                    <td>{book.number_of_pages}</td>
                    <td>{categories.find((cat) => cat.id === book.category)?.category_name || 'N/A'}</td>
                    <td>
                      <figure className="image is-8by6">
                        <img src={book.url} alt={book.title} />
                      </figure>
                    </td>
                    <td>
                      <Link to={`/editbook/${book.id}`} className="button is-warning is-rounded">
                        Edit
                      </Link>
                      <button className="button is-danger mt-2 is-rounded" onClick={() => deleteBook(book.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav className="pagination is-centered">
              <ul className="pagination-list">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <button
                      className={`pagination-link ${index + 1 === currentPage ? 'is-current' : ''}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewBook;
