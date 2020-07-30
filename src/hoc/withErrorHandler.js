import React, {useState, useEffect} from "react";

const withErrorHandler = ModalOnError => (WrappedComponent, axiosInstance) => props => {
    const [error, errorHandler] = useState(null);
    const onCancel = () => errorHandler(null);
    useEffect(() => {
        axiosInstance.interceptors.request.use(req => {
            errorHandler(null);
            return req;
        });
        axiosInstance.interceptors.response.use(res => res, error => {
            errorHandler(error);
        });
    }, []);

    return (
        <>
            <ModalOnError isShow={!!error} error={error} onCancel={onCancel}/>
            <WrappedComponent {...props} />
        </>
    );
};

export default withErrorHandler;
