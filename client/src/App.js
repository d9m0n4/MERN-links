import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import './index.css';
import { useRoutes } from './Pages/routes';
import { authContext } from './context/authContext';
import Navbar from './components/navbar';
import Loader from './components/loader';

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  if (!ready) {
    return <Loader />;
  }
  return (
    <authContext.Provider value={{ token, login, logout, userId, isAuth, ready }}>
      <BrowserRouter>
        {isAuth && <Navbar />}
        <div className="container">{routes}</div>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
