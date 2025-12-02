import React from 'react'
import { Environment, Stars, Sparkles, MeshReflectorMaterial } from '@react-three/drei'
import EmployeeCard3D from './EmployeeCard3D'
import TaskSticky3D from './TaskSticky3D'
import CameraController from './CameraController'
import { useWorkspaceStore } from '../state/useWorkspaceStore'

function Scene() {
  const { employees, selectedEmployee, statusFilter } = useWorkspaceStore()

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
      <pointLight position={[-10, 10, -10]} intensity={1.5} color="#ec4899" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.6}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Environment */}
      <Environment preset="city" />
      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={7}
        saturation={0}
        fade
      />
      <Sparkles
        count={100}
        scale={12}
        size={4}
        speed={0.4}
        opacity={0.5}
        color="#ffffff"
      />

      {/* Camera Controller */}
      <CameraController />

      {/* Employee Cards */}
      {employees.map((employee, index) => (
        <EmployeeCard3D
          key={employee.id}
          employee={employee}
        />
      ))}

      {/* Task Sticky Notes */}
      {selectedEmployee && selectedEmployee.tasks
        .filter(task => statusFilter === 'All' || task.status === statusFilter)
        .map((task, index, filteredTasks) => {
        // Use the stored camera target (which is the employee's position) as the center
        const { cameraTarget } = useWorkspaceStore.getState()
        // cameraTarget might be undefined initially or if not set, but selectedEmployee implies it is set.
        // Fallback to 0 if something is wrong, but it should be fine.
        const empX = cameraTarget ? cameraTarget[0] : 0
        const empZ = cameraTarget ? cameraTarget[2] : 0

        return (
          <TaskSticky3D
            key={task.id}
            task={task}
            position={[
              empX + Math.cos((index / filteredTasks.length) * Math.PI * 2) * 3,
              Math.sin(index * 0.5) * 0.5,
              empZ + Math.sin((index / filteredTasks.length) * Math.PI * 2) * 3
            ]}
            index={index}
          />
        )
      })}

      {/* Reflective Ground Plane */}
      <mesh
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={() => useWorkspaceStore.getState().resetCamera()}
      >
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
        />
      </mesh>
    </>
  )
}

export default Scene