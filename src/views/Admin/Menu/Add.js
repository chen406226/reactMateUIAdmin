import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



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
    const {open,onClose} = props
  const [scroll, setScroll] = React.useState('paper');
  const [title, setTitle] = useState("新增菜单");
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
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
  const handleChange = (event) => {
      console.log(event.target)
      setState({ ...state, [event.target.name]: event.target.checked });
    };
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

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
      <Dialog
        open={open}
        maxWidth={'md'}
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
        <TextField required id="standard-required" label="路由name" value={name} onChange={handleSetName}/>
        <TextField required id="standard-password-input" label="路由path" value={path} onChange={handleSetPath}/>
        <TextField disabled label="父节点id" value={state.parentId}/>
        <TextField required label="文件路径" name='component' value={state.component} onChange={setStates('component')}/>
        <TextField required label="展示名称" name='title' value={state.title} onChange={handleInputChange}/>
        <TextField  label="图标" name='icon' value={state.icon} onChange={handleInputChange}/>
        <TextField type="number" InputLabelProps={{
            shrink: true,
        }} label="排序标记" name='sort' value={state.sort} onChange={handleInputChange}/>
        <FormControlLabel value="top" label="隐藏"labelPlacement="top"
          control={<Switch checked={state.hidden} onChange={handleChange} name="hidden"  color="primary" />}
        />
        <FormControlLabel value="top" label="keepAlive"labelPlacement="top"
          control={<Switch checked={state.keepAlive} onChange={handleChange} name="keepAlive"  color="primary" />}
        />
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
