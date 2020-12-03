import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton,
  Switch, FormControlLabel, TextField, Typography,
  withStyles, Select, MenuItem, Grid, FormControl, Menu
} from '@material-ui/core';
import classnames from 'classnames'
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CSelect from 'components/CForm/CSelect.js'
import { makeStyles } from '@material-ui/core/styles';
import API from '@/api'

const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  root: {
      flexGrow:1,
  },
  formRoot: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  dialogContent:{
    padding: theme.spacing(2),
  },
  acMenu:{
    background: 'rebeccapurple',
    color: '#fff'
  }
}));

const DialogTitlestyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(DialogTitlestyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


export default function UserAdd(props) {
  const {open,onClose,data,onFinish,authorityOption} = props
  const [title, setTitle] = useState("新增菜单");

  const classes = useStyles();
  const [state, setState] = React.useState({
    username: "",
    password: "",
    nickName: "",
    headerImg: "",
    authorityId: "",
  });
  const handleInputChange = (event) => {
    console.log(event.target)
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSChange = (item) => {
    console.log(item)
    setState({...state,authorityId:item.ckey})
  };
  const save = async () => {
    let url = API.URL.Register
    if (data.type == 'edit') {
      url = API.URL.SetUserInfo
    }
    API.reqJson(url,'post',state).then((res)=>{
      console.log(res,'rrrrrrrrrr')
      if (onFinish) {
        onFinish()
      }
      onClose()
    }).catch(()=>{onClose()})

  }
  const onSave = ()=>{
    save()
  }
  return (<div>
    <Dialog
      open={open}
      maxWidth={'sm'}
      onClose={onClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        {title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        <form className={classes.formRoot} noValidate autoComplete="off">
          <div>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Typography variant="h6" component="h6">用户名</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField disabled={data.type=='edit'} required name='username' onChange={handleInputChange} value={state.username} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" component="h6">密码</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField disabled={data.type=='edit'} required name='password' onChange={handleInputChange} value={state.password} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" component="h6">别名</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField disabled={data.type=='edit'} required name='nickName' onChange={handleInputChange} value={state.nickName} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" component="h6">用户角色</Typography>
              </Grid>
              <Grid item xs={9}>
                <CSelect 
                  defaultValue={state.authorityId}
                  options={authorityOption}
                  onChange={handleSChange}
                  ></CSelect>
              </Grid>
            </Grid>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onSave} color="primary">Subscribe</Button>
      </DialogActions>
    </Dialog>
  </div>)
}

