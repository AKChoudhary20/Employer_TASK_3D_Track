import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'
import { useWorkspaceStore } from './state/useWorkspaceStore'

function App() {
  const { theme } = useWorkspaceStore()

  return (
    <div className={`w-full h-full relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <UIOverlay />
    </div>
  )
}

export default App