"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {useEffect, useState} from "react";
import Link from "next/link";
import "moment/locale/tr";

export default function Page() {
    const [loading, setLoading] = useState<any>(true);
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await fetch("/api/projects?completed=true", { cache: "no-store" });
            const data = res.ok ? await res.json() : [];
            setProjects(Array.isArray(data) ? data : []);
        } catch {
            setProjects([]);
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
                        Tamamlanan Projeler
                    </span>
                </div>
                {projects.length > 0 ?
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(item =>
                            <Link key={item.uuid} className="group hover:bg-gray-100 rounded-xl p-5 transition-all"
                                  href={"/proje/" + item.slug}>
                                {item.image?.length > 0 ?
                                    <img className="w-full object-cover aspect-[16/10] rounded-xl"
                                         src={item.image[0]}
                                         alt="Image"
                                    /> : <div className="w-full aspect-[16/10] rounded-xl bg-gray-200" />}
                                <h3 className="mt-5 text-xl text-gray-800">{item.title}</h3>
                            </Link>)}
                    </div> : <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="mt-6 text-base leading-7 text-gray-600">Üzgünüz, henüz herhangi bir proje eklenmedi.</p>
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
