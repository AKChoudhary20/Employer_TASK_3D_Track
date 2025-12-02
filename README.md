# 3D Employee Task Tracker
https://github.com/user-attachments/assets/e9607056-714c-4ea2-9d98-308d9a9b2e86
<img width="1917" height="1016" alt="image" src="https://github.com/user-attachments/assets/23d7e298-eb68-49e1-bc9b-8d285333257e" />

A modern, interactive 3D web application for tracking employee tasks using React, Three.js, and React Three Fiber. This project demonstrates advanced 3D web development techniques with a practical business application.

## 🚀 Project Setup Instructions

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebGL 2.0 support

### Installation Steps

1. **Clone the Repository**
```bash
git clone <repository-url>
cd employee-task-tracker
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - If port 3000 is in use, Vite will automatically assign the next available port

5. **Build for Production**
```bash
npm run build
```

6. **Preview Production Build**
```bash
npm run preview
```

### Troubleshooting Setup
- **Port Issues**: If the default port is occupied, Vite will automatically find an available port
- **Node Version**: Ensure you're using Node.js 18+ for compatibility
- **Browser Compatibility**: Make sure your browser supports WebGL 2.0

## 🛠 Framework and Libraries Used

### Core Framework
- **React 18.2.0**: Modern React with hooks and concurrent features
- **Vite 5.4.21**: Fast build tool and development server
- **JavaScript/JSX**: Primary development language

### 3D Graphics Stack
- **Three.js**: Core 3D graphics library for WebGL rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Essential helpers and abstractions for R3F

### State Management
- **Zustand**: Lightweight state management library
- **localStorage Integration**: Persistent data storage

### Styling & UI
- **TailwindCSS**: Utility-first CSS framework
- **PostCSS**: CSS processing tool
- **Autoprefixer**: CSS vendor prefixing

### Development Tools
- **ESLint**: Code linting and quality checks
- **Vite Plugins**: Hot module replacement and fast refresh

### Key Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "three": "^0.158.0",
  "@react-three/fiber": "^8.15.11",
  "@react-three/drei": "^9.88.13",
  "zustand": "^4.4.6",
  "tailwindcss": "^3.3.6"
}
```

## 📋 Assumptions Made

### Technical Assumptions
1. **Modern Browser Support**: Assumes users have browsers with WebGL 2.0 support (Chrome 56+, Firefox 51+, Safari 15+, Edge 79+)
2. **Desktop-First Design**: Primary optimization for desktop/laptop usage with mouse and keyboard
3. **Local Development**: Designed for local development environment without backend dependency
4. **Performance Hardware**: Assumes reasonable graphics capabilities for 3D rendering

### Data & Business Logic Assumptions
1. **Mock Data Sufficiency**: Uses static JSON data for demonstration purposes
2. **Small Team Size**: Optimized for teams of 4-10 employees
3. **Task Status Workflow**: Assumes standard task statuses (Pending → In Progress → Completed)
4. **Priority Levels**: Uses simple three-tier priority system (Low, Medium, High)

### User Experience Assumptions
1. **3D Familiarity**: Users are comfortable with basic 3D navigation concepts
2. **No Accessibility Requirements**: Initial version doesn't include screen reader support or keyboard-only navigation
3. **English Language**: UI text and content are in English only
4. **Modern Input Methods**: Assumes mouse wheel for zoom and drag for camera control

### Development Assumptions
1. **No Authentication**: No user login or security requirements
2. **No Backend Integration**: Purely frontend application with local storage
3. **No Real-time Updates**: No WebSocket or real-time synchronization needs
4. **Development Environment**: Assumes Node.js development environment

### Performance Assumptions
1. **Single Workspace**: Designed for one workspace/team view at a time
2. **Limited Data Volume**: Optimized for <100 total tasks across all employees
3. **60fps Target**: Aims for smooth 60fps performance on modern hardware
4. **Memory Usage**: Assumes sufficient RAM for 3D scene rendering

