import React from 'react';

function LayoutAdmin({ children }) {
    return (
        <div className=" bg-gray-400 min-h-[100vh] h-full flex-col pt-[5.75rem] ">
            <div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default LayoutAdmin;
