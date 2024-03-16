import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import { notify } from '~/utils/common';
import { uploadProgramCarouselApi } from './callApi';

function UploadImageCarousel(props) {
    const { onPreview, open, title, onCancel, src } = props;

    const [fileList, setFileList] = useState([]);

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

    //call api upload logo
    const { mutate: mutationUploadBanner } = useMutation({
        mutationFn: uploadProgramCarouselApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                fileList.push(data?.data[0]);
                console.log('fileList: ', fileList);
            }
            return notify(data?.message, 'error');
        },
    });

    const handleChange = (info) => {
        const files = info.file || {};

        if (files.status === 'uploading') {
            return;
        }

        if (files.status === 'done') {
            mutationUploadBanner({ files: files?.originFileObj });

            return notify('Upload success', 'success');
        }
    };

    return (
        <div>
            <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                onPreview={onPreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButtonUploadCareousel}
            </Upload>
            <Modal open={open} title={title} footer={null} onCancel={onCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={src}
                />
            </Modal>
        </div>
    );
}

export default UploadImageCarousel;
