import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { autoLogIn } from '../../store/actions/user';
import { AppDispatch, RootState } from '../../store';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(autoLogIn());
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
