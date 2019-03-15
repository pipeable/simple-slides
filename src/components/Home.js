import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Lesson from './Lesson';
import { Grid } from '@material-ui/core';
import Loading from './Loading';

const styles = theme => ({
    lessons: {
        flexGrow: 1
    }
});

class Home extends Component {
    
    state = {
        loading: true,
        lessons: []
    };

    componentDidMount() {
        axios.get('/content/lessons')
            .then(response => {
                if (response) {
                    this.setState({
                        loading: false,
                        lessons: response.data
                    });
                }
            })
            .catch(error => {
                console.error("axios - error = ", error);
            });
    }

    render() {
        var loading;
        var lessons;
        
        if (this.state.loading) {
            loading = <Loading />;
        }

        if (this.state.lessons) {
            lessons = this.state.lessons.map((lesson) => 
                <Grid item xs={12} sm={6} md={4} key={lesson}>
                    <Lesson id={lesson}></Lesson>
                </Grid>
            );
        }

        return (
            <div>
                { loading }
                <Grid container spacing={32} className={this.props.classes.lessons}>
                    { lessons }
                </Grid>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
