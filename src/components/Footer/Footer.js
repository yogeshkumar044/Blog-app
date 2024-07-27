import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-wrap gap-8">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <div className="mb-8">
            <Logo width="100px" />
          </div>
          <p className="text-sm text-gray-400">
            &copy; Copyright 2023. All Rights Reserved by DevUI.
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Features</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Pricing</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Affiliate Program</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Press Kit</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Account</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Help</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Contact Us</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Customer Support</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Legals</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/" className="text-base text-gray-300 hover:text-gray-200">Licensing</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
