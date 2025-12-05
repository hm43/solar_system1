export default function OrbitPath({ radius, inclination = 0, color = "#eee" }) {
  const tilt = (inclination * Math.PI) / 180
  return (
    <mesh rotation={[-Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 16, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}
