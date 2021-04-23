import * as React from 'react';
import { ReactNode } from 'react';
import clsx from 'clsx';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import styles from './NavBar.module.scss';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import  AddTask  from '../AddTask/AddTask';

interface Props {
  // children: ReactNode;
  className?: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const history = useHistory();

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
            // className="true"
          // className={styles.btn}
          // onClick={() => handleClick()}
          // color="secondary"
          // variant="outlined"
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

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NavBar,
  // Container as NavBar ,
  // Component as NavBarComponent
};
