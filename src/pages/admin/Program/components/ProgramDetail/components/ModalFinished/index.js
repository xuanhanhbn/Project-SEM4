import { Modal, message } from 'antd';
import React, { useState } from 'react';
import UploadImageCarousel from './UploadImageCarousel';
import { getBaseUploadCarousel64, notify } from '~/utils/common';
import { useMutation } from '@tanstack/react-query';
import { uploadImageApi } from './callApi';
import Loading from '~/components/Loading';

function ModalFinishedProgram(props) {
    const { isModalOpen, handleOk, handleCancel } = props;

    const [fileListCarouselImage, setFileListCarouselImage] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [listImage, setListImage] = useState({
        imageLogo: '',
        imageList: [],
    });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBaseUploadCarousel64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleUploadCarouselImage = (info) => {
        const files = info.file || {};
        if (files.status === 'done') {
            return message.success(`${info.file.name} file uploaded successfully`);
        }
        mutationUploadListImage({ files: files?.originFileObj });
        return setFileListCarouselImage(info?.fileList);
    };

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

    const handleUpload = () => handleOk(listImage.imageList);

    return (
        <div>
            <Loading isLoading={isPendingUploadListImg} />
            <Modal
                title="Finished Program"
                okText="Confirm"
                open={isModalOpen}
                onOk={handleUpload}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: listImage?.imageList?.length <= 0 ? true : false,
                }}
            >
                <p>
                    When you click confirm, your program will transition to a completed state, and the donation process
                    will be paused. You will also be required to provide all invoices and relevant documentation
                    regarding the appropriate use of the donated funds. You will not be able to undo this action.
                </p>
                <div className="mt-4">
                    <div className="mb-2">
                        <strong>
                            All invoices and relevant documentation regarding the appropriate use of the donated funds
                        </strong>
                    </div>
                    <div>
                        <UploadImageCarousel
                            fileList={fileListCarouselImage}
                            onPreview={handlePreview}
                            onChange={handleUploadCarouselImage}
                            open={previewOpen}
                            title={previewTitle}
                            onCancel={handleCancel}
                            src={previewImage}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalFinishedProgram;
