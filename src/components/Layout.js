import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from "./Header";

class Layout extends Component {
    state = {
        isSideDrawerOpen: false,
    };

    sideDrawerChange = () => {
        this.setState(prevState => ({...prevState, isSideDrawerOpen: !prevState.isSideDrawerOpen}));
    };

    render() {
        return(
            <>
                <Header
                    isSideDrawerOpen={this.state.isSideDrawerOpen}
                    onBurgerIconClick={this.sideDrawerChange}
                />
                <main>
                    {this.props.children}
                </main>
            </>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;
