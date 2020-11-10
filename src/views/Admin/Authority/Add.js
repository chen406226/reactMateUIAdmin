import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useForm } from "react-hook-form";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import classnames from 'classnames'
// import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Typography from '@material-ui/core/Typography';
import { withStyles ,Select,MenuItem,Grid,FormControl,Menu  } from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import API from '@/api'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { div } from 'prelude-ls';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
      flexGrow:1,
  }
});

function createData(type, key, value) {
  return {type, key, value };
}

const useDialogStyles = makeStyles((theme) => ({
    dialogCustomizedWidth: {
        'width': '80%'
      }
  }));
const useFormStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
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

export default function ScrollDialog(props) {
    const {open,onClose,data} = props
  const [scroll, setScroll] = React.useState('paper');
  const [title, setTitle] = useState("新增菜单");
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const classes = useStyles();


  useEffect(() => {
    
  }, []);
  const [state, setState] = React.useState({
    hidden: false,
    parentId: 0,
    component: 'wenjianlujing', // 文件路径
    title: '展示名称', // 展示名称
    icon: 'user', // 展示名称
    sort: 0, // 展示名称
    defaultMenu: false,
    keepAlive: false
  });
//   const classes = useStyles();
  const [age, setAge] = React.useState('189');
  const [openSelect, setOpenSelect] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSChange = (event) => {
      console.log(event,'eeeeeeee')
    setAge(event);
  };

  const handleClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };
  const init = ()=>{
    const {hidden= false,
      parentId= '0',
      meta={
      },
      name='',
      component= '',
      sort= 0, 
      path='',
      parameters =[],
      } = data
      const {
        keepAlive= false,defaultMenu= false,icon= 'user', title='展示名称',
      } = meta
    if (data.ID) {
      setTitle('编辑菜单')
    }else{
      setTitle('新增菜单')
    }
    setName(name)
    setPath(path)
    let obj ={
      hidden,
      parentId,
      component, 
      title, 
      icon, 
      sort,
      defaultMenu,
      keepAlive
    }
    setState(obj)
  }
    const handleInputChange = (event) => {
        console.log(event.target)
        setState({ ...state, [event.target.name]: event.target.value });
    };
        
const setStates = (keys) => (event) => {
    setState({ ...state, [keys]: event.target.value });
  };

  const handleSetName = (event) => {
    setName(event.target.value);
  };
  const handleSetPath = (event) => {
    setPath(event.target.value);
  };

  const descriptionElementRef = React.useRef(null);


  const formClasses = useFormStyles();
  const dialogClasses = useDialogStyles();

  const selectMenuList=[{
    label:'测试1',
    ckey:'ces'
},{
    label:'测试2',
    ckey:'ces1',
    children:[{
        label:'测试子',
        ckey:'cesz',
    }]
  }]

  const save = async () => {
    let form = {
      ID: 0,
      path,
      name,
      hidden: state.hidden,
      parentId: "0",
      component: state.component,
      meta: {
        title: state.title,
        icon: state.icon,
        defaultMenu: state.defaultMenu,
        keepAlive: state.keepAlive
      },
      parameters: queryList
    }
    API.reqJson(API.URL.addBaseMenu,'post',form).then((res)=>{
      console.log(res,'rrrrrrrrrr')
    })
  }

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    console.log(props.data,'dddddd')
//   init()

  }, [open,data]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickMenu = (event) => {
      console.log(event.currentTarget,'sdff')
    setAnchorEl(event.currentTarget);
  };
  const { handleSubmit, control } = useForm();
//   useFormControl
  return (
    <div>
      {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
      <Dialog
        open={open}
        maxWidth={'sm'}
        // classes={{ paperFullWidth: dialogClasses.dialogCustomizedWidth }}
        onClose={onClose}
        scroll={'body'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
          <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </DialogTitle>
        {/* <DialogTitle id="scroll-dialog-title">Subscribe
        
        </DialogTitle> */}
        <DialogContent dividers={scroll === 'paper'}>
        <form className={formClasses.root} noValidate autoComplete="off">
      <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
            <Typography variant="h6" component="h6">
                *父角色
            </Typography>
        </Grid>
        <Grid item xs={9}>
        <Button onClick={handleClickMenu}>
  Open Menu
</Button>
        <FormControl className={classes.formControl} disabled={false}>
            <TextField ref='sdf' onClick={handleClickMenu} aria-controls="simple-menu" aria-haspopup="true"  defaultValue={age} />
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu>
            {/* <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            // control={control}
            displayEmpty
            open={openSelect}
            onClose={handleClose}
            onOpen={handleOpen}
            defaultValue={age}
            value={age}
            onChange={handleChange}
            >
                {
                    selectMenuList.map((item,index)=>{
                        return (<MenuItemChildren click={handleSChange} value={item.ckey} key={item.ckey+index} valu={item.ckey} label={item.label} data={item.children}></MenuItemChildren>)
                    }) 
                }
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
            </Select> */}
        </FormControl>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h6" component="h6">
                *角色ID
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <TextField value={state.parentId}/>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h6" component="h6">
                *角色名称
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <TextField required id="standard-required" value={name} onChange={handleSetName}/>
        </Grid>
      </Grid>

        <div>
    </div>
      </div>
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const useMenuItemChildrenStyles = makeStyles({
    show: {
        display:'block',
    },
    hidden: {
        display:'none'
    }
});

function MenuItemChildren(props) {
    // 用value会被干掉 udefined
    const {data,valu,label,level=0,className='',click} = props
    const list = data||[]
    const classes = useMenuItemChildrenStyles();
    const [open, setOpen] = useState(false);
    const style={
        paddingLeft:`${level*15+16}px`
    }

    const onClick=(e)=>{
        console.log(valu)
        click(valu)
    }

    return (
        <React.Fragment>
            <MenuItem className={className} style={style} value={valu}>
                {
                    list.length>0?
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>:null
                }
                <span  onClick={onClick}>
                    {
                        label
                    }
                </span>
            </MenuItem>
            {
                list.map((item,index)=>{
                    return (<MenuItemChildren level={level+1} click={click} key={valu+index} className={classnames({[classes.show]:open,[classes.hidden]:!open})} valu={item.ckey} label={item.label} data={item.children}>
                    </MenuItemChildren>)
                })

            }
        </React.Fragment>  
    )
}