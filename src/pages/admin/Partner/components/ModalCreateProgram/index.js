/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Input, InputNumber, Space, Select, DatePicker, message } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { inputCreateProgram } from './constants';
import './ModalCreate.css';
import moment from 'moment';
import UploadImageCarousel from '../UploadImageCarousel';
import UploadImageBanner from '../UploadImageBanner';
import { getBase64, beforeUpload, getBaseUploadCarousel64, notify } from '~/utils/common';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { uploadImageApi } from './callApi';
import { useMutation } from '@tanstack/react-query';
import Loading from '~/components/Loading';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const { TextArea } = Input;

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
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const { isOpen, handleCancelModalCreate, handleCreate, type } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileListCarouselImage] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const [endDateProgram, setEndDateProgram] = useState('');
    const [finishDateProgram, setFinishDateProgram] = useState('');
    const [optionPartner, setOptionPartner] = useState([]);
    const [listImage, setListImage] = useState({
        imageLogo: '',
        imageList: [],
    });
    const [valueDescription, setValueDescription] = useState('');

    const editorRef = useRef();

    const validationSchema = Yup.object().shape({
        // programThumbnailId: Yup.mixed().required('Partner Thumbnail is required'),
        programName: Yup.string().required('Full name is required'),
        // programDescription: Yup.string().required('Description is required'),
        tagName: type === 'create' && Yup.string().required('Tag is required'),
        partner: type === 'create' && Yup.string().required('Partner is required'),
        startDate: type === 'create' && Yup.string().required('Start date is required'),
        endDate: Yup.string().required('End date is required'),
        finishDate: Yup.string().required('Finish date is required'),
        target: type === 'create' && Yup.string().required('Target is required'),
    });

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (userData) {
            const options = [
                {
                    value: userData?.partnerId,
                    label: userData?.displayName,
                },
            ];
            setValue('partner', userData?.partnerId);
            return setOptionPartner(options);
        }
    }, [userData]);

    const disabledStartDate = (current) => {
        // Lấy ngày hiện tại
        const currentDate = moment().startOf('day');

        // So sánh ngày hiện tại với ngày được chọn
        return current && current <= currentDate;
    };

    const disabledEndDate = (current) => {
        // So sánh ngày hiện tại với ngày được chọn
        return current && current <= endDateProgram.add(1, 'day');
    };

    const disabledFinishDate = (current) => {
        // So sánh ngày hiện tại với ngày được chọn
        return current && current <= finishDateProgram.add(1, 'day');
    };

    // lưu thay đổi trong editor vào trong ValueDescription
    const onChangeHandler = (content) => {
        setValueDescription(content);
    };

    //call api upload logo
    const { mutate: mutationUploadLogo, isPending: isPendingUploadImg } = useMutation({
        mutationFn: uploadImageApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setListImage((prev) => ({
                    ...prev,
                    imageLogo: res?.data[0],
                }));
            }
            return notify(res?.message, 'error');
        },
    });

    const { mutate: mutationUploadListImage, isPending: isPendingUploadListImg } = useMutation({
        mutationFn: uploadImageApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setListImage((prev) => ({
                    ...prev,
                    imageList: [...prev.imageList, ...res?.data],
                }));
            }
            return notify(res?.message, 'error');
        },
    });

    // xử lý create progeam
    const onSubmit = (data) => {
        const dataCreate = {
            programName: data?.programName || '',
            target: data?.target || 0,
            startDonateDate: moment(data.startDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            endDonateDate: moment(data.endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            finishDate: moment(data.finishDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            description: valueDescription || '',
            finishSoon: true,
            recruitCollaborators: true,
            imageLogo: listImage.imageLogo,
            imageUrl: listImage?.imageList,
        };

        return handleCreate(dataCreate);
        // console.log('dataCreate: ', dataCreate);
    };

    // xử lý update program
    const updateProgram = (data) => {
        console.log('data', data);
    };

    // xử lý tìm kiếm bằng lable trong select partner
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // xử lý upload ảnh
    const handleUploadCarouselImage = (info) => {
        const files = info.file || {};
        if (files.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            mutationUploadListImage({ files: files?.originFileObj });
        }
        return setFileListCarouselImage(info?.fileList);
    };

    // xử lý upload ảnh banner
    const handleChangeUpaloadImageBanner = (info) => {
        const files = info.file || {};

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            getBase64(info.file.originFileObj, (url) => {
                setImageUrl(url);
            });
            return mutationUploadLogo({ files: files?.originFileObj });
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    // xử lý ấn đóng rivew ảnh
    const handleCancel = () => setPreviewOpen(false);

    //  xử lý khi ấn xem review ảnh
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBaseUploadCarousel64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    // ử lý chọn ngày bắt đầu chương trình
    const onChangeStartDate = (value, field) => {
        field.onChange(value);
        if (type === 'create') setEndDateProgram(value);
    };

    // xử lý chọn ngày dừng nhận donate
    const onChangeEndDate = (value, field) => {
        field.onChange(value);
        setFinishDateProgram(value);
    };

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
                                        disabled={type === 'edit' ? true : false}
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
                                        value={optionPartner}
                                        // onSearch={onSearchPartner}
                                        disabled={true}
                                        filterOption={filterOption}
                                        options={optionPartner}
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

        if (item.type === 'INPUT_NAME') {
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

        if (item.type === 'INPUT_DATE') {
            if (item.field === 'startDate') {
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
                                            onChange={(date) => onChangeStartDate(date, field)}
                                            selected={field.value}
                                            className="input-height"
                                            disabledDate={disabledStartDate}
                                            disabled={type === 'edit' ? true : false}
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

            if (item.field === 'endDate') {
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
                                            disabled={type === 'create' && !endDateProgram ? true : false}
                                            onChange={(date) => onChangeEndDate(date, field)}
                                            selected={field.value}
                                            className="input-height"
                                            disabledDate={type === 'create' ? disabledEndDate : disabledStartDate}
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

            if (item.field === 'finishDate') {
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
                                            disabled={finishDateProgram ? false : true}
                                            onChange={(date) => field.onChange(date)}
                                            selected={field.value}
                                            className="input-height"
                                            disabledDate={disabledFinishDate}
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
        }

        if (item.type === 'INPUT_AMOUNT') {
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
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChange}
                                        value={value}
                                        disabled={type === 'edit' ? true : false}
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

        if (item.type === 'INPUT_AREA') {
            const { field } = item;
            const message = errors[field] && errors[field].message;
            return (
                <div key={item.field} className="flex flex-col col-span-2">
                    <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                    {/* <Controller
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
                    {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>} */}
                    <SunEditor onChange={onChangeHandler} ref={editorRef} />
                </div>
            );
        }

        if (item.type === 'INPUT_UPLOAD') {
            if (item.field === 'programThumbnailCarouselId') {
                return (
                    <div key={item.field} className="flex flex-col col-span-2">
                        <>
                            <label className="mb-2 text-xs font-bold ">{item.lable}:</label>

                            <UploadImageCarousel
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleUploadCarouselImage}
                                open={previewOpen}
                                title={previewTitle}
                                onCancel={handleCancel}
                                src={previewImage}
                            />
                        </>
                    </div>
                );
            }

            if (item.field === 'programThumbnailBannerId') {
                return (
                    <div key={item.field} className="flex flex-col col-span-2">
                        <>
                            <label className="mb-2 text-xs font-bold ">{item.lable}:</label>

                            <UploadImageBanner
                                beforeUpload={beforeUpload}
                                onChange={handleChangeUpaloadImageBanner}
                                imageUrl={imageUrl}
                            />
                        </>
                    </div>
                );
            }
        }
    };
    return (
        <div>
            <Loading isLoading={isPendingUploadImg || isPendingUploadListImg} />
            <Modal
                style={{ top: 0, width: '100%' }}
                title="New Program"
                footer={false}
                className="relative"
                open={isOpen}
                onOk={type === 'update' ? handleSubmit(updateProgram) : handleSubmit(onSubmit)}
                onCancel={handleCancelModalCreate}
                width={800}
            >
                <form
                    onSubmit={type === 'edit' ? handleSubmit(updateProgram) : handleSubmit(onSubmit)}
                    id="create_program_modal"
                    className="grid grid-cols-2 gap-4 pt-3"
                >
                    {inputCreateProgram.map((item) => RENDER_INPUT_CREATE_PROGRAM(item))}

                    <button className="col-span-2 btn_create" type="submit">
                        submit
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default ModalCreateProgram;
