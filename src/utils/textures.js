import * as THREE from 'three'

// Create a gradient texture
export const createGradientTexture = (colors, size = 256) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, size)
  
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color)
  })
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  
  return texture
}

// Create a noise texture
export const createNoiseTexture = (size = 256, scale = 0.1) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  const imageData = ctx.createImageData(size, size)
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = Math.random()
    imageData.data[i] = noise * 255     // Red
    imageData.data[i + 1] = noise * 255 // Green
    imageData.data[i + 2] = noise * 255 // Blue
    imageData.data[i + 3] = 255         // Alpha
  }
  
  ctx.putImageData(imageData, 0, 0)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(scale, scale)
  texture.needsUpdate = true
  
  return texture
}

// Create a circular gradient texture for glow effects
export const createGlowTexture = (size = 256, color = '#ffffff') => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2
  
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
  gradient.addColorStop(0, color)
  gradient.addColorStop(0.5, `${color}88`)
  gradient.addColorStop(1, `${color}00`)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  
  return texture
}

// Create a paper/cardboard texture
export const createPaperTexture = (size = 512, roughness = 0.1) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  
  // Base color
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, size, size)
  
  // Add texture with random dots
  for (let i = 0; i < size * size * roughness; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const opacity = Math.random() * 0.1
    
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    ctx.fillRect(x, y, 1, 1)
  }
  
  // Add some larger spots for variation
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = Math.random() * 3 + 1
    const opacity = Math.random() * 0.05
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    ctx.fill()
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.needsUpdate = true
  
  return texture
}

// Create a metallic texture
export const createMetallicTexture = (size = 256, baseColor = '#888888') => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  
  // Create brushed metal effect
  const gradient = ctx.createLinearGradient(0, 0, size, 0)
  gradient.addColorStop(0, baseColor)
  gradient.addColorStop(0.5, '#ffffff')
  gradient.addColorStop(1, baseColor)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  // Add vertical lines for brushed effect
  for (let i = 0; i < size; i += 2) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, size)
    ctx.stroke()
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.needsUpdate = true
  
  return texture
}

// Create holographic texture
export const createHolographicTexture = (size = 256) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  
  // Create rainbow gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#ff0080')
  gradient.addColorStop(0.2, '#00ff80')
  gradient.addColorStop(0.4, '#8000ff')
  gradient.addColorStop(0.6, '#ff8000')
  gradient.addColorStop(0.8, '#0080ff')
  gradient.addColorStop(1, '#ff0080')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  // Add interference pattern
  for (let i = 0; i < size; i += 4) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.sin(i * 0.1) * 0.2 + 0.1})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(size, i)
    ctx.stroke()
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.needsUpdate = true
  
  return texture
}

// Texture cache to avoid recreating textures
const textureCache = new Map()

export const getCachedTexture = (key, createFn) => {
  if (!textureCache.has(key)) {
    textureCache.set(key, createFn())
  }
  return textureCache.get(key)
}

// Dispose of cached textures
export const disposeCachedTextures = () => {
  textureCache.forEach(texture => {
    texture.dispose()
  })
  textureCache.clear()
}

// Status-based textures for task sticky notes
export const getTaskStatusTexture = (status) => {
  const colors = {
    'Pending': ['#fbbf24', '#f59e0b'],
    'In Progress': ['#3b82f6', '#1d4ed8'],
    'Completed': ['#4ade80', '#059669']
  }
  
  const statusColors = colors[status] || colors['Pending']
  return createGradientTexture(statusColors)
}