### Future Scalability Assumptions
1. **Framework Longevity**: Built on stable, long-term supported frameworks
2. **Feature Extensibility**: Architecture allows for additional features
3. **Data Migration**: Current data structure can accommodate future backend integration
4. **Component Reusability**: Components designed for potential reuse in other projects

## ✨ Features

- **3D Workspace Interface**: Employees appear as floating 3D cards in orbital motion
- **Interactive Task Management**: Click employee cards to view tasks as 3D sticky notes
- **Dynamic Camera System**: Smooth animations with initial landing sequence
- **Real-time Dashboard**: Live statistics and progress tracking with glassmorphism UI
- **Advanced Filtering**: Filter tasks by status when viewing employee details
- **Local Storage Persistence**: Tasks and workspace data persist between sessions
- **Modern UI Design**: Clean, modern interface with dark theme
- **Responsive Interactions**: Hover effects, smooth transitions, and intuitive controls

## 🎮 How to Use

### Initial Experience
1. **Landing Animation**: Camera automatically animates from above to center of workspace
2. **Orbital View**: Employee cards orbit around the center in a planetary motion
3. **Auto-rotation**: Scene rotates slowly when no employee is selected

### Employee Interaction
1. **Select Employee**: Click any employee card to focus on them
2. **View Tasks**: Task sticky notes appear in a circle around the selected employee
3. **Filter Tasks**: Use the top filter buttons (All, Pending, In Progress, Completed) to show specific task types
4. **Reset View**: Click the background or close button to return to orbital view

### Task Management
1. **Task Details**: Click any task sticky note to open the task modal
2. **Edit Tasks**: Modify title, description, status, priority, and due date
3. **Add Tasks**: Click "Add Task" button to create new tasks
4. **Delete Tasks**: Remove tasks from the task modal

### UI Controls
- **Search**: Find tasks across all employees
- **Dashboard**: View completion statistics in bottom-right corner
- **Navigation Tips**: Helpful hints appear in bottom-left when no employee is selected

## 📁 Project Structure

```
src/
├── components/              # React Components
│   ├── Scene.jsx           # Main 3D scene orchestration
│   ├── EmployeeCard3D.jsx  # 3D employee cards with orbital motion
│   ├── TaskSticky3D.jsx    # 3D task sticky notes
│   ├── CameraController.jsx # Camera animation and controls
│   ├── UIOverlay.jsx       # Header, filters, and UI elements
│   ├── EmployeeModal.jsx   # Employee details popup
│   ├── TaskModal.jsx       # Task creation/editing popup
│   └── HUDStats.jsx        # Dashboard statistics display
├── data/
│   └── mockData.json       # Employee and task sample data
├── state/
│   └── useWorkspaceStore.js # Zustand store with localStorage
├── utils/
│   ├── animations.js       # Camera animation helpers
│   └── textures.js         # Procedural texture generation
├── styles/
│   └── overlay.css         # Additional CSS for glassmorphism
├── App.jsx                 # Main application component
├── main.jsx               # React application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🔧 Configuration

### Customizing Data
Edit `src/data/mockData.json` to modify:
- Employee information (name, role, avatar, email)
- Task details (title, description, status, priority, due date)
- Initial task assignments

### Styling Modifications
- **Colors**: Update `tailwind.config.js` for theme colors
- **3D Materials**: Modify component files for visual styles
- **Animations**: Adjust timing in `src/utils/animations.js`

## 📦 Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Create production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint for code quality
```

## 🌟 Advanced Features

### State Management
- **Zustand Store**: Centralized state with localStorage persistence
- **Computed Values**: Automatic task statistics calculation
- **UI State**: Modal management and camera positioning

### 3D Rendering
- **Orbital Mechanics**: Mathematical positioning for employee cards
- **Dynamic Lighting**: Multiple light sources for atmosphere
- **Performance Optimization**: Efficient rendering with React Three Fiber

### User Experience
- **Glassmorphism UI**: Modern translucent interface design
- **Smooth Transitions**: Eased animations throughout
- **Visual Feedback**: Hover states and selection indicators

---

Built with ❤️ using React Three Fiber and modern web technologies for ProU Technology frontend assignment.
