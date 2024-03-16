import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { beforeUpload, notify } from '~/utils/common';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadProgramBannerApi } from './callApi';
import { useForm } from 'react-hook-form';

function UploadImageBanner(props) {
    const [imageUrl, setImageUrl] = useState();

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

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

    //call api upload logo
    const { mutate: mutationUploadBanner } = useMutation({
        mutationFn: uploadProgramBannerApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                setValue('urlLogo', data?.data[0]);

                setImageUrl(data?.data[0]);
                // console.log(imageUrl);
            }
            return notify(data?.message, 'error');
        },
    });

    const handleChange = (info) => {
        const files = info.file || {};
        // console.log('info: ', files);
        if (files.status === 'uploading') {
            return;
        }

        if (files.status === 'done') {
            return notify('Upload success', 'success');
        }
        // console.log('files', files.originFileObj);
        mutationUploadBanner({ files: files.originFileObj });
    };
    return (
        <div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '70%',
                        }}
                    />
                ) : (
                    uploadButtonUploadBanner
                )}
            </Upload>
        </div>
    );
}

export default UploadImageBanner;
