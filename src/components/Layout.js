import React from 'react';

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

export default Layout;
