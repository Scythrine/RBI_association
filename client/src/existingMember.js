import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { getData, existingUser } from "./axios/signup";
import Loading from "react-fullscreen-loading";
import Swal from "sweetalert2";

export default function NewMember() {
  let initState = {
    SamadhanID: "",
    Name: "",
    OfficeLocation: "",
    Email: "",
  };

  const [userData, setUserData] = useState(initState);
  const [message, setMessage] = useState("");
  const [msgState, setMsgState] = useState(0);
  const [loading, setLoading] = useState(false);

  const setData = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const getUserData = async (e) => {
    let Id = e.target.value;
    let recvEmail = "";
    if (Id.length === 6) recvEmail = await getData(Id); //Recieved Email
    setUserData({ ...userData, Email: recvEmail, SamadhanID: Id });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (userData.Email !== "") {
      let emptyField = false;
      Object.entries(userData).map(([key, value]) => {
        if (value == null || value === "") emptyField = true;
        return null;
      });
      if (emptyField) {
        setMsgState(1);
        setMessage("Fields should not be Empty");
        return null;
      } else {
        setLoading(true);
        await existingUser(userData);

        Swal.fire(
          "Form verified",
          "Check your Email for password",
          "success"
        ).then(() => {
          window.location.reload();
        });
        //Reseting Form and State
        setUserData(initState);
        setMsgState(0);
      }
    } else {
      setMessage("User not found");
      setMsgState(1);
    }
    setLoading(false);
  };

  const Msg = (props) => {
    if (props.state === 1) return <Alert variant="danger"> {message} </Alert>;
    else if (props.state === 2)
      return <Alert variant="success"> {message} </Alert>;
    return null;
  };
  return (
    <React.Fragment>
      <Loading
        loading={loading}
        background="rgba(0,0,0,0.8)"
        loaderColor="#3498db"
      />
      <h1 style={{ textAlign: "center" }}>Existing Member</h1>
      <Msg state={msgState} />
      <Form onSubmit={submitForm}>
        <Form.Group controlId="SamadhanID">
          <Form.Label>Samadhan ID</Form.Label>
          <Form.Control
            type="text"
            value={userData.SamadhanID}
            placeholder="Samadhan ID"
            onChange={getUserData}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={userData.Name}
            type="text"
            placeholder="Name"
            onChange={setData}
          />
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder={userData.Email} readOnly />
        </Form.Group>
        <Form.Group controlId="OfficeLocation">
          <Form.Label>Office Location</Form.Label>
          <Form.Control
            value={userData.OfficeLocation}
            type="text"
            placeholder="Office Location"
            onChange={setData}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create an Account
        </Button>
      </Form>
    </React.Fragment>
  );
}
