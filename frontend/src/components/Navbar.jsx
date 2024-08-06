import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleBurgerMenu = () => {
    setIsActive(!isActive);
  };

    const navigate = useNavigate();

    const Logout = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/logout');
            navigate('/', { replace: true });

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <span><h1 className="title is-3 has-text-link-dark"> Book Apps Manager</h1></span>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/dashboard">
        Home
      </a>

      <a class="navbar-item" href="/viewbook">
        Book List
      </a>

      <a class="navbar-item" href="/viewcategory">
        Category List
      </a>

      <a class="navbar-item" href="/addbook">
        Add Book
      </a>

      <a class="navbar-item" href="/addcategory">
        Add Category
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a onClick={ Logout } class="button is-light">
            Log Out
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
