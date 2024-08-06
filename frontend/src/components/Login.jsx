import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/login', { email, password });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <section className="hero is-fullwidth is-fullheight is-info has-background-info">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="book.jpg"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
                    <form onSubmit={handleLogin}>
                      {error && (
                        <div className="notification is-danger">
                          {error}
                        </div>
                      )}
                      <div className="field mt-5">
                        <label className="label">Email</label>
                        <div className="controls">
                          <input
                            type="text"
                            className="input"
                            placeholder="Insert email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field mt-5">
                        <label className="label">Password</label>
                        <div className="controls">
                          <input
                            type="password"
                            className="input"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field mt-5 mb-5">
                        <button className="button  is-info is-fullwidth">Login</button>
                        <Link to={`/register`} className="button is-secondary is-fullwidth mt-2">Register</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;