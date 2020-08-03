import React, {Component} from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from "prop-types";

import axios from "../../../utils/axios/builder";

import classes from "./ContactData.module.css";

import Button from "../../../components/UI/Button";
import Spinner from "../../../components/UI/Spinner";
import Input from "../../../components/UI/Input";
import SearchLocationInput from "../../../components/UI/Input/SearchLocationInput";
import Select from "../../../components/UI/Select";
import Option from "../../../components/UI/Select/Option";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ContactDataSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Required'),
    address: Yup.string()
        .required('Required'),
    deliveryType: Yup.string()
        .oneOf([
            'fastest',
            'cheapest',
        ])
        .default('cheapest'),
});


class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        deliveryType: 'cheapest',
        isLoading: false,
    };

    onSubmit = customer => {
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
                    <Formik
                        initialValues={{
                            name: this.state.name,
                            email: this.state.email,
                            phoneNumber: this.state.phoneNumber,
                            address: this.state.address,
                            deliveryType: this.state.deliveryType,
                        }}
                        onSubmit={this.onSubmit}
                        validationSchema={ContactDataSchema}
                    >
                        <Form className={classes.FormContainer}>
                            <Field name={'name'} placeholder={"Name"} type={"text"} component={Input} />
                            <Field name={'email'} placeholder={"Email"} type={'email'} component={Input}/>
                            <Field name={'phoneNumber'} placeholder={"Phone Number"} type={'tel'} component={Input}/>
                            <Field name={'address'} placeholder={"Address"} type={'text'} component={SearchLocationInput}/>
                            <Field name={'deliveryType'} component={Select}>
                                <Option value={'fastest'}>Fastest</Option>
                                <Option value={'cheapest'}>Cheapest</Option>
                            </Field>
                            <div className={classes.ButtonsContainer}>
                                <Button width={'80px'} type={'submit'}>Confirm</Button>
                                {this.props.onCancel && <Button width={'80px'} onClick={this.props.onCancel} invert>Cancel</Button>}
                            </div>
                        </Form>
                    </Formik>
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
