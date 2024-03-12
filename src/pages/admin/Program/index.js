import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import './Program.css';

import ProjectImage from '~/assets/images/campaigns/Palestine-6.png';
import ModalCreateProgram from './components/ModalCreateProgram';
import TableCommon from '~/components/TableCommon';
import { columns, dataTablePrograms } from './constants';
import { Space, Input } from 'antd';

const status = 'inProcess';
const { Search } = Input;
function Program() {
    // State
    const [isOpenModalCreateProject, setIsOpenModalCreateProject] = useState(false);
    const [listSearchDataTable, setListSearchDataTable] = useState([]);

    // xử lý khi ấn submit modal
    const handleSubmitModal = (data) => {
        setIsOpenModalCreateProject(false);
        console.log('data', data);
    };
    // xử lý khi ấn cancel modal
    const handleCancelModal = () => {
        setIsOpenModalCreateProject(false);
        console.log('click cancel btn');
    };

    const onSearch = (value) => {
        setListSearchDataTable(dataTablePrograms.filter((data) => data.programName.toLowerCase().includes(value)));
    };

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }

        if (field === 'programName') {
            return <Link to="/admin/program/detail">{item.programName}</Link>;
        }

        if (field === 'status') {
            if (status === 'notSarted') {
                return <span className=" from-slate-600 to-slate-300 text_startus_program">Not Started</span>;
            }
            if (status === 'inProcess') {
                return <span className=" from-green-600 to-lime-400 text_startus_program">In Process</span>;
            }
            if (status === 'finished') {
                return <span className=" from-purple-700 to-pink-500 text_startus_program">Finished</span>;
            }
        }

        return item[field];
    }, []);

    return (
        <div id="program_page">
            <h1 className="mt-3 text-xl font-bold">Program</h1>

            <div className="flex-none w-full max-w-full px-3 mt-6">
                <div className="program_container">
                    <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl">
                        <h6 className="mb-4">New Projects</h6>
                    </div>
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap -mx-3">
                            <div className="program_new_project">
                                <div className="project_container">
                                    <div className="relative">
                                        <Link to="#" className="block shadow-xl rounded-2xl">
                                            <img
                                                src={ProjectImage}
                                                alt="img-blur-shadow"
                                                className="max-w-full shadow-soft-2xl rounded-2xl"
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex-auto px-1 pt-6">
                                        <p className="project_code">Code #FB-212562</p>
                                        <Link to="#">
                                            <h5>School</h5>
                                        </Link>
                                        <p className="mb-6 text-sm leading-normal">
                                            Big charity: build school for poor children.
                                        </p>
                                        <Link to="/admin/program/detail" type="button" className="view_btn">
                                            View Project
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="program_new_project">
                                <div className="create_project_btn">
                                    <div className="flex flex-col justify-center flex-auto p-6 text-center">
                                        <button onClick={() => setIsOpenModalCreateProject(true)}>
                                            <i className="mb-4 fa fa-plus text-slate-400"></i>
                                            <h5 className="text-slate-400">New project</h5>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end max-w-full px-3">
                <div className="flex items-center justify-center h-12 px-4 text-black bg-white border rounded-md border-gray-104">
                    <i className="mr-1 fa-regular fa-magnifying-glass"></i>
                    <Space direction="vertical">
                        <Search placeholder="input search program" allowClear size="large" onSearch={onSearch} />
                    </Space>
                </div>
            </div>
            <div className="flex-none w-full max-w-full px-3 mt-6">
                <TableCommon
                    data={listSearchDataTable.length > 0 ? listSearchDataTable : dataTablePrograms || []}
                    parseFunction={parseData}
                    columns={columns}
                    isShowPaging
                    className="shadow-md rounded-2xl"
                />
            </div>
            {/* modal tạo chương trình mới */}
            {isOpenModalCreateProject && (
                <ModalCreateProgram
                    onOpenCreateModal={isOpenModalCreateProject}
                    handleSubmitModalCreate={handleSubmitModal}
                    handleCancelModalCreate={handleCancelModal}
                    type="create"
                />
            )}
        </div>
    );
}

export default Program;
