import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import PropTypes from 'prop-types';
import useRole from '../hooks/useRole';

const SellerRoute = ({ children }) => {
    const { user, loading } = useAuth()

    const [role,isLoading]=useRole()
    if (isLoading) return <LoadingSpinner />
    if (role==='seller') return children
    return <Navigate to='/dashboard'  replace='true' />
  }
  
  SellerRoute.propTypes = {
    children: PropTypes.element,
  }

export default SellerRoute;