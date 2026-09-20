import { sanityFetch } from "@/sanity/live";
import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";

const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"
  && defined(slug.current)]
  | order(date asc)
  {_id, name, slug, description }`);

export default async function IndexPage() {
  const { data: projects} = await sanityFetch({query: PROJECTS_QUERY});

  return (
    <main className="flex min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
        Projects
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {projects.map((project) => (
          <li
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900/20"
            key={project._id}
          >
            <Link
              className="hover:underline block"
              href={`/projects/${project?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project?.name}
              </h2>
              {project?.description && (
                <div className="text-gray-500 dark:text-gray-400">
                  <PortableText value={project.description} />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
