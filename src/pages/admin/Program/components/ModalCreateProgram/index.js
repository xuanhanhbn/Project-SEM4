import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Input, InputNumber, Space, Select, DatePicker, Upload, message } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PlusOutlined } from '@ant-design/icons';

// import { beforeUpload, getBase64 } from 'src/utils/common';
import { inputCreateProgram } from './constants';
import './ModalCreate.css';
import moment from 'moment';

const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const validationSchema = Yup.object().shape({
    // programThumbnailId: Yup.mixed().required('Partner Thumbnail is required'),
    programName: Yup.string().required('Full name is required'),
    programDescription: Yup.string().required('Description is required'),
    tagName: Yup.string().required('Tag is required'),
    partner: Yup.string().required('Partner is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    finishDate: Yup.string().required('Finish date is required'),
    target: Yup.string().required('Target is required'),
});

const selectOptions = [
    {
        value: 'school',
        label: 'School',
    },
    {
        value: 'children',
        label: 'Children',
    },
    {
        value: 'plantATree',
        label: 'Plant a tree',
    },
];

function ModalCreateProgram(props) {
    const { onOpenCreateModal, handleCancelModalCreate, type } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileListCarouselImage] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // xử lý create progeam
    const onSubmit = (data) => {
        data.startDate = moment(data.startDate).format('YYYY/MM/DD');
        data.endDate = moment(data.endDate).format('YYYY/MM/DD');
        data.finishDate = moment(data.finishDate).format('YYYY/MM/DD');
        data.carouselImageUrl = fileList;
        data.bannerImageUrl = imageUrl;
        console.log('data', data);
    };

    // xử lý update program
    const updateProgram = (data) => {
        console.log('data', data);
    };

    // xử lý tìm kiếm bằng lable trong select partner
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // xử lý upload ảnh
    const handleUploadCarouselImage = ({ fileList: newFileList }) => {
        setFileListCarouselImage(newFileList);
    };

    // xử lý upload ảnh banner
    const handleChangeUpaloadImageBanner = (info) => setImageUrl(info);

    // xử lý ấn đóng rivew ảnh
    const handleCancel = () => setPreviewOpen(false);
    //  xử lý khi ấn xem review ảnh
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    // style button upload
    const uploadButtonUploadCareousel = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // style button upload
    const uploadButtonUploadBanner = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // render input create program
    const RENDER_INPUT_CREATE_PROGRAM = (item) => {
        if (item.type === 'SELECT') {
            if (item.field === 'tagName') {
                const { field } = item;
                const message = errors[field] && errors[field].message;
                return (
                    <div key={item.field} className="flex flex-col">
                        <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <Select
                                        showSearch
                                        placeholder="Select a tag name"
                                        className="input-height"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        value={value}
                                        // onSearch={onSearchPartner}
                                        filterOption={filterOption}
                                        options={selectOptions || []}
                                    />
                                );
                            }}
                            name={item.field}
                        />
                        {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                    </div>
                );
            }

            if (item.field === 'partner') {
                const { field } = item;
                const message = errors[field] && errors[field].message;
                return (
                    <div key={item.field} className="flex flex-col">
                        <label className="mb-2 text-xs font-bold ">{item.lable}:</label>

                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <Select
                                        showSearch
                                        placeholder="Select a partner"
                                        className="input-height"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        value={value}
                                        // onSearch={onSearchPartner}
                                        filterOption={filterOption}
                                        options={[
                                            {
                                                value: 'jack',
                                                label: 'Jack',
                                            },
                                            {
                                                value: 'lucy',
                                                label: 'Lucy',
                                            },
                                            {
                                                value: 'tom',
                                                label: 'Tom',
                                            },
                                        ]}
                                    />
                                );
                            }}
                            name={item.field}
                        />
                        {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                    </div>
                );
            }
        }

        if (item.type === 'INPUTNAME') {
            const { field } = item;
            const message = errors[field] && errors[field].message;
            return (
                <div key={item.field} className="flex flex-col col-span-2">
                    <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Input
                                    onChange={onChange}
                                    value={value}
                                    className="input-height"
                                    placeholder="Program name"
                                />
                            );
                        }}
                        name={item.field}
                    />
                    {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                </div>
            );
        }

        if (item.type === 'INPUTDATE') {
            const { field } = item;
            const message = errors[field] && errors[field].message;
            return (
                <div key={item.field} className="flex flex-col w-full">
                    <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                    <Controller
                        control={control}
                        render={({ field }) => {
                            return (
                                <Space direction="vertical">
                                    <DatePicker
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        className="input-height"
                                    />
                                </Space>
                            );
                        }}
                        name={item.field}
                    />
                    {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                </div>
            );
        }

        if (item.type === 'INPUTAMOUNT') {
            const { field } = item;
            const message = errors[field] && errors[field].message;
            return (
                <div key={item.field} className="flex flex-col">
                    <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Space>
                                    <InputNumber
                                        className="input-height"
                                        defaultValue={1000}
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChange}
                                        value={value}
                                    />
                                </Space>
                            );
                        }}
                        name={item.field}
                    />
                    {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                </div>
            );
        }

        if (item.type === 'INPUTAREA') {
            const { field } = item;
            const message = errors[field] && errors[field].message;
            return (
                <div key={item.field} className="flex flex-col col-span-2">
                    <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <TextArea
                                    autoSize={{
                                        minRows: 3,
                                        maxRows: 5,
                                    }}
                                    onChange={onChange}
                                    value={value}
                                    placeholder="Please describe your program in detail."
                                />
                            );
                        }}
                        name={item.field}
                    />
                    {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                </div>
            );
        }

        if (item.type === 'INPUTUPLOAD') {
            if (item.field === 'programThumbnailCarouselId') {
                return (
                    <div key={item.field} className="flex col-span-2">
                        <>
                            <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                            <div>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleUploadCarouselImage}
                                >
                                    {fileList.length >= 8 ? null : uploadButtonUploadCareousel}
                                </Upload>
                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                    <img
                                        alt="example"
                                        style={{
                                            width: '100%',
                                        }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>
                        </>
                    </div>
                );
            }

            if (item.field === 'programThumbnailBannerId') {
                return (
                    <div key={item.field} className="flex col-span-2">
                        <>
                            <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                            <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChangeUpaloadImageBanner}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButtonUploadBanner
                                    )}
                                </Upload>
                            </div>
                        </>
                    </div>
                );
            }
        }
    };
    return (
        <>
            <Modal
                style={{ top: 0 }}
                title="New Program"
                className="relative"
                open={onOpenCreateModal}
                onOk={type === 'update' ? handleSubmit(updateProgram) : handleSubmit(onSubmit)}
                onCancel={handleCancelModalCreate}
            >
                <div id="create_program_modal" className="grid grid-cols-2 gap-4 pt-3">
                    {inputCreateProgram.map((item) => RENDER_INPUT_CREATE_PROGRAM(item))}
                </div>
            </Modal>
        </>
    );
}

export default ModalCreateProgram;
