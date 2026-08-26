'use client';
import React, {useEffect, useState} from "react";
import AdminLayout from "../layouts/AdminLayout";
import Table from "../components/table";
import {firestore, collection, getDocs, getStorage, query, orderBy} from "firebase.js";
import {deleteDoc, deleteObject, doc, ref} from "@/firebase";
import {Button, Image, Modal, message} from "antd";
import PostDrawer from "@/app/admin/components/PostDrawer";
import moment from "moment";
import "moment/locale/tr";

export default function Home() {
    const storage = getStorage();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [updateItem, setUpdateItem] = useState<any>();
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [drawer, setDrawer] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        let snapshot = await getDocs(query(collection(firestore, "posts"), orderBy('created_at')))
        setPosts(snapshot.docs
            .map(doc => doc.data())
            .map(item => ({
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
            title: "Oluşturulma Tarihi",
            width: "200px",
            render: (text: string, record: any) => moment(record.created_at).format('LL dddd, HH:mm'),
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
                return new Promise<void>(async (resolve, reject) => {
                    for (let selectedRow of selectedRows) {
                        await deleteDoc(doc(firestore, "posts", selectedRow.uuid));

                        if (selectedRow.image) {
                            try {
                                await deleteObject(ref(storage, selectedRow.image));
                            } catch {}
                        }
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
            title: 'Gönderi kalıcı olarak silinecek. Emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                return new Promise<void>(async (resolve, reject) => {
                    await deleteDoc(doc(firestore, "posts", item.uuid));

                    if (item.image) {
                        try {
                            await deleteObject(ref(storage, item.image));
                        } catch {}
                    }

                    resolve();
                    getData();
                    message.success("İşlem başarılı!");
                });
            },
        });
    };

    const toggleDrawer = () => setDrawer((prev: boolean) => !prev);

    const handleUpdateItem = (item: any) => {
        setUpdateItem(posts.find(post => post.uuid === item.uuid));
        toggleDrawer();
    };

    const handleServiceClose = (saved: boolean) => {
        toggleDrawer();
        setUpdateItem(null)
        if (saved) getData();
    };

    return (
        <AdminLayout
            title="Gönderiler"
            header={<Button onClick={toggleDrawer}>Gönderi Ekle</Button>}
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
                data={posts}
                onSelectionChange={(keys, rows) => setSelectedRows(rows)}
            />

            <PostDrawer
                isActive={drawer}
                onCloseDrawer={handleServiceClose}
                data={updateItem}
            />
        </AdminLayout>
    );
}
