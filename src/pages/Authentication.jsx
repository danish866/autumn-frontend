import PropTypes from 'prop-types';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { validateEmail,validatePassword } from '../utilities/validations';
import { registerApi } from '../apis/authentication';
import { loginApi } from '../apis/authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import autumnLogo from '../assets/autumn_logo.svg';

const intitialErrorState = {
  email: '',
  password: ''
}
const Authentication = ({pageType}) => {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(intitialErrorState);
  const navigate = useNavigate();
  const [hasCheckedLogin, setHasCheckedLogin] = useState(false)
  let isValid = true;

  useEffect(() => {
    if (!hasCheckedLogin) {
      if (cookies.jwt && cookies.jwt !== 'undefined') {
        toast.success('You are already logged in');
        navigate('/');
      }
      setHasCheckedLogin(true);
    }
  }, [cookies.jwt, navigate, hasCheckedLogin]);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {}
    if (!validateEmail(email)) {
      isValid = false;
      newErrors = {
        ...newErrors,
        email: 'Please enter a valid email address'
      }
    }

    if (!validatePassword(password)) {
      isValid = false;
      newErrors = {
        ...newErrors,
        password: 'Password must be at least 6 characters long'
      }
    }

    setErrors(newErrors);

    if (!isValid) { 
      return;
    }else {
      if(pageType === PageType.Register) {
        const [result, error] = await registerApi({
          user: {
            email: email,
            password: password
          }
        })
        handleResponse([result, error]);

      }else if(pageType === PageType.Login) {
        const [result, error] = await loginApi({
          user: {
            email: email,
            password: password
          }
        })
        handleResponse([result, error]);
      }
    }
  }

  const handleResponse = ([result, error]) => {
    if (error) {
      toast.error(error);
    } else {
      const jwt = result.headers.get('Authorization');
      
      setCookie('jwt', jwt);
      
      toast.success('Login successful');
      navigate('/');
    }
  }
	return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="bg-white mx-auto max-w-2xl px-6 sm:px-8 lg:px-10 py-20">
        <img src={autumnLogo} alt="Logo" className="w-48 h-48 mx-auto mb-10" />
        
        {(pageType === PageType.Login) ? 
          <p className="mt-6 text-center"> Not a member? 
            <span className="text-blue-500 ms-1 cursor-pointer">
              <Link to="/register">Register</Link>         
            </span>  
          </p>
          :
          <p className="mt-6 text-center"> Already a member? 
            <span className="ms-1 text-blue-500 cursor-pointer">
              <Link to="/login">Login</Link>
            </span>  
          </p>
        }
  
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl flex flex-col gap-4 mx-auto">
          <div>
            <input
              name="email"
              type="email"
              className="py-2 w-full border border-gray-600 rounded-md px-6"
              placeholder="Enter Email"
              onChange={handleEmailChange}
              value={email}
            />
            {errors.email && <p className="text-sm text-medium text-red-500 mt-2">{errors.email}</p>}
          </div>
          
          <div>
            <input
              name="password"
              type="password"
              className="py-2 w-full border border-gray-600 rounded-md px-6"
              placeholder="Enter Password"
              onChange={handlePasswordChange}
              value={password}
            />
            {errors.password && <p className="text-sm text-medium text-red-500 mt-2">{errors.password}</p>}
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {(pageType === PageType.Login) ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
  
  
  
}

const PageType = Object.freeze({
	Login: "login",
	Register: "register"
});


Authentication.propTypes = {
  pageType: PropTypes.string.isRequired
};


export {Authentication, PageType};