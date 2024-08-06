import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    filterAndSortCategories();
  }, [categories, search, sortField, sortOrder]);

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/category/${categoryId}`);
      getCategories();
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterAndSortCategories = () => {
    let filtered = categories.filter((category) =>
      category.category_name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredCategories(filtered);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="container">
      <h1 className="title is-3 mt-5">Book Categories</h1>
      <div className="box">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="input"
        />
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <button onClick={() => handleSort('id')}>
                      ID {sortField === 'id' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </button>
                  </th>
                  <th>
                    <button onClick={() => handleSort('category_name')}>
                      Category Name {sortField === 'category_name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </button>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <a href={`/editcategory/${category.id}`} className="button is-warning is-rounded">Edit</a>
                      <a className="button is-danger is-rounded ml-2" onClick={() => deleteCategory(category.id)}>Delete</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={index + 1 === currentPage ? 'button is-primary' : 'button'}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCategory;
