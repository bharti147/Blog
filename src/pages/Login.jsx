import React from 'react'
import {Login as LoginComponent} from '../components'

//login logic - all the work will be done by loginComponent, so we doesnt need to do anything here, we'll just call login component on this login page to give it better styling

function Login() {

  
  return (
    <div className='py-8'>
        <LoginComponent/>
    </div>
  )
}

export default Login
