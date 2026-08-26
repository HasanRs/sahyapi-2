'use client';
import Link from "next/link";
import {Button, Form, Input} from "antd";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
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
            signIn("credentials", {
                redirect: false,
                email,
                password,
                callbackUrl: '/',
            }).then(({error}: any) => {
                if (error) {
                    setLoading(false);
                    toast.error(error);
                } else {
                    router.push("/admin");
                }
            });
        });
    }, [router]);

    useEffect(() => setInitialized(true), [])

    if (!initialized) return <div className="flex items-center justify-center min-h-screen">
        <div
            style={{ borderTopColor: "transparent" }}
            className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
        />
    </div>;

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <div className="text-xl font-semibold">Giriş Yapın</div>
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
                        <Input size="large" autoComplete="email" autoFocus required />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Şifre"
                        rules={[{required: true, message: "Lütfen şifre giriniz"}]}
                    >
                        <Input.Password size="large" autoComplete="current-password" required />
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        className="bg-white"
                        size="large"
                        loading={loading}
                        block
                        onClick={submit}
                    >
                        Giriş Yap
                    </Button>
                </Form>
            </div>
        </div>
    );
}
