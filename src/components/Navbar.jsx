import { useCookies } from "react-cookie";
import { logoutApi } from "../apis/authentication";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, , removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const [result, error] = await logoutApi(cookies.jwt);
    handleResponse([result, error]);
  };

  const handleResponse = async ([result, error]) => {
    removeCookie('jwt');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            {/* Replace with logo image if available */}
            <span className="text-2xl font-extrabold text-black tracking-tight">Autumn</span>
          </Link>
          <div>
            {cookies.jwt ? (
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white rounded-lg px-5 py-2 font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white rounded-lg px-5 py-2 font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                aria-label="Login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;