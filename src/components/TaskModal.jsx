import React, { useState, useEffect } from 'react'
import { useWorkspaceStore } from '../state/useWorkspaceStore'

function TaskModal() {
  const {
    selectedTask,
    isTaskModalOpen,
    showAddTaskModal,
    closeTaskModal,
    closeAddTaskModal,
    updateTask,
    addTask,
    deleteTask,
    employees
  } = useWorkspaceStore()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    employeeId: 1
  })

  const isEditMode = isTaskModalOpen && selectedTask
  const isAddMode = showAddTaskModal

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        status: selectedTask.status || 'Pending',
        priority: selectedTask.priority || 'Medium',
        dueDate: selectedTask.dueDate || '',
        employeeId: selectedTask.employeeId || 1
      })
    } else if (isAddMode) {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: '',
        employeeId: 1
      })
    }
  }, [selectedTask, isEditMode, isAddMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEditMode) {
      updateTask(selectedTask.id, formData)
      closeTaskModal()
    } else if (isAddMode) {
      addTask(formData)
      closeAddTaskModal()
    }
  }

  const handleDelete = () => {
    if (selectedTask && window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(selectedTask.id)
      closeTaskModal()
    }
  }

  const handleClose = () => {
    if (isEditMode) {
      closeTaskModal()
    } else {
      closeAddTaskModal()
    }
  }

  if (!isEditMode && !isAddMode) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-dark rounded-xl p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {isEditMode ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task title..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter task description..."
            />
          </div>

          {/* Employee Assignment */}
          {isAddMode && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Assign To
              </label>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id} className="bg-gray-800">
                    {employee.name} - {employee.role}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pending" className="bg-gray-800">Pending</option>
                <option value="In Progress" className="bg-gray-800">In Progress</option>
                <option value="Completed" className="bg-gray-800">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Low" className="bg-gray-800">Low</option>
                <option value="Medium" className="bg-gray-800">Medium</option>
                <option value="High" className="bg-gray-800">High</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            
            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            )}
            
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
