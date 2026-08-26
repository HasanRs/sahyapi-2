'use client';
import Link from "next/link";
import {Button, Form, Input} from "antd";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();

    const submit = useCallback(() => {
        form.validateFields().then(values => {
            let { email, password } = values;
            setLoading(true);
            fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }).then(async (res) => {
                if (res.status === 200) {
                    toast.success("Hesabınız oluşturuldu! Giriş için yönlendiriliyorsunuz...");
                    setTimeout(() => router.push("/login"), 2000);
                } else {
                    setLoading(false);
                    const {error} = await res.json();
                    toast.error(error);
                }
            });
        })
    }, [router]);

    useEffect(() => setInitialized(true), [])

    if (!initialized) return  <div className="flex items-center justify-center min-h-screen">
        <div
            style={{ borderTopColor: "transparent" }}
            className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
        />
    </div>;

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Hesap Oluşturun</h3>
                    <div>
                        <div className="text-center text-sm text-gray-600">
                            Hesabınız var mı?
                        </div>
                        <Link href="/login" className="cursor-pointer font-semibold text-sm text-gray-800">
                            Giriş yapmak için tıklayabilirsiniz
                        </Link>
                    </div>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    className="p-6"
                    requiredMark
                >
                    <Form.Item
                        name="email"
                        label="E-posta"
                        rules={[{required: true, message: "Lütfen e-posta giriniz"}]}
                    >
                        <Input size="large" autoComplete="email" autoFocus />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Şifre"
                        rules={[{required: true, message: "Lütfen şifre giriniz"}]}
                    >
                        <Input.Password size="large" autoComplete="password" />
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        className="bg-white"
                        size="large"
                        loading={loading}
                        block
                        onClick={submit}
                    >
                        Hesap Oluştur
                    </Button>
                </Form>
            </div>
        </div>
    );
}
