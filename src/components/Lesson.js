import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Grid } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import Loading from './Loading';

const styles = theme => ({
    lesson: {
        flexGrow: 1
    },
    media: {
        height: '256px'
    },
    description: {
        fontFamily: 'Open Sans'
    },
    difficulty: {
        marginTop: '8px',
        color: theme.palette.primary.main
    }
});

class Lesson extends Component {

    state = {
        loading: true,
        name: '',
        description: '',
        image: null,
        difficulty: 1,
        uri: ''
    };

    componentDidMount() {
        var uri = `/content/lessons/${this.props.id}`;

        axios.get(uri + "/data.json")
            .then(response => {
                if (response) {
                    this.setState({
                        loading: false,
                        name: response.data.name,
                        description: response.data.description,
                        image: uri + "/" + response.data.image,
                        difficulty: response.data.difficulty,
                        uri: uri
                    });
                }
            })
            .catch(error => {
                console.error("fetching error = ", error);
            });
    }

    render() {
        var classes = this.props.classes;
        var loading;
        var name;
        var description;
        var image;
        var difficulty = [];
        var card;
        var uri = "/";

        if (this.state.loading) {
            loading = <Loading />;
        }

        if (this.state.name) {
            name = this.state.name;
        }

        if (this.state.description) {
            description = this.state.description;
        }

        if (this.state.image) {
            image = this.state.image;
        }

        if (this.state.difficulty) {
            for (var i = 0; i < 5; i++) {
                difficulty[i] = this.state.difficulty > i ? <Star key={i} /> : <StarBorder key={i} />;
            }
        }

        if (this.state.uri) {
            uri = this.state.uri + "/slides/1";
        }

        card = <Card className={classes.lesson}>
            <CardActionArea component={Link} to={uri}>
                {loading}
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">{name}</Typography>
                    <Typography variant="body2" className={classes.description}>{description}</Typography>
                    <Grid container className={classes.difficulty}>{difficulty}</Grid>
                </CardContent>
            </CardActionArea>
        </Card>;

        return card;
    }
}

Lesson.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Lesson);
