"use client";
import {Image} from "antd";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Referanslar() {
    const [loading, setLoading] = useState<any>(true);
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const [refRes, groupRes] = await Promise.all([
                fetch("/api/references", { cache: "no-store" }),
                fetch("/api/groups", { cache: "no-store" }),
            ]);
            const referencesRaw = refRes.ok ? await refRes.json() : [];
            const groupsRaw = groupRes.ok ? await groupRes.json() : [];
            const references = (Array.isArray(referencesRaw) ? referencesRaw : [])
                .filter((item: any) => item.group);
            setGroups(
                (Array.isArray(groupsRaw) ? groupsRaw : [])
                    .map((group: any) => ({
                        ...group,
                        references: references.filter((item: any) => item.group === group.uuid),
                    }))
                    .filter((group: any) => group.references.length > 0)
            );
        } catch {
            setGroups([]);
        }
        setLoading(false);
    };

    return (
        <div className="pt-24">
            <Header/>
            {loading ? <div className="flex items-center justify-center min-h-[50vh]">
                <div
                    style={{ borderTopColor: "transparent" }}
                    className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
                />
            </div> :
            <div className="container mx-auto bg-white px-6 lg:px-8 py-12 space-y-12">
                <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Referanslar
                    </span>
                </div>
                {groups.length > 0 ?
                    groups.map(group => <section key={group.uuid}>
                        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-6">
                            {group.title}
                        </h2>
                        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-5">
                            {group.references.map((item: any) =>
                            <div key={item.uuid} className="flex items-center justify-center cursor-pointer group">
                                <Image
                                    preview={{mask: false}}
                                    src={item.image}
                                    alt="Logo"
                                    className="block object-contain !h-32 group-hover:scale-90 transition-all" />
                            </div>)}
                        </div>
                    </section>) : <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="mt-6 text-base leading-7 text-gray-600">Üzgünüz, henüz herhangi bir referans eklenmedi.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/"
                                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Ana sayfaya geri dön
                            </Link>
                        </div>
                    </div>
                </main>}
            </div>}
            <Footer/>
        </div>
    );
}
