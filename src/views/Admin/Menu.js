import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import API from '@/api'
import { Button,ButtonGroup ,TablePagination} from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Table from '@material-ui/core/Table';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddMenu from './Menu/Add'
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  table: {
    minWidth: 1700,
  },
  wid100: {
    width: "100px",
    boxSizing: 'border-box'
  },
  wid70: {
    boxSizing: 'border-box',
    width: "70px"
  },
  wid200: {
    boxSizing: 'border-box',
    width: "200px"
  },
  wid300: {
    boxSizing: 'border-box',
    width: "300px"
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const [open, setOpen] = React.useState(false);

  const doOpen = ()=>{setOpen(true)}
  const doClose = ()=>{setOpen(false)}

  const [pageO, setPageO] = useState({page:0,pageSize:10});
  const [total, setTotal] = useState(6);
  const [menuList, setmenuList] = useState([]);
  const setStates = (v)=>{
    setPageO(Object.assign({},pageO,v))
  }
  const handleChangePage = (event, newPage) => {
    setPageO({page:newPage});
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getMenuList = async () => {
    
    API.reqJson(API.URL.GetMenuList,'post',pageO).then((res)=>{
      console.log(res,'rrrrrrrrrr')
      setmenuList(res.data.list||[])
      setTotal(res.data.total)
    })
  }

  const [editData, seteditData] = useState({});
  const edit = (row)=>{
    seteditData({...row})
    doOpen()
  }
  const addMenu = ()=>{
    seteditData({})
    doOpen()
  }

  React.useEffect(() => {
    getMenuList()
  }, []);


  const tableHeadKey = [
    // {label:"",ckey:''},
    // {label:"ID",ckey:'ID'},
  {label:"路由Name",ckey:'name',class:'wid200'},
  {label:"路由Page",ckey:'path',class:'wid200'},
  {label:"是否隐藏",ckey:'hidden',class:'wid100'},
  {label:"父节点",ckey:'parentId',class:'wid100'},
  {label:"排序",ckey:'sort',class:'wid70'},
  {label:"文件路径",ckey:'component',class:'wid200'},
  {label:"展示名称",ckey:'title',class:'wid200'},
  {label:"图标",ckey:'icon',class:'wid200'}
]


  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            {/* <h4 className={classes.cardTitleWhite}>Simple Table</h4> */}
            <Button className={classes.cardTitleWhite} onClick={addMenu} color="primary">新增根菜单</Button>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table stickyHeader className={classes.table} aria-label="enhanced table">
                <TableHead>
                  <TableRow>
                  <TableCell  className={classes.wid100}><span>ID</span></TableCell>
                    {
                      tableHeadKey.map((item)=>{
                      return <TableCell className={classes[item.class]} key={item.ckey}><span>{item.label}</span></TableCell>
                      })
                    }
                  <TableCell  className={classes.wid300}>
                  操作
                  </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuList.map((row,index) => {
                    return (<Row edit={edit} row={row} tableHeadKey={tableHeadKey} level={0} key={index}>
                      {
                        tableHeadKey.map((ro,ind)=>{
                          let key = ro.ckey
                          if (key == 'hidden') {
                            return <TableCell key={key}>
                              <span>{row[key] ? '是' : '否'}</span>
                            </TableCell>
                          } else if (key == 'title') {
                            return <TableCell key={key}>
                              <span>{row['meta'][key]}</span>
                            </TableCell>
                          } else if (key == 'icon') {
                            return <TableCell key={key}>
                              <span>{row['meta'][key]}</span>
                            </TableCell>
                          }else{
                            return <TableCell key={key}>
                              <span>{row[key]}</span>
                            </TableCell>
                          }
                        })
                      }
                    </Row>)

                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              rowsPerPage={pageO.pageSize}
              page={pageO.page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </CardBody>
        </Card>
      </GridItem>

      <AddMenu data={editData} open={open} onClose={doClose}/>
    </GridContainer>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  table:{
    minWidth:1700,
    maxHeight:200
  },
  inl:{
    display:'inline-block'
  },
  wid100: {
    width: "100px",
    boxSizing: 'border-box'
  },
  wid300: {
    width: "300px",
    boxSizing: 'border-box'
  },
  wid70: {
    boxSizing: 'border-box',
    width: "70px"
  },
  wid200: {
    boxSizing: 'border-box',
    width: "200px"
  }
});

function Row(props) {
  const { row,level,tableHeadKey } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let children =[]
  if (row.children) {
    children =row.children
  }

  const edit= ()=>{
    props.edit(row)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
      <TableCell className={classes.wid100}>
          {
            children.length>0?
          <IconButton
            aria-label="expand row"
            size="small"
            style={{transform: `translateX(${level*6}px)`}}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>:null
          }
          {row['ID']}
        </TableCell>
        {props.children}
        <TableCell  className={classes.wid300}>
          <ButtonGroup variant="contained" aria-label="contained primary button group">
            <Button>+子菜单</Button>
            <Button color="primary" onClick={edit}>编辑</Button>
            <Button color="secondary">删除</Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      {children.length > 0 ? (
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0
            }}
            colSpan={10}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* <Box margin={1}> */}
              <Table  className={classes.table} aria-label="enhanced table">
                <TableBody>
                  {children.map((historyRow, iii) => (
                    <Row edit={props.edit} tableHeadKey={tableHeadKey} row={historyRow} level={level+1} key={iii}>
                      {
                        tableHeadKey.map((ro,ind)=>{
                          let key = ro.ckey
                          if (key == 'hidden') {
                            return <TableCell className={classes[ro.class]+' '+classes.inl}  key={key}>
                              <span>{historyRow[key] ? '是' : '否'}</span>
                            </TableCell>
                          } else if (key == 'title') {
                            return <TableCell className={classes[ro.class]+' '+classes.inl} key={key}>
                              <span>{historyRow['meta'][key]}</span>
                            </TableCell>
                          } else if (key == 'icon') {
                            return <TableCell className={classes[ro.class]+' '+classes.inl} key={key}>
                              <span>{historyRow['meta'][key]}</span>
                            </TableCell>
                          }else{
                            return <TableCell className={classes[ro.class]+' '+classes.inl} key={key}>
                              <span>{historyRow[key]}</span>
                            </TableCell>
                          }
                        })
                      }
                    </Row>
                  ))}
                </TableBody>
              </Table>
              {/* </Box> */}
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null
      }
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.string.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired
//   }).isRequired
// };