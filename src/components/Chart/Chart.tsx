import * as React from 'react';
import clsx from 'clsx';
import styles from './Chart.module.scss'

interface Props  {
  className?: string;
}

const Component:React.FC<Props> = ( { className }) => {
  return (
  <div className={clsx(className, styles.root)}>
    <h2>Chart</h2>
  </div>
  )
}

export { 
  Component as Chart,
 };
