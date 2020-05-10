import * as React from 'react'
import { Header } from '../../shared'

const PageWrapper: React.FC = ({ children }) => (
  <>
    <Header />

    <>{children}</>
  </>
)

export default PageWrapper
