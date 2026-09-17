'use client';
import React, {useEffect, useState} from "react";
import AdminLayout from "../layouts/AdminLayout";
import {Button, Image, Modal, message} from "antd";
import Table from "../components/table";
import ReferenceDrawer from "../components/ReferenceDrawer";
import {apiGet, apiSend} from "@/lib/client-api";
import GroupDrawer from "@/app/admin/components/GroupDrawer";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [groups, setGroups] = useState<any[]>([]);
    const [references, setReferences] = useState<any[]>([]);
    const [updateItem, setUpdateItem] = useState<any>();
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [drawer, setDrawer] = useState<boolean>(false);
    const [groupDrawer, setGroupDrawer] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true)
        const [_groups, referenceItems] = await Promise.all([
            apiGet("/api/groups"),
            apiGet("/api/references"),
        ]);

        setReferences(
            (referenceItems as any[]).map(item => ({
                ...item,
                key: item.uuid,
                group_title: item.group
                    ? (_groups as any[]).find(group => group.uuid === item.group)?.title
                    : null,
            }))
        );
        setGroups(_groups as any[]);
        setLoading(false);
    };

    const columns: any[] = [
        {
            title: "Resim",
            width: "75px",
            render: (text: string, record: any) => record.image ? (
                <Image src={record.image} preview={{mask: "Önizle"}} className="object-contain" alt="Preview" width={75} height={75}/>
            ) : null,
        },
        {
            title: "Grup",
            dataIndex: "group_title",
            key: "group_title",
        },
        {
            title: "İşlemler",
            width: "140px",
            render: (text: string, record: any) => (
                <div className="flex gap-2">
                    <Button onClick={() => handleUpdateItem(record)}>
                        Düzenle
                    </Button>
                    <Button danger onClick={() => handleDeleteItem(record)}>
                        Sil
                    </Button>
                </div>
            ),
        },
    ];

    const handleDeleteSelectedRows = () => {
        Modal.confirm({
            title: 'Seçilenleri silmek istediğinizden emin misiniz?',
            content: 'Bu işlem geri alınamaz.',
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                return new Promise<void>(async (resolve) => {
                    for (let item of selectedRows) {
                        await apiSend(`/api/references/${item.uuid}`, "DELETE");
                    }

                    resolve();
                    setSelectedRows([]);
                    getData();
                    message.success("İşlem başarılı!");
                });
            },
        });
    };

    const handleDeleteItem = (item: any) => {
        Modal.confirm({
            title: 'Referans kalıcı olarak silinecek. Emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                return new Promise<void>(async (resolve) => {
                    await apiSend(`/api/references/${item.uuid}`, "DELETE");

                    resolve();
                    getData();
                    message.success("İşlem başarılı!");
                });
            },
        });
    };

    const toggleDrawer = () => setDrawer((prev: boolean) => !prev);

    const toggleGroupDrawer = () => setGroupDrawer((prev: boolean) => !prev);

    const handleUpdateItem = (item: any) => {
        setUpdateItem(references.find(reference => reference.uuid === item.uuid));
        toggleDrawer();
    };

    const handleReferenceClose = (saved: boolean) => {
        toggleDrawer();
        setUpdateItem(null)
        if (saved) getData();
    };

    const handleGroupClose = (saved: boolean) => {
        toggleGroupDrawer();
        if (saved) getData();
    };

    return (
        <AdminLayout
            title="Referanslar"
            header={<>
                <Button onClick={toggleGroupDrawer}>Gruplar</Button>
                <Button onClick={toggleDrawer}>Referans Ekle</Button>
            </>}
            loading={loading}
        >
            <Table
                columns={columns}
                header={<>
                    <Button type="primary" danger disabled={selectedRows.length == 0}
                            onClick={handleDeleteSelectedRows}>
                        Sil
                    </Button>
                </>}
                data={references}
                onSelectionChange={(keys, rows) => setSelectedRows(rows)}
            />

            <ReferenceDrawer
                isActive={drawer}
                onCloseDrawer={handleReferenceClose}
                data={updateItem}
                groups={groups}
            />

            <GroupDrawer
                isActive={groupDrawer}
                onCloseDrawer={handleGroupClose}
                references={references}
                groups={groups}
            />
        </AdminLayout>
    );
}
