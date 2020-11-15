import React,{useState,useEffect} from 'react';

import { withStyles ,IconButton,MenuItem,Grid,FormControl,Menu,TextField   } 
    from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

export default function CSelect(props) {
    const {onChange,options,defaultValue,disabled=false} = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [labelV, setlabelV] = useState('');
    const setSelect = (option,id)=>{
        let o = option.find((item)=>{
          if (item.ckey == id) {
            setlabelV(item.label)
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
    React.useEffect(() => {
        setSelect(options,defaultValue)
    }, [open,defaultValue,options]);  
    // 选中了 
    const handleSChange = (item) => {
      if (item.ckey == defaultValue) {
          return
      }
      // onChange
      setlabelV(item.label);  
      handleCloseMenu()
      onChange(item)
    };

    const handleCloseMenu = () => {
      let m =_input.querySelector('input')
      setTimeout(() => {
        m.blur()
      }, 50);
      setAnchorEl(null);
    };
    const handleClickMenu = (event) => {
      if (disabled) return
      setAnchorEl(event.currentTarget);
    };
    const [_input, set_input] = useState(null);

    return(<React.Fragment>
        <TextField 
            disabled={disabled}  
            ref={(c) =>set_input(c)} 
            onClick={handleClickMenu} 
            aria-controls="simple-menu" 
            aria-haspopup="true"  
            value={labelV} />
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        >
                            {
                options.map((item,index)=>{
                    return (<div key={item.ckey+index}><MenuItemChildren act={defaultValue} click={handleSChange} value={item.ckey} valu={item.ckey} item={item} label={item.label} data={item.children}></MenuItemChildren></div>)
                }) 
            }
        </Menu>
    </React.Fragment>)
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