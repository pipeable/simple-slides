import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HomeNavBar from './components/navbars/HomeNavBar';
import SlideNavBar from './components/navbars/SlideNavBar';
import Home from './components/Home';
import Slide from './components/Slide';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Welcome from './components/welcome/Welcome';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c70039'
        },
        secondary: {
            main: '#333348'
        },
        error: {
            main: '#ff0000'
        },
        background: {
            paper: '#e1e2e1',
            default: '#f5f5f6'
        }
    },
    typography: {
        useNextVariants: true,
        h4: {
            color: '#f5f5f6'
        },
        fontFamily: [
            'Nova Mono',
            'Open Sans',
            'monospace'
        ].join(',')
    }
});

const styles = theme => ({
    root: {},
    contentWrapper: {
        width: '100%',
        padding: '32px'
    }
});

class App extends Component {
    render() {
        var classes = this.props.classes;

        return (
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />

                    <Switch>
                        <Route exact path="/" component={HomeNavBar} />
                        <Route exact path="/content/lessons/:lessonId/slides/:slideId" component={SlideNavBar} />
                    </Switch>

                    <Grid container className={classes.contentWrapper}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/welcome" component={Welcome} />
                            <Route exact path="/content/lessons/:lessonId/slides/:slideId" component={Slide} />
                        </Switch>
                    </Grid>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);

