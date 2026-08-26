"use client";
import {useState, useEffect} from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {
    firestore,
    collection,
    query,
    where,
} from "firebase.js";
import {getDocs} from "@/firebase";
import {notFound} from "next/navigation";
import moment from "moment/moment";
import "moment/locale/tr";

export default function PostPage({params}: any) {
    const [loading, setLoading] = useState<any>(true);
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let snapshot = await getDocs(query(collection(firestore, "posts"), where('slug', '==', params.slug)));
        if (!snapshot.empty) {
            setPost(snapshot.docs[0].data());
        }
        setLoading(false);
    }

    if (!loading && !post) {
        notFound();
    }

    return (
        <div className="pt-24">
            <Header/>
            {loading ? <div className="flex items-center justify-center min-h-[50vh]">
                <div
                    style={{ borderTopColor: "transparent" }}
                    className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
                />
            </div> :
            <div className="container mx-auto bg-white px-6 lg:px-8 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="space-y-5 md:space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold md:text-3xl">{post.title}</h2>
                            <p className="mt-2 text-sm text-gray-600">{moment(post.created_at).format('LL dddd, HH:mm')}</p>
                        </div>

                        {post.image && <div>
                            <img className="w-full object-cover rounded-xl" src={post.image} alt="Image"/>
                        </div>}

                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.description }} />
                    </div>
                </div>
            </div>}
            <Footer/>
        </div>
    );
}
