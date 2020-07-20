import React from "react";
import PropTypes from "prop-types";

import Ingredient from "../Ingredient";

const BurgerDefaults = props => {
    return (
        <>
            <Ingredient type={'BreadTop'} />
            {props.children}
            <Ingredient type={'BreadBottom'} />
        </>
    );
};

BurgerDefaults.propTypes = {
    children: PropTypes.element,
};

export default BurgerDefaults;
