import React,{Component} from "react";
import "./Home.css";
import Header from '../../common/header/header';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';


class Home extends Component {
    

    constructor(){
        super();

        this.state = {
            allInstaPosts: [],
            allPostDetails: []
        }
    }

    componentWillMount() {
        // Get all post from insta account
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    allInstaPosts: JSON.parse(this.responseText).data
                });
            }
        });

        xhr.open("GET", this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token"));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

        // Get post Details 
        let postDetailsArray = [];
        for (let singlePost of this.state.allInstaPosts){
            let dataPost = null;
            let xhrPostDetails = new XMLHttpRequest();
            xhrPostDetails.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    that.setState({
                        allInstaPosts: JSON.parse(this.responseText).data
                    });
                }
        });

        xhrPostDetails.open("GET", this.props.baseUrl + singlePost.id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token"));
        xhrPostDetails.setRequestHeader("Cache-Control", "no-cache");
        xhrPostDetails.send(dataPost);

        }

        

        

    }
    
    render(){   
        const { classes } = this.props;   
        return(
            <div>
                <Header heading ="Image Viewer"/>
                <div id="imageCardsContainer">
                    
                    {this.state.allInstaPosts.map(instaPost => (
                        <Card className="imageCard">
                            <CardHeader avatar={
                                <Avatar aria-label="recipe" className="pofileIcon">
                                    
                                </Avatar>
                                }
                                action={
                                <IconButton aria-label="settings">
                                  
                                </IconButton>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader="September 14, 2016"
                            />
                            <CardContent>
                            <p>{instaPost.caption}</p>
                            
                            
                            </CardContent>
                            
                        </Card>
                        
                    ))}
                    
                    
                </div>
            </div>
            )
        }
    }

 export default Home;   
    