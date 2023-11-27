import { useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import {
  useGLTF,
  Caustics,
  CubeCamera,
  Environment,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshRefractionMaterial,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { RGBELoader } from 'three-stdlib'
import '../login.css'
import diamondUrl from '../assets/dflat1.glb'

function Diamond(props) {
  const ref = useRef()
  const { nodes } = useGLTF(diamondUrl)
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

  return (
    <CubeCamera resolution={256} frames={1} envMap={texture}>
      {(texture) => (
        <Caustics
          backfaces
          color='#ffffff'
          position={[0, -0.5, 0]}
          lightSource={[5, 5, -10]}
          worldRadius={0.1}
          ior={1.8}
          backfaceIor={1.1}
          intensity={0.1}>
          <mesh castShadow ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>
            <MeshRefractionMaterial envMap={texture} toneMapped={false} />
          </mesh>
        </Caustics>
      )}
    </CubeCamera>
  )
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [-5, 0.5, 5], fov: 45 }}>
      <color attach="background" args={['#FDFFE2']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, -10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Diamond rotation={[0, 0, 0.715]} position={[0, -0.175 + 0.5, 0]} />
      <Diamond rotation={[-0.715, 0, 0]} position={[3, -0.175 + 0.5, 0]} />
      <Diamond rotation={[0.715, 0, 0]} position={[-3, -0.175 + 0.5, 0]} />
      <AccumulativeShadows
        temporal
        frames={100}
        color="orange"
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.8}
        opacity={1}
        scale={12}
        position={[0, -0.5, 0]}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
      </AccumulativeShadows>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
