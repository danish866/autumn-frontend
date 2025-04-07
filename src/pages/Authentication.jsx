import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utilities/validations';
import { registerApi, loginApi } from '../apis/authentication';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import autumnLogo from '../assets/autumn_logo.svg';

const intitialErrorState = {
  email: '',
  password: ''
};

const PageType = Object.freeze({
  Login: "login",
  Register: "register"
});

const Authentication = ({ pageType }) => {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(intitialErrorState);
  const [loading, setLoading] = useState(false);
  const [hasCheckedLogin, setHasCheckedLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCheckedLogin) {
      if (cookies.jwt && cookies.jwt !== 'undefined') {
        toast.success('You are already logged in');
        navigate('/');
      }
      setHasCheckedLogin(true);
    }
  }, [cookies.jwt, navigate, hasCheckedLogin]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let newErrors = {};

    if (!validateEmail(email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(password)) {
      isValid = false;
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);

    if (!isValid) return;

    setLoading(true);
    try {
      let result, error;
      if (pageType === PageType.Register) {
        [result, error] = await registerApi({ user: { email, password } });
      } else if (pageType === PageType.Login) {
        [result, error] = await loginApi({ user: { email, password } });
      }
      handleResponse([result, error]);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = ([result, error]) => {
    if (error) {
      toast.error(error);
    } else {
      const jwt = result.headers.get('Authorization');
      setCookie('jwt', jwt);
      toast.success('Login successful');
      navigate('/');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white shadow-xl rounded-2xl mx-auto max-w-md px-8 py-12 w-full">
          <img src={autumnLogo} alt="Logo" className="w-32 h-32 mx-auto mb-8 filter invert-0 grayscale" style={{ filter: 'brightness(0)' }} />
          <h2 className="text-2xl font-bold text-center mb-2">
            {pageType === PageType.Login ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {pageType === PageType.Login
              ? <>Not a member? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></>
              : <>Already a member? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></>
            }
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`py-2 w-full border rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter Email"
                onChange={handleEmailChange}
                value={email}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                autoFocus
              />
              {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`py-2 w-full border rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter Password"
                onChange={handlePasswordChange}
                value={password}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && <p id="password-error" className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className={`bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : null}
              {pageType === PageType.Login ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

Authentication.propTypes = {
  pageType: PropTypes.string.isRequired
};

export { Authentication, PageType };