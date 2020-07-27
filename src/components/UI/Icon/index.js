import React from "react";
import PropTypes from "prop-types";

const Icon = props => {
    return (
        <div style={{width: props.width}}>
            <img src={props.src} alt={props.alt}/>
        </div>
    );
};

Icon.propTypes = {
    width: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default Icon;
