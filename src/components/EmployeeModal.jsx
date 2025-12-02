import React from 'react'
import { useWorkspaceStore } from '../state/useWorkspaceStore'

function EmployeeModal() {
  const {
    selectedEmployee,
    isEmployeeModalOpen,
    closeEmployeeModal
  } = useWorkspaceStore()

  if (!isEmployeeModalOpen || !selectedEmployee) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-dark rounded-xl p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Employee Details</h2>
          <button
            onClick={closeEmployeeModal}
            className="text-white/60 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* Employee Info */}
        <div className="space-y-4">
          {/* Avatar & Basic Info */}
          <div className="text-center pb-4 border-b border-white/10">
            <div className="text-6xl mb-3">{selectedEmployee.avatar}</div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {selectedEmployee.name}
            </h3>
            <p className="text-blue-300">{selectedEmployee.role}</p>
            <p className="text-white/60 text-sm">{selectedEmployee.email}</p>
          </div>

          {/* Task Summary */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-lg font-bold text-yellow-400">
                {selectedEmployee.tasks.filter(t => t.status === 'Pending').length}
              </div>
              <div className="text-xs text-white/60">Pending</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-lg font-bold text-blue-300">
                {selectedEmployee.tasks.filter(t => t.status === 'In Progress').length}
              </div>
              <div className="text-xs text-white/60">In Progress</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-lg font-bold text-green-400">
                {selectedEmployee.tasks.filter(t => t.status === 'Completed').length}
              </div>
              <div className="text-xs text-white/60">Completed</div>
            </div>
          </div>

          {/* Tasks List */}
          <div>
            <h4 className="text-white font-medium mb-3">Recent Tasks</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedEmployee.tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">
                      {task.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400'
                        : task.status === 'In Progress'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">{task.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={closeEmployeeModal}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // TODO: Implement assign task functionality
                closeEmployeeModal()
              }}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal