import React from "react";
import PropTypes from "prop-types";

const OrderSummary = props => {
    return (
        <>
            <h2>Your order!</h2>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {props.menu.map(ingredient => (
                    <li key={ingredient.type}>
                        {`${ingredient.type}: ${ingredient.count} x ${ingredient.price.toFixed(3)}`}
                    </li>
                ))}
            </ul>
            <p>Continue to checkout?</p>
        </>
    );
};

OrderSummary.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        count: PropTypes.number,
        price: PropTypes.number,
    })).isRequired,
};

export default OrderSummary;
