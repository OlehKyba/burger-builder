import React, {Component} from "react";
import PropTypes from "prop-types";

import axios from "../../../utils/axios/builder";

import classes from "./ContactData.module.css";

import Button from "../../../components/UI/Button";
import Spinner from "../../../components/UI/Spinner";

class ContactData extends Component {

    state = {
        name: 'Oleh',
        email: 'vestigor0@gmail.com',
        address: {
            street: 'Ольжича 35А',
            postalCode: '04060',
        },
        isLoading: false,
    };

    onSubmit = event => {
        event.preventDefault();
        const {isLoading, ...customer} = this.state;
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer,
        };
        this.setState({isLoading: true});
        axios.post("/orders/", order)
            .then(() => {
                this.setState({isLoading: false});
                const path = this.props.match.url + '/success';
                this.props.history.replace(path);
            })
            .catch(error => {
                this.setState({isLoading: false});
                const path = this.props.match.url + '/error?message=' + error.message;
                this.props.history.push(path);
            });
    };

    render() {
        return (
            <Spinner isSpin={this.state.isLoading}>
                <div className={classes.Container}>
                    <h4 className={classes.Title}>Enter your contact data:</h4>
                     <form className={classes.FormContainer}>
                         <input type="text" placeholder="Your Name"/>
                         <input type="email" placeholder="Email"/>
                         <input type="text" placeholder="Street"/>
                         <input type="text" placeholder="Post Code"/>
                         <div className={classes.ButtonsContainer}>
                             <Button width={'80px'} onClick={this.onSubmit}>Confirm</Button>
                             {this.props.onCancel && <Button width={'80px'} onClick={this.props.onCancel} invert>Cancel</Button>}
                         </div>
                     </form>
                </div>
            </Spinner>
        );
    }
}

ContactData.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        count: PropTypes.number,
    })),
    price: PropTypes.number,
    onCancel: PropTypes.func,
};

export default ContactData;
