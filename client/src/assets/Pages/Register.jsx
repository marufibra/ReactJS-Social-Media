import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios';
// The codes below are not needed at the front end when using .env
// import dotenv from 'dotenv';
// dotenv.config();
const Register = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    })

    const[error, setError] = useState(null);
    const navigate = useNavigate();
    

    const handleChange = e => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleSubmit = async e => {
        e.preventDefault(); //prevents page from refreshing
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, inputs);
            navigate("/login")
        } catch (err) {
            //because of 409 http code at the backend, error is triggered
            setError(err.response?.data || "Something went wrong")
        }
    }


    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input required type="text" name="username" id="username" placeholder='username' onChange={handleChange} />
                <input required type="email" name="email" id="email" placeholder='email' onChange={handleChange} />
                <input required type="password" name="password" id="password" placeholder='password' onChange={handleChange} />
                <button onClick={handleSubmit}>Login</button>
                {error && <p>{error}</p>}
                <span>Do you have an account? <Link to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Register;