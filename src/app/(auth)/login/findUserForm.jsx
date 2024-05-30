"use client";

import React from 'react';
import { findUser } from "./createUser";

const FindUserForm = () => {


  return (
    <form action={findUser}>
      <input
        type="text"
        placeholder="email"
        name="email"
      />
      <button type="submit">Find</button>
    </form>
  );
};

export default FindUserForm;
