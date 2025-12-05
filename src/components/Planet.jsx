import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import OrbitPath from './Orbit'
import Moon from './Moon'

export default function Planet({ planet, isActive, onPlanetSelect, speedMultiplier = 1 }) {
  const meshRef = useRef()
  const groupRef = useRef()
  let orbitAngle = 0

  useFrame(() => {
    if (!meshRef.current || !groupRef.current) return

    // Spin the planet on its axis
    meshRef.current.rotation.y += planet.rotationSpeed * speedMultiplier

    // Orbit the planet around the sun
    orbitAngle += planet.speed * speedMultiplier
    groupRef.current.rotation.y = orbitAngle
  })

  const handleClick = (e) => {
    e.stopPropagation()
    onPlanetSelect(planet)
  }

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto'
  }

  const inclinationRad = (planet.inclination * Math.PI) / 180

  return (
    <group rotation={[inclinationRad, 0, 0]}>
      <OrbitPath radius={planet.distance} inclination={0} />
      
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          position={[planet.distance, 0, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[planet.radius, 64, 64]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={isActive ? planet.color : '#000000'}
            emissiveIntensity={isActive ? 2 : 0}
            wireframe={false}
          />
        </mesh>

        {planet.moons && planet.moons.length > 0 && (
          <group position={[planet.distance, 0, 0]}>
            {planet.moons.map((moon, idx) => (
              <Moon
                key={`${planet.name}-moon-${idx}`}
                moon={moon}
                speedMultiplier={speedMultiplier}
              />
            ))}
          </group>
        )}
      </group>
    </group>
  )
}
