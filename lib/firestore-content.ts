import {
  collection,
  firestore,
  getDocs,
  orderBy,
  query,
} from "@/firebase";

async function getCollectionData(name: string, order: "asc" | "desc" = "asc") {
  const snap = await getDocs(
    query(collection(firestore, name), orderBy("created_at", order))
  );
  return snap.docs.map((d) => d.data());
}

export async function getServices() {
  return getCollectionData("services");
}

export async function getPosts() {
  return getCollectionData("posts", "desc");
}

export async function getReferences(limit?: number) {
  const list = await getCollectionData("references");
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getProjects() {
  return getCollectionData("projects");
}
