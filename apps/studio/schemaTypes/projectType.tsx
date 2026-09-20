import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule
      .required()
      .error('Slug is required to generate a URL on the website'),
    }),
    defineField({
      name: 'projectType',
      type: 'array',
      of: [{type: 'string', options: {list: ['director', 'producer', 'actor', 'editor'], layout: 'radio'}}],
      validation: (rule) => rule
      .required()
      .error('Project type is required'),
    
    }),    
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) => rule
      .required()
      .error('Date is required for the project')
      .info('This is the date of the project')
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      validation: rule => 
      rule
        .min(100)
        .max(200)
        .warning('For consistency, this summary should be between 100-200 characters')
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'video',
      type: 'url',
    }),

    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
      date: 'date',
    },
    prepare({name, image, date}) {
        const nameFormatted = name || 'Untitled Project'
        const dateFormatted = date ? new Date(date).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',

        }) : ''
        return {
            title: nameFormatted,
            subtitle: dateFormatted,
            media: image
        }
    }
  }
})