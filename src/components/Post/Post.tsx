import * as React from 'react';
import clsx from 'clsx';
import styles from './Post.module.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Task } from '../../redux/actions';
import { ButtonsRadio } from '../ButtonsRadio/ButtonsRadio';
import { useDispatch } from 'react-redux';
import { removePost, editPostAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components-atoms/Button/Button';

interface Props {
  className?: string;
  data: Task;
}

const Post: React.FC<Props> = ({ className, data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [style, setStyle] = useState<any | null>(null);
  let styleForText: any | null;

  useEffect(() => {
    getStyle();
  }, [data.savedStyle]);

  const getStyle = () => {
    if (data.savedStyle === 'bold') {
      styleForText = { fontWeight: 'bold' };
    } else if (data.savedStyle === 'italic') {
      styleForText = { fontStyle: 'italic' };
    } else if (data.savedStyle === 'underline') {
      styleForText = { textDecoration: 'underline' };
    }
    setStyle(styleForText);
  };

  const handleClick = (destination: string) => {
    history.push(`${destination}`);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Card className={styles.media}>
        <CardActionArea>
          <CardMedia image="/static/images/cards/contemplative-reptile.jpg" />
          <CardContent spellCheck="false">
            <h5 className={styles.id}>{data.id}</h5>
            <div className={styles.radios}>
              <ButtonsRadio id={data.id} />
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                contentEditable
                suppressContentEditableWarning={true}
                style={style}
                className={styles.content}
                onBlur={(e: any) =>
                  dispatch(
                    editPostAction({
                      ...data,
                      content: e.target.textContent,
                    }),
                  )
                }
              >
                {data.content}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button text="Remove" onClick={() => dispatch(removePost(data.id))} />
          <Button text="Details" onClick={() => handleClick(`/post/${data.id}`)} />
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
