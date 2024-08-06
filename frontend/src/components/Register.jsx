import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = (e) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setconfPassword] = useState('');
    const [error, setError] = useState('');

    const history = useNavigate();

    const Register = async(e) =>{
        e.preventDefault();

        // Reset error message
        setError('');

        // Check if passwords match
        if (password !== confpassword) {
        setError('Passwords do not match');
        return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                name,
                email,
                password,
                confpassword
            });
            console.log('Response:', response.data)
            history('/', { replace: true });
        } catch (error) {
            console.error('There was an error registering!', error.response?.data || error.message);
        }
    }


  return (
    <section className="hero is-fullwidth is-fullheight is-info has-background-info">
      <div className="hero-body">
        <div className="container">
           <div className="columns is-centered">
                <div className="column is-4-desktop">
                    <form onSubmit={ Register } className="box">
                    <Link to={`/`} className="button is-info is-outlined">← Back </Link>
                        <div className="field mt-5">
                            <label className="label"> Name </label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Insert name"
                                value={name} onChange={(e)=> setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label"> Email </label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Insert email"
                                value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label"> Password </label>
                            <div className="controls">
                                <input type="password" className="input" placeholder="******"
                                value={password} onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label"> Confirm Password </label>
                            <div className="controls">
                                <input type="password" className="input" placeholder="******"
                                value={confpassword} onChange={(e)=> setconfPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field mt-5 mb-5">
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                        <div className="field mt-5 mb-5">
                            <button className="button is-info is-fullwidth">Register</button>
                        </div>
                    </form>
                </div>
           </div>
        </div>
      </div>
    </section>
  )
}

export default Register
