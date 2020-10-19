import React, { Component } from "react";
import "./Home.css";
import Header from '../../common/header/header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Moment from 'moment';

const styles = theme => ({
    formControl: {
        width: '80%'
    },

});

class Home extends Component {

    

    constructor() {
        super();
        this.state = {
            allInstaPosts: [],
            allPostDetails: [],
            commentValue: "",
            likeActive: false
        }
    }

    componentWillMount() {


        // Get all post from insta account
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let responseData = JSON.parse(this.responseText).data;
                that.setState({
                    allInstaPosts: responseData
                });
                console.log(responseData);
                that.fetchPostDetails(responseData);
            }
        });

        xhr.open("GET", this.props.baseUrl + sessionStorage.getItem("userId") + "/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token"));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    fetchPostDetails = (apiResponse) => {
        let thisThat = this;
        let arrayOfDetails = [];
        for (let newPostdetail of apiResponse) {
            console.log("Hiiiiii");
            console.log(newPostdetail.id);
            let dataPost = null;
            let xhrPostDetails = new XMLHttpRequest();


            xhrPostDetails.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let secondApiRespnse = JSON.parse(this.responseText);
                    let captionTitle = null;
                    let captionTags = null;
                    let originalCaption = (newPostdetail.caption);
                    captionTitle = originalCaption.substr(0, originalCaption.indexOf('#'));
                    captionTags = originalCaption.substr(originalCaption.indexOf('#') + 0);

                    //regex to find all words starting with #
                    var re = /(?:^|\W)#(\w+)(?!\w)/g,
                        match, matches = [];
                    while (match = re.exec(originalCaption)) {
                        matches.push(match[1]);
                    }
                    let hashTags = matches.map(function (x) { return " #" + x });
                    let commmentsArray = [];

                    arrayOfDetails.push({ id: newPostdetail.id, caption: captionTitle, liked: false , initialLikes: 6, tags: hashTags, username: secondApiRespnse.username, imageUrl: secondApiRespnse.media_url, timeStamp: secondApiRespnse.timestamp, commentsList: commmentsArray });
                    thisThat.setState({
                        allPostDetails: arrayOfDetails
                    });
                    console.log(arrayOfDetails);
                }
            });

            xhrPostDetails.open("GET", this.props.baseUrl + newPostdetail.id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token"));
            xhrPostDetails.setRequestHeader("Cache-Control", "no-cache");
            xhrPostDetails.send(dataPost);
        }



    }

    likeClickHandler = (index) => {
        //console.log("index", index);
        const tempPostsData = this.state.allPostDetails;
        const currentState = tempPostsData[index].liked;
        tempPostsData[index].liked = !currentState;
        tempPostsData[index].initialLikes = tempPostsData[index].initialLikes + 1;
        this.setState({allPostDetails: tempPostsData});
    }

    unlikeClickHandler = (index) => {
        const tempPostsData = this.state.allPostDetails;
        const currentState = tempPostsData[index].liked;
        tempPostsData[index].liked = !currentState;
        tempPostsData[index].initialLikes = tempPostsData[index].initialLikes - 1;
        this.setState({allPostDetails: tempPostsData});
    }

    inputCommentHandler = (event) =>{
        this.setState({commentValue: event.target.value});
    }

    addCommentHandler = (index, commentValue) => {
        console.log(commentValue);
        const tempPostsData = this.state.allPostDetails;
        var updatedComments = [...(tempPostsData[index].commentsList),(commentValue)];
        tempPostsData[index].commentsList = updatedComments;
        this.setState({allPostDetails: tempPostsData,
            commentValue: ""
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header heading="Image Viewer" />
                <div id="imageCardsContainer">

                    {this.state.allPostDetails.map((instaPost, index) => (
                        <Card className="imageCard">
                            <CardHeader avatar={
                                <Avatar aria-label="recipe" className="pofileIcon">

                                </Avatar>
                            }
                                action={
                                    <IconButton aria-label="settings">

                                    </IconButton>
                                }
                                title={instaPost.username}
                                subheader={Moment(new Date(instaPost.timeStamp)).format('DD/MM/YYYY HH:MM:SS')}
                            />
                            <CardContent>
                                <img src={instaPost.imageUrl}></img>
                                <hr></hr>
                                <h3>{instaPost.caption}</h3>
                                <p class="postHashTags">{instaPost.tags}</p>
                                <div class="likeFunctionContainer">
                                <FavoriteBorderIcon id="likeIcon" className={instaPost.liked ? 'inactiveLike' : 'activeLike'} onClick={() => this.likeClickHandler(index)} />
                                <FavoriteIcon id="unlikeIcon" className={instaPost.liked ? 'activeLike' : 'inactiveLike'} onClick={() => this.unlikeClickHandler(index)}/>
                                <p class="numberOfLikesTag">{instaPost.initialLikes} likes</p>
                                </div>     
                                                     
                                {instaPost.commentsList.map((commentPost) =>  (
                                    <div class="commentsBlock">
                                        <p class="userOfComment"><b>{instaPost.username}: &nbsp;</b></p>
                                        <p class="commentPost"> {commentPost}</p>
                                    </div>

                                )

                                )} 
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="addCommentLabel">Add a comment</InputLabel>
                                    <Input id="commentText" onChange={this.inputCommentHandler}/>
                                </FormControl>
                                <Button variant="contained" color="primary" onClick={() => this.addCommentHandler(index, this.state.commentValue)}>ADD </Button>
                            </CardContent>

                        </Card>

                    ))}


                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
