import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../redux-state/actions/userActions";

function RegisterScreen() {
  const { push } = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const dispatch = useDispatch();
  const redirect = useHistory().location.search.split("=")[1] || "/";

  // Functions
  const handleSubmit = (e) => {
    dispatch(register(name, email, password));
    e.preventDefault();
  };
  // Side Effects
  useEffect(() => {
    if (userInfo) {
      push(redirect);
    }
    return () => {};
  }, [userInfo, push]);
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="rePassword">Repeate Password</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li>
            <span>Already have an account? </span>
            <Link
              to={redirect === "/" ? "signin" : `register?redirect=${redirect}`}
              className="button secondary"
            >
              Sign-in
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
