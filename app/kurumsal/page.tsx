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
                        Şah Yapı, Çorlu ve çevresinde hırdavat malzemeleri satışı ile tadilat hizmetlerini
                        tek çatı altında sunar. Kaliteli malzeme, uygun fiyat ve zamanında teslimat
                        ilkeleriyle müşterilerimizin güvenilir çözüm ortağı olmayı hedefleriz.
                    </p>
                    <p className="text-base text-gray-700 md:text-lg">
                        <p className="font-bold">Şah Yapı olarak hizmet alanlarımız;</p>
                        -Hırdavat malzemeleri satışı ve tedariki
                        -Ev, daire ve işyeri tadilat uygulamaları
                        -Boya, dekorasyon ve yüzey yenileme
                        -Banyo ve mutfak anahtar teslim yenileme
                        -Ücretsiz keşif, yazılı teklif ve garantili işçilik
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
