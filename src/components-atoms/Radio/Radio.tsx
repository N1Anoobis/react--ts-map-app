import * as React from 'react';
import clsx from 'clsx';
import styles from './Radio.module.scss';

interface Props {
  className?: string;
  text: string;
  value: string;
  name: string;
}

const Component: React.FC<Props> = ({ className, text, value, name }) => {
  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <input
          type="radio"
          className={styles.checkmark}
          value={value}
          name={name}
        />
        <p>{text}</p>
      </div>
    </div>
  );
};

export { Component as Radio };
