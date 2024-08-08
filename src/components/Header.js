import React from "react";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <nav>
      <ul>

      <li><Link to = "/">
            <a href="/">Home</a>
      </Link></li>

      <li><Link to = "/meals">
          <a href="/meals">Meals</a>
        </Link></li>
        <li><Link to = "/login">
          <a href="/login">Login</a>
        </Link></li>
        </ul>
      </nav>
  );
}