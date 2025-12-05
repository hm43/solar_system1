export default function Instructions(){
    return (
        <>
        <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#aaa',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        textAlign: 'right'
      }}>
        <p>🖱️ Drag to rotate</p>
        <p>⌚ Scroll to zoom</p>
        <p>👆 Click planet to select</p>
      </div>
        </>
    )
}