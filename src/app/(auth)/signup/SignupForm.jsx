"use client";

import { useState } from "react";
import { signup } from "./hooks/SignupHook";

const SignupForm = () => {
  const [state, setState] = useState( null, { error: null });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {responseCode, response} = await signup(state, formData);
    setState(response);
    if (responseCode == 200) {
      setTimeout(() => {
        window.location.href = "/login" 
      }, 5000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control form-control-lg mb-3"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          className="form-control form-control-lg mb-3"
          placeholder="Email"
          required
        />
        <input
          type="number"
          name="mobile"
          className="form-control form-control-lg mb-3"
          placeholder="Mobile"
          required
        />
        <input
          type="password"
          name="password"
          className="form-control form-control-lg mb-3"
          placeholder="Password"
          required
        />
        {state && <p className="alert-info text-white text-lg px-4 py-2 border-radius-md">{state}</p>}

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
