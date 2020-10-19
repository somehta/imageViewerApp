import React, {Component} from "react";
import "./header.css";
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component{
    constructor() {
        super();
        this.state = {
            anchorEl : null,
            loggedIn : sessionStorage.getItem("access-token") == null ? false : true,

        }
    }

    handleMyProfileClick = (event) => {
        this.setState({anchorEl : event.currentTarget})
      };
    
    handleMyProfileClose = () => {
        this.setState({anchorEl : null})
      };
      
    logoutHandler = (e) => {
        sessionStorage.removeItem("access-token");
        this.setState({
            loggedIn: false
        });
        this.history.pushState("/");
    }
    
     myAccountHandler = () => {
    
    
      }
    render() {
        const { anchorEl } = this.state;
        return(
            <div>
                <header className="app-header">
                    <p>{this.props.heading}</p>

                    {!this.state.loggedIn ? 
                    <div> </div>
                    :
                    <div id="loggedInUserSection">
                            <div class="searchBox">
                                <SearchIcon fontSize="large" className="verticalAlign"/>
                                <Input name="searchInput" placeholder="Search.." disableUnderline="false"></Input>                        
                            </div>
                            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMyProfileClick} size="medium" class="profileLogo"/>
                                <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={this.handleMyProfileClose}
                                >
                                    <MenuItem onClick={this.myAccountHandler}>My Account</MenuItem>
                                    <hr/>
                                    <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                                </Menu>
                            </div>
                    }

                </header>
            </div>
        )
    }
}

export default Header;