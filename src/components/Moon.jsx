import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Moon({ moon, speedMultiplier = 1 }) {
  const meshRef = useRef()
  const groupRef = useRef()
  let orbitAngle = Math.random() * Math.PI * 2

  useFrame(() => {
    if (!meshRef.current || !groupRef.current) return

    // Spin the moon on its axis
    meshRef.current.rotation.y += moon.rotationSpeed * speedMultiplier

    // Orbit the moon around its planet
    orbitAngle += moon.speed * speedMultiplier
    groupRef.current.rotation.y = orbitAngle
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        position={[moon.distance, 0, 0]}
      >
        <sphereGeometry args={[moon.radius, 16, 16]} />
        <meshStandardMaterial
          color={moon.color}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}
