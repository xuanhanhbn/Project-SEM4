import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import React from 'react';

function UploadImageBanner(props) {
    const { imageUrl, beforeUpload, onChange } = props;

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
    return (
        <div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={onChange}
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
