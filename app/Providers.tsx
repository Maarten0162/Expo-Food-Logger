import React, { Children } from 'react'
import { GoalsContext, GoalsProvider } from './GoalsContext'
import { ProgresProvider } from './ProgressContext'

export function Providers({children} : {children : React.ReactNode}) {
  return (
    <GoalsProvider>
        <ProgresProvider>
            {children}
        </ProgresProvider>

    </GoalsProvider>
  )
}
