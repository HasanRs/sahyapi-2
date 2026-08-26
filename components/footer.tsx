import Link from "next/link";
import Leo from "@/assets/images/leo.png";
import {InstagramOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {collection, firestore, getDocs, orderBy, query} from "@/firebase";

export default function Footer() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    getDocs(query(collection(firestore, "services"), orderBy('created_at')))
        .then(querySnapshot => {
          setServices(querySnapshot.docs
              .map(doc => doc.data())
          );
        });
  }, []);

  return (
    <footer className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase">Hizmetler</h4>

          <div className="mt-3 grid space-y-3 text-sm">
            {services.map(service => <p key={service.uuid}>
              <Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href={"/hizmet/" + service.slug}>
                {service.title}
              </Link>
            </p>)}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase">Hızlı Bağlantılar</h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/">Anasayfa</Link></p>
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/referanslar">Referanslar</Link></p>
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/kurumsal">Kurumsal</Link></p>
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/iletisim">İletişim</Link></p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase">İletişim</h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="tel:+905435334144">Telefon: +90 543 533 41 44</a></p>
            <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="mailto:info@atamep.com">E-posta: info@atamep.com</a></p>
            <p className="text-gray-600">Adres: Kazımiye Mah Dumlupınar Cad. Kılıçoğlu Prestij İş Merkezi No:9-11 Kat:5 D:22 Tekirdağ/Çorlu</p>
          </div>
        </div>

        <div className="flex col-span-2 md:col-span-4 lg:col-span-2 justify-center">
          <a target="_blank" href="https://leodijital.com" className="mt-auto text-xs text-gray-800 flex gap-0.5 items-center border-2 border-black rounded p-1 overflow-hidden">
            <img
                className="h-12 w-auto object-contain"
                src={Leo.src}
                alt="Logo"
            />
            <div className="flex flex-col font-extrabold">
              <span>tarafından</span>
              <span>geliştirilmektedir.</span>
            </div>
          </a>
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-gray-200">
        <div className="">
          <div className="flex justify-between items-center">
            <div>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">ATA Mühendislik A.Ş. © 2022 | Tüm hakları saklıdır.</p>
            </div>

            <div className="flex gap-4">
              <a className="inline-block text-gray-500 hover:text-gray-800" href="https://instagram.com/atamuhendislikk" target="_blank">
                <InstagramOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
