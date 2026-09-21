"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import {useEffect, useState} from "react";

const categoryLabel: Record<string, string> = {
    baglanti: "Bağlantı",
    boya: "Boya",
    tesisat: "Tesisat",
    alet: "El Aleti",
};

function ProductCard({item}: {item: any}) {
    return (
        <Link
            href={"/urun/" + item.slug}
            className="group flex flex-col h-full border border-gray-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white"
        >
            {item.image && (
                <img
                    className="w-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.title}
                />
            )}
            <div className="p-6 flex-1 flex flex-col">
                {item.category && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                        {categoryLabel[item.category] || item.category}
                    </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {item.title}
                </h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed flex-1 line-clamp-4">
                    {item.short_description}
                </p>
                {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {item.highlights.slice(0, 3).map((h: string) => (
                            <span key={h} className="text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded-full">
                                {h}
                            </span>
                        ))}
                    </div>
                )}
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-amber-600 group-hover:text-amber-700">
                    Detaylı bilgi
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}

export default function UrunlerPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/products", { cache: "no-store" })
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setProducts(Array.isArray(data) ? data : []))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, []);

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
                <div className="container mx-auto bg-white px-6 lg:px-8 py-12 space-y-10">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Ürünler
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Hırdavat malzemelerinden boya ve tesisata kadar mağazamızdaki ürün grupları.
                        </p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((item) => (
                                <ProductCard key={item.uuid} item={item} />
                            ))}
                        </div>
                    ) : (
                        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                            <div className="text-center">
                                <p className="mt-6 text-base leading-7 text-gray-600">
                                    Üzgünüz, henüz herhangi bir ürün eklenmedi.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link
                                        href="/"
                                        className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
                                    >
                                        Ana sayfaya geri dön
                                    </Link>
                                </div>
                            </div>
                        </main>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
}
