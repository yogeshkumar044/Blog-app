import React, { useState, useEffect ,useContext } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import {StickyProvider} from './Context/header_stick_store';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();





  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      } 
    }).finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <StickyProvider>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      </StickyProvider>
  ) : null;
}

export default App;
