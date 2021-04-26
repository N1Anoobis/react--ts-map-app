import * as React from 'react';
import clsx from 'clsx';
import styles from './Chart.module.scss';
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
  SparklinesSpots,
} from 'react-sparklines';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Currencies, fetchSingleCoin } from '../../redux/actions';
import { useParams } from 'react-router';

interface Props {
  className?: string;
}

interface Params {
  code: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const params: Params = useParams();
  const fetchData = useSelector((state: Currencies[]) => state['currencies']);
  let chartCoin = [];
  let avg;
  let highestRate
  let lowestRate

  useEffect(() => {
    dispatch(fetchSingleCoin(params.code));
  }, []);

  if (fetchData) {
    for (const item of fetchData) {
      chartCoin.push(item.mid);
    }
    lowestRate = Math.min(...chartCoin);
    highestRate = Math.max(...chartCoin);
    const sum = chartCoin.reduce((a, b) => a + b, 0);
    avg = sum / chartCoin.length || 0;
    avg = avg.toFixed(2);
  }

  return (
    <div className={clsx(className, styles.root)}>
      <h3 className={styles.code}>{highestRate}</h3>
      {chartCoin && (
        <Sparklines data={chartCoin} limit={20} width={200} height={80}>
          <SparklinesLine color="#1c8cdc" />
          <SparklinesReferenceLine type="avg" />
          <SparklinesSpots />
        </Sparklines>
      )}
      <h3 className={styles.code}>{lowestRate}</h3>
      <br />
      <h4 className={styles.code}>
        <span className={styles.avg}>{avg}</span> - average {params.code} rate in last 20 days
      </h4>
    </div>
  );
};

export { Component as Chart };
