import Link from "next/link";
import Leo from "@/assets/images/leo.png";
import {useEffect, useState} from "react";
import {
  SITE_CONTACT,
  SITE_MAILTO_HREF,
  SITE_TEL_HREF,
  SITE_WHATSAPP_HREF,
} from "@/lib/site-contact";

export default function Footer() {
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/services", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]));
    fetch("/api/products", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <footer className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
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
          <h4 className="text-xs font-semibold text-gray-900 uppercase">Ürünler</h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/urunler">
                Tüm Ürünler
              </Link>
            </p>
            {products.map(product => <p key={product.uuid}>
              <Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href={"/urun/" + product.slug}>
                {product.title}
              </Link>
            </p>)}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase">Hızlı Bağlantılar</h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/">Anasayfa</Link></p>
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/urunler">Ürünler</Link></p>
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/referanslar">Referanslar</Link></p>
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/kurumsal">Kurumsal</Link></p>
            <p><Link className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/iletisim">İletişim</Link></p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase">İletişim</h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href={SITE_TEL_HREF}>
                Telefon: {SITE_CONTACT.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800"
                href={SITE_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {SITE_CONTACT.phoneDisplay}
              </a>
            </p>
            <p>
              <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href={SITE_MAILTO_HREF}>
                E-posta: {SITE_CONTACT.email}
              </a>
            </p>
            <p className="text-gray-600">Adres: {SITE_CONTACT.address}</p>
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
              <p className="mt-1 text-xs sm:text-sm text-gray-600">Şah Yapı © {new Date().getFullYear()} | Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
