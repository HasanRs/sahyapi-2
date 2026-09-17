"use client";
import {useState, useEffect} from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {notFound} from "next/navigation";

export default function ServicePage({params}: any) {
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/services", { cache: "no-store" });
                const data = res.ok ? await res.json() : [];
                const list = Array.isArray(data) ? data : [];
                setService(list.find((s: any) => s.slug === params.slug) ?? null);
            } catch {
                setService(null);
            }
            setLoading(false);
        })();
    }, [params.slug]);

    if (!loading && !service) {
        notFound();
    }

    return (
        <div className="pt-24">
            <Header />
            {loading ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div
                        style={{borderTopColor: "transparent"}}
                        className="w-8 h-8 border-4 border-amber-500 rounded-full animate-spin"
                    />
                </div>
            ) : (
                <div className="container mx-auto bg-white px-6 lg:px-8 py-12">
                    <div className="max-w-2xl mx-auto">
                        <div className="space-y-5 md:space-y-8">
                            {service.image && (
                                <img src={service.image} alt={service.title} className="w-full rounded-2xl object-cover aspect-[16/9]" />
                            )}
                            <div>
                                <h2 className="text-2xl font-bold md:text-3xl text-center">{service.title}</h2>
                            </div>
                            <div className="ql-editor" dangerouslySetInnerHTML={{__html: service.description}} />
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
