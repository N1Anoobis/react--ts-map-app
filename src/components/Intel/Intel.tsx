import * as React from 'react';
import clsx from 'clsx';
import styles from './Intel.module.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchIntel, resetIntelAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';

interface Props {
  className?: string;
}

interface Params {
  id: string;
  country: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const params: Params = useParams();
  const intel = useSelector((state) => state['intel']);
  const [state, setState] = useState(intel || {});

  useEffect(() => {
    dispatch(fetchIntel(params['country']));
    setState(intel)
    return () => {
      dispatch(resetIntelAction());
    };
  }, []);

  return (
    <Card className={clsx(className, styles.root)}>
      {intel[0] && (
        <CardActionArea className={styles.cont}>
          <Paper variant="outlined">
            <img src={intel[0][0].flag} />
          </Paper>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {intel[0][0].subregion}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {intel[0][0].name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              currency: {intel[0][0].currencies[0].name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              capital: {intel[0][0].capital}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              language: {intel[0][0].languages[0].name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              nativeName: {intel[0][0].nativeName}
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() =>
            window.open(`https://en.wikipedia.org/wiki/${params['country']}`, '_blank')
          }
        >
          wikipedia
        </Button>
      </CardActions>
    </Card>
  );
};

export { Component as Intel };
