import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

function UploadImageCarousel(props) {
    const { fileList, onPreview, onChange, open, title, onCancel, src } = props;

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

    // const handleSuccess = (response) => {
    //     message.success('Upload ảnh thành công!');
    // };

    // const handleError = (error) => {
    //     message.error('Có lỗi xảy ra trong quá trình upload. Vui lòng thử lại.');
    // };

    return (
        <div>
            <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={onPreview}
                onChange={onChange}
                // onSuccess={handleSuccess}
                // onError={handleError}
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
