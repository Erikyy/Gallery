import React, { FC, useContext } from 'react'

interface ApiCtxProps {
  name: string
}

const ApiContext = React.createContext<ApiCtxProps>({ name: '' })

export const ApiProvider: FC = ({ children }) => {
  const value: ApiCtxProps = { name: '' }
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export const useApi = () => {
  return useContext(ApiContext)
}
