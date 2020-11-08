import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import API from '@/api'
import { Button } from "@material-ui/core";
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
import {TablePagination, } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
    minWidth: 1100,
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

  React.useEffect(() => {
    getMenuList()
  }, []);


  const tableHeadKey = [{label:"ID",ckey:'ID'},
  {label:"路由Name",ckey:'name'},
  {label:"路由Page",ckey:'path'},
  {label:"是否隐藏",ckey:'hidden'},
  {label:"父节点",ckey:'parentId'},
  {label:"排序",ckey:'sort'},
  {label:"文件路径",ckey:'component'},
  {label:"展示名称",ckey:'title'},
  {label:"图标",ckey:'icon'}]


  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            {/* <h4 className={classes.cardTitleWhite}>Simple Table</h4> */}
            <Button className={classes.cardTitleWhite} onClick={doOpen} color="primary">新增根菜单</Button>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table stickyHeader className={classes.table} aria-label="enhanced table">
                <TableHead>
                  <TableRow>
                    {
                      tableHeadKey.map((item)=>{
                      return <TableCell key={item.ckey}><span>{item.label}</span></TableCell>
                      })
                    }
                    {/* <TableCell align="center">参数key</TableCell>
                    <TableCell align="center">参数值</TableCell> */}
                    {/* <TableCell><span>操作</span></TableCell> */}
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                <TableRow>
                        sfd
                      </TableRow>
                </TableBody> */}
                <TableBody>
                  {menuList.map((row,index) => {
                    return (<TableRow key={index}>
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
                    </TableRow>)

                  })}
                    {/* <TableRow>
                      操作
                    </TableRow> */}
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
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            {/* <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            /> */}
          </CardBody>
        </Card>
      </GridItem>
      <AddMenu open={open} onClose={doClose}/>
    </GridContainer>
  );
}
