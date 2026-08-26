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
    App,
} from "antd";
import {
    firestore,
    collection,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage, updateDoc,
} from "@/firebase.js";
import {deleteObject, doc, setDoc} from "@/firebase";
import slugify from "@sindresorhus/slugify";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const QuillWrapper = dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
}, {
    ssr: false,
}) as typeof ReactQuill

export default function PostDrawer({
    isActive,
    onCloseDrawer,
    data,
}: {
    isActive: boolean;
    onCloseDrawer?: (saved: boolean) => void;
    data?: any;
}) {
    const {message} = App.useApp();
    const [form] = Form.useForm();
    const uuid = Form.useWatch('uuid', form);
    const storage = getStorage();

    const [imageFileList, setImageFileList] = useState<any[]>([]);
    const [removableFiles, setRemovableFiles] = useState<any[]>([]);
    const [preview, setPreview] = useState<string | undefined>(undefined);

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            ['blockquote', 'code-block', 'code'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }, { 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    }), []);

    useEffect(() => {
        if (!data) return;
        form.setFieldsValue({
            uuid: data?.uuid,
            title: data?.title,
            description: data?.description,
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
        const storageRef = ref(storage, `posts_${file.uid}`);
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
        let action = values.uuid ? updateDoc : setDoc;
        // @ts-ignore
        const docRef = values.uuid ? doc(firestore, 'posts', values.uuid) : doc(collection(firestore, 'posts'));
        await action(docRef, Object.assign({
            uuid: values.uuid ?? docRef.id,
                title: values.title,
                slug: slugify(values.title),
                description: values.description,
                image: imageFileList[0]?.response ?? null,
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
            title="Yeni Gönderi"
            onClose={() => close()}
            width={580}
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
                        name="title"
                        label="Başlık"
                        className="w-full"
                        rules={[{required: true, message: "Lütfen başlık girin"}]}
                    >
                        <Input placeholder="Başlık girin"/>
                    </Form.Item>

                    <Form.Item
                        label="Resim"
                        name="image"
                        className="w-full"
                    >
                        <Upload {...uploadImageProps}>
                            {imageFileList.length == 0 ? <div>
                                <PlusOutlined/>
                                <div>Yükle</div>
                            </div> : null}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Açıklama"
                        className="w-full"
                        initialValue={null}
                    >
                        <QuillWrapper
                            modules={modules}
                        />
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
