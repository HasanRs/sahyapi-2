'use client';
import React, {useEffect, useState} from "react";
import AdminLayout from "../layouts/AdminLayout";
import Table from "../components/table";
import {apiGet, apiSend} from "@/lib/client-api";
import {Button, Image, Modal, message} from "antd";
import ProjectDrawer from "@/app/admin/components/ProjectDrawer";

export default function Home() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [updateItem, setUpdateItem] = useState<any>();
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [drawer, setDrawer] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        const items = await apiGet("/api/projects");
        setServices(
            (items as any[]).map(item => ({
                ...item,
                key: item.uuid,
                status: item.is_completed ? "Tamamlandı" : "Devam ediyor",
            }))
        );
        setLoading(false)
    };

    const columns: any[] = [
        {
            title: "Görseller",
            width: "75px",
            render: (text: string, record: any) => record.image?.length > 0 ? (
                <Image.PreviewGroup items={record.image}>
                    <Image src={record.image[0]} preview={{mask: "Önizle"}} className="object-contain" alt="Preview" width={75} height={75}/>
                </Image.PreviewGroup>
            ) : null,
        },
        {
            title: "Durum",
            dataIndex: "status",
            key: "status",
            width: "125px",
        },
        {
            title: "Başlık",
            dataIndex: "title",
            key: "title",
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

    const handleDeleteSelectedItem = () => {
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
                    for (let selectedRow of selectedRows) {
                        await apiSend(`/api/projects/${selectedRow.uuid}`, "DELETE");
                    }

                    resolve();
                    getData();
                    setSelectedRows([]);
                    message.success("İşlem başarılı!");
                });
            },
        });
    };

    const handleDeleteItem = (item: any) => {
        Modal.confirm({
            title: 'Proje kalıcı olarak silinecek. Emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                return new Promise<void>(async (resolve) => {
                    await apiSend(`/api/projects/${item.uuid}`, "DELETE");

                    resolve();
                    getData();
                    message.success("İşlem başarılı!");
                });
            },
        });
    };

    const toggleDrawer = () => setDrawer((prev: boolean) => !prev);

    const handleUpdateItem = (item: any) => {
        setUpdateItem(services.find(service => service.uuid === item.uuid));
        toggleDrawer();
    };

    const handleProjectClose = (saved: boolean) => {
        toggleDrawer();
        setUpdateItem(null)
        if (saved) getData();
    };

    return (
        <AdminLayout
            title="Projeler"
            header={<Button onClick={toggleDrawer}>Proje Ekle</Button>}
            loading={loading}
        >
            <Table
                columns={columns}
                header={<>
                    <Button type="primary" danger disabled={selectedRows.length == 0}
                            onClick={handleDeleteSelectedItem}>
                        Sil
                    </Button>
                </>}
                data={services}
                onSelectionChange={(keys, rows) => setSelectedRows(rows)}
            />

            <ProjectDrawer
                isActive={drawer}
                onCloseDrawer={handleProjectClose}
                data={updateItem}
            />
        </AdminLayout>
    );
}
