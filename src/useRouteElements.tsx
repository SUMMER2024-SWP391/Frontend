import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import Login from './pages/Login/Login'
import HomePageVisitor from './pages/HomePage/HomePageVisitor'
import { AppContext } from './context/app.context'
import { useContext } from 'react'
import Profile from './pages/Profile/Profile'
import LoginOauthGoogle from './Components/LoginOauthGoogle/LoginOauthGoogle'
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin'
import EventDetailPage from './pages/EventDetailPage/EventDetail'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: <HomePageVisitor />
    },
    {
      path: '/dashboard',
      element: <DashboardAdmin />
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: <Profile />
        }
      ]
    },
    {
      path: `/events/:id`,
      element: <EventDetailPage />
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />
        },
        {
          path: path.loginOauthGoogle,
          element: <LoginOauthGoogle />
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
