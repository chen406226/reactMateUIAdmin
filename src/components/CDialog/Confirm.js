import React, {useState, useImperativeHandle,forwardRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Warning from '@material-ui/icons/Warning';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props,ref) {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState({title:'提示',con:"内容"});
    const [pro, setPro] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const $confirm = ({title='提示',con='内容'})=>{
    setOpen(true)
    setdata({...data,title,con})
    return new Promise((res,rej)=>{
        setPro({res,rej})
        // useState不能接受函数，会直接执行
    })
  }
  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    $confirm
}));
  const handleClose = () => {
    // pro.rej(false)
    pro.res(false)
    setOpen(false);
  };
  const handleOk = () => {
    pro.res(true)
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Warning></Warning>
                {data.con}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default forwardRef(AlertDialog)