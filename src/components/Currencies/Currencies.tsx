import * as React from 'react';
import clsx from 'clsx';
import styles from './Currencies.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Currencies, fetchCurrencies } from '../../redux/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';

interface Props {
  className?: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const history = useHistory();
  const currencies = useSelector((state) => state['currencies']);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const checkRates = (code: string) => {
    history.push(`/currencies/${code}/rates`);
  };

  return (
    <TableContainer component={Paper} className={clsx(className, styles.root)}>
      <Table aria-label="simple table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Code</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies &&
            currencies.map((row: Currencies) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.currency}
                </TableCell>
                <TableCell
                  align="right"
                  className={styles.code}
                  onClick={() => checkRates(row.code)}
                >
                  {row.code}
                </TableCell>
                <TableCell align="right">{row.mid}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { Component as Currencies };
