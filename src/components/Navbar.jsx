import { useCookies } from "react-cookie";
import { logoutApi } from "../apis/authentication";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies(['jwt']);
  const handleLogout = async (e) => {
    const [result, error] = await logoutApi(cookies.jwt);
    handleResponse([result, error]);   
  }

  const handleResponse = async ([result, error]) => {
    if (error) {
      removeCookie('jwt');
    } else {
      removeCookie('jwt');
    }
  }
  
  return (
    <div className="bg-white-500 shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold">
            Autumn
          </p>
          <div>
            {(cookies.jwt) ?
              (<button onClick={handleLogout} className="bg-blue-500 text-white rounded px-3 py-1.5 my-4">Logout</button>) :
              (<Link to="/login" className="bg-blue-500 text-white rounded px-3 py-1.5 my-4 inline-block">Login</Link>)
            }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar