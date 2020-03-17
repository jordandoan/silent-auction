import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const Success = ({url ="/", loading, open, setOpen, children, ...rest}) => {
  const history = useHistory();

  useEffect(() => {
    if (open && !loading) {
      setTimeout(() => handleClose(), 1800)
    }
  }, [open, loading])

  const handleClose = () => {
    if (!loading) {
      history.push(url)
      setOpen(false);
    }
  }
  return (
    <Backdrop style={{zIndex: 1}} open={open} onClick={handleClose}>
      <Paper>
        {loading && <CircularProgress />}
        {!loading && <>
          <img src="https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png" alt="Green checkmark"/>
          <Typography variant="h4">Success</Typography>
          <Typography>{children}</Typography>
          <Typography variant="body1">Redirecting soon... Please click if you do not redirect automatically. </Typography></>}
      </Paper>
    </Backdrop>
  )
}

export default Success;