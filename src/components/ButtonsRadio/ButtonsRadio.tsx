import * as React from 'react';
import clsx from 'clsx';
import styles from './ButtonsRadio.module.scss';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { editPostAction, Task } from '../../redux/actions';

interface Props {
  className?: string;
  id: number;
}

const Component: React.FC<Props> = ({ className, id }) => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  let editedPost = useSelector((state: Task[]) => state.filter((post) => post.id === id));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(
      editPostAction({
        ...editedPost[0],
        savedStyle: event.target.value,
      }),
    );
  };

  return (
    <FormControl component="fieldset" className={clsx(className, styles.root)}>
      <RadioGroup aria-label="group" name="group" value={value} onChange={handleChange}>
        <FormControlLabel value="bold" control={<Radio />} label="B" />
        <FormControlLabel value="italic" control={<Radio />} label="I" />
        <FormControlLabel value="underline" control={<Radio />} label="U" />
      </RadioGroup>
    </FormControl>
  );
};

export { Component as ButtonsRadio };
