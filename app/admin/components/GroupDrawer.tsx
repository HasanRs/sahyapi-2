import {useCallback, useMemo} from "react";
import {
    Button,
    Drawer,
    Form,
    Input,
    Row,
    Space,
    Select,
    Modal,
    message
} from "antd";
import {apiSend} from "@/lib/client-api";

export default function GroupDrawer({
    isActive,
    onCloseDrawer,
    groups,
}: {
    isActive?: boolean;
    onCloseDrawer?: (saved: boolean) => void;
    groups: any[];
    references?: any[];
}) {
    const [form] = Form.useForm();
    const uuid = Form.useWatch('uuid', form);

    const groupOptions = useMemo(() =>
        groups.map(group => ({
            value: group.uuid,
            label: group.title
        })), [groups]);

    const close = useCallback((saved: boolean = false) => {
        form.resetFields();
        onCloseDrawer!(saved);
    }, []);

    const save = useCallback(async (values: any) => {
        const payload = {
            title: values.title,
            ...(values.uuid ? {} : { created_at: new Date().getTime() }),
        };

        if (values.uuid) {
            await apiSend(`/api/groups/${values.uuid}`, "PUT", payload);
        } else {
            await apiSend("/api/groups", "POST", payload);
        }

        message.success("İşlem başarılı!");
        close(true);
    }, []);

    const handleDeleteItem = useCallback(() => {
        Modal.confirm({
            title: 'Grup kalıcı olarak silinecek. Emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                return new Promise<void>(async (resolve) => {
                    // API nulls references.group for this group
                    await apiSend(`/api/groups/${uuid}`, "DELETE");
                    resolve();
                    message.success("İşlem başarılı!");
                    close(true);
                });
            },
        });
    }, [uuid]);

    const handleGroupChange = useCallback((value: any) => {
        let item = value ? groups.find(group => group.uuid === value) : undefined;
        form.setFieldsValue({
            uuid: item?.uuid,
            title: item?.title,
        });
    }, [groups]);

    return (
        <Drawer
            closeIcon={false}
            onClose={() => close()}
            open={isActive ?? false}
            title={<Select
                value={uuid}
                placeholder="Yeni Grup"
                rootClassName="w-full"
                allowClear
                options={groupOptions}
                onChange={handleGroupChange}
            />}
            footer={<Space className="w-full justify-between">
                {uuid ? <Button danger onClick={handleDeleteItem}>Sil</Button> : <span />}
                <span className="space-x-2">
                    <Button type="text" onClick={() => close()}>İptal</Button>
                    <Button onClick={form.submit}>Kaydet</Button>
                </span>
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
                </Row>
            </Form>
        </Drawer>
    );
}
