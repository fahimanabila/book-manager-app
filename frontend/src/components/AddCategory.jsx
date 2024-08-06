import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {
  const [category_name, setTitle] = useState('');

  const navigate = useNavigate();

  const saveCategory = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_name", category_name);

    try {
      await axios.post('http://localhost:5000/category', formData);
      navigate('/viewcategory', { replace: true });
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <a href={'/viewcategory'} type="button" className="button is-warning mb-5 is-outlined">← Back</a>
        <h1 className="title is-3">Add Category</h1>

        <form onSubmit={saveCategory}>
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
                <button type="submit" className="button is-success">Submit</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCategory;
