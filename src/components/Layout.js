import React from 'react';
import PropTypes from 'prop-types';

const Layout = props => {
    return(
        <>
            <div>
                Header, Side bar and etc...
            </div>
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
