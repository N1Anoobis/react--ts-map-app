import * as React from 'react';
import { ReactNode } from 'react';
import clsx from 'clsx';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import styles from './Currencies.module.scss'

interface Props  {
  children: ReactNode;
  className?: string;
}

const Component:React.FC<Props> = ( { className, children }) => {
  return (
  <div className={clsx(className, styles.root)}>
    <h2>Currencies</h2>
  {children}
  </div>
  )
}

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { 
  Component as Currencies,
  // Container as Currencies ,
  // Component as CurrenciesComponent  
 };
