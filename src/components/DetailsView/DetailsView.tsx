import * as React from 'react';
import clsx from 'clsx';
import styles from './DetailsView.module.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { Task } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Map } from '../Map/Map';
interface Props {
  className?: string;
}

interface Params {
  id: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const params: Params = useParams();
  let currentPost = useSelector((state: Task[]) => state.filter((post) => post.id === Number(params.id)));
  console.log(currentPost);
  
  return (
    <Card className={clsx(className, styles.root)}>
      <CardActions>
        <Button>BACK</Button>
      </CardActions>
      <CardContent>
        {/* <div>{currentPost[0].content}</div> */}
        <Map />
      </CardContent>
    </Card>
  );
}

export { Component as DetailsView };
