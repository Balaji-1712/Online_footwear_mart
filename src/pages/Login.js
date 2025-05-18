import React, { useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const closeTabAfterLogin = () => {
    try {
      setMessage('Login successful! This tab will close shortly...');
      setTimeout(() => window.close(), 2500);
    } catch (e) {
      setMessage('Login successful! Please close this tab manually.');
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      closeTabAfterLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      closeTabAfterLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeTabAfterLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('If this email is registered, a password reset link has been sent.');
    } catch (err) {
      setError(err.message);
    }
  };

  const configureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => sendOTP(),
      });
    }
  };

  const sendOTP = async () => {
    try {
      configureCaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setShowOTP(true);
      setMessage('OTP sent to your mobile number.');
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await window.confirmationResult.confirm(otp);
      closeTabAfterLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="text-center">Login / Signup</h2>

      {message && <div className="alert alert-success text-center">{message}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
        Login with Email
      </button>

      <button className="btn btn-secondary w-100 mb-2" onClick={handleSignup}>
        Signup with Email
      </button>

      <button className="btn btn-outline-dark w-100 mb-3" onClick={handlePasswordReset}>
        Forgot Password?
      </button>

      <button className="btn btn-light border w-100 mb-3" onClick={googleLogin}>
        <i className="bi bi-google fs-4"></i>
      </button>

      {!showPhoneLogin && (
        <p
          className="text-primary text-center"
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => setShowPhoneLogin(true)}
        >
          Continue with mobile number
        </p>
      )}

      {showPhoneLogin && (
        <>
          {!showOTP ? (
            <>
              <input
                type="tel"
                placeholder="Enter phone number e.g. +91xxxxxxxxxx"
                className="form-control mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div id="recaptcha-container"></div>
              <button className="btn btn-success w-100" onClick={sendOTP}>
                Send OTP
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="form-control mb-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="btn btn-success w-100" onClick={verifyOTP}>
                Verify OTP
              </button>
            </>
          )}
        </>
      )}

      <hr />
      <h6 className="text-center text-primary mt-4">
        After successful login, this tab will close automatically.
      </h6>
    </div>
  );
}

export default Login;
