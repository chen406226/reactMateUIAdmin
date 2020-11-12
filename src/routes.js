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
// @material-ui/icons
import { lazy } from 'react';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import {Assignment} from "@material-ui/icons";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
const DashboardPage = lazy(() => import(/* webpackChunkName: "Dashboard" */'./views/Dashboard/Dashboard.js'))
// import UserProfile from "views/UserProfile/UserProfile.js";
const UserProfile = lazy(() => import(/* webpackChunkName: "UserProfile" */'./views/UserProfile/UserProfile.js'))
const AdminMenu = lazy(() => import(/* webpackChunkName: "AdminMenu" */'./views/Admin/Menu.js'))
const AdminAuthority = lazy(() => import(/* webpackChunkName: "AdminAuthority" */'./views/Admin/Authority.js'))
const AdminApi = lazy(() => import(/* webpackChunkName: "AdminApi" */'./views/Admin/Api.js'))
const AdminDictionary = lazy(() => import(/* webpackChunkName: "AdminDictionary" */'./views/Admin/Dictionary.js'))
const AdminUser = lazy(() => import(/* webpackChunkName: "AdminUser" */'./views/Admin/User.js'))
const AdminOperation = lazy(() => import(/* webpackChunkName: "AdminOperation" */'./views/Admin/Operation.js'))
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/admin",
    name: "超级管理员",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    children:[{
      path: "/menu",
      name: "菜单管理",
      rtlName: "لوحة القيادة",
      icon: Assignment,
      component: AdminMenu,
      layout: "/admin"
    },{
      path: "/authority",
      name: "角色管理",
      rtlName: "لوحة القيادة",
      icon: Person,
      component: AdminAuthority,
      layout: "/admin"
    },{
      path: "/api",
      name: "api管理",
      rtlName: "لوحة القيادة",
      icon: Person,
      component: AdminApi,
      layout: "/admin"
    },{
      path: "/user",
      name: "用户管理",
      rtlName: "لوحة القيادة",
      icon: Person,
      component: AdminUser,
      layout: "/admin"
    },{
      path: "/dictionary",
      name: "字典管理",
      rtlName: "لوحة القيادة",
      icon: Person,
      component: AdminDictionary,
      layout: "/admin"
    },{
      path: "/operation",
      name: "操作历史",
      rtlName: "لوحة القيادة",
      icon: Person,
      component: AdminOperation,
      layout: "/admin"
    }],
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }
];

export default dashboardRoutes;
