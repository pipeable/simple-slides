import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
    }
});

class HomeNavBar extends Component {

    render() {
        var classes = this.props.classes;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton component={Link} to="/" className={classes.homeIcon}><HomeIcon /></IconButton>
                        <Typography variant="h4" className={classes.grow}>pi|pea|ble</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

HomeNavBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeNavBar);
