"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {Descriptions} from "antd";
import {EnvironmentOutlined, MailOutlined, PhoneOutlined, WhatsAppOutlined} from "@ant-design/icons";
import {
  SITE_CONTACT,
  SITE_MAILTO_HREF,
  SITE_TEL_HREF,
  SITE_WHATSAPP_HREF,
  siteMapsEmbedSrc,
} from "@/lib/site-contact";

export default function Iletisim() {
    return (
        <div className="pt-24">
            <Header/>
            <div className="container mx-auto bg-white px-6 lg:px-8 py-12 space-y-8">
                <div className="text-center">
                    <span className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">İletişim</span>
                </div>
                <div className="md:h-80">
                    <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        src={siteMapsEmbedSrc()}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
                <Descriptions
                    className="flex justify-center"
                    column={{ xs: 1, sm: 1 }}
                >
                    <Descriptions.Item label={<PhoneOutlined className="text-lg" />} className="flex justify-center">
                        <a href={SITE_TEL_HREF} className="text-gray-500 text-lg">{SITE_CONTACT.phoneDisplay}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label={<WhatsAppOutlined className="text-lg" />} className="flex justify-center">
                        <a
                          href={SITE_WHATSAPP_HREF}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 text-lg"
                        >
                          {SITE_CONTACT.phoneDisplay}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label={<MailOutlined className="text-lg" />} className="flex justify-center">
                        <a href={SITE_MAILTO_HREF} className="text-gray-500 text-lg">{SITE_CONTACT.email}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label={<EnvironmentOutlined className="text-lg" />} className="flex justify-center">
                        <span className="text-gray-500 text-lg">{SITE_CONTACT.address}</span>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Footer/>
        </div>
    )
}
