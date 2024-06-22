import React from 'react'
import {Barangay} from '@/app/lib/constants'
export default function page() {
  return (
    <div>
      <div className="login-container">
          <form id="loginForm">
              <h2>Login</h2>
              <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" required/>
              </div>
              <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" required/>
              </div>
              <div className="button-group">
                  <button type="submit">Login</button>
                  <button type="button" id="signupButton">Signup</button>
              </div>
          </form>
          <p id="error-message" className="error-message"></p>
      </div>
    </div>
  )
}
