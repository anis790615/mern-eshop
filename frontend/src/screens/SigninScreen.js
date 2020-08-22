import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signin } from "../redux-state/actions/userActions";

function SigninScreen() {
  const { push } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;
  const dispatch = useDispatch();
  const redirect = useHistory().location.search.split("=")[1] || "/";

  // Functions
  const handleSubmit = (e) => {
    dispatch(signin(email, password));
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
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
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
            <button type="submit" className="button primary">
              Sign In
            </button>
          </li>
          <li>
            <span>Don't have an account? </span>
            <Link
              to={
                redirect === "/" ? "register" : `register?redirect=${redirect}`
              }
              className="button secondary"
            >
              Create new account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;
