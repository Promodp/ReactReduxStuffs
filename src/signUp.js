import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { userSignup, userLogin } from "./redux";

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSigned, setSigned] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const dispatch = useDispatch();

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = () => {
    const payload = {
      name,
      email
    }
    dispatch(
      userSignup({
        payload
      })
    );
    setSigned(true)
  }
  const handleChangeLoginScreen = () => {
    setSigned(false)
  }
  const handleLogin = () => {
    const savedName = JSON.parse(localStorage.getItem("name"));
    if (name === savedName) {
      setShowLogin(true)
    } else {
      alert('Please Enter connect username')
    }
    // userLogin
  }

  return (
    <div>
      {!isSigned && <>
        <div> <label>Name:</label> <input type="text" id="name" name="name" onChange={handleName} /></div><br />
        <div><label>Email:</label>  <input type="email" id="email" name="email" onChange={handleEmail} /></div><br />
        <button onClick={handleSubmit}>Signup</button>
        &nbsp;&nbsp;&nbsp;
      </>}
      {!isSigned && <button onClick={handleLogin}>Login</button>}
      {isSigned && <><h2>You have sign up successfully!!!</h2><h1><button onClick={handleChangeLoginScreen}>Login</button> </h1></>}
      {showLogin && <h1>You have successfully logged in </h1>}
    </div>

  )
};
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  // setBgAction: (payload) => dispatch(setBgAction(payload)),
  // setColorAction: (payload) => dispatch(setColorAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);