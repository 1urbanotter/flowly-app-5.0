import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import FlowlyLogo from "../assets/flowly-logo.svg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    let success = false;

    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await signup(email, password);
    }

    setLoading(false);
    if (success) {
      navigate("/"); // Navigate to root, App.jsx will handle redirect to Dashboard
    }
    // Error messages are handled by toast notifications from AuthContext
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
      <div className="container-base w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <img src={FlowlyLogo} alt="Flowly Logo" className="h-20 w-auto" />
        </div>
        <h2 className="text-3xl font-bold text-center text-primary-DEFAULT mb-2">
          {isLogin ? "Welcome Back!" : "Join Flowly!"}
        </h2>
        <p className="text-center text-text-base dark:text-text-dark mb-8">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {!isLogin && (
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          )}

          {error && <p className="text-danger text-sm mb-4">{error}</p>}

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); // Clear error on switch
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="p-0 hover:underline inline-block"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
