import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Loading = (props) => {
  return (
    <div style={{marginTop: '1.5%'}}>
      <CircularProgress />
      <Typography display="block" variant="subtitle2" color="primary">{props.children}</Typography>
    </div>
  )
}

export default Loading;