import PropTypes from 'prop-types';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { validateEmail,validatePassword } from '../utilities/validations';
import { registerApi } from '../apis/authentication';
import { loginApi } from '../apis/authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const intitialErrorState = {
  email: '',
  password: ''
}
const Authentication = ({pageType}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(intitialErrorState);
  const navigate = useNavigate();
  let isValid = true;
  
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
      console.log("token", result.headers.get('Authorization')); 
      toast.success('Login successful');
      navigate('/');
    }
  }
	return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold">
          {(pageType === PageType.Login) ? 'Login' : 'Register'}
        </h3>

        {(pageType === PageType.Login) ? 
          <p className="mt-4"> Not a member? 
            <span className="text-blue-500 ms-1 cursor-pointer">
              <Link to="/register">Register</Link>         
            </span>  
          </p>
          :
          <p className="mt-4"> Already a member? 
            <span className="ms-1 text-blue-500 cursor-pointer">
              <Link to="/login">Login</Link>
            </span>  
          </p>
        }
        <form onSubmit={handleSubmit} className="mt-10 max-w-96 flex flex-col gap-4">
        
          <div>
            <input
              name="email"
              type="email"
              className="py-2 w-full border border-gray-600 rounded-md px-4"
              placeholder="Enter Email"
              onChange={handleEmailChange}
              value={email}
            />
            {errors.email && <p className="text-sm text-medium text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              name="password"
              type="password"
              className="py-2 w-full border border-gray-600 rounded-md px-4"
              placeholder="Enter Password"
              onChange={handlePasswordChange}
              value={password}
            />
            {errors.password && <p className="text-sm text-medium text-red-500 mt-1">{errors.password}</p>}
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