import Alert from 'react-bootstrap/Alert'
import React, { useState } from 'react';
import { Button } from "react-bootstrap";


//const AlertDismissibleExample({title, info}) {  
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

/*
    Minty  Alert
    <div class="alert alert-dismissible alert-secondary">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
   </div>  
*/