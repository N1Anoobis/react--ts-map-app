import * as React from 'react';
import clsx from 'clsx';
import styles from './NavBar.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import  AddTask  from '../AddTask/AddTask';
import { fetchPosts } from '../../redux/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  className?: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const history = useHistory();
  const dispatch = useDispatch();


useEffect(() => {
dispatch(fetchPosts());
}, [])

  const handleClick = (destination?: string) => {
    destination ? history.push(`${destination}`) : null;
  };

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar className={styles.bar} position="static" color="primary">
        <Toolbar>
          <Button
            className={styles.btn}
            onClick={() => handleClick('/')}
            color="secondary"
            variant="outlined"
          >
            Home
          </Button>
          <AddTask
          >
            AddTask
          </AddTask>
          <Button
            className={styles.btn}
            onClick={() => handleClick('/currencies')}
            color="secondary"
            variant="outlined"
          >
            Currencies
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export {
  Component as NavBar,
};
