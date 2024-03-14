/* eslint-disable react/prop-types */
import { Spin } from 'antd';
import React from 'react';
import './style.css';

const Loading = (props) => {
    const { isLoading } = props;

    return <div className={isLoading ? 'loading' : ''}>{isLoading ? <Spin size="large" /> : <></>}</div>;
};

export default Loading;
