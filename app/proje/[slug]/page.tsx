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
import {Image} from "antd";

export default function PostPage({params}: any) {
    const [loading, setLoading] = useState<any>(true);
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let snapshot = await getDocs(query(collection(firestore, "projects"), where('slug', '==', params.slug)));
        if (!snapshot.empty) {
            setProject(snapshot.docs[0].data());
        }
        setLoading(false);
    }

    if (!loading && !project) {
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
                            <h2 className="text-2xl font-bold md:text-3xl">{project.title}</h2>
                        </div>

                        {project.image.length > 0 && <div>
                            <Image.PreviewGroup items={project.image}>
                                <Image src={project.image[0]} preview={{mask: "Önizle"}} className="w-full object-cover aspect-[16/11] rounded-xl" alt="Image"/>
                            </Image.PreviewGroup>
                        </div>}

                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: project.description }} />
                    </div>
                </div>
            </div>}
            <Footer/>
        </div>
    );
}
