import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes, useLocation, useRoutes } from 'react-router-dom'
import { appRoutes } from './appRoutes'

export default function AppRoutes() {
  const location = useLocation()
  const routes = useRoutes(appRoutes)
  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location.pathname}>
        {routes}
      </div>
    </AnimatePresence>
  )
}
