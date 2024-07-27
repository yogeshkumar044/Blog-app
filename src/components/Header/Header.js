import React ,{useContext} from 'react';
import { Container, Logo, LogoutButton } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiLogIn, FiUserPlus, FiFileText, FiPlusSquare, FiUser } from 'react-icons/fi';
import StickyContext from '../../Context/StickyHeaderContext';
import useStickyHeader from '../isSticky';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  useStickyHeader();

  const {isSticky} = useContext(StickyContext);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active:true,
      icon: <FiHome />,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
      icon: <FiLogIn />,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
      icon: <FiUserPlus />,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
      icon: <FiFileText />,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
      icon: <FiPlusSquare />,
    },
    {
      name: 'Profile',
      slug: '/profile',
      active: authStatus,
      icon: <FiUser />,
    },
  ];

  return (
    <header className={`w-full py-4 pt-2 pb-2 shadow-lg bg-gray-800 text-white ${isSticky ? 'sticky top-0 z-50' : ''} `}>
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo width="90px" />
          </div>
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => item.active?(
              <li key={item.name}>
                {item.slug !== '/login' && item.slug !== '/signup' ? (
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`flex items-center space-x-2 px-4 py-2 duration-200 hover:text-purple-800 font-bold hover:font-extrabold rounded-full text-white relative overflow-hidden ${
                      location.pathname === item.slug ? 'text-purple-800 font-extrabold' : ''
                    }`}
                  >
                    {item.icon}
                    <span className="absolute left-0 right-0 bottom-0 h-1 bg-transparent transition-all duration-300"></span>
                    <span>{item.name}</span>
                  </button>
                ) : (
                  !authStatus && (
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`flex items-center space-x-2 px-4 py-2 duration-200 hover:text-purple-800 font-bold hover:font-extrabold rounded-full text-white relative overflow-hidden ${
                        location.pathname === item.slug ? 'text-purple-800 font-extrabold' : ''
                      }`}
                    >
                      {item.icon}
                      <span className="absolute left-0 right-0 bottom-0 h-1 bg-transparent transition-all duration-300"></span>
                      <span>{item.name}</span>
                    </button>
                  )
                )}
              </li>
            ):null)}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
