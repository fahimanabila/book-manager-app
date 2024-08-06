import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publication_date, setPD] = useState('');
  const [publisher, setPublisher] = useState('');
  const [number_of_pages, setNOP] = useState('');
  const [category, setCategory] = useState('');

  const [image, setFile] = useState('');
  const [preview, setPreview] = useState('');

  const [categories, setCategories] = useState([]); // State for categories

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories and book details on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategories(response.data); // Set the categories in state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/book/${id}`);
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPD(book.publication_date);
        setPublisher(book.publisher);
        setNOP(book.number_of_pages);
        setCategory(book.category);
        setPreview(book.url); // Assuming the API provides the image URL
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchCategories();
    fetchBookDetails();
  }, [id]);

  const loadImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publication_date", publication_date);
    formData.append("publisher", publisher);
    formData.append("number_of_pages", number_of_pages);
    formData.append("category", category);

    try {
      await axios.patch(`http://localhost:5000/book/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });
      navigate('/viewbook', { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <a href={'/viewbook'}type="button" className="button is-warning mb-5 is-outlined">← Back</a>
        <h1 className="title is-3 mt-5">Edit Book</h1>

        <form onSubmit={updateBook}>

          <div className="field">
            <label htmlFor="title" className="label">
              Title
            </label>
            <div className="control">
              <input
                type="text"
                id="title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="author" className="label">
              Author
            </label>
            <div className="control">
              <input
                type="text"
                id="author"
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="publication_date" className="label">
              Publication Date
            </label>
            <div className="control">
              <input
                type="date"
                id="publication_date"
                className="input"
                value={publication_date}
                onChange={(e) => setPD(e.target.value)}
                placeholder="Publication Date"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="publisher" className="label">
              Publisher
            </label>
            <div className="control">
              <input
                type="text"
                id="publisher"
                className="input"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Publisher"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="number_of_pages" className="label">
              Number of Pages
            </label>
            <div className="control">
              <input
                type="number"
                id="number_of_pages"
                className="input"
                value={number_of_pages}
                onChange={(e) => setNOP(e.target.value)}
                placeholder="Number of Pages"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="category" className="label">
              Category
            </label>
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

          <div className="field">
            <label htmlFor="file" className="label">
              Image
            </label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    id="image"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview && (
            <figure className="image mb-5 is-128x128">
              <img src={preview} className="mb-5" alt="Preview" />
            </figure>
          )}

          <div className="field mt-5">
            <div className="control mt-5">
              <button type="submit" className="button is-success mt-5">Update</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditBook;
