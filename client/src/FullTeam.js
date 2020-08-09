import React from "react";
import Navbar from "./navbar";
import Jumbotron from "./jumbotron";
import "./css/Home.css";
import { Container } from "react-bootstrap";
import Footer from "./footer";
import { MDBRow, MDBCard, MDBCardBody } from "mdbreact";
import TeamMember from "./teamMember";
import ScrollToTop from "react-scroll-up";

export default function Home() {
  return (
    <React.Fragment>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>{" "}
      <div>
        <Jumbotron
          name={["Team"]}
          subname="Meet Our whole Team"
          background={
            '"https://www.coburgbanks.co.uk/wp-content/uploads/2017/09/teamwork-2.jpg"'
          }
        />
      </div>
      <Container className="my-3">
        <MDBCard className="my-5 px-5 pb-5 text-center">
          <MDBCardBody>
            <MDBRow>
              <TeamMember />
              <TeamMember />
              <TeamMember />
              <TeamMember />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </Container>
      <footer>
        <Footer />
      </footer>
      <ScrollToTop showUnder={160}>
        <img
          src="/scrollTop.png"
          width="70"
          height="65"
          className="icon d-inline-block align-top"
          alt="RBIOA logo"
        />
      </ScrollToTop>
    </React.Fragment>
  );
}
