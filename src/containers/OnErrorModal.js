import React from "react";
import PropTypes from "prop-types";

import Modal from "../components/UI/Modal";
import ModalBody from "../components/UI/Modal/ModalBody";
import ModalFooter from "../components/UI/Modal/ModalFooter";
import Button from "../components/UI/Button";

const OnErrorModal = props => {
    return (
        <Modal isShow={props.isShow} onCancel={props.onCancel}>
            <ModalBody>
                <h2>Error!</h2>
                <p>{props.error && props.error.message}</p>
            </ModalBody>
            <ModalFooter>
                <Button width={'80px'} onClick={props.onCancel} invert>Ok!</Button>
            </ModalFooter>
        </Modal>
    );
};

OnErrorModal.propTypes ={
    isShow: PropTypes.bool,
    onCancel: PropTypes.func,
    error: PropTypes.oneOfType([
        PropTypes.shape({
            message: PropTypes.string,
        })
    ])
};

export default OnErrorModal;
