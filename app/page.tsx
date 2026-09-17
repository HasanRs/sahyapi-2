'use client'

import Footer from "@/components/footer";
import Header from "@/components/header";
import {Carousel} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/tr";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {collection, firestore, getDocs, orderBy, query} from "@/firebase";

const slider = [
    {
        title: "HIRDAVAT MALZEMELERİ",
        subtitle: "Geniş stok · Uygun fiyat · Hızlı teslimat",
        description:
            "Şah Yapı olarak ev, işyeri ve şantiye projeleriniz için vida, dübel, el aletleri, bağlantı elemanları, sıhhi tesisat ve yapı kimyasallarında geniş ürün yelpazesi sunuyoruz. Profesyonel ustalardan bireysel müşterilere kadar herkes için doğru malzemeyi, doğru fiyata ve zamanında temin ediyoruz. Toplu alımlarda özel fiyatlandırma ve proje bazlı tedarik desteği sağlıyoruz.",
        link: "/hizmet/hirdavat-malzemeleri",
        background: "/hizmetler/hirdavat.jpg",
    },
    {
        title: "TADİLAT HİZMETLERİ",
        subtitle: "Anahtar teslim · Garantili işçilik",
        description:
            "Daire, ev ve işyeri tadilatında alçıpan, sıva, seramik döşeme, zemin kaplama ve komple yenileme işlerinde deneyimli ekibimizle yanınızdayız. Ücretsiz keşif sonrası yazılı teklif, şeffaf fiyatlandırma ve planlı iş programı ile tadilat sürecinizi stressiz hale getiriyoruz. Malzeme tedarikini de biz üstleniyoruz.",
        link: "/hizmet/tadilat-hizmetleri",
        background: "/hizmetler/tadilat.jpg",
    },
    {
        title: "BOYA & DEKORASYON",
        subtitle: "Renk danışmanlığı · Profesyonel uygulama",
        description:
            "İç ve dış cephe boya, dekoratif sıva, duvar kağıdı ve yüzey hazırlığı ile mekânlarınıza estetik ve dayanıklı bir görünüm kazandırıyoruz. Silinebilir, antibakteriyel ve çevre dostu boya seçenekleriyle temiz ve hızlı uygulama garantisi sunuyoruz.",
        link: "/hizmet/boya-dekorasyon",
        background: "/hizmetler/boya-dekorasyon.jpg",
    },
    {
        title: "BANYO & MUTFAK YENİLEME",
        subtitle: "Su yalıtımı · Modern tasarım",
        description:
            "Banyo ve mutfak tadilatında su yalıtımından seramik döşemeye, ölçüye özel dolaptan vitrifiye montajına kadar anahtar teslim çözümler. Hayalinizdeki banyo ve mutfağı birlikte planlayıp, TS standartlarına uygun malzeme ve işçilikle hayata geçiriyoruz.",
        link: "/hizmet/banyo-mutfak-yenileme",
        background: "/hizmetler/banyo-mutfak.jpg",
    },
];

const reasons = [
    {title: "Ücretsiz Keşif", desc: "Adresinize gelerek projenizi inceliyor, yazılı teklif sunuyoruz."},
    {title: "Geniş Stok", desc: "Hırdavat malzemelerinde sürekli stok, acil ihtiyaçlara hızlı çözüm."},
    {title: "Anahtar Teslim", desc: "Tadilat projelerinde malzemeden uygulamaya tek elden hizmet."},
    {title: "Garantili İşçilik", desc: "Tüm uygulama işlerimizde işçilik garantisi ve satış sonrası destek."},
    {title: "Uygun Fiyat", desc: "Kaliteden ödün vermeden bütçenize uygun malzeme alternatifleri."},
    {title: "Deneyimli Ekip", desc: "Yılların tecrübesiyle alanında uzman usta kadrosu."},
];

const steps = [
    {step: "01", title: "İletişim & Keşif", desc: "Bizi arayın veya form doldurun. Ücretsiz keşif için randevu alın."},
    {step: "02", title: "Teklif & Planlama", desc: "İş kalemleri, malzeme listesi ve takvim içeren yazılı teklif alın."},
    {step: "03", title: "Uygulama", desc: "Onay sonrası ekibimiz planlanan sürede işe başlar, sizi bilgilendirir."},
    {step: "04", title: "Teslim & Garanti", desc: "Temizlik sonrası teslim, işçilik garantisi ve destek devam eder."},
];

