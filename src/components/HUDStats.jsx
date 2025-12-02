import React from 'react'
import { useWorkspaceStore } from '../state/useWorkspaceStore'

function HUDStats() {
  const { getTaskStats } = useWorkspaceStore()
  const stats = getTaskStats()

  return (
    <div className="absolute bottom-4 right-4 glass-dark rounded-lg p-4 min-w-[200px]">
      <h3 className="font-semibold text-white mb-3">Dashboard</h3>
      
      {/* Progress Circle */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#4ade80"
              strokeWidth="4"
              strokeDasharray={`${(stats.completedPercent / 100) * 175.929} 175.929`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{stats.completedPercent}%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-white/60 text-xs">Total</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
          <div className="text-white/60 text-xs">Done</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-300">{stats.inProgress}</div>
          <div className="text-white/60 text-xs">Active</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
          <div className="text-white/60 text-xs">Pending</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>Progress</span>
          <span>{stats.completed}/{stats.total}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.completedPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default HUDStats