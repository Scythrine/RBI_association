import React from "react";
import Navbar from "./navbar";

import Parallax from "./parallax";
import "./css/Newsletter.css";
import { Container } from "react-bootstrap";
import Footer from "./footer";

export default function Newsletter() {
  return (
    <React.Fragment>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>{" "}
      <div>
        <Parallax name={["Here's Your", <br />, "Newsletter"]} />
      </div>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}
