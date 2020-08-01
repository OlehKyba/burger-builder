import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from "../components/Header";

class Layout extends Component {
    state = {
        isSideDrawerOpen: false,
        nav: [
            {name: "Builder", link: "/", exact: true},
            //{name: "Checkout", link: "/checkout", exact: false},
            {name: "Orders", link: "/orders", exact: false},
        ],
    };

    sideDrawerChange = () => {
        this.setState(prevState => ({...prevState, isSideDrawerOpen: !prevState.isSideDrawerOpen}));
    };

    render() {
        return(
            <>
                <Header
                    nav={this.state.nav}
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
