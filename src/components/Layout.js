import React from 'react';
import PropTypes from 'prop-types';

import Header from "./Header";

const Layout = props => {
    return(
        <>
            <Header />
            <main>
                {props.children}
            </main>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;
