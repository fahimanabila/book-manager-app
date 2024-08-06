import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [category_name, setTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the category details on component mount
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/category/${id}`);
        setTitle(response.data.category_name);
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_name", category_name);

    try {
      await axios.patch(`http://localhost:5000/category/${id}`, formData);
      navigate('/viewcategory', { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <a href={'/viewcategory'}type="button" className="button is-warning mb-5 is-outlined">← Back</a>
        <h1 className="title is-3 mt-5">Edit Category</h1>
        <form onSubmit={updateCategory}>
          <div className="field">
            <label htmlFor="title" className="label">
              Category Name
            </label>
            <div className="control">
              <input
                type="text"
                id="category_name"
                className="input"
                value={category_name}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Category Name"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">Update</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCategory;
