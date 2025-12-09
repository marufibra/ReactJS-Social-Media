import { Link } from 'react-router-dom'
import './login.scss'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

function Login() {

  const {login} = useContext(AuthContext);

  const handleLogin = ()=>{
    login();
  }
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate tempora in exercitationem voluptatibus, reprehenderit perferendis provident odio nam asperiores dignissimos.
          </p>
          <span>Don't you have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" name="username" id="username" placeholder='Username' />
            <input type="password" name="password" id="password" placeholder='Password' />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login