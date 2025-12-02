import { create } from 'zustand'
import mockData from '../data/mockData.json'

// Helper to safely access localStorage (guarded for SSR/build)
const loadFromLocalStorage = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    const raw = window.localStorage.getItem('workspaceData')
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Could not load workspaceData from localStorage', e)
    return null
  }
}

const saveToLocalStorage = (data) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('workspaceData', JSON.stringify(data))
    }
  } catch (e) {
    console.warn('Could not save to localStorage', e)
  }
}

export const useWorkspaceStore = create((set, get) => {
  const saved = loadFromLocalStorage()
  const initialEmployees = (saved && saved.employees) ? saved.employees : mockData.employees
  const initialAllTasks = (saved && saved.allTasks) ? saved.allTasks : mockData.employees.flatMap(emp => emp.tasks)

  return {
    // Data
    employees: initialEmployees,
    allTasks: initialAllTasks,
    
    // UI State
    selectedEmployee: null,
    selectedTask: null,
    isEmployeeModalOpen: false,
    isTaskModalOpen: false,
    showAddTaskModal: false,
    
    // Filters & Search
    statusFilter: 'All',
    searchQuery: '',
    
    // Theme
    theme: 'dark',
    
    // Camera
    cameraTarget: [0, 0, 0],
    cameraPosition: [0, 5, 10],
    
    // Actions
    setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
    
    setSelectedTask: (task) => set({ selectedTask: task }),
    
    openEmployeeModal: (employee) => set({ 
      selectedEmployee: employee, 
      isEmployeeModalOpen: true 
    }),
    
    closeEmployeeModal: () => set({ 
      isEmployeeModalOpen: false, 
      selectedEmployee: null 
    }),
    
    openTaskModal: (task) => set({ 
      selectedTask: task, 
      isTaskModalOpen: true 
    }),
    
    closeTaskModal: () => set({ 
      isTaskModalOpen: false, 
      selectedTask: null 
    }),
    
    openAddTaskModal: () => set({ showAddTaskModal: true }),
    
    closeAddTaskModal: () => set({ showAddTaskModal: false }),
    
    setStatusFilter: (filter) => set({ statusFilter: filter }),
    
    setSearchQuery: (query) => set({ searchQuery: query }),
    
    toggleTheme: () => set((state) => ({ 
      theme: state.theme === 'dark' ? 'light' : 'dark' 
    })),
    
    setCameraTarget: (target) => set({ cameraTarget: target }),
    
    setCameraPosition: (position) => set({ cameraPosition: position }),
    
    resetCamera: () => set({ 
      cameraTarget: [0, 0, 0], 
      cameraPosition: [0, 5, 10],
      selectedEmployee: null 
    }),
    
    // Task Management
    addTask: (newTask) => {
      const taskWithId = { ...newTask, id: Date.now() }
      set((state) => {
        const updatedEmployees = state.employees.map(emp => 
          emp.id === newTask.employeeId 
            ? { ...emp, tasks: [...emp.tasks, taskWithId] }
            : emp
        )

        const newState = {
          employees: updatedEmployees,
          allTasks: [...state.allTasks, taskWithId]
        }
        
        saveToLocalStorage(newState)
        return newState
      })
    },
    
    updateTask: (taskId, updates) => {
      set((state) => {
        const updatedEmployees = state.employees.map(emp => ({
          ...emp,
          tasks: emp.tasks.map(task => 
            task.id === taskId ? { ...task, ...updates } : task
          )
        }))

        const updatedAllTasks = state.allTasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )

        const newState = {
          employees: updatedEmployees,
          allTasks: updatedAllTasks
        }
        
        saveToLocalStorage(newState)
        return newState
      })
    },
    
    deleteTask: (taskId) => {
      set((state) => {
        const updatedEmployees = state.employees.map(emp => ({
          ...emp,
          tasks: emp.tasks.filter(task => task.id !== taskId)
        }))

        const updatedAllTasks = state.allTasks.filter(task => task.id !== taskId)

        const newState = {
          employees: updatedEmployees,
          allTasks: updatedAllTasks
        }
        
        saveToLocalStorage(newState)
        return newState
      })
    },
    
    // Computed values
    getFilteredTasks: () => {
      const { allTasks, statusFilter, searchQuery } = get()
      
      let filtered = allTasks
      
      if (statusFilter !== 'All') {
        filtered = filtered.filter(task => task.status === statusFilter)
      }
      
      if (searchQuery) {
        filtered = filtered.filter(task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      return filtered
    },
    
    getTaskStats: () => {
      const { allTasks } = get()
      
      const total = allTasks.length
      const completed = allTasks.filter(task => task.status === 'Completed').length
      const inProgress = allTasks.filter(task => task.status === 'In Progress').length
      const pending = allTasks.filter(task => task.status === 'Pending').length
      const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0
      
      return {
        total,
        completed,
        inProgress,
        pending,
        completedPercent
      }
    }
  }
})