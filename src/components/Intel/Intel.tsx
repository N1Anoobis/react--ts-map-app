import * as React from 'react';
import clsx from 'clsx';
import styles from './Intel.module.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchIntel, resetIntelAction } from '../../redux/actions';
import { useEffect } from 'react';

interface Props {
  className?: string;
}

interface Params {
  id: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const intel = useSelector((state) => state['intel']);
  const dispatch = useDispatch();

    console.log(intel);
  useEffect(() => {
    return () => {
      dispatch(resetIntelAction());
    };
  }, [intel]);

  return (
    <Card className={clsx(className, styles.root)}>
      {/* {intel && (
        <CardActionArea>
          <CardMedia
            // className={classes.media}
            image={intel.flag}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {intel.subregion}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {intel.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {intel.currencies[0].name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {intel.capital}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {intel.languages[0].name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {intel.nativeName}
            </Typography>
          </CardContent>
        </CardActionArea>
      )} */}
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export { Component as Intel };
