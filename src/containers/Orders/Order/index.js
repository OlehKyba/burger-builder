import React from "react";
import PropTypes from "prop-types";

import Card from "../../../components/UI/Card";

const Order = props => {
    return (
        <Card>
            <p style={{textTransform: "capitalize"}}>
                <strong>Ingredients: </strong>
                {props.ingredients.map(item => `${item.type} (${item.count})`).join(" ")}
            </p>
            <p>
                <strong>Customer: </strong>
                Name: {props.customer.name}, Email: {props.customer.email}
            </p>
            <p>
                <strong>Total Price: </strong>
                {props.price.toFixed(3)}
            </p>
        </Card>
    );
};

Order.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        count: PropTypes.number,
    })),
    price: PropTypes.number,
    customer: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.shape({
            street: PropTypes.string,
            postalCode: PropTypes.string,
        }),
    }),
};

export default Order;
