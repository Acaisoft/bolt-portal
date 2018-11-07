import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'

import * as models from './models'

const loadingPlugin = createLoadingPlugin()

const store = init({
  models,
  plugins: [loadingPlugin],
})

export const { dispatch } = store
export default store
