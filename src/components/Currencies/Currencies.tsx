import * as React from 'react';
import clsx from 'clsx';
import styles from './Currencies.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from '../../redux/actions';
import Table from '../../components-atoms/Table/Table';
import { ColumnDefinition } from '../../components-atoms/Table/Table';

interface Props {
  className?: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const currencies = useSelector((state) => state['currencies']);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const columns: ColumnDefinition[] = [
    {
      key: 'currency',
      header: 'Currency',
    },
    {
      key: 'code',
      header: 'Code',
    },
    {
      key: 'mid',
      header: 'Rate',
    },
  ];

  return <Table data={currencies} columns={columns} className={clsx(className, styles.root)} />;
};

export { Component as Currencies };
