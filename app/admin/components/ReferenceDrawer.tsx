import {useCallback, useEffect, useMemo, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {
    Button,
    Drawer,
    Form,
    Input,
    Row,
    Space,
    Upload,
    Image,
    UploadProps,
    message,
    Select,
} from "antd";
import {
    firestore,
    collection,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from "@/firebase.js";
import {deleteObject, doc, setDoc, updateDoc} from "@/firebase";

export default function ReferenceDrawer({
    isActive,
    onCloseDrawer,
    data,
    groups,
}: {
    isActive?: boolean;
    onCloseDrawer?: (saved: boolean) => void;
    data?: any;
    groups: any[];
}) {
    const [form] = Form.useForm();
    const uuid = Form.useWatch('uuid', form);
    const storage = getStorage();

    const [imageFileList, setImageFileList] = useState<any[]>([]);
    const [removableFiles, setRemovableFiles] = useState<any[]>([]);
    const [preview, setPreview] = useState<string | undefined>(undefined);

    const groupOptions = useMemo(() =>
        groups.map(group => ({
            value: group.uuid,
            label: group.title
        })), [groups]);

    useEffect(() => {
        if (!data) return;
        form.setFieldsValue({
            uuid: data?.uuid,
            group: data?.group,
        })
        setImageFileList(data?.image ? [{
            uid: data.image,
            name: data.image,
            status: "done",
            url: data.image,
            response: data.image,
            thumbUrl: data.image,
        }] : []);
    }, [data]);

    const beforeUpload = useCallback((file: any) => {
        const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type);
        if (!isJpgOrPng) {
            message.error('Lütfen sadece JPG veya PNG uzantılı dosya seçiniz');
        }
        return isJpgOrPng || Upload.LIST_IGNORE;
    }, []);

    const customRequest = useCallback(({file, onError, onProgress, onSuccess}: any) => {
        const storageRef = ref(storage, `references_${file.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
                onProgress({percent}, file);
            },
            onError,
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onSuccess(downloadURL, file)
                });
            }
        );
    }, []);

    const uploadImageProps: UploadProps = useMemo(() => ({
        maxCount: 1,
        listType: "picture-card",
        fileList: imageFileList,
        beforeUpload,
        customRequest,
        onPreview(file) {
            setPreview(file.response);
        },
        onChange({fileList}) {
            setImageFileList(fileList);
        },
        onRemove(file) {
            if (!file.response) return;
            if (uuid == undefined || file.size) {
                try {
                    deleteObject(ref(storage, file.response));
                } catch {}
            } else {
                setRemovableFiles(prev => [...prev, file.response])
            }
        },
    }), [imageFileList, uuid]);

    const close = useCallback((saved: boolean = false) => {
        form.resetFields();
        setImageFileList([]);
        setRemovableFiles([]);
        onCloseDrawer!(saved);
    }, []);

    const cancel = useCallback(() => {
        let uploadedFiles = imageFileList.filter(({status, size}: any) => status === 'done' && size)
        uploadedFiles.forEach(({response}) => {
            try {
                deleteObject(ref(storage, response));
            } catch {}
        });
        close();
    }, [imageFileList]);

    const save = useCallback(async (values: any) => {
        if (imageFileList.length === 0) {
            return message.error("Lütfen görsel seçiniz");;
        }
        let action = values.uuid ? updateDoc : setDoc;
        // @ts-ignore
        const docRef = values.uuid ? doc(firestore, 'references', values.uuid) : doc(collection(firestore, 'references'));
        await action(docRef, Object.assign({
            uuid: values.uuid ?? docRef.id,
            group: values.group ?? null,
            image: imageFileList[0]?.response,
        }, values.uuid ? {} : {
            created_at: new Date().getTime(),
        }));

        if (values.uuid) {
            removableFiles.forEach(file => {
                try {
                    deleteObject(ref(storage, file));
                } catch {}
            });
        }

        message.success("İşlem başarılı!");
        close(true);
    }, [imageFileList, removableFiles]);

    return (
        <Drawer
            title="Yeni Referans"
            onClose={() => close()}
            open={isActive ?? false}
            footer={<Space className="w-full justify-end">
                <Button type="text" onClick={cancel}>İptal</Button>
                <Button onClick={form.submit}>Kaydet</Button>
            </Space>}
        >
            <Form form={form} onFinish={save} layout="vertical" requiredMark>
                <Row>
                    <Form.Item name="uuid">
                        <Input type="hidden"/>
                    </Form.Item>

                    <Form.Item
                        name="group"
                        label="Grup"
                        className="w-full"
                        initialValue={null}
                        rules={[{required: true, message: "Lütfen grup seçiniz"}]}
                    >
                        <Select
                            placeholder="Grup seçin"
                            rootClassName="w-full"
                            options={groupOptions}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Görsel"
                        className="w-1/2"
                    >
                        <Upload {...uploadImageProps}>
                            {imageFileList.length == 0 ? <div>
                                <PlusOutlined/>
                                <div>Yükle</div>
                            </div> : null}
                        </Upload>
                    </Form.Item>
                </Row>
            </Form>
            {preview !== undefined ? <Image
                hidden
                src="data:image/png;base64,"
                preview={{visible: true, src: preview, onVisibleChange: () => setPreview(undefined)}}
            /> : null}
        </Drawer>
    );
}
