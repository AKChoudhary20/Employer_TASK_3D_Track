import * as THREE from 'three'

// Smooth animation utilities
export const lerp = (start, end, factor) => {
  return start * (1 - factor) + end * factor
}

// Easing functions
export const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

export const easeOutElastic = (t) => {
  const c4 = (2 * Math.PI) / 3
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

// Spring animation system
export class SpringAnimation {
  constructor(initialValue = 0, config = {}) {
    this.value = initialValue
    this.target = initialValue
    this.velocity = 0
    
    this.config = {
      tension: config.tension || 100,
      friction: config.friction || 10,
      mass: config.mass || 1,
      ...config
    }
  }

  setTarget(newTarget) {
    this.target = newTarget
  }

  update(deltaTime) {
    const force = -this.config.tension * (this.value - this.target)
    const damping = -this.config.friction * this.velocity
    const acceleration = (force + damping) / this.config.mass
    
    this.velocity += acceleration * deltaTime
    this.value += this.velocity * deltaTime
    
    return this.value
  }

  isAtRest(threshold = 0.001) {
    return Math.abs(this.velocity) < threshold && Math.abs(this.value - this.target) < threshold
  }
}

// Camera animation utilities
export const animateCamera = (camera, controls, targetPosition, targetLookAt, duration = 2) => {
  return new Promise((resolve) => {
    const startPosition = camera.position.clone()
    const startLookAt = controls.target.clone()
    
    const animateStep = (progress) => {
      const easedProgress = easeInOutCubic(progress)
      
      camera.position.lerpVectors(startPosition, targetPosition, easedProgress)
      controls.target.lerpVectors(startLookAt, targetLookAt, easedProgress)
      controls.update()
      
      if (progress >= 1) {
        resolve()
      }
    }
    
    let startTime = null
    const animate = (time) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / (duration * 1000), 1)
      
      animateStep(progress)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  })
}

// Floating animation for objects
export const createFloatingAnimation = (object, amplitude = 0.1, frequency = 1) => {
  const originalY = object.position.y
  
  return {
    update: (elapsedTime) => {
      object.position.y = originalY + Math.sin(elapsedTime * frequency) * amplitude
    },
    reset: () => {
      object.position.y = originalY
    }
  }
}

// Glow effect animation
export const createGlowPulse = (intensity = 0.5, frequency = 2) => {
  return {
    update: (elapsedTime) => {
      return intensity * (0.5 + 0.5 * Math.sin(elapsedTime * frequency))
    }
  }
}

// Particle system utilities
export const createParticleSystem = (count = 100, spread = 10) => {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * spread
    positions[i + 1] = (Math.random() - 0.5) * spread
    positions[i + 2] = (Math.random() - 0.5) * spread
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.6
  })
  
  return new THREE.Points(geometry, material)
}

// Color interpolation
export const interpolateColor = (color1, color2, factor) => {
  const c1 = new THREE.Color(color1)
  const c2 = new THREE.Color(color2)
  return c1.lerp(c2, factor)
}

// Random utilities
export const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min
}

export const randomSign = () => {
  return Math.random() > 0.5 ? 1 : -1
}

// Vector utilities
export const getRandomPointInSphere = (radius = 1) => {
  const u = Math.random()
  const v = Math.random()
  const theta = u * 2.0 * Math.PI
  const phi = Math.acos(2.0 * v - 1.0)
  const r = Math.cbrt(Math.random()) * radius
  
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  
  return new THREE.Vector3(
    r * sinPhi * cosTheta,
    r * sinPhi * sinTheta,
    r * cosPhi
  )
}