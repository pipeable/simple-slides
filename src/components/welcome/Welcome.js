import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Grow, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        //padding: '200px'
    }
});

class Welcome extends Component {

    state = {
        inPi: true,
        inPea: false,
        inBle: false
    };

    componentDidMount() {
        setTimeout(
            function() {
                this.setState({
                    inPea: true
                });
            }.bind(this),
            3000
        );

        setTimeout(
            function() {
                this.setState({
                    inBle: true
                });
            }.bind(this),
            6000
        );
    }

    render() {
        var classes = this.props.classes;
        var welcome;

        welcome = <Grid container className={classes.root} xs={12}>
            <Grow in={this.state.inPi}>
                <Typography variant="h1" color="#FFFFFF">pi</Typography>
            </Grow>
            <Grow in={this.state.inPea}>
                <Typography variant="h1">pea</Typography>
            </Grow>
            <Grow in={this.state.inBle}>
                <Typography variant="h1">ble</Typography>
            </Grow>
        </Grid>;

        return welcome;
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Welcome);
