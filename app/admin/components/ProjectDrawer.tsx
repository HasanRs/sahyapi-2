import {useCallback, useEffect, useMemo, useState} from "react";
import {CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
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
    App, Switch,
} from "antd";
import {apiSend, uploadImage} from "@/lib/client-api";
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

export default function ProjectDrawer({
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

    const [imageFileList, setImageFileList] = useState<any[]>([]);
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
            is_completed: data?.is_completed,
        })
        setImageFileList(data?.image?.map((image: string) => ({
            uid: image,
            name: image,
            status: "done",
            url: image,
            response: image,
            thumbUrl: image,
        })) ?? []);
    }, [data]);

    const beforeUpload = useCallback((file: any) => {
        const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type);
        if (!isJpgOrPng) {
            message.error('Lütfen sadece JPG veya PNG uzantılı dosya seçiniz');
        }
        return isJpgOrPng || Upload.LIST_IGNORE;
    }, []);

    const customRequest = useCallback(async ({file, onError, onSuccess}: any) => {
        try {
            const url = await uploadImage(file as File);
            onSuccess(url, file);
        } catch (err) {
            onError(err);
        }
    }, []);

    const uploadImageProps: UploadProps = useMemo(() => ({
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
        onRemove() {
            // Data URLs need no remote delete
        },
    }), [imageFileList, uuid]);

    const close = useCallback((saved: boolean = false) => {
        form.resetFields();
        setImageFileList([]);
        onCloseDrawer!(saved);
    }, []);

    const cancel = useCallback(() => {
        // No remote delete needed for data URL uploads
        close();
    }, []);

    const save = useCallback(async (values: any) => {
        const payload = {
            title: values.title,
            description: values.description,
            image: imageFileList.map(({ response }) => response).filter(Boolean),
            is_completed: values.is_completed ?? false,
            ...(values.uuid ? {} : { created_at: new Date().getTime() }),
        };

        if (values.uuid) {
            await apiSend(`/api/projects/${values.uuid}`, "PUT", payload);
        } else {
            await apiSend("/api/projects", "POST", payload);
        }

        message.success("İşlem başarılı!");
        close(true);
    }, [imageFileList]);

    return (
        <Drawer
            title="Yeni Proje"
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
                        label="Görsel"
                        name="image"
                        className="w-full"
                    >
                        <Upload {...uploadImageProps}>
                            <div>
                                <PlusOutlined/>
                                <div>Yükle</div>
                            </div>
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

                    <Form.Item
                        name="is_completed"
                        label="Tamamlandı"
                        className="w-full"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren={<CheckOutlined className="inline-flex" />}
                            unCheckedChildren={<CloseOutlined className="inline-flex" />}
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
