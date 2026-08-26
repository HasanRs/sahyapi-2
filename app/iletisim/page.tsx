"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {Descriptions} from "antd";
import {EnvironmentOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";

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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.9889983639496!2d27.83126206667339!3d41.15659139933157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4e0d4ca99a513%3A0xe7f10591213aff23!2zS2lsacOnb8SfbHUgUHJlc3Rpag!5e0!3m2!1sen!2sus!4v1696087909516!5m2!1sen!2sus"
                    />
                </div>
                <Descriptions
                    className="flex justify-center"
                    column={{ xs: 1, sm: 1 }}
                >
                    <Descriptions.Item label={<PhoneOutlined className="text-lg" />} className="flex justify-center">
                        <a href="tel:+905435334144" className="text-gray-500 text-lg">+90 543 533 41 44</a>
                    </Descriptions.Item>
                    <Descriptions.Item label={<MailOutlined className="text-lg" />} className="flex justify-center">
                        <a href="mailto:info@atamep.com" className="text-gray-500 text-lg">info@atamep.com</a>
                    </Descriptions.Item>
                    <Descriptions.Item label={<EnvironmentOutlined className="text-lg" />} className="flex justify-center">
                        <span className="text-gray-500 text-lg">Kazımiye Mah Dumlupınar Cad. Kılıçoğlu Prestij İş Merkezi No:9-11 Kat:5 D:22 Tekirdağ/Çorlu</span>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Footer/>
        </div>
    )
}
