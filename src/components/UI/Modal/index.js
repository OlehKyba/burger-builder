import ReactDOM from "react-dom";
import React, {Component} from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";

import Backdrop from "../Backdrop";

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.isShow !== this.props.isShow;
    }

    render() {
        const modal = (
            this.props.isShow &&
                <>
                    <div className={classes.Modal}>
                        {this.props.children}
                    </div>
                    <Backdrop isShow={this.props.isShow} onClick={this.props.onCancel}/>
                </>
        );
        return ReactDOM.createPortal(modal, this.el);
    }
}

Modal.propTypes = {
    isShow: PropTypes.bool,
    onCancel: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
};

export default Modal;
