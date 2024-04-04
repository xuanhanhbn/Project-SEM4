/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Input, InputNumber, Space, Select, DatePicker, message, Checkbox, Button } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { INPUT_EDIT_PROGRAM, inputCreateProgram } from './constants';
import './ModalCreate.css';
import moment from 'moment';
import UploadImageCarousel from '../UploadImageCarousel';
import UploadImageBanner from '../UploadImageBanner';
import { getBase64, beforeUpload, getBaseUploadCarousel64, notify } from '~/utils/common';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { extendProgramApi, uploadImageApi } from './callApi';
import { useMutation } from '@tanstack/react-query';
import Loading from '~/components/Loading';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import dayjs from 'dayjs';

function ModalEditProgram(props) {
    const { isOpen, onClose, onEdit, type, oldData } = props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [endDateProgram, setEndDateProgram] = useState('');
    const [listImage, setListImage] = useState({
        imageLogo: '',
        imageList: [],
    });
    const [valueDescription, setValueDescription] = useState('');
    const [dataRequest, setDataRequest] = useState({});

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
        if (Object.keys(oldData).length > 0) {
            setDataRequest(oldData);
            // editorRef?.current?.setContents('<p>Hello, SunEditor!</p>');
        }
    }, [oldData]);

    const disabledStartDate = (current) => {
        // Lấy ngày hiện tại
        const currentDate = moment(dataRequest?.startDonateDate).startOf('day');
        // So sánh ngày hiện tại với ngày được chọn
        return current && current <= currentDate;
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

    // xử lý update program
    const updateProgram = () => {
        const newRequest = {
            id: dataRequest?.programId,
            finishDate: dataRequest?.finishDate,
        };
        return onEdit(newRequest);
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

    // xử lý chọn ngày dừng nhận donate
    const onChangeEndDate = (value, dateString, type) => {
        const newDataRequest = {
            ...dataRequest,
            finishDate: dateString,
        };
        return setDataRequest(newDataRequest);
    };

    const handleReturnValue = (item) => {
        if (item.field === 'partnerName') {
            return dataRequest?.partner?.partnerName;
        }
        return dataRequest[item.field];
    };

    // render input create program
    const RENDER_INPUT_CREATE_PROGRAM = (item) => {
        if (item.type === 'CHECK_BOX') {
            return (
                <div key={item.field} className="px-2 flex flex-col" style={{ width: item?.width }}>
                    <label className="my-2 text-xs font-bold ">{item.lable}:</label>
                    <Checkbox checked={dataRequest[item.field]} disabled={item.disabled}>
                        Would you like to register as a volunteer? Y/N
                    </Checkbox>
                </div>
            );
        }

        if (item.type === 'INPUT') {
            return (
                <div key={item.field} className="px-2 flex flex-col" style={{ width: item?.width }}>
                    <label className="my-2 text-xs font-bold ">{item.lable}:</label>
                    <Input
                        size="large"
                        value={handleReturnValue(item)}
                        className="input-height"
                        placeholder="Program name"
                        disabled={item.disabled}
                    />
                </div>
            );
        }

        if (item.type === 'INPUT_DATE') {
            return (
                <div key={item.field} className="px-2 flex flex-col" style={{ width: item?.width }}>
                    <label className="my-2 text-xs font-bold ">{item.lable}:</label>
                    <DatePicker
                        onChange={(date, dateString) => onChangeEndDate(date, dateString, item?.field)}
                        selected={item.field}
                        value={dayjs(dataRequest[item.field], 'YYYY/MM/DD')}
                        size="large"
                        className="input-height"
                        disabledDate={disabledStartDate}
                        disabled={item.disabled}
                        allowClear={false}
                    />
                </div>
            );
        }

        if (item.type === 'INPUT_AMOUNT') {
            return (
                <div key={item.field} className="px-2 flex flex-col" style={{ width: item?.width }}>
                    <label className="my-2 text-xs font-bold ">{item.lable}:</label>
                    <InputNumber
                        className="w-full"
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        size="large"
                        value={dataRequest[item.field]}
                        disabled={item.disabled}
                    />
                </div>
            );
        }

        if (item.type === 'INPUT_AREA') {
            return (
                <div key={item.field} className="px-2 flex flex-col" style={{ width: item?.width }}>
                    <label className="my-2 text-xs font-bold ">{item.lable}:</label>
                    <SunEditor
                        defaultValue="123"
                        disable={item.disabled}
                        height="250px"
                        minHeight="250px"
                        onChange={onChangeHandler}
                        ref={editorRef}
                    />
                </div>
            );
        }
    };

    return (
        <div>
            <Loading isLoading={isPendingUploadImg || isPendingUploadListImg} />
            <Modal
                title="Edit Program"
                // footer={false}
                className="relative"
                open={isOpen}
                onOk={() => updateProgram()}
                onCancel={onClose}
                width={800}
            >
                <div className="w-full flex items-center justify-center flex-wrap">
                    {INPUT_EDIT_PROGRAM.map((item) => RENDER_INPUT_CREATE_PROGRAM(item))}
                </div>
            </Modal>
        </div>
    );
}

export default ModalEditProgram;
