import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
    root: {
        textAlign: 'center'
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

class Loading extends Component {
    render() {
        return (
            <div className={this.props.classes.root}>
                <CircularProgress color="primary" className={this.props.classes.progress} />
            </div>
        );
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
