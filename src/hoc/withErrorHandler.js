import React, {Component} from "react";

const withErrorHandler = (ModalOnError, WrappedComponent, axiosInstance) => {
    return class extends Component {

        state = {
            error: null,
        };

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.reqInterceptor);
            axiosInstance.interceptors.response.eject(this.resInterceptor);
        }

        UNSAFE_componentWillMount() {
            this.reqInterceptor = axiosInstance.interceptors.request.use(req => {
                if (this.state.error)
                    this.setState({error: null});
                return req;
            });

            this.resInterceptor = axiosInstance.interceptors.response.use(res => res,
                error => {
                this.setState({error});
                return Promise.reject(error);
            });
        }

        onCancel = () => this.setState({error: null});

        render() {
            return (
                <>
                    <ModalOnError isShow={!!this.state.error} error={this.state.error} onCancel={this.onCancel} axios={axiosInstance}/>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
};

export default withErrorHandler;
