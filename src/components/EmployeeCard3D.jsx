import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, RoundedBox } from '@react-three/drei'
import { useWorkspaceStore } from '../state/useWorkspaceStore'
import * as THREE from 'three'

function EmployeeCard3D({ employee, position }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { selectedEmployee, setSelectedEmployee, setCameraTarget, setCameraPosition } = useWorkspaceStore()

  useFrame((state) => {
    if (meshRef.current) {
      if (selectedEmployee && selectedEmployee.id === employee.id) {
        // If this is the selected card, smoothly rotate to face front (0,0,0)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1)
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1)
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.1)
        return
      }

      // Stop animation if ANY employee is selected (freeze others too)
      if (selectedEmployee) return

      // Orbital rotation around center (planetary motion)
      const orbitRadius = 6
      const orbitSpeed = 0.2
      const angle = state.clock.elapsedTime * orbitSpeed + (employee.id * Math.PI * 2 / 4)

      meshRef.current.position.x = Math.cos(angle) * orbitRadius
      meshRef.current.position.z = Math.sin(angle) * orbitRadius

      // Gentle self-rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05

      // Hover effects
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()

    // Get exact current position
    const currentPos = meshRef.current.position

    // Position camera directly in front of the card (offset along Z axis since card faces +Z)
    // We use a fixed offset of +6 on Z to see the front face
    const camX = currentPos.x
    const camY = 0
    const camZ = currentPos.z + 6

    setCameraTarget([currentPos.x, 0, currentPos.z])
    setCameraPosition([camX, camY, camZ])
    setSelectedEmployee(employee)
  }

  const getTaskStatusColor = () => {
    const completed = employee.tasks.filter(task => task.status === 'Completed').length
    const total = employee.tasks.length
    const percentage = total > 0 ? completed / total : 0

    if (percentage >= 0.8) return '#4ade80' // Green
    if (percentage >= 0.5) return '#fbbf24' // Yellow
    return '#f87171' // Red
  }

  const isSelected = selectedEmployee?.id === employee.id

  return (
    <Float
      speed={isSelected ? 0 : 1}
      rotationIntensity={isSelected ? 0 : 0.05}
      floatIntensity={isSelected ? 0 : 0.2}
    >
      <group
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => !selectedEmployee && setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Glass Card Background */}
        <RoundedBox
          args={[2.5, 3, 0.1]}
          radius={0.1}
          smoothness={4}
        >
          <meshPhysicalMaterial
            color={hovered ? '#1e293b' : '#0f172a'}
            metalness={0.2}
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
            transparent
            opacity={0.8}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </RoundedBox>

        {/* Glowing Border */}
        <RoundedBox
          args={[2.55, 3.05, 0.08]}
          radius={0.12}
          smoothness={4}
          position={[0, 0, -0.02]}
        >
          <meshBasicMaterial
            color={hovered ? '#3b82f6' : '#1e293b'}
            transparent
            opacity={hovered ? 0.6 : 0.3}
          />
        </RoundedBox>

        {/* Avatar */}
        <Text
          position={[0, 0.8, 0.06]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {employee.avatar}
        </Text>

        {/* Name */}
        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          {employee.name}
        </Text>

        {/* Role */}
        <Text
          position={[0, -0.1, 0.06]}
          fontSize={0.15}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          {employee.role}
        </Text>

        {/* Task Count */}
        <Text
          position={[0, -0.5, 0.06]}
          fontSize={0.15}
          color={getTaskStatusColor()}
          anchorX="center"
          anchorY="middle"
        >
          {employee.tasks.length} tasks
        </Text>

        {/* Task Status Indicator */}
        <RoundedBox
          args={[0.3, 0.3, 0.05]}
          radius={0.05}
          position={[0.8, 1, 0.06]}
        >
          <meshStandardMaterial
            color={getTaskStatusColor()}
            emissive={getTaskStatusColor()}
            emissiveIntensity={0.5}
          />
        </RoundedBox>

        {/* Click indicator */}
        <Text
          position={[0, -1, 0.06]}
          fontSize={0.12}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          Click to view tasks
        </Text>
      </group>
    </Float>
  )
}

export default EmployeeCard3D