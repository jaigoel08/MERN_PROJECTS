import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

const NavBar = () => {
  const { isLoggedIn, userType } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-xl">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-3xl font-bold text-white hover:text-indigo-200 transition duration-300">
          Grocery Mart
        </Link>

        {isLoggedIn && userType === 'seller' && (
          <div className="flex items-center space-x-6">
            <Link to="/add-product" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-medium transition duration-300 border">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </Link>
          </div>
        )}

        {isLoggedIn && userType === 'customer' && (
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-medium transition duration-300 border">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </Link>
            <Link to="/orders" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-medium transition duration-300 border">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Orders
            </Link>
          </div>
        )}
      </div>

      {/* Logged-in or Not */}
      {!isLoggedIn ? (
        <div className="flex items-center space-x-6">
          <Link to="/login" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-medium transition duration-300 border">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </Link>
          <Link to="/signup" className="flex items-center bg-indigo-600 text-white hover:bg-indigo-500 px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-xl transition duration-300 border">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Signup
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-6">
          <button onClick={handleLogout} className="flex items-center text-white hover:text-red-200 hover:bg-red-600 px-5 py-2 rounded-full text-sm font-medium transition duration-300 border">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
</nav>

  )
}

export default NavBar