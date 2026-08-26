"use client";
import {ReactNode, useMemo, useState} from "react";
import {signOut} from "next-auth/react";
import {App, Grid, Layout, Menu, Modal, Spin} from "antd";
import { usePathname, useRouter } from 'next/navigation'
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog} from "@headlessui/react";
import Leo from "@/assets/images/leo.png";

const { Header, Content, Footer } = Layout;

export const routes: any[] = [
    {label: "Blog", key: "/admin/blog"},
    {label: "Hizmetler", key: "/admin/hizmetler"},
    {label: "Projeler", key: "/admin/projeler"},
    {label: "Referanslar", key: "/admin/referanslar"},
]

export default function AdminLayout({
    title,
    header,
    loading,
    children,
}: {
    title: string;
    header?: ReactNode;
    loading?: boolean;
    children: ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const screens = Grid.useBreakpoint();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = useMemo(() => [
        ...routes,
        { label: "Çıkış", key: "sign_out", }
    ], []);

    const logout = () => {
        Modal.confirm({
            title: "Çıkış yapmak istiyor musunuz?",
            okText: "Evet",
            cancelText: "Hayır",
            okType: "default",
            onOk: () => signOut({ callbackUrl: "/" }),
        });
    }

    const onClick = ({ key }: any) => {
        if (key === "sign_out") return logout();
        router.push(key)
    };

    return (
        <App>
            <Layout className="bg-white">
                <Header
                    className="mx-auto container bg-white flex items-center px-8 gap-4 w-full sticky top-0 z-[1]"
                    style={{justifyContent: screens.xs ? "space-between" : "start"}}
                >
                    <div>
                        <img
                            className="h-12 w-auto object-contain"
                            src={Leo.src}
                            alt="Logo"
                        />
                    </div>
                    {screens.sm ? <div className="flex-1">
                        <Menu
                            mode="horizontal"
                            className="w-full !border-b-0"
                            selectedKeys={[pathname]}
                            items={navigation}
                            onClick={onClick}
                        />
                    </div> : screens.xs && <div className="flex">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>}
                    {screens.xs && <Dialog
                        as="div"
                        open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}
                    >
                        <div className="fixed inset-0 z-50"/>
                        <Dialog.Panel
                            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-8 py-4">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Motif Halı</span>
                                    <img
                                        className="h-12 w-auto object-contain"
                                        src={Leo.src}
                                        alt="Logo"
                                    />
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>
                            <div className="mt-6 flow-root -mx-4">
                                <Menu
                                    mode="inline"
                                    className="w-full !border-r-0"
                                    selectedKeys={[pathname]}
                                    items={navigation}
                                    onClick={onClick}
                                />
                            </div>
                        </Dialog.Panel>
                    </Dialog>}
                </Header>
                <Content className="p-8">
                    <header className="mx-auto container">
                        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
                            <span className="text-2xl font-bold tracking-tight text-gray-900">
                                {title}
                            </span>
                            <div hidden={loading} className="space-x-4">
                                {header}
                            </div>
                        </div>
                    </header>
                    {loading ? <div className="flex justify-center my-10">
                        <Spin size="large" />
                    </div> : null}
                    <div hidden={loading} className="mx-auto container pt-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </Content>
            </Layout>
        </App>
    );
}
