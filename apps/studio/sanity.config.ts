import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure' 

export default defineConfig({
  name: 'default',
  title: 'sanity-portfolio',

  projectId: 'l33zytkl',
  dataset: 'production',

  plugins: [structureTool({structure}), 
    visionTool(), 
    presentationTool({
      resolve,
      previewUrl: {
        initial: 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),],

  schema: {
    types: schemaTypes,
  },
})
