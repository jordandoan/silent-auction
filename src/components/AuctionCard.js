import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTime from '@material-ui/icons/AccessTime';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CardContent from '@material-ui/core/CardContent';
import PersonIcon from '@material-ui/icons/Person';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';



const useStyles = makeStyles({
  // root: {
  //   width: '15%',
  //   maxWidth: '345px',
  //   margin: '.5% 1%'
  // },
  media: {
    height: 200,
    objectFit: 'contain',
  },
  span: {
    marginLeft: '5px',
  },
  header: {
    textAlign: 'left',
  }
});

export default function MediaCard({ auction }) {
  const history = useHistory();
  const classes = useStyles();
  const timeLeft = formatDistanceToNow(new Date(auction.date_ending));
  return (
    <Grid item xs={12} lg={2}>
      <Card className={classes.root}>
        <CardContent className={classes.header}>
        <Button size="small" disabled>
            <AttachMoney fontSize="small" /> {auction.current_price}
          </Button>
          <Button size="small" disabled>
            <AccessTime fontSize="small" /> <span className={classes.span}>{timeLeft}</span>
        </Button>
        </CardContent>
        <CardMedia
          className={classes.media}
          component="img"
          image={auction.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {auction.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {auction.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => {history.push(`/auctions/auction/${auction.id}`)}}>
            View Item
          </Button>
          {auction.seller && <Button size="small" disabled>
            <PersonIcon fontSize="small"/> {auction.seller}
          </Button>}
        </CardActions>
      </Card>
    </Grid>
  );
}