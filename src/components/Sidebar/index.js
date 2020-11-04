/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";
import {Accordion,AccordionDetails,AccordionSummary,Typography,ListItemIcon,Collapse   } from '@material-ui/core';
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// MuiPaper-root MuiAccordion-root Mui-expanded MuiAccordion-rounded MuiPaper-elevation1 MuiPaper-rounded
// background: transparent;

const useStyles = makeStyles(styles);
const useStyle = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    disNone: {
      position:"absolute",
      top:'13px',
      right:'5px'
    },
    yellow:{
      background:'rgba(0,172,193,.4)'
    }, 
    nested: {
      paddingLeft: theme.spacing(4),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

function Cai(){
  const classe = useStyle();

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      console.log('dsffs')
      setExpanded(isExpanded ? panel : false);
    };
    return (
<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classe.heading}>General settings</Typography>
              <Typography className={classe.secondaryHeading}>I am an accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
    )
}

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const classe = useStyle();

    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
    const handleChange = (panel) => (event, isExpanded) => {
      console.log('dsffs')
      setExpanded(isExpanded ? panel : false);
    };

  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list} component="nav">
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        var covAcClas = classNames({
          [" " + classe['yellow']]: activeRoute(prop.path)
        });
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        if (prop.children) {

            return(
              // <div key={key} className={classes.item+ classes.itemLink + listItemClasses}>
              <div key={key} className={classes.item}>
                          
                <ListItem onClick={handleClick} button className={classes.itemLink +covAcClas }>
                  
                    {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
              {open ? <ExpandLess className={classe.disNone}/> : <ExpandMore  className={classe.disNone}/>}

                </ListItem>
                {
                  prop.children.map((item, keyss)=>{
                    let childListItemClasses = classNames({
                      [" " + classes[color]]: activeRoute(prop.path + item.path)
                    });
                    return <Collapse key={keyss} in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding >
                    <NavLink
            to={prop.path + item.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
                    <ListItem button className={classes.itemLink + childListItemClasses +' ' + classe.nested}>
                  
                  {typeof prop.icon === "string" ? (
              <Icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.itemIconRTL]: props.rtlActive
                })}
              >
                {item.icon}
              </Icon>
            ) : (
              <item.icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.itemIconRTL]: props.rtlActive
                })}
              />
            )}
            <ListItemText
              primary={props.rtlActive ? prop.rtlName : item.name}
              className={classNames(classes.itemText, whiteFontClasses, {
                [classes.itemTextRTL]: props.rtlActive
              })}
              disableTypography={true}
            />
              </ListItem>
              </NavLink>
                      {/* <ListItem button className={classe.nested +activePro + classes.item}>

                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItem> */}
                    </List>
                  </Collapse>
                  })
                }
              </div>
              )
        }
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="https://www.creative-tim.com?ref=mdr-sidebar"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
