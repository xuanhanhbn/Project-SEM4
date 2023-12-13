import React from 'react';
import { Collapse } from 'antd';
import './collapse.css';

export default function CollapseCustom({ title, content }) {
    return (
        <div id="collapse">
            <Collapse
                size="large"
                items={[
                    {
                        key: '1',
                        label: <h1>{title}</h1>,
                        children: <p>{content}</p>,
                    },
                ]}
            />
        </div>
    );
}
