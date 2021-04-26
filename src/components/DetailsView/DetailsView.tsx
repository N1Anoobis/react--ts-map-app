import * as React from 'react';
import clsx from 'clsx';
import styles from './DetailsView.module.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useSelector, useDispatch } from 'react-redux';
import { Task, fetchIntel } from '../../redux/actions';
import { useHistory, useParams } from 'react-router-dom';
import { Map } from '../Map/Map';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

interface Props {
  className?: string;
}

interface Params {
  id: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const params: Params = useParams();
  let currentPost = useSelector((state: Task[]) =>
    state['posts'].filter((post: Task) => post.id === Number(params.id)),
  );
  const history = useHistory();
  const [distance, setDistance] = useState('');
  const [country, setCountry] = useState('');
  const [marker, setMarker] = useState(0);
  const dispatch = useDispatch();
  const [state, setState] = useState(currentPost[0] || []);
  
  const crg = require('country-reverse-geocoding').country_reverse_geocoding();

  const getIntel = () => {
    setMarker(marker+1)
  };

  const handleClick = (destination: string) => {
    history.push(`${destination}`);
  };

  useEffect(() => {
       window.onbeforeunload = function () {
         return true;
       };
    if (currentPost) {
      geo();
      getCurrentLocation(currentPost);
    }
        return () => currentPost[0] = state
  }, [marker]);

  const geo = (): void => {
    if (currentPost[0]) {
      if (currentPost[0].hasOwnProperty('coord')) {
        if (currentPost[0].coord !== undefined) {
          if ('coord' in currentPost[0]) {
            const country = crg.get_country(
              currentPost[0].coord['lat'],
              currentPost[0].coord['lng'],
            ).name;
            setCountry(country);
            dispatch(fetchIntel(country));
            setState(currentPost[0]);
          }
        }
      }
    }
  };

  const getCurrentLocation = (post: Task): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (currentPost[0]) {
          if (currentPost[0].hasOwnProperty('coord')) {
            if (currentPost[0].coord !== undefined) {
              if ('coord' in post[0]) {
                var radlat1 = (Math.PI * position.coords.latitude) / 180;
                var radlat2 = (Math.PI * post[0].coord['lat']) / 180;
                var theta = position.coords.longitude - post[0].coord['lng'];
                var radtheta = (Math.PI * theta) / 180;
                var dist =
                  Math.sin(radlat1) * Math.sin(radlat2) +
                  Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist);
                dist = (dist * 180) / Math.PI;
                dist = dist * 60 * 1.1515;
                dist = dist * 1.609344;
                dist = Math.floor(dist);
                setDistance(String(dist));
              }
            }
          }
        }
      });
    }
  };

  return (
    <Card className={clsx(className, styles.root)}>
      <CardActions>
        {country && (
          <Button className={styles.btn} onClick={() => handleClick(`/post/${params.id}/${country}/`)}>
            INTEL
          </Button>
        )}
      </CardActions>
      <div>{distance && <div className={styles.dist}>distance: {distance} km</div>}</div>
      <CardContent>
        <Map getIntel={getIntel} />
      </CardContent>
    </Card>
  );
};

export { Component as DetailsView };
