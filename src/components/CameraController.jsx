import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useWorkspaceStore } from '../state/useWorkspaceStore'
import * as THREE from 'three'

function CameraController() {
  const { camera } = useThree()
  const controlsRef = useRef()
  const [hasInitialized, setHasInitialized] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const { cameraTarget, cameraPosition, selectedEmployee } = useWorkspaceStore()

  // Initial camera animation on page load
  useEffect(() => {
    if (!hasInitialized && controlsRef.current) {
      // Set initial camera position (far away and high up)
      camera.position.set(0, 20, 20)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
      
      // Start the animation
      let startTime = Date.now()
      const duration = 3000 // 3 seconds
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function (ease-out)
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
        const easedProgress = easeOutCubic(progress)
        
        // Interpolate from starting position to final position
        const startPos = new THREE.Vector3(0, 20, 20)
        const endPos = new THREE.Vector3(0, 5, 10)
        const currentPos = startPos.lerp(endPos, easedProgress)
        
        camera.position.copy(currentPos)
        controlsRef.current.update()
        
        setAnimationProgress(progress)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setHasInitialized(true)
        }
      }
      
      animate()
    }
  }, [camera, hasInitialized])

  useFrame(() => {
    if (controlsRef.current && selectedEmployee && hasInitialized) {
      // Smooth camera movement when employee is selected
      camera.position.lerp(new THREE.Vector3(...cameraPosition), 0.05)
      controlsRef.current.target.lerp(new THREE.Vector3(...cameraTarget), 0.05)
      controlsRef.current.update()
    }
  })

  useEffect(() => {
    if (!selectedEmployee && controlsRef.current && hasInitialized) {
      // Reset camera when no employee is selected
      camera.position.lerp(new THREE.Vector3(0, 5, 10), 0.1)
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.1)
      controlsRef.current.update()
    }
  }, [selectedEmployee, camera, hasInitialized])

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={3}
      maxDistance={50}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
      autoRotate={!selectedEmployee && hasInitialized}
      autoRotateSpeed={0.5}
      enabled={animationProgress >= 1} // Disable controls during initial animation
    />
  )
}

export default CameraController