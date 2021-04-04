import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { Pen, Eye } from "react-bootstrap-icons";
import { FullView } from "./fullView";
import { postComms } from "./axios/communication";
import Loading from "react-fullscreen-loading";
import Swal from "sweetalert2";

import "./css/commsTools.css";

export function CreateNotice(props) {
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msgState, setMsgState] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (heading === "") setMsgState(1);
      else {
        const newFile = new FormData();
        newFile.append("file", file);
        setLoading(true);
        await postComms(heading, body, newFile);
        Swal.fire("Posted", "", "success").then(() => {
          window.location.reload();
        });
      }
    } catch (e) {
      setMsgState(2);
    }
    setLoading(false);
  };
  const Msg = (props) => {
    if (props.state === 1)
      return <Alert variant="danger"> Heading is Required </Alert>;
    if (props.state === 2)
      return <Alert variant="danger">Error: Check file Type </Alert>;
    return null;
  };
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Loading
        loading={loading}
        background="rgba(0,0,0,0.8)"
        loaderColor="#3498db"
      />
      <Modal.Header closeButton>
        <Modal.Title
          style={{ fontSize: "30px" }}
          id="contained-modal-title-vcenter"
        >
          Create Notice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Msg state={msgState} />
        <Form onSubmit={handleSubmit}>
          <Form.Group
            style={{ textAlign: "left" }}
            controlId="formBasicHeading"
          >
            <Form.Control
              type="text"
              placeholder="Heading"
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicBody">
            <Form.Control
              placeholder="Body"
              as="textarea"
              rows={10}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
            <Form.Group>
              <Form.File
                id="FormControlAttachment1"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Form.Group>
          <Button
            type="submit"
            style={{ margiTop: "20px", float: "right" }}
            variant=""
          >
            <Pen />
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer> </Modal.Footer>
    </Modal>
  );
}

export function Cards(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
      <Alert variant="info" style={{ borderRadius: "0px" }}>
        <Alert.Heading style={{ fontSize: "1.8vh" }}>
          {props.date}
        </Alert.Heading>
        <h2 style={{ textAlign: "center", fontSize: "3.8vh" }}>
          {props.heading.length > 20
            ? props.heading.substring(0, 20) + "..."
            : props.heading}
        </h2>
        <hr />
        <p style={{ fontSize: "2.3vh" }}>
          {props.paragraph.length > 50
            ? props.paragraph.substring(0, 50) + "..."
            : props.paragraph}
        </p>
        <hr />
        <Button variant="" onClick={() => setModalShow(true)}>
          <Eye />
        </Button>
        <FullView
          img={props.img}
          date={props.date}
          heading={props.heading}
          paragraph={props.paragraph}
          attach={props.attach}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Alert>
    </div>
  );
}
