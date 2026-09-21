'use client';
import React, {useEffect, useState} from "react";
import AdminLayout from "../layouts/AdminLayout";
import Table from "../components/table";
import ProductDrawer from "../components/ProductDrawer";
import {apiGet, apiSend} from "@/lib/client-api";
import {Button, Image, Modal, message} from "antd";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [updateItem, setUpdateItem] = useState<any>();
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [drawer, setDrawer] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        const items = await apiGet("/api/products");
        setProducts(
            (items as any[]).map(item => ({
                ...item,
                key: item.uuid,
            }))
        );
        setLoading(false)
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
                        await apiSend(`/api/products/${selectedRow.uuid}`, "DELETE");
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
            title: 'Ürün kalıcı olarak silinecek. Emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                return new Promise<void>(async (resolve) => {
                    await apiSend(`/api/products/${item.uuid}`, "DELETE");

                    resolve();
                    getData();
                    message.success("İşlem başarılı!");
                });
            },
        });
    };

    const toggleDrawer = () => setDrawer((prev: boolean) => !prev);

    const handleUpdateItem = (item: any) => {
        setUpdateItem(products.find(product => product.uuid === item.uuid));
        toggleDrawer();
    };

    const handleProductClose = (saved: boolean) => {
        toggleDrawer();
        setUpdateItem(null)
        if (saved) getData();
    };

    return (
        <AdminLayout
            title="Ürünler"
            header={<Button onClick={toggleDrawer}>Ürün Ekle</Button>}
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
                data={products}
                onSelectionChange={(keys, rows) => setSelectedRows(rows)}
            />

            <ProductDrawer
                isActive={drawer}
                onCloseDrawer={handleProductClose}
                data={updateItem}
            />
        </AdminLayout>
    );
}
