import services from "@/data/services.json";
import posts from "@/data/posts.json";
import references from "@/data/references.json";
import projects from "@/data/projects.json";

export type Service = (typeof services)[number];

export function getServices() {
  return services as Service[];
}

export function getServiceBySlug(slug: string) {
  return getServices().find((s) => s.slug === slug) ?? null;
}

export function getPosts() {
  return posts as any[];
}

export function getReferences(limit?: number) {
  const list = references as any[];
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getProjects() {
  return projects as any[];
}
