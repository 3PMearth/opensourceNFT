import Alert from 'react-bootstrap/Alert'
import React, { useState } from 'react';
import { Button } from "react-bootstrap";

const AlertText = ({ title, info }) => {
  const [show, setShow] = useState(false);
  console.log('show : '+show);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>
          {info}
        </p>
      </Alert>
    );
  }
  return <></>;
}

export default AlertText;

