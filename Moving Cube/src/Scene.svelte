<script>
    import { T, useTask } from "@threlte/core";
    import { useInputMap, useKeyboard, OrbitControls } from '@threlte/extras'

    //movement inputs
    const keyboard = useKeyboard()

    const input = useInputMap(
        ({ key }) => ({
        jump:[key('Space')],
        moveLeft: [key('a')],
        moveRight: [key('d')],
        moveForward: [key('w')],
        moveBack: [key('s')]
     }),
    { keyboard }
    )

    let x = $state(0)
    let z = $state(0)
    let rotation = $state(0)

    const walkSpeed = 4
    
    //orbit controls
    let {
        autoRotate = false,
        enableDamping = true,
        rotateSpeed = 1,
        zoomToCursor = true,
        zoomSpeed = 1,
        minPolarAngle = 0,
        maxPolarAngle = Math.PI,
        enableZoom = true
    } = $props()
    
    useTask(
        (delta)=> {
            const move = input.vector(
                'moveLeft',
                'moveRight',
                'moveForward',
                'moveBack'
            );
      
        x += move.x * walkSpeed * delta;
        z += move.y * walkSpeed * delta;
        },
    { after: input.task }
  )
</script>

<T.PerspectiveCamera
    makeDefault
    position={[10, 10, 10]}
    oncreate={(ref) => {
        ref.lookAt(0, 1, 0);
    }}
/>

//lighting
<T.DirectionalLight position={[5, 8, 5]}
castShadow />

//adds in the cube
<T.Mesh position={[x,1,z]} rotation.y={rotation}>
    <T.BoxGeometry args={[2, 2, 2]} />
    <T.MeshStandardMaterial color="teal" />
</T.Mesh>

//enabling orbit controls
<OrbitControls
    enableDamping={enableDamping}
    autoRotate={autoRotate}
    rotateSpeed={rotateSpeed}
    zoomToCursor={zoomToCursor}
    zoomSpeed={zoomSpeed}
    minPolarAngle={minPolarAngle}
    maxPolarAngle={maxPolarAngle}
    enableZoom={enableZoom}
/>