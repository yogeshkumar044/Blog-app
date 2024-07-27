import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutButton() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button
            className='inline-block px-4 py-2 duration-200 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:outline-none'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutButton
