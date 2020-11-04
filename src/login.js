import ReactDOM from 'react-dom';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import './styles/login.less';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

// class Login extends React.Component{
export default class Login extends React.Component{
    state ={
        username:'admindd',
        password:'123456'
    }

    handleChange =() => {

    }

    render() {
        const {username, password} = this.state
        return(
           <div className="login">
               <div className="logo" />
               <Grid container>
                   <Grid item xs={12}>
                       <div className="form_title">营销统一管理平台</div>
                   </Grid>
               </Grid>
               <Paper className="form_paper">
                   <form action="">
                       <Grid container spacing={10} alignItems="flex-end">
                           <Grid item>
                               <Icon>account_circle </Icon>
                           </Grid>
                           <Grid item>
                               <TextField id="input-with-icon-grid" value={username} onChange={(v)=>{this.setState({username:v})}} label="用户名" />
                           </Grid>
                       </Grid>
                       <Grid container spacing={10} alignItems="flex-end">
                           <Grid item>
                               <Icon>account_circle </Icon>
                           </Grid>
                           <Grid item>
                               <TextField id="input-with-icon-grid" label="验证码" />
                           </Grid>
                           <Grid item>
                               <Button variant="text" color="primary">发送验证码</Button>
                           </Grid>
                       </Grid>
                       <Grid container spacing={10} alignItems="flex-end">
                           <Grid item>
                               <Icon>account_circle </Icon>
                           </Grid>
                           <Grid item>
                               <TextField id="input-with-icon-grid" label="密码" />
                           </Grid>
                       </Grid>
                   </form>
               </Paper>
           </div>
        )
    }
}

// ReactDOM.render(
//     <Login />,
//     document.getElementById("root"),
// );