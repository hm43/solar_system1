import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useState } from 'react'
import Sun from './components/Sun'
import Planet from './components/Planet'
import planetsData from './assets/planets.json'
import Instructions from './components/Instructions'
import './App.css'

function App() {
  const [activePlanet, setActivePlanet] = useState(null)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const planets = planetsData.planets

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Speed Control UI */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Animation Speed</h3>
        
        <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
          <button onClick={() => setSpeedMultiplier(0.25)} style={buttonStyle}>0.25x</button>
          <button onClick={() => setSpeedMultiplier(0.5)} style={buttonStyle}>0.5x</button>
          <button onClick={() => setSpeedMultiplier(1)} style={buttonStyle}>1x</button>
          <button onClick={() => setSpeedMultiplier(2)} style={buttonStyle}>2x</button>
          <button onClick={() => setSpeedMultiplier(5)} style={buttonStyle}>5x</button>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={speedMultiplier}
            onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            Speed: {speedMultiplier.toFixed(1)}x
          </div>
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          style={{
            ...buttonStyle,
            width: '100%',
            backgroundColor: isPaused ? '#4CAF50' : '#f44336'
          }}
        >
          {isPaused ? '▶ Play' : '⏸ Pause'}
        </button>
      </div>

      {/* Planet Info Panel */}
      {activePlanet && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '20px',
          borderRadius: '8px',
          color: 'white',
          maxWidth: '300px'
        }}>
          <h2 style={{ margin: '0 0 10px 0' }}>{activePlanet.name}</h2>
          <p style={{ margin: '5px 0' }}>{activePlanet.info}</p>
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            <div>Distance: {activePlanet.distance} AU</div>
            <div>Radius: {activePlanet.radius} Earth radii</div>
            <div>Moons: {activePlanet.moons?.length || 0}</div>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 50, 100], fov: 60 }} style={{background: '#000000'}}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={200} />
        <OrbitControls />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />

        <Sun />

        {planets.map((planet) => (
          <Planet
            key={planet.name}
            planet={planet}
            isActive={activePlanet?.name === planet.name}
            onPlanetSelect={setActivePlanet}
            speedMultiplier={isPaused ? 0 : speedMultiplier}
          />
        ))}
      </Canvas>
      <Instructions/>
    </div>
  )
}

const buttonStyle = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#555',
  color: 'white',
  cursor: 'pointer',
  fontSize: '12px',
  transition: 'background 0.2s'
}

export default App
