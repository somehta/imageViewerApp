import React,{Component} from "react";
import "./Home.css";
import Header from '../../common/header/header';

class Home extends Component {
    
    render(){   
        const { classes } = this.props;   
        return(
            <Header heading ="Image Viewer"/>
            )
        }
    }

 export default Home;   
    