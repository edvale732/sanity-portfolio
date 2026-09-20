import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { sanityFetch } from "@/sanity/live";
import { urlFor } from "@/sanity/image";
import type { Project } from "@/sanity/types";

const PROJECT_QUERY = defineQuery(`*[
    _type == "project" &&
    slug.current == $slug
  ][0]{
  _id,
  name,
  slug,
  projectType,
  date,
  description,
  image,
  video,
  tags
}`);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: await params,
  });
  const project = data as Project | null;
  if (!project) {
    notFound();
  }
  const {
    name,
    date,
    projectType,
    description,
    image,
    video,
    tags,
  } = project;

  const imageUrl = image
    ? urlFor(image)
        .height(310)
        .width(550)
        .quality(80)
        .auto("format")
        .url()
    : null;

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back to projects
        </Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name || "Project"}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            height={310}
            width={550}
          />
        ) : null}
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {projectType?.length ? (
              <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-300 capitalize">
                {projectType.join(" / ")}
              </div>
            ) : null}
            {name ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8 text-gray-900 dark:text-white">
                {name}
              </h1>
            ) : null}
            {date ? (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
              <dd className="font-semibold text-gray-900 dark:text-white">
                Date
              </dd>
              <dt>{new Date(date).toLocaleDateString()}</dt>
            </dl>
            ) : null}
            {tags?.length ? (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
                <dd className="font-semibold text-gray-900 dark:text-white">
                  Tags
                </dd>
                <dt>{tags.join(", ")}</dt>
              </dl>
            ) : null}
          </div>
          {description && description.length > 0 && (
            <div className="prose max-w-none prose-gray dark:prose-invert">
              <PortableText value={description} />
            </div>
          )}
          {video && (
            <a
              className="flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 p-4 text-white transition-colors"
              href={video}
              target="_blank"
              rel="noreferrer"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>
    </main>
  );
}