import ReactDOM from 'react-dom';
import React, {useState} from 'react';
// import TextField from '@material-ui/core/TextField';
import { SvgIcon, TextField, Paper, Grid, Icon, Button } from '@material-ui/core';
import '../styles/login.less';
import API from '@/api'
import {hist} from '@/utils/history'
import store from '@/store'
import {setUserInfo} from "@/store/action.js";
import jsCookie from 'js-cookie'
console.log(hist)
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Icon from '@material-ui/core/Icon';
// import Button from '@material-ui/core/Button';

// class Login extends React.Component{
export default function Login() {
    const [username, setUsername] = useState('admindd');
    const [password, setPassword] = useState('123456');

    const doLogin = ()=>{
        console.log(store,'store')
        API.reqJson(API.URL.login,'post',{username,password}).then((res)=>{
            jsCookie.set('token',res.data.Token)
            jsCookie.set('userInfo',res.data.User)
            store.dispatch(setUserInfo(res.data.User))
            let red = hist.location.search.match(/^\?redirect=(.*)/)
            if (red) {
                hist.push(red[1])
            }else{
                hist.push('/')
            }
        })
    }

    return (
        <div className="login">
            {/* <div className="logo" /> */}
            <Grid container>
                <Grid item xs={12}>
                    <div className="form_title">管理平台登录</div>
                </Grid>
            </Grid>
            <Paper className="form_paper">
                    <Grid container spacing={3} alignItems="flex-end">
                        <Grid item xs={3}>
                            <Icon>account_circle </Icon>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField id="input-wit"  value={username} onChange={(v)=>{setUsername(v.target.value)}} label="用户名" />
                        </Grid>
                    </Grid>
                    {/* <Grid container spacing={10} alignItems="flex-end">
                           <Grid item>
                               <Icon>account_circle </Icon>
                           </Grid>
                           <Grid item>
                               <TextField id="input-with-icon-grid" label="验证码" />
                           </Grid>
                           <Grid item>
                               <Button variant="text" color="primary">发送验证码</Button>
                           </Grid>
                       </Grid> */}
                    <Grid container spacing={3} alignItems="flex-end">
                        <Grid item xs={3}>
                            <Icon>no_encryption</Icon>
                            {/* <SvgIcon></SvgIcon>   */}
                        </Grid>
                        <Grid item xs={9}>
                            <TextField id="input-with-icon-grid"  value={password} onChange={(v)=>{setPassword(v.target.value)}} label="密码" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="flex-end">
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={doLogin}>
                                登录
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" >注册</Button>
                        </Grid>
                    </Grid>
            </Paper>
        </div>
    )
}

// ReactDOM.render(
//     <Login />,
//     document.getElementById("root"),
// );