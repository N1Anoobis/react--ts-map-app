import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { Dispatch } from 'redux';
import { addPostAction } from '../../redux/actions';
import { PostActionsTypes } from '../../redux/actions';
import styles from './AddTask.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  className?: string;
  // children?: string;
}

interface NewNoteInputProps {
  addNote(note: string): void;
}

const AddTask: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setContent('');
  };

  const updateNote = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const onAddNoteClick = () => {
    const id = Math.floor(Math.random() * (1000 - 1)) + 1;
    dispatch(addPostAction(id, content));
    setContent('');
    setOpen(false);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Button className={styles.btn} variant="outlined" color="primary" onClick={handleClickOpen}>
        AddTask
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Where to ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A journey of a thousand miles begins with a single step
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="enter your idea"
            type="text"
            fullWidth
            onChange={updateNote}
            value={content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onAddNoteClick} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// const mapStateToProps = (state: any) => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
//   add: (id: number, note: string) => dispatch(uploadPost(id, note)),
// });

// const Container = connect(null, mapDispatchToProps)(Component);

export default AddTask;
// Container as AddTask,
// Component as AddTaskComponent
