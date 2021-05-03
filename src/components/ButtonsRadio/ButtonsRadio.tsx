import * as React from 'react';
import clsx from 'clsx';
import styles from './ButtonsRadio.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { editPostAction, Task } from '../../redux/actions';
import { RadioGroup } from '../../components-atoms/RadioGroup/RadioGroup';
import { Radio } from '../../components-atoms/Radio/Radio';

interface Props {
  className?: string;
  id: number;
}

const Component: React.FC<Props> = ({ className, id }) => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  let editedPost = useSelector((state: Task[]) =>
    state['posts'].filter((post: Task) => post.id === id),
  );

  const handleChange = (event: any) => {
    setValue(event.target.value);
    dispatch(
      editPostAction({
        ...editedPost[0],
        savedStyle: event.target.value,
      }),
    );
  };

  return (
    <div className={clsx(className, styles.root)} >
      <RadioGroup onChange={(event) => handleChange(event)}>
        <Radio text="B" value="bold" name="styles" />
        <Radio text="I" value="italic" name="styles" />
        <Radio text="U" value="underline" name="styles" />
      </RadioGroup>
    </div>
  );
};

export { Component as ButtonsRadio };
