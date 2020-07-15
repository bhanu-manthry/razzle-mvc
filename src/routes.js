import Home from './pages/Home';
import Login from './pages/Login';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    exact: true,
  },
]

export default routes;