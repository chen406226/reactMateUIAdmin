import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import API from '@/api'
import { Button,ButtonGroup ,TablePagination,FormControl} from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Table from '@material-ui/core/Table';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CDialogConfirm from "components/CDialog/Confirm.js";

import AddUser from './User/Add.jsx'
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CSelect from 'components/CForm/CSelect.js'

import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// const CDialogConfirm = React.forwardRef((props, ref) => (  <DialogConfirm forwardedRef={ref} {...props}>
// </DialogConfirm>
// ));

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
    minWidth: 700,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  headImg: {
    width:'40px',
    height:'40px'
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

export default function AuthorityList() {
  const [open, setOpen] = React.useState(false);

  const doOpen = ()=>{setOpen(true)}
  const doClose = ()=>{setOpen(false)}

  const [pageO, setPageO] = useState({page:0,pageSize:10});
  const [total, setTotal] = useState(6);
  const [menuList, setmenuList] = useState([]);
  const [authorityOption, setauthorityOption] = useState([]);

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

  const getUserList = async () => {
    API.reqJson(API.URL.GetUserList,'post',pageO).then((res)=>{
      setmenuList(res.data.list||[])
      setTotal(res.data.total)
    })
  }
  const getAuthorityList = async () => {
    API.reqJson(API.URL.GetAuthorityList,'post',{page:0,pageSize:999}).then((res)=>{
      let op = doTrsAuthorityOptions(res.data.list)
      setauthorityOption(op)
    })
  }
  const setUserAuthority = async (params) => {
    API.reqJson(API.URL.SetUserAuthority,'post',params).then((res)=>{
      
    })
  }

  const doTrsAuthorityOptions = (list)=>{
    let olist = []
    list.map((item)=>{
      let option = {
        label:item.authorityName,
        ckey:item.authorityId
      }
      if (item.children&&item.children.length) {
        option.children = doTrsAuthorityOptions(item.children)
      }
      olist.push(option)
    })
    return olist
  }

  const [editData, seteditData] = useState({});

  const doDelete = async (row)=>{
    const fs  = await dialogRef.current.$confirm({title:'提示',con:"此操作将永久删除该用户，是否继续？"})
    if (fs) {
      API.reqJson(API.URL.DeleteUser,'DELETE',{Id:row.ID}).then((res)=>{
        getUserList()
      })
    }
  }
  const handleSChange = (row) => (item) => {
    console.log(item,row)
    setUserAuthority({uuid:row.uuid,authorityId:item.ckey})
  };
  const addMenu = ()=>{
    seteditData({type: 'add'})
    doOpen()
  }

  React.useEffect(() => {
    getUserList()
    getAuthorityList()
  }, []);


  const dialogRef = React.useRef();

  const tableHeadKey = [
    {label:"头像",ckey:'headerImg',
    render:(row)=>{
      return <img src={row.headerImg} className={classes.headImg}></img>
    }},
    {label:"uuid",ckey:'uuid'},
  {label:"用户名",ckey:'userName',class:'wid200'},
  {label:"昵称",ckey:'nickName',class:'wid200'},
  {label:"用户角色",ckey:'authorityId',
    render:(row)=>{
      return (
        <CSelect 
          defaultValue={row.authorityId}
          options={authorityOption}
          onChange={handleSChange(row)}
          ></CSelect>)
    }
  },
  {
    label:"操作",
    ckey:'doSomething',
    class:'wid200',
    render:(row)=>{
      return (<ButtonGroup variant="contained" aria-label="contained primary button group">
      <Button color="secondary" onClick={()=>doDelete(row)}>删除</Button>
    </ButtonGroup>)
    }
  },
]

  const classes = useStyles();
  return (
    <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <Button className={classes.cardTitleWhite} onClick={addMenu} color="primary">新增用户</Button>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table stickyHeader className={classes.table} aria-label="enhanced table">
                <TableHead>
                  <TableRow>
                    {
                      tableHeadKey.map((item)=>{
                      return <TableCell className={classes[item.class]} key={item.ckey}><span>{item.label}</span></TableCell>
                      })
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuList.map((row,index) => {
                    return (<Row row={row} tableHeadKey={tableHeadKey} level={0} key={row.authorityId+index}>
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
      <CDialogConfirm ref={dialogRef}></CDialogConfirm>  
      <AddUser authorityOption={authorityOption} onFinish={getUserList} data={editData} open={open} onClose={doClose}/>
    </GridContainer>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row,level,tableHeadKey } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let children =[]
  if (row.children) {
    children =row.children
  }
  return (
    <React.Fragment>
      {/* <TableRow className={classes.root}> */}
      <TableRow>
        {
          tableHeadKey.map((ro,ind)=>{
            let key = ro.ckey
            let style = ind==0 && level>0 ?  {paddingLeft:`${level*12+16}px`}:null
            return <TableCell key={key} style={style}>
              {
                children.length>0 && ind == 0?
              <IconButton
                aria-label="expand row"
                size="small"
                style={{transform: `translateX(${level*6}px)`}}
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>:null
              }
              {
                ro.render?
                ro.render(row):
                <span>{row[key]}</span>
              }
            </TableCell>
          })
        }
      </TableRow>
      {children.length > 0 && open ? (
        children.map((row,index)=>{
          return <Row row={row} tableHeadKey={tableHeadKey} level={level+1} key={row.authorityId+index}>
          </Row>
        })
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