function ServiceCard({item, showHighlights = false}: {item: any; showHighlights?: boolean}) {
    return (
        <Link
            href={"/hizmet/" + item.slug}
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
                        {item.category === "hirdavat" ? "Hırdavat" : "Tadilat"}
                    </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {item.title}
                </h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed flex-1 line-clamp-4">
                    {item.short_description}
                </p>
                {showHighlights && item.highlights && (
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

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [references, setReferences] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);

    const hirdavat = services.filter((s) => s.category === "hirdavat");
    const tadilat = services.filter((s) => s.category === "tadilat");

    useEffect(() => {
        (async () => {
            const [refSnap, svcSnap, postSnap] = await Promise.all([
                getDocs(query(collection(firestore, "references"), orderBy("created_at"))),
                getDocs(query(collection(firestore, "services"), orderBy("created_at"))),
                getDocs(query(collection(firestore, "posts"), orderBy("created_at", "desc"))),
            ]);
            setReferences(refSnap.docs.map((d) => d.data()).slice(0, 10));
            setServices(svcSnap.docs.map((d) => d.data()));
            setPosts(postSnap.docs.map((d) => d.data()).slice(0, 3));
            setLoading(false);
        })();
    }, []);

    return (
        <div className="pt-24 bg-white">
            <Header />

            {loading ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div
                        style={{borderTopColor: "transparent"}}
                        className="w-8 h-8 border-4 border-amber-500 rounded-full animate-spin"
                    />
                </div>
            ) : (
                <>
                    <Carousel
                        dots
                        arrows
                        swipe
                        prevArrow={<LeftOutlined />}
                        nextArrow={<RightOutlined />}
                        rootClassName="mb-0"
                    >
                        {slider.map((item, i) => (
                            <div key={i}>
                                <div className="relative lg:h-[calc(100vh-6rem)] h-96 md:h-[28rem] flex overflow-hidden bg-gray-900">
                                    <div className="container mx-auto z-20 relative">
                                        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 lg:!pr-8 w-full lg:w-3/5 h-full text-white">
                                            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">
                                                {item.subtitle}
                                            </span>
                                            <h2 className="mb-4 font-extrabold leading-tight sm:text-2xl md:text-3xl lg:text-5xl">
                                                {item.title}
                                            </h2>
                                            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed line-clamp-4 lg:line-clamp-none">
                                                {item.description}
                                            </p>
                                            <div className="mt-8 flex flex-wrap gap-4">
                                                <Link
                                                    href={item.link}
                                                    className="rounded-lg bg-amber-500 px-8 py-3 text-sm font-semibold !text-white shadow-lg hover:bg-amber-600 transition-colors"
                                                >
                                                    Detaylı İncele
                                                </Link>
                                                <Link
                                                    href="/iletisim"
                                                    className="rounded-lg border-2 border-white/80 px-8 py-3 text-sm font-semibold !text-white hover:bg-white/10 transition-colors"
                                                >
                                                    Teklif Alın
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent z-10" />
                                    <img src={item.background} alt={item.title} className="object-cover w-full absolute h-full" />
                                </div>
                            </div>
                        ))}
                    </Carousel>

                    <div className="container mx-auto px-6 lg:px-8 py-16 space-y-24">
                        <section className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Şah Yapı</span>
                                <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl leading-tight">
                                    Hırdavat ve Tadilatta Güvenilir Çözüm Ortağınız
                                </h2>
                                <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                                    Şah Yapı olarak Çorlu ve çevresinde hırdavat malzemeleri satışı ile tadilat hizmetlerinde tek çatı altında hizmet veriyoruz. Ev sahiplerinden profesyonel ustalara, küçük tamirattan komple daire yenilemeye kadar her ölçekte ihtiyacınıza uygun çözümler sunuyoruz.
                                </p>
                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Geniş stoklu hırdavat departmanımızda ihtiyacınız olan malzemeyi anında bulabilir; tadilat projelerinizde ise deneyimli ekibimizle anahtar teslim hizmet alabilirsiniz. Kaliteli malzeme, uygun fiyat ve zamanında teslimat ilkelerimizdir.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link href="/kurumsal" className="text-amber-600 font-semibold hover:text-amber-700">
                                        Kurumsal →
                                    </Link>
                                    <Link href="/hizmet/hirdavat-malzemeleri" className="text-amber-600 font-semibold hover:text-amber-700">
                                        Tüm Hizmetler →
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <img src="/hizmetler/hirdavat.jpg" alt="Hırdavat" className="rounded-2xl object-cover h-48 w-full shadow-lg" />
                                <img src="/hizmetler/tadilat.jpg" alt="Tadilat" className="rounded-2xl object-cover h-48 w-full shadow-lg mt-8" />
                                <img src="/hizmetler/boya-dekorasyon.jpg" alt="Boya" className="rounded-2xl object-cover h-48 w-full shadow-lg -mt-8" />
                                <img src="/hizmetler/banyo-mutfak.jpg" alt="Banyo Mutfak" className="rounded-2xl object-cover h-48 w-full shadow-lg" />
                            </div>
                        </section>

                        <section>
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                                <div>
                                    <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Kategori</span>
                                    <h2 className="text-3xl font-bold text-gray-900 mt-1">Hırdavat Malzemeleri</h2>
                                    <p className="mt-2 text-gray-600 max-w-xl">
                                        Vida, dübel, el aletleri, tesisat malzemeleri ve yapı kimyasallarında geniş stok ve hızlı tedarik.
                                    </p>
                                </div>
                                <Link href="/hizmet/hirdavat-malzemeleri" className="text-amber-600 font-semibold hover:text-amber-700 whitespace-nowrap">
                                    Tümünü gör →
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hirdavat.map((item) => (
                                    <ServiceCard key={item.uuid} item={item} />
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                                <div>
                                    <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Kategori</span>
                                    <h2 className="text-3xl font-bold text-gray-900 mt-1">Tadilat Hizmetleri</h2>
                                    <p className="mt-2 text-gray-600 max-w-xl">
                                        Ev, daire ve işyeri tadilatında anahtar teslim yenileme; boya, banyo, mutfak ve dış cephe çözümleri.
                                    </p>
                                </div>
                                <Link href="/hizmet/tadilat-hizmetleri" className="text-amber-600 font-semibold hover:text-amber-700 whitespace-nowrap">
                                    Tümünü gör →
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tadilat.map((item) => (
                                    <ServiceCard key={item.uuid} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="bg-gray-50 rounded-3xl p-8 md:p-12">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900">Neden Şah Yapı?</h2>
                                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                                    Hırdavat satışından tadilat uygulamasına kadar güvenilir, şeffaf ve kaliteli hizmet anlayışı.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {reasons.map((r) => (
                                    <div key={r.title} className="text-center">
                                        <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                            ✓
                                        </div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{r.title}</h3>
                                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900">Nasıl Çalışıyoruz?</h2>
                                <p className="mt-3 text-gray-600">Tadilat projelerinizde 4 adımda anahtar teslim hizmet</p>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {steps.map((s) => (
                                    <div key={s.step} className="relative">
                                        <span className="text-5xl font-black text-amber-100">{s.step}</span>
                                        <h3 className="mt-2 text-lg font-semibold text-gray-900">{s.title}</h3>
                                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {services.length > 0 && (
                            <section id="products">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-bold text-gray-900">Tüm Hizmetlerimiz</h2>
                                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                                        Hırdavat malzemelerinden komple tadilata kadar farklı hizmet alanlarında yanınızdayız.
                                    </p>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {services.map((item) => (
                                        <ServiceCard key={item.uuid} item={item} showHighlights />
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="bg-amber-500 rounded-3xl p-8 md:p-16 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold">Projeniz İçin Ücretsiz Keşif</h2>
                            <p className="mt-4 text-amber-100 text-lg max-w-2xl mx-auto">
                                Hırdavat malzeme ihtiyacınız veya tadilat projeniz için hemen iletişime geçin. Uzman ekibimiz size en uygun çözümü sunmak için hazır.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/iletisim"
                                    className="rounded-lg bg-white text-amber-700 px-8 py-3 font-semibold hover:bg-amber-50 transition-colors"
                                >
                                    İletişime Geçin
                                </Link>
                                <a
                                    href="tel:+905435334144"
                                    className="rounded-lg border-2 border-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors"
                                >
                                    +90 543 533 41 44
                                </a>
                            </div>
                        </section>

                        {posts.length > 0 && (
                            <section>
                                <div className="max-w-2xl mx-auto text-center mb-10">
                                    <h2 className="text-2xl font-bold md:text-3xl">Blog & Haberler</h2>
                                    <p className="mt-2 text-gray-600">Tadilat ipuçları ve güncel haberlerimiz</p>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.map((post) => (
                                        <Link
                                            key={post.uuid}
                                            className="group border border-gray-200 hover:border-amber-300 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                                            href={"/blog/" + post.slug}
                                        >
                                            {post.image ? (
                                                <img className="w-full object-cover aspect-[16/10]" src={post.image} alt={post.title} />
                                            ) : (
                                                <div className="w-full aspect-[16/10] bg-gray-200" />
                                            )}
                                            <div className="p-5">
                                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700">{post.title}</h3>
                                                <p className="mt-2 text-sm text-gray-500">{moment(post.created_at).fromNow()}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-10 text-center">
                                    <Link href="/blog" className="text-amber-600 font-semibold hover:text-amber-700">
                                        Tüm yazılar →
                                    </Link>
                                </div>
                            </section>
                        )}

                        {references.length > 0 && (
                            <section>
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-bold text-gray-900">Referanslarımız</h2>
                                    <p className="mt-2 text-gray-600">Güvenle çalıştığımız markalar ve kurumlar</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
                                    {references.map((ref, i) => (
                                        <div key={i} className="flex items-center justify-center p-4">
                                            <img src={ref.image} alt="Referans" className="object-contain h-24 grayscale hover:grayscale-0 transition-all" />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10 text-center">
                                    <Link href="/referanslar" className="text-amber-600 font-semibold hover:text-amber-700">
                                        Tüm referanslar →
                                    </Link>
                                </div>
                            </section>
                        )}
                    </div>
                </>
            )}

            <Footer />
        </div>
    );
}
