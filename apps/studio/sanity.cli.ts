import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'l33zytkl',
    dataset: 'production'
  },
  deployment: {
    appId: 'l27ujpkfbfimfm7s5p6znw7f',
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: '../web/src/sanity/types.ts',
  },
})
