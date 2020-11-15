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
import CSelect from 'components/CForm/CSelect.js'
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
  },
  acMenu:{
    background: 'rebeccapurple',
    color: '#fff'
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
    const {open,onClose,data,onFinish,authorityOption} = props
  const [scroll, setScroll] = React.useState('paper');
  const [title, setTitle] = useState("新增菜单");
  const [name, setName] = useState("");
  const classes = useStyles();


  const [state, setState] = React.useState({
    parentId: "0",
    authorityId: "0",
    authorityName: "普通用户"
  });
//   const classes = useStyles();
  const [age, setAge] = React.useState('根角色');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSChange = (item) => {
      // console.log(event,'eeeeeeee')
    // setAge(item.label);
    setState({...state,parentId:item.ckey});

    // handleCloseMenu()
  };
  const setSelect = (option,id)=>{
    console.log(option,id)

    let o = option.find((item)=>{
      if (item.ckey == id) {
        setAge(item.label)
      }
      if (item.children&&item.children.length) {
        return item.ckey == id || setSelect(item.children,id)
      }
      return item.ckey == id
    })
    if (o) {
      return true
    }
    return false
  }
  // copy
  const [old, setold] = useState('');
  const init = ()=>{
    const {
      authorityId="",
      authorityName= "",
      parentId='0',
      type='add'
      } = data
    if (type == 'edit') {
      setTitle('编辑角色')
    }else if (type == 'add'){
      setTitle('新增角色')
    } else{
      setold(authorityId)
      setTitle('复制角色')
    }
    setSelect(authorityOption,parentId)
    setName(name)
    let obj ={
      authorityId,
      authorityName,
      parentId
    }
    console.log(obj,'jjjjjssssss')
    setState(obj)
  }
    const handleInputChange = (event) => {
        console.log(event.target)
        setState({ ...state, [event.target.name]: event.target.value });
    };
        
const setStates = (keys) => (event) => {
    setState({ ...state, [keys]: event.target.value });
  };


  const descriptionElementRef = React.useRef(null);


  const formClasses = useFormStyles();
  const dialogClasses = useDialogStyles();

  // [{label:'根角色',ckey:'0'},{label:'测试2',ckey:'8881',children:[{label:'测试子',ckey:'8882',}]}]
  const save = async () => {
    let url = API.URL.CreateAuthority
    let p = state
    if (data.type == 'edit') {
      url = API.URL.UpdateAuthority
    }
    console.log(data,'daddddddddd')
    if (data.type == 'copy') {
      url = API.URL.CopyAuthority
      p={
        authority:{
          ...state,
          dataAuthorityId:data.dataAuthorityId
        },
        oldAuthorityId:old
      }
    }

    API.reqJson(url,'post',p).then((res)=>{
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

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    init()
  }, [open,data,authorityOption]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleCloseMenu = () => {
    let m =_input.querySelector('input')
    setTimeout(() => {
      m.blur()
      
    }, 50);
    console.log(_input,m.blur,m.onblur,'iniiiii')
    setAnchorEl(null);
  };
  const handleClickMenu = (event) => {
    if (title == '新增角色') {
      return
    }
    setAnchorEl(event.currentTarget);
  };

  let _input;
  console.log('dsfffffffffff')

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
        {/* <Button onClick={handleClickMenu}>
  Open Menu
</Button> */}
        <FormControl className={classes.formControl} disabled={false}>
          <CSelect 
            disabled={title=='新增角色'}
            defaultValue={state.parentId}
            options={authorityOption}
            onChange={handleSChange}
            ></CSelect>
            {/* <TextField disabled={title=='新增角色'}  ref={(c) => _input = c} onClick={handleClickMenu} aria-controls="simple-menu" aria-haspopup="true"  value={age} />
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            >
                              {
                    authorityOption.map((item,index)=>{
                        return (<div key={item.ckey+index}><MenuItemChildren act={data.parentId} click={handleSChange} value={item.ckey} valu={item.ckey} item={item} label={item.label} data={item.children}></MenuItemChildren></div>)
                    }) 
                }
            </Menu> */}
        </FormControl>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h6" component="h6">
                *角色ID
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <TextField disabled={data.type=='edit'} required name='authorityId' onChange={handleInputChange} value={state.authorityId} />
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h6" component="h6">
                *角色名称
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <TextField required id="standard-required" name='authorityName' value={state.authorityName} onChange={handleInputChange}/>
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
          <Button onClick={onSave} color="primary">
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
    },
    spanf:{
      display:'block',
      width:"100%"
    },
    acMenu:{
      background: 'rebeccapurple',
    }
});

const MenuItemR = React.forwardRef((props, ref) => (
  <MenuItemChildren {...props} innerRef={ref} />
));

function MenuItemChildren(props) {
    // 用value会被干掉 udefined
    const {data,valu,label,item={},level=0,className='',click,act} = props
    const list = data||[]
    const classes = useMenuItemChildrenStyles();
    const [open, setOpen] = useState(false);
    const style={
        paddingLeft:`${level*15+16}px`
    }

    const onClick=(e)=>{
        console.log(valu)
        click(item)
    }

    return (
        <React.Fragment>
            <MenuItem className={className + ' ' + classnames({[classes.acMenu]:act==valu})} style={style} value={valu}>
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
                <span className={classes.spanf} onClick={onClick}>
                    {
                        label
                    }
                </span>
            </MenuItem>
            {
                list.map((item,index)=>{
                    return (<MenuItemChildren act={act} level={level+1} click={click} key={valu+index} className={classnames({[classes.show]:open,[classes.hidden]:!open})} valu={item.ckey} label={item.label} data={item.children}>
                    </MenuItemChildren>)
                })

            }
        </React.Fragment>  
    )
}