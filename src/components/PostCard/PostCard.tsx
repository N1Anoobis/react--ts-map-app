import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import styles from './PostCard.module.scss';
import Post from '../Post/Post';
import { Task } from '../../redux/actions';
interface Props {
  className?: string;
}

const Component: React.FC<Props> = ({ className }) => {
  const posts = useSelector((state) => state);
  let items: Array<Task>;
  const getItems = () => {
    items = Object.values(posts);
    console.log(items)
    return items;
  };

  return (
    <div className={clsx(className, styles.root)}>
      {getItems().map((post: Task) => (
        <Post data={post} />
      ))}
    </div>
  );
};

export {
  Component as PostCard,
  // Container as PostCard ,
  // Component as PostCardComponent
};
