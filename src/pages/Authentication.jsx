import PropTypes from 'prop-types';
import {useState} from 'react';

const Authentication = ({pageType}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log('email', email);
    console.log('password', password);
    e.preventDefault();
  }
	return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold">
          {(pageType === PageType.Login) ? 'Login' : 'Register'}
        </h3>
        <form onSubmit={handleSubmit} className="mt-10 max-w-96 flex flex-col gap-4">
          <input
            name="email"
            type="email"
            className="py-2 border border-gray-600 rounded-md px-4"
            placeholder="Enter Email"
            onChange={handleEmailChange}
            value={email}
          />
          <input
            name="password"
            type="password"
            className="py-2 border border-gray-600 rounded-md px-4"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
            value={password}
          />

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