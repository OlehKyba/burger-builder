import React from "react";
import PropTypes from "prop-types";

const OrderSummary = props => {
    return (
        <>
            <h2>Your order!</h2>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {props.menu.map(ingredient => (
                    <li key={ingredient.type} style={{textTransform: 'capitalize'}}>
                        {`${ingredient.type}: ${ingredient.count} x ${ingredient.price}`}
                    </li>
                ))}
            </ul>
            <strong><p>Total price: {props.price.toFixed(3)}</p></strong>
        </>
    );
};

OrderSummary.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number,
        type: PropTypes.string,
        count: PropTypes.number,
    })).isRequired,
    price: PropTypes.number,
};

export default OrderSummary;
