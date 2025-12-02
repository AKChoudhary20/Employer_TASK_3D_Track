import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import { useWorkspaceStore } from '../state/useWorkspaceStore'
import * as THREE from 'three'

function TaskSticky3D({ task, position, index }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { openTaskModal } = useWorkspaceStore()

  useFrame((state) => {
    if (meshRef.current) {
      // Animated spawn effect
      const spawnTime = state.clock.elapsedTime - index * 0.1
      if (spawnTime > 0) {
        const scale = Math.min(1, spawnTime * 2)
        meshRef.current.scale.set(scale, scale, scale)
      }

      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1

      // Hover tilt effect
      if (hovered) {
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0.1, 0.1)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0.1, 0.1)
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
      } else {
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.1)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1)
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const getStatusColor = () => {
    switch (task.status) {
      case 'Pending':
        return '#fbbf24' // Yellow
      case 'In Progress':
        return '#3b82f6' // Blue
      case 'Completed':
        return '#4ade80' // Green
      default:
        return '#6b7280' // Gray
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    openTaskModal(task)
  }

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Sticky Note Background */}
      <RoundedBox
        args={[1.5, 1.5, 0.05]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color={getStatusColor()}
          roughness={0.9}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Shadow/depth effect */}
      <RoundedBox
        args={[1.5, 1.5, 0.02]}
        radius={0.05}
        smoothness={4}
        position={[0.02, -0.02, -0.03]}
      >
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
        />
      </RoundedBox>

      {/* Task Title */}
      <Text
        position={[0, 0.3, 0.026]}
        fontSize={0.14}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {task.title}
      </Text>

      {/* Task Status */}
      <Text
        position={[0, 0, 0.026]}
        fontSize={0.1}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {task.status}
      </Text>

      {/* Priority Indicator */}
      <Text
        position={[0, -0.3, 0.026]}
        fontSize={0.09}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {task.priority} Priority
      </Text>

      {/* Corner fold effect */}
      <mesh position={[0.6, 0.6, 0.026]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial
          color={getStatusColor()}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fold shadow */}
      <mesh position={[0.55, 0.55, 0.025]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.1} />
      </mesh>

      {/* Hover glow */}
      {hovered && (
        <RoundedBox
          args={[1.6, 1.6, 0.02]}
          radius={0.06}
          smoothness={4}
          position={[0, 0, -0.01]}
        >
          <meshStandardMaterial
            color={getStatusColor()}
            emissive={getStatusColor()}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </RoundedBox>
      )}
    </group>
  )
}

export default TaskSticky3D