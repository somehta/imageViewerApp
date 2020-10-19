import React, { Component } from "react";
import "./Profile.css";
import Header from '../../common/header/header';
//import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
//import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
//import InputLabel from '@material-ui/core/InputLabel';
//import Input from '@material-ui/core/Input';
//import CardActions from '@material-ui/core/CardActions';
//import Button from '@material-ui/core/Button';
//import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal'
//import Typography from '@material-ui/core/Typography';
//import Fab from '@material-ui/core/Feb';

/*const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};*/

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            allInsta: [],
            postCount: 0,
            modalIsOpen: false,
            newName: "",
            fullNameRequired: "dispNone",
            accessToken: sessionStorage.getItem("access-token"),
            imageModalIsOpen: false,
            currId: "",
            currImage: "",
            currProfilePicture: "",
            currCaption: "",
            currTags: "",
            currLikeStatus: false,
            likeCounts: 0,
            count: 0,
            comments: [],
            commentText: "",
            fullname: "Sourabh Mehta",
        }
    }

    componentWillMount() {
        if (this.state.isLoggedIn) {
            let that = this;
            let data = null;
            let xhrRequest = new XMLHttpRequest();
            xhrRequest.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    that.setState({
                        allInsta: JSON.parse(this.responseText).data,
                        postCount: JSON.parse(this.responseText).data.length
                    });
                    that.fetchPostDetails(JSON.parse(this.responseText).data);
                }
            })

            xhrRequest.open("GET", this.props.baseUrl + "me/media?fields=id,caption&access_token=" + sessionStorage.getItem("access-token"));
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.send(data);
        }
    }

    fetchPostDetails = (apiResponse) => {
        let thisThat = this;
        let arrayOfDetails = [];
        for (let newPostdetail of apiResponse) {
            console.log(newPostdetail.id);
            let dataPost = null;
            let xhrPostDetails = new XMLHttpRequest();

            xhrPostDetails.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let secondApiRespnse = JSON.parse(this.responseText);
                    let captionTitle = "";
                    let captionTags = "";
                    let originalCaption = (newPostdetail.caption);
                    if (originalCaption != null) {
                        captionTitle = originalCaption.substr(0, originalCaption.indexOf('#'));
                        captionTags = originalCaption.substr(originalCaption.indexOf('#') + 0);
                    }
                    arrayOfDetails.push({ id: newPostdetail.id, caption: captionTitle, tags: captionTags, username: secondApiRespnse.username, imageUrl: secondApiRespnse.media_url, timeStamp: secondApiRespnse.timestamp });
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

    editNameHandler = (e) => {
        this.setState({ newName: e.target.value });

    }
    updateFullNameHandler = () => {
        this.state.newName === "" ? this.setState({ fullNameRequired: "dispBlock" }) : this.setState({
            fullNameRequired: "dispNone",
            fullname: this.state.newName,
            modalIsOpen: false
        });
    }
    imageClickHandler = (image) => {
        var data = image.caption;
        let caption = "";
        let tags = "";
        if (data != null) {
            caption = data.substr(0, data.indexOf('#'));
            tags = data.substr(data.indexOf('#') + 0);
        }
        this.setState({
            imageModalIsOpen: true,
            currId: image.id,
            currImage: image.imageUrl,
            currImgName: "Sourabh Mehta",
            currCaption: caption,
            currTags: tags,
            currLikeStatus: "",
            likeCounts: 1
        });

    }

    // Sets imageModalIsOpen to false in order to close the modal
    closeImageModalHandler = () => {
        this.setState({ imageModalIsOpen: false });
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true });
    }
    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        //const { classes } = this.props;
        return (
            <div>
                <Header heading="Image Viewer" searchIcon={false} history={this.props.history} />
                <div className="container">
                    <div className="left">
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" size="medium" class="profile" />
                    </div>
                    <div className="right">
                        <div className="profileDetails">Sourabh Mehta </div>
                        <div className="profileDetails">
                            <div className="postDetails">Posts : {this.state.postCount}</div>
                            <div className="postDetails">Follows : 4</div>
                            <div className="postDetails">Folowed By : 6</div>
                        </div>
                        <div className="profileDetails">
                            {/* <Fab color="secondary" aria-label="edit" className={classes.fab} > */}
                Sourabh Mehta
               {/*</div> <EditIcon onClick={this.openModalHandler} />
                </Fab>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Label" style={customStyles}  onRequestClose={this.closeModalHandler} style={customStyles}>
                    <h2>Edit</h2><br />
                    <FormControl required>
                    <InputLabel htmlFor="fullname">Full Name</InputLabel>
                    <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.editFullNameHandler} />
                     <FormHelperText className={this.state.fullNameRequired}><span className="red">required</span></FormHelperText>
                    </FormControl><br /><br />
                    <Button variant="contained" color="primary" onClick={this.editNameHandler}>UPDATE</Button>
        </Modal>
        </div>*/}
                        </div>
                    </div>
                </div>
                <div>
                    <GridList cellHeight={160} cols={3}>
                        {this.state.allPostDetails != null && this.state.allPostDetails.map(post => (
                            <GridListTile
                                className="gridTile"
                                onClick={() => this.imageClickHandler(post)}
                                key={post.id}>
                                <img src={post.imageUrl} />
                            </GridListTile>
                        ))}
                    </GridList>
                    <Modal isOpen={this.state.imageModalIsOpen} ariaHideApp={false} className="image-modal" onRequestClose={this.closeImageModalHandler} >
                        <div className="modalStyle">
                            <div className="left">
                                <img className="clicked-image" src={this.state.currImage} alt={this.state.curImgName} />
                            </div>
                            <div className="right">
                                <div className="right-top">
                                    <IconButton aria-controls="simple-menu" aria-haspopup="true" size="medium" class="profile" alt="No Image" />
                                    <span className="modal-username">Sourabh Mehta</span>
                                    <hr />
                                </div>
                                <div className="right-middle">
                                    <div >{this.state.currCaption}</div>
                                    <div className="image-hashtags">{this.state.currTags}</div>
                                </div>
                                <div className="right-bottom">
                                </div>
                            </div>
                        </div>
                    </Modal >
                </div>
            </div>
        )
    }
}

export default Profile;
