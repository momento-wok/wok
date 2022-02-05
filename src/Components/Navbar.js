import React from 'react';
import { Link } from "react-router-dom";

const nav = () => {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">1</Link>
      </li>
      <li>
        <Link to="/">2</Link>
      </li>
      <li>
        <Link to="/">3</Link>
      </li>
    </div>
  );
}

export default navbar;
