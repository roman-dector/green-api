import { compose } from '@reduxjs/toolkit'
import { withStore } from './with-store'

export type { AppThunk, AppDispatch, RootState } from './with-store'

export const withProviders = compose(withStore)
