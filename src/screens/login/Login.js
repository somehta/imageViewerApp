import React, { Component } from "react";
import "./Login.css";
import Header from '../../common/header/header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            invalid: "dispNone",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    loginClickHandler = () => {
        let mockUserName = "sourabh";
        let mockPassword = "sourabh";
        let userIdFortoken = "17841443893435948";
        let accessToken = "IGQVJYV2wtRWxIbC1YNy1kYXYtSFg5ZA2dSMGRtUUhwckJzYVBzSnBzanJxbS1YMXhfZAWMxNkhvRTFhR1g5VTExMlVOVHk3QlFnWW9OaG5RQ0ZAjRFRIZAFJ5QmI3SkZAqdXlYN1Jvb2F5MWY0STZAGWFZAmTAZDZD";
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        if (this.state.username === mockUserName && this.state.loginPassword === mockPassword) {
            this.setState({
                loggedIn: true
            });
            sessionStorage.setItem("userId", userIdFortoken);
            sessionStorage.setItem("access-token", accessToken);
            this.props.history.push("/home");
            this.closeModalHandler();
        }
        else {
            this.setState({ invalid: "dispBlock" });
        }
    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("access-token");
        this.setState({
            loggedIn: false
        });
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }
    render() {

        return (
            <div>
                <Header heading="Image Viewer" />

                <Card className="loginForm" variant="outlined">
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            LOGIN
                </Typography>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" onChange={this.inputLoginPasswordChangeHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl>
                            <Button size="small" variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                            <FormHelperText className={this.state.invalid}>
                                <span className="red"><b>Incorrect username and/or password </b></span>
                            </FormHelperText>
                        </FormControl>
                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
            </div>

        )
    }
}

export default Login;
