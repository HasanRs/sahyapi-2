'use client'

import Footer from "@/components/footer";
import Header from "@/components/header"
import {Carousel, Image} from "antd";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {collection, firestore, getDocs, orderBy, query} from "@/firebase";
import Link from "next/link";
import {limit} from "firebase/firestore";
import moment from "moment";
import "moment/locale/tr";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import SliderOne from "@/assets/images/slider_1.jpeg";
import SliderTwo from "@/assets/images/slider_2.jpg";
import SliderThree from "@/assets/images/slider_3.jpg";

const slider = [
    {
        title: "ELEKTRİK MÜHENDİSLİK & TAAHHÜT HİZMETLERİ",
        description: "Endüstriyel ve ticari sektörlere yönelik Yüksek Gerilim, Alçak Gerilim ve Zayıf Akım Hizmetleri sunan\n" +
            "Ata Mühendislik, profesyonel ekibi ile projelerin zamanında ve en iyi şekilde ilerlemesi için sektördeki\n" +
            "yenilikleri de yakından takip ederek optimum çözümlerle anahtar teslim hizmet vermektedir.",
        link: "/hizmet/taahhuet-hizmetlerimiz",
        background: SliderOne.src,
    },
    {
        title: "ELEKTRİK PROJE HİZMETLERİ",
        description: "Ata Mühendislik; Trafo Merkezleri ve Enerji Nakil Hattı Projeleri, Tüm Orta Gerilim, Alçak Gerilim ve\n" +
            "Zayıf Akım Projeleri, Şantiye Projeleri, Güç Artırım Projeleri, Otel, AVM, Fabrika, Hastane, Toplu Konut\n" +
            "vb. Ruhsat Projeleri, Konut, İşyeri vb. Aydınlatma ve Kuvvet Projeleri, Baz İstasyonu Projeleri,\n" +
            "Elektrikli Şarj İstasyonu Projeleri gibi enerji projelerinizin tüm aşamalarında yanınızda olur.",
        link: "/hizmet/proje-hizmetlerimiz",
        background: SliderThree.src,
    },
    {
        title: "YÜKSEK GERİLİM İŞLETME SORUMLULUĞU",
        description: "Ata Mühendislik, Yüksek Gerilim İşletme Sorumluluğu alanında sunduğu hizmetlerle öncelikle\n" +
            "işletmenizin olası risklere karşı korunması ve ekonomik kayıpların en aza indirilmesini\n" +
            "amaçlamaktadır. Ayrıca oluşabilecek elektrik aksaklıklarına hızlı ve etkin çözümler sunarak\n" +
            "işletmenizin enerji güvencesini sağlamaktadır.",
        link: "/hizmet/yueksek-gerilim-isletme-sorumlulugu",
        background: SliderTwo.src,
    },
];

export default function Home() {
    const [loading, setLoading] = useState<any>(true);
    const router = useRouter();
    const [references, setReferences] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let referenceSnapshot = await getDocs(query(collection(firestore, "references"), orderBy('created_at'), limit(10)))
        setReferences(referenceSnapshot.docs
            .map(doc => doc.data()));

        let serviceSnapshot = await getDocs(query(collection(firestore, "services"), orderBy('created_at')))
        setServices(serviceSnapshot.docs
            .map(doc => doc.data()));

        let postSnapshot = await getDocs(query(collection(firestore, "posts"), orderBy('created_at', 'desc'), limit(3)))
        setPosts(postSnapshot.docs
            .map(doc => doc.data()));

        setLoading(false);
    };

    return (
        <div className="pt-24 bg-white">
            <Header/>

            {loading ? <div className="flex items-center justify-center min-h-[50vh]">
                <div
                    style={{ borderTopColor: "transparent" }}
                    className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
                />
            </div> : <>
            <Carousel
                dots={false}
                arrows
                swipe
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
                rootClassName="mb-16"
            >
                {slider.map((item, i) => <div key={i}>
                    <div className="relative lg:h-[calc(100vh-6rem)] h-80 md:h-96 flex overflow-hidden bg-white border rounded shadow-sm">
                        <div className="container mx-auto z-20">
                            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 lg:!pr-0 w-full lg:w-1/2 h-full text-white">
                                <h5 className="mb-3 font-extrabold leading-none sm:text-2xl md:text-3xl lg:text-4xl">
                                    {item.title}
                                </h5>
                                <p className="text-xs sm:text-sm lg:text-lg">
                                    {item.description}
                                </p>
                                <div className="mt-8 flex flex-wrap text-center">
                                    <Link href={item.link}
                                       className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium !text-white shadow hover:bg-blue-600 transition-colors focus:outline-none sm:w-auto">
                                        İncele
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-blue-900/50 sm:bg-transparent sm:bg-gradient-to-r sm:from-blue-900 sm:to-transparent z-10"/>
                        <img
                            src={item.background}
                            alt="Image"
                            className="object-cover w-full absolute h-full"
                        />
                    </div>
                </div>)}
            </Carousel>
            <div className="container mx-auto isolate bg-white px-6 lg:px-8 pb-8 space-y-16">
                {services.length > 0 && <section className="text-center" id="products">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                        Hizmetler
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(item =>
                            <Link
                                key={item.uuid}
                                href={"/hizmet/" + item.slug}
                                className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5"
                            >
                                <div className="my-auto space-y-6">
                                    {item.image && <img className="w-full object-cover aspect-[16/11] rounded-xl" src={item.image}
                                                        alt="Image"/>}
                                    <div className="space-y-5">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p hidden={!item.short_description} className="text-gray-600">
                                            {item.short_description}
                                        </p>
                                    </div>
                                </div>
                            </Link>)}
                    </div>
                </section>}

                {posts.length > 0 && <section>
                    <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">En son haberlerimizi okuyun</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post =>
                            <Link key={post.uuid} className="group hover:bg-gray-100 rounded-xl p-5 transition-all"
                                  href={"/blog/" + post.slug}>
                                    {post.image ? <img className="w-full object-cover aspect-[16/10] rounded-xl" src={post.image}
                                                        alt="Image"/> : <div className="w-full aspect-[16/10] rounded-xl bg-gray-200" />}
                                    <h3 className="mt-5 text-xl text-gray-800">{post.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 first-letter:uppercase">{moment(post.created_at).fromNow()}</p>
                            </Link>)}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-blue-600 hover:text-blue-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
                            href="/blog"
                        >
                            Daha fazla göster
                            <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </Link>
                    </div>
                </section>}

                {references.length > 0 && <section>
                    <div className="mb-10 text-center">
                        <span className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Referanslar
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-5">
                        {references.map((item: any, index: number) =>
                            <div key={index} className="flex items-center justify-center cursor-pointer group">
                                <Image
                                    preview={{mask: false}}
                                    src={item.image}
                                    alt="Logo"
                                    className="block object-contain !h-32 group-hover:scale-90 transition-all"/>
                            </div>)}
                    </div>

                    <div className="my-12 text-center">
                        <Link
                            className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-blue-600 hover:text-blue-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
                            href="/referanslar"
                        >
                            Daha fazla göster
                            <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </Link>
                    </div>
                </section>}
            </div>
            </>}

            <Footer/>
        </div>
    );
}
