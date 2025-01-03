import PropTypes from "prop-types"
import LoadingSpinner from "../components/Shared/LoadingSpinner"
import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useRole from "../hooks/useRole"


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    const [role,isLoading]=useRole()
    if (isLoading) return <LoadingSpinner />
    if (role==="admin") return children
    return <Navigate to='/dashboard'  />
  }
  
  AdminRoute.propTypes = {
    children: PropTypes.element,
  }

export default AdminRoute;