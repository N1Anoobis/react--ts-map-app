import * as React from 'react';
import clsx from 'clsx';
import styles from './ButtonsRadio.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { editPostAction, Task } from '../../redux/actions';
import { RadioGroup } from '../../components-atoms/RadioGroup/RadioGroup';
import { Radio } from '../../components-atoms/Radio/Radio';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
  id: number;
}

const Component: React.FC<Props> = ({ className, id }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  let editedPost = useSelector((state: Task[]) =>
    state['posts'].filter((post: Task) => post.id === id),
  );
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    setRadioButtons(event.target.value);
    dispatch(
      editPostAction({
        ...editedPost[0],
        savedStyle: event.target.value,
      }),
    );
  };

  const setRadioButtons = (value: string) => {
    setBold(false);
    setItalic(false);
    setUnderline(false);
    if (value === 'bold') {
      setBold(true);
    } else if (value === 'italic') {
      setItalic(true);
    } else {
      setUnderline(true);
    }
  };

  useEffect(() => {
    if (editedPost[0].savedStyle) {
      setRadioButtons(editedPost[0].savedStyle);
    }
  }, []);

  return (
    <div className={clsx(className, styles.root)}>
      <RadioGroup onChange={(event) => handleChange(event)}>
        <Radio text="B" value="bold" name="styles" checked={bold} onChange={()=>{}}/>
        <Radio text="I" value="italic" name="styles" checked={italic} onChange={()=>{}}/>
        <Radio text="U" value="underline" name="styles" checked={underline} onChange={()=>{}}/>
      </RadioGroup>
    </div>
  );
};

export { Component as ButtonsRadio };
