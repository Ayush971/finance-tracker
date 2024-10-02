import React, { useState } from "react";
import '../styles/login.css';
import { useNavigate } from "react-router-dom";

function Login() {  // Accept onLogin as a prop to update authentication state
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);

  if(hide===true){
    return null;
  }

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simple login logic (you can replace this with actual API logic later)
    onLogin();  // This will notify App.js that the user has logged in
  };
  
  const onLogin = () => {
    navigate("/home")
    setHide(true)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // For now, this does nothing but you can add registration logic here
    alert("Account created! You can log in now.");
    setIsLoginForm(true);  // Switch back to login form after registration
  };

  return (
    <div className="login-page">
      <div className="form1">
        {isLoginForm ? (
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <input type="text" placeholder="username" required />
            <input type="password" placeholder="password" required />
            <button type="submit">login</button>
            <p className="message">
              Not registered? <a href="/" onClick={toggleForm}>Create an account</a>
            </p>
          </form>
        ) : (
          <form className="register-form" onSubmit={handleRegisterSubmit}>
            <input type="text" placeholder="name" required />
            <input type="password" placeholder="password" required />
            <input type="email" placeholder="email address" required />
            <button type="submit">create</button>
            <p className="message">
              Already registered? <a href="/" onClick={toggleForm}>Sign In</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
