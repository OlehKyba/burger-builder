import React from "react";
import PropTypes from "prop-types";

import classes from "./Pagination.module.css";

const generatePagesArray = (currentPage, maxPage) => {
    const range = Array.from({length: maxPage}, (item, i) => i + 1);
    const currentIndex = currentPage - 1;
    const startIndex = currentIndex === 0 ? 0 : currentIndex - 1;

    const slice = range.slice(startIndex, currentIndex + 2);
    if (!slice.includes(1)){
        const diff = slice[0] - 1;
        if (diff > 1) {
            slice.unshift(diff > 2 ? "..." : 2);
        }
        slice.unshift(1);
    }

    if (!slice.includes(maxPage)){
        const diff = maxPage - slice[slice.length - 1];
        if (diff > 1) {
            slice.push(diff > 2 ? "..." : maxPage - 1);
        }
        slice.push(maxPage);
    }

    return slice.map(item => ({
        label: item,
        disabled: item === "...",
        active: item === currentPage,
    }));
};

const Pagination = props => {

    const preventDefaultWrapper = func => e => {
        e.preventDefault();
        return func();
    };

    const pageMetaData = generatePagesArray(props.currentPage, props.maxPage);

    return (
        <div className={classes.Pagination}>
            <span
                className={props.currentPage === 1 ? classes.Disabled : undefined}
                onClick={preventDefaultWrapper(props.onPageChange.bind(null, props.currentPage - 1))}
            >
                &laquo;
            </span>
            {props.maxPage ?
                pageMetaData.map((item, i) => {
                    return (
                        <span
                            key={`${item.label}_${i}`}
                            onClick={preventDefaultWrapper(props.onPageChange.bind(null, item.label))}
                            className={item.active ? classes.Active : item.disabled ? classes.Disabled : undefined}
                        >
                            {item.label}
                        </span>
                    );
                })
                :
                <span className={classes.Active}>...</span>
            }
            <span
                className={props.currentPage === props.maxPage ? classes.Disabled : undefined}
                onClick={preventDefaultWrapper(props.onPageChange.bind(null, props.currentPage + 1))}
            >
                &raquo;
            </span>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    maxPage: PropTypes.number,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    currentPage: 1,
};

export default Pagination;
