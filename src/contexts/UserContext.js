import React, { useState, createContext } from "react";

const UserContext = createContext({is_seller: localStorage.getItem('is_seller')});
export default UserContext;