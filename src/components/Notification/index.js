import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const Notification = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar open={ open } autoHideDuration={6000} onClose={ onClose }>
      <Alert onClose={ onClose } severity={ severity }>
        { message }
      </Alert>
    </Snackbar>
  )
};