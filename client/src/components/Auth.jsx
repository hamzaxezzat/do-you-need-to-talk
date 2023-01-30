import React,{useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signinImage from '../assets/signup.jpg'

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',  
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: ''
}
const Auth = () => {
  const [form, setForm] = useState(initialState)
  const [isSignup, setisSignup] = useState(true)
  
  const handleChange = (e) =>{
    // !Important Code: bring brevious value, targetname(username): targetvalue
    setForm({...form,[e.target.name]: e.target.value})
    // console.log(form)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ----- Send Data To Backend -----

    // ===== 1. Object Destructuring 
    const {fullName,username,password,phoneNumber,avatarURL} = form;
     
    // ===== 2. Create URL to send it to
    const URL = 'http://localhost:5050/auth';


    // ===== 3. Use Axios to make request (send data) to Backend to two links auth/signup / auth/login
    // ===== 4. data: {token,userId,hashedPassword} : what returns backfrom Backend!! ||| So the same code send and recieve the data
    const { data: { token, userId, hashedPassword }} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username, password, fullName, phoneNumber, avatarURL,
    })

    // Set Cookies after click signin or login
    cookies.set('token',token);
    cookies.set('username',username);
    cookies.set('fullName',fullName);
    cookies.set('userId',userId);

    if (isSignup){
      cookies.set('avatarURL',avatarURL);
      cookies.set('phoneNumber',phoneNumber);
      cookies.set('hashedPassword',hashedPassword);
    }


    // ===== 5. Reload Browser after supmit
    window.location.reload()
  }
  const switchMode = () => {
    setisSignup((prevIsSignup)=> !prevIsSignup)
  }
  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? 'Sign Up': 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup &&(
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>Full Name</label>
                <input 
                  name="fullName"
                  type="text"
                  placeholder='Full Name'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
              <div className='auth__form-container_fields-content_input'>
              <label htmlFor='username'>Username</label>
              <input 
                name="username"
                type="text"
                placeholder='Username'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup &&(
              <div className='auth__form-container_fields-content_input'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input 
                name="phoneNumber"
                type="text"
                placeholder='Phone Number'
                onChange={handleChange}
                required
              />
            </div>
            )}
            {isSignup &&(
              <div className='auth__form-container_fields-content_input'>
              <label htmlFor='avatarURL'>Avatar URL</label>
              <input 
                name="avatarURL"
                type="text"
                placeholder='Avatar URL'
                onChange={handleChange}
                required
              />
            </div>
            )}
              <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>Password</label>
              <input 
                name="password"
                type="password"
                placeholder='Password'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup &&(
              <div className='auth__form-container_fields-content_input'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input 
                name="confirmPassword"
                type="password"
                placeholder='confirmPassword'
                onChange={handleChange}
                required
              />
            </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button> {isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup 
              ? "Already have an account?" 
              : "Don't have an account?"
              }
              <span onClick={switchMode}>
                {isSignup ? ' Sign In':'Sign Up'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  )
}

export default Auth