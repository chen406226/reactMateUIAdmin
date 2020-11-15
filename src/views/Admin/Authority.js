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
import CDialogConfirm from "components/CDialog/Confirm.js";

import AddAuthority from './Authority/Add'
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
  const [authorityOption, setauthorityOption] = useState([
    {
      ckey: "0",
      label: "根角色"
    }
  ]);

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
    API.reqJson(API.URL.GetAuthorityList,'post',pageO).then((res)=>{
      setmenuList(res.data.list||[])
      let op = doTrsAuthorityOptions(res.data.list)
      op.unshift({
        ckey: "0",
        label: "根角色"
      })
      setauthorityOption(op)
      setTotal(res.data.total)
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
  const edit = (row)=>{
    seteditData({...row,type:'edit'})
    doOpen()
  }
  const copy = (row)=>{
    seteditData({...row,type:'copy'})
    doOpen()
  }
  const doDelete = async (row)=>{
    const fs  = await dialogRef.current.$confirm({title:'提示',con:"此操作将永久删除该角色，是否继续？"})
    if (fs) {
      API.reqJson(API.URL.DeleteAuthority,'post',{authorityId:row.authorityId}).then((res)=>{
        getMenuList()
      })
    }
  }
  const addMenu = ()=>{
    seteditData({type: 'add'})
    doOpen()
  }

  React.useEffect(() => {
    getMenuList()
  }, []);

  const addChild = (row)=>{
    seteditData({type: 'add',parentId: row.authorityId})
    doOpen()
  }

  const dialogRef = React.useRef();

  const tableHeadKey = [
    // {label:"",ckey:''},
    // {label:"ID",ckey:'ID'},
  {label:"角色id",ckey:'authorityId',class:'wid200'},
  {label:"角色名称",ckey:'authorityName',class:'wid200'},
  {
    label:"操作",
    ckey:'doSomething',
    class:'wid200',
    render:(row)=>{
      return (<ButtonGroup variant="contained" aria-label="contained primary button group">
      <Button>设置权限</Button>
      <Button onClick={()=>addChild(row)}>+子角色</Button>
      <Button onClick={()=>copy(row)}>拷贝</Button>
      <Button color="primary" onClick={()=>edit(row)}>编辑</Button>
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
            <Button className={classes.cardTitleWhite} onClick={addMenu} color="primary">新增角色</Button>
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
                    return (<Row edit={edit} row={row} tableHeadKey={tableHeadKey} level={0} key={row.authorityId+index}>
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
      <AddAuthority authorityOption={authorityOption} onFinish={getMenuList} data={editData} open={open} onClose={doClose}/>
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