import ReactDOM from "react-dom";
import React, {Component} from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";

import Button from "../Button";
import Backdrop from "../Backdrop";
import Spinner from "../Spinner";

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
                        <Spinner>
                        <div className={classes.Text}>
                            {this.props.children}
                        </div>
                        <div className={classes.Buttons}>
                            <Button width={'60px'} onClick={this.props.onSubmit}>Yes</Button>
                            <Button width={'60px'} onClick={this.props.onCancel} invert>No</Button>
                        </div>
                        </Spinner>
                    </div>
                    <Backdrop isShow={this.props.isShow} onClick={this.props.onCancel}/>
                </>
        );
        return ReactDOM.createPortal(modal, this.el);
    }
}

Modal.propTypes = {
    isShow: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
};

export default Modal;
