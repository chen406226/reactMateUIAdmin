/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";

// core components
import Admin from "./layouts/Admin.js";
import RTL from "./layouts/RTL.js";
import Login from "./layouts/Login.js";
import {hist} from '@/utils/history.js'
import Tablec from 'views/Demo/Table/Index.js'

import "assets/css/material-dashboard-react.css?v=1.9.0";

// var addHistoryMethod = (function(){
//   var historyDep = new Dep();
//   return function(name) {
//       if(name === 'historychange'){
//           return function(name, fn){
//               var event = new Watch(name, fn)
//               Dep.watch = event;
//               historyDep.defined();
//               Dep.watch = null;       //置空供下一个订阅者使用
//           }
//       } else if(name === 'pushState' || name === 'replaceState') {
//           var method = history[name];
//           return function(){
//               method.apply(history, arguments);
//               historyDep.notify();
//           }
//       }
      
//   }
// }())

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      path:''
    }
  };
  componentDidMount(){
    console.log('路由改变触发');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // 判断跳转路由不等于当前路由
    console.log(nextProps.location,'00000000000000000000000');

    if (nextProps.location.pathname !== this.props.location.pathname) {
      console.log('路由改变触发');
    }
  }
  render(){
    return (
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/table" component={Tablec} />
        <Route path="/demo" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>)
  }
  // componentDidMount(){
  //   this.setState({path:window.location.pathname})
  //   window.addHistoryListener = addHistoryMethod('historychange');
  // }
  // componentDidUnMount
}

App = withRouter(App)

ReactDOM.render(
  // <Router history={hist}>
  //   <Switch>
  //     <Route path="/admin" component={Admin} />
  //     <Route path="/rtl" component={RTL} />
  //     <Route path="/login" component={Login} />
  //     <Redirect from="/" to="/admin/dashboard" />
  //   </Switch>
  // </Router>,
  <Router history={hist}>
    <App/>
  </Router>,
  document.getElementById("root")
);
