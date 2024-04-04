/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Tabs } from 'antd';
import ListProgramPending from './components/ProgramPending';
import ListAllProgram from './components/ListAllProgram';
import ListProgramEnd from './components/ListProgramEnd';

function Program() {
    const items = [
        {
            key: '1',
            label: 'List Program Pending',
            children: <ListProgramPending />,
        },
        {
            key: '2',
            label: 'List All Program',
            children: <ListAllProgram />,
        },
        {
            key: '3',
            label: 'List Program End',
            children: <ListProgramEnd />,
        },
    ];

    const onChange = (key) => {
        return key;
    };

    return (
        <div className="px-3">
            <h1 className="mt-3 text-xl font-bold mb-2">Program</h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" type="card" />
        </div>
    );
}

export default Program;
