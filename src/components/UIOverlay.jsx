import React from 'react'
import { useWorkspaceStore } from '../state/useWorkspaceStore'
import HUDStats from './HUDStats'
import EmployeeModal from './EmployeeModal'
import TaskModal from './TaskModal'
import '../styles/overlay.css'

function UIOverlay() {
  const {
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
    openAddTaskModal,
    employees,
    selectedEmployee,
    resetCamera
  } = useWorkspaceStore()

  const filters = ['All', 'Pending', 'In Progress', 'Completed']

  return (
    <>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="glass rounded-lg p-4 mx-auto max-w-6xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🚀</div>
              <h1 className="text-xl font-bold text-white">3D Task Tracker</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass-dark hover:bg-white/20 transition-colors text-white"
                title="Toggle Theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              
              <button
                onClick={openAddTaskModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  statusFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <HUDStats />

      {/* Navigation Hint */}
      {!selectedEmployee && (
        <div className="absolute bottom-4 left-4 glass-dark rounded-lg p-3 text-white/80 text-sm max-w-xs">
          <div className="font-medium mb-2">Navigation Tips:</div>
          <ul className="space-y-1 text-xs">
            <li>• Click employee cards to view tasks</li>
            <li>• Drag to orbit camera</li>
            <li>• Scroll to zoom in/out</li>
            <li>• Click background to reset view</li>
          </ul>
        </div>
      )}

      {/* Selected Employee Info */}
      {selectedEmployee && (
        <div className="absolute bottom-4 left-4 glass-dark rounded-lg p-4 text-white max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{selectedEmployee.name}</h3>
            <button
              onClick={resetCamera}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-white/80 text-sm mb-3">{selectedEmployee.role}</p>
          <div className="text-sm">
            <div className="mb-1">Tasks: {selectedEmployee.tasks.length}</div>
            <div className="flex space-x-4 text-xs">
              <span className="text-yellow-400">
                Pending: {selectedEmployee.tasks.filter(t => t.status === 'Pending').length}
              </span>
              <span className="text-blue-300">
                Active: {selectedEmployee.tasks.filter(t => t.status === 'In Progress').length}
              </span>
              <span className="text-green-400">
                Done: {selectedEmployee.tasks.filter(t => t.status === 'Completed').length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Employee List */}
      <div className="absolute top-4 right-4 glass-dark rounded-lg p-4 max-w-xs">
        <h3 className="font-semibold text-white mb-3">Team Members</h3>
        <div className="space-y-2">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                selectedEmployee?.id === employee.id
                  ? 'bg-blue-600/30'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => {
                console.log('Clicked on employee:', employee.name, 'ID:', employee.id)
                if (selectedEmployee?.id === employee.id) {
                  console.log('Resetting camera for:', employee.name)
                  resetCamera()
                } else {
                  console.log('Selecting employee:', employee.name)
                  // Use the same orbital calculation as EmployeeCard3D
                  const orbitRadius = 6
                  const orbitSpeed = 0.2
                  // Get current time from performance.now() to match Three.js clock
                  const currentTime = performance.now() * 0.001 // Convert to seconds
                  const angle = currentTime * orbitSpeed + (employee.id * Math.PI * 2 / 4)
                  
                  const empX = Math.cos(angle) * orbitRadius
                  const empZ = Math.sin(angle) * orbitRadius
                  
                  console.log('Calculated position for', employee.name, ':', { empX, empZ, angle })
                  
                  // Position camera like the employee card click does
                  const camX = empX
                  const camY = 0
                  const camZ = empZ + 6
                  
                  useWorkspaceStore.getState().setSelectedEmployee(employee)
                  useWorkspaceStore.getState().setCameraTarget([empX, 0, empZ])
                  useWorkspaceStore.getState().setCameraPosition([camX, camY, camZ])
                }
              }}
            >
              <span className="text-lg">{employee.avatar}</span>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{employee.name}</div>
                <div className="text-white/60 text-xs">{employee.tasks.length} tasks</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <EmployeeModal />
      <TaskModal />
    </>
  )
}

export default UIOverlay