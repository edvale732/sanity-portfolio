import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    project: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Project',
            href: `/projects/${doc?.slug}`,
          },
          {title: 'All projects', href: '/'},
        ],
      }),
    }),
  },
}