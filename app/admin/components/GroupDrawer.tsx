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
import {
    firestore,
    collection,
} from "@/firebase.js";
import {deleteDoc, doc, setDoc, updateDoc} from "@/firebase";

export default function GroupDrawer({
    isActive,
    onCloseDrawer,
    groups,
    references
}: {
    isActive?: boolean;
    onCloseDrawer?: (saved: boolean) => void;
    groups: any[];
    references: any[];
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
        let action = values.uuid ? updateDoc : setDoc;
        const docRef = values.uuid ? doc(firestore, 'groups', values.uuid) : doc(collection(firestore, 'groups'));

        await action(docRef, Object.assign({
            uuid: values.uuid ?? docRef.id,
            title: values.title,
        }, values.uuid ? {} : {
            created_at: new Date().getTime(),
        }));

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
                return new Promise<void>(async (resolve, reject) => {
                    await deleteDoc(doc(firestore, "groups", uuid));

                    await updateReferencesOfDeletedGroup();

                    resolve();
                    message.success("İşlem başarılı!");
                    close(true);
                });
            },
        });
    },  [references, uuid]);

    const updateReferencesOfDeletedGroup = useCallback(async () => {
        for (let reference of references.filter(reference => reference.group === uuid)) {
            await updateDoc(doc(firestore, "references", reference.uuid), {
                group: null,
            });
        }
    }, [references, uuid]);

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
