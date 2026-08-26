"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Kurumsal() {
    return (
        <div className="pt-24">
            <Header/>
            <div className="container mx-auto px-6 lg:px-8 py-12">
                <div className="max-w-lg text-center mx-auto space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                        Kurumsal
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        Ata Mühendislik, yenilikleri ve teknolojiyi takip ederek,
                        ARGE çalışmalarına önem veren profesyonel kadrosu ile müşteri taleplerini en iyi şekilde değerlendirip,
                        kaliteden ödün vermeden en uygun maliyet ile hizmeti vermeyi hedeflemektedir.
                    </p>
                    <p className="text-base text-gray-700 md:text-lg">
                        <p className="font-bold">Ata Mühendislik kurumsal firma anlayışıyla;</p>
                        -Elektrik Proje ve Taahhüt
                        -Yüksek Gerilim İşletme Sorumluluğu
                        -Ölçüm Raporlama ve Bakım Hizmeti
                        -Kompanzasyon Takip Hizmeti
                        -Enerji Yöneticisi Danışmanlık Hizmetleri
                        alanlarda hizmet vermek amacıyla kuruluştur.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
