import {useEffect, useMemo, useState} from "react";
import {Dialog} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Menu, MenuProps, Grid} from "antd";
import { useRouter, usePathname } from 'next/navigation'
import Logo from "@/assets/images/logo.png";
import {collection, firestore, getDocs, orderBy, query} from "@/firebase";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const screens = Grid.useBreakpoint();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [services, setServices] = useState<any[]>([]);

    const items: MenuProps["items"] = useMemo(() => {
        return services
            .map(item => ({
                key: `/hizmet/${item.slug}`,
                label: item.title,
                title: item.title,
            }));
    }, [services]);

    const navigation: MenuProps['items'] = useMemo(() => [
        {
            label: "Anasayfa",
            key: "/"
        },
        {
            label: "Hizmetler",
            key: "/hizmet/",
            children: items,
        },
        {
            label: "Projeler",
            key: "/projeler/",
            children: [
                {
                    key: `/projeler/devam-edenler`,
                    label: "Devam Edenler",
                    title: "Devam Edenler",
                },
                {
                    key: `/projeler/tamamlananlar`,
                    label: "Tamamlananlar",
                    title: "Tamamlananlar",
                },
            ],
        },
        {
            label: "Referanslar",
            key: "/referanslar"
        },
        {
            label: "Kurumsal",
            key: "/kurumsal"
        },
        {
            label: "İletişim",
            key: "/iletisim"
        },
        {
            label: <span className="font-serif">Blog</span>,
            key: "/blog"
        },
    ], [items]);

    useEffect(() => {
        getDocs(query(collection(firestore, "services"), orderBy("created_at")))
            .then((snap) => setServices(snap.docs.map((d) => d.data())))
            .catch(() => setServices([]));
    }, []);

    const onClick = ({ key }: any) => {
        router.push(key)
    };

    return (
        <header className="container mx-auto absolute inset-x-0 top-0 z-50">
            <nav
                className="flex items-center justify-between px-6 pt-2 lg:px-8"
                aria-label="Global"
            >
                <div className="flex md:w-1/3">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Şah Yapı</span>
                        <img
                            className="h-20 w-auto object-contain"
                            src={Logo.src}
                            alt="Şah Yapı Hırdavat"
                        />
                    </a>
                </div>
                {screens.md ? <div className="flex-1">
                    <Menu
                        mode="horizontal"
                        className="w-full border-b-0 justify-end lg:justify-start"
                        selectedKeys={[pathname]}
                        items={navigation}
                        onClick={onClick}
                    />
                </div> : <div className="flex">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>}
            </nav>
            {!screens.md && <Dialog
                as="div"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-50"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 pt-2 pb-6">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Şah Yapı</span>
                            <img
                                className="h-20 w-auto object-contain"
                                src={Logo.src}
                                alt="Şah Yapı Hırdavat"
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
                            className="w-full !border-r-0 justify-end lg:justify-start"
                            selectedKeys={[pathname]}
                            items={navigation}
                            onClick={onClick}
                        />
                    </div>
                </Dialog.Panel>
            </Dialog>}
        </header>
    );
}
