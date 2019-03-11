import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';

const styles = theme => ({
    grid: {
        
    },
    paper: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
        minHeight: '80vh',
        color: '#333348'
    },
    content: {
        //backgroundColor: '#550099'
    }
});

class Slide extends Component {

    state = {
        content: ""
    };

    componentDidMount() {
        var lessonId = this.props.match.params.lessonId;
        var slideId = this.props.match.params.slideId;

        this.loadSlide(lessonId, slideId);
    }

    componentDidUpdate(prevProps, prevState) {
        var prevLessonId = prevProps.match.params.lessonId;
        var prevSlideId = prevProps.match.params.slideId;
        var newLessonId = this.props.match.params.lessonId;
        var newSlideId = this.props.match.params.slideId;

        if (prevLessonId !== newLessonId || prevSlideId !== newSlideId) {
            this.loadSlide(newLessonId, newSlideId);
        }
    }

    loadSlide(lessonId, slideId) {
        this.setState({
            loading: true
        });

        axios.get(`/content/lessons/${lessonId}/slides/${slideId}.html`)
            .then(response => {
                if (response) {
                    this.setState({
                        loading: false,
                        lessonId: lessonId,
                        slideId: slideId,
                        content: response.data
                    });
                }
            })
            .catch(error => {
                console.error("fetching error = ", error);
            });
    }

    render() {
        var classes = this.props.classes;
        var content = [];
        var slide;

        if (this.state.content) {
            content = <div dangerouslySetInnerHTML={{__html: this.state.content}} className={classes.content}></div>;
        }

        slide = <Grid item xs={12} className={classes.grid}>
            <Paper className={classes.paper} elevation={1}>
                {content}
            </Paper>
        </Grid>;

        return slide;
    }
}

Slide.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Slide);
