import React from 'react';
import clsx from 'clsx';
import styles from './Table.module.scss';
import { Currencies } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { ColumnDefinition } from './Table';

interface TableRowsProps {
  data: Array<Currencies>;
  columns: Array<ColumnDefinition>;
  className?: string;
}

const TableRows = ({ data, columns, className }: TableRowsProps): JSX.Element => {
  const history = useHistory();

  const checkRates = (code: string): void => {
    history.push(`/currencies/${code}/rates`);
  };

  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`} className={clsx(className, styles.rowLines)}>
        {columns.map((column, index2) => {
          return (
            <td
              key={`cell-${index2}`}
              className={styles.rootRows}
              onClick={() => column.key === 'code' && checkRates(row.code)}
            >
              {row[column.key]}
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default TableRows;
