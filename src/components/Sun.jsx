import { useRef } from 'react'

export default function Sun() {
  const sunRef = useRef()

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={1}
      />
      <pointLight intensity={2} distance={1000} />
    </mesh>
  )
}
