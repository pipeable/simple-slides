import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    homeIcon: {
        marginRight: '8px',
        color: theme.palette.background.default
    },
    buttonIcon: {
        color: theme.palette.background.default
    },
    slideNumbers: {
        color: theme.palette.background.default
    }
});

class SlideNavBar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            lessonId: 0,
            slideId: 0,
            slides: 0
        };
    }

    componentDidMount() {
        this.loadLesson();
    }

    componentDidUpdate(prevProps, prevState) {
        var prevLessonId = prevProps.match.params.lessonId;
        var prevSlideId = prevProps.match.params.slideId;
        var newLessonId = this.props.match.params.lessonId;
        var newSlideId = this.props.match.params.slideId;

        if (prevLessonId !== newLessonId || prevSlideId !== newSlideId) {
            this.loadLesson();
        }
    }

    loadLesson() {
        var lessonId = parseInt(this.props.match.params.lessonId);
        var slideId = parseInt(this.props.match.params.slideId);

        this.setState({
            loading: true
        });

        axios.get(`/content/lessons/${lessonId}/data.json`)
            .then(response => {
                if (response) {
                    this.setState({
                        loading: false,
                        lessonId: lessonId,
                        slideId: slideId,
                        slides: response.data.slides
                    });
                }
            })
            .catch(error => {
                console.error("axios - error = ", error);
            });
    }

    render() {
        var classes = this.props.classes;
        var lessonId;
        var slideId;
        var slides;
        var firstSlide = "/";
        var previousSlide = "/";
        var nextSlide = "/";
        var lastSlide = "/";

        if (this.state.lessonId && this.state.slideId) {
            lessonId = parseInt(this.state.lessonId);
            slideId = parseInt(this.state.slideId);
            firstSlide = `/content/lessons/${lessonId}/slides/${1}`;
            previousSlide = `/content/lessons/${lessonId}/slides/${slideId > 1 ? slideId - 1 : this.state.slides}`;
            nextSlide = `/content/lessons/${lessonId}/slides/${slideId < this.state.slides ? slideId + 1 : 1}`;
            lastSlide = `/content/lessons/${lessonId}/slides/${this.state.slides}`;
        }

        if (this.state.slideId && this.state.slides) {
            slides = <Typography variant="body1" className={classes.slideNumbers}>{this.state.slideId}/{this.state.slides}</Typography>
        }

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton component={Link} to="/" className={classes.homeIcon}><HomeIcon /></IconButton>
                        <Typography variant="h4" className={classes.grow}>pi|pea|ble</Typography>
                        <IconButton component={Link} to={firstSlide} className={classes.buttonIcon}><FirstPageIcon /></IconButton>
                        <IconButton component={Link} to={previousSlide} className={classes.buttonIcon}><ChevronLeftIcon /></IconButton>
                        {slides}
                        <IconButton component={Link} to={nextSlide} className={classes.buttonIcon}><ChevronRightIcon /></IconButton>
                        <IconButton component={Link} to={lastSlide} className={classes.buttonIcon}><LastPageIcon /></IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SlideNavBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SlideNavBar);
