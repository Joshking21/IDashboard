import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { Route, Routes, useLocation, useRoutes } from 'react-router-dom'
import { appRoutes } from './appRoutes'
import LoadingPage from '@/pages/loading'

export default function AppRoutes() {
  const location = useLocation()
  const routes = useRoutes(appRoutes)
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<LoadingPage/>}>
        <div key={location.pathname}>
          {routes}
        </div>
      </Suspense>
    </AnimatePresence>
  )
}
