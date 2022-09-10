import mock from './mock'

import './auth/jwt'
import './cards'
import './table'

mock.onAny().passThrough()
