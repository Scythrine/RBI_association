import React from "react";
import "./css/content.css";
import { Link } from "react-router-dom";

export default function content() {
  return (
    <div className="content">
      <h1>About Us</h1>
      <p>
        Established in 1949 Reserve Bank of India Officers’ Association (RBIOA)
        and is the largest and only Association representing officers (DR and
        Merit Channel) of all grades from Grade A to Executive Director. RBIOA
        is also the only fully democratic Association where Office bearers and
        members of General Council and Central Committee are elected as per the
        rules provided in the constitution of RBIOA.
        <br />
        <br />
        <Link exact to="/about">
          Read More
        </Link>
      </p>
    </div>
  );
}
