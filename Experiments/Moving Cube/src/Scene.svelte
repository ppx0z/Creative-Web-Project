<script>
    import { T, useTask } from "@threlte/core";
    import { useInputMap, useKeyboard, OrbitControls } from "@threlte/extras";
    import { World, RigidBody, Collider } from "@threlte/rapier";

    //movement inputs
    const keyboard = useKeyboard();

    const input = useInputMap(
        ({ key }) => ({
            jump: [key("Space")],
            moveLeft: [key("a")],
            moveRight: [key("d")],
            moveForward: [key("w")],
            moveBack: [key("s")],
        }),
        { keyboard },
    );

    let x = $state(0);
    let z = $state(0);
    let rotation = $state(0);

    const walkSpeed = 4;

    //orbit controls
    let {
        autoRotate = false,
        enableDamping = true,
        rotateSpeed = 1,
        zoomToCursor = true,
        zoomSpeed = 1,
        minPolarAngle = 0,
        maxPolarAngle = Math.PI,
        enableZoom = true,
    } = $props();

    let velocity =$state([0,0,0])
    
    useTask(
        (delta) => {
            const move = input.vector(
                "moveLeft",
                "moveRight",
                "moveForward",
                "moveBack",
            )
              velocity = [
                move.x * walkSpeed,
                0,
                move.y * walkSpeed
            ]
        },
        { after: input.task },
    );
</script>

<T.PerspectiveCamera
    makeDefault
    position={[10, 10, 10]}
    oncreate={(ref) => {
        ref.lookAt(0, 1, 0);
    }}
/>

//lighting
<T.DirectionalLight position={[5, 8, 5]} castShadow />

<World gravity={[0, -9.81, 0]}>
    //Floor
    <RigidBody type="fixed" position={[0, 0.5, 0]}>
        <Collider shape="cuboid" args={[20, 0.5, 20]} />
        <T.Mesh receiveShadow>
            <T.BoxGeometry args={[20, 1, 20]} />
            <T.MeshStandardMaterial color="grey" />
        </T.Mesh>
    </RigidBody>

    //Player cube
   
    <RigidBody
        type="dynamic"
        position={[0, 1, 0]}
        linearVelocity={velocity}
        linearDamping={2}
    >
        <Collider shape="cuboid" args={[1, 1, 1]} />
        <T.Mesh rotation.y={rotation}>
            <T.BoxGeometry args={[2, 2, 2]} />
            <T.MeshStandardMaterial color="teal" />
        </T.Mesh>
    </RigidBody>
    
    <T.Group position={[4, 1, 0]}>
    //Cube 2
    <RigidBody type="dynamic">
        <Collider shape="cuboid" args={[1,1,1]} />
        <T.Mesh castShadow>
            <T.BoxGeometry args={[2, 2, 2]} />
            <T.MeshStandardMaterial color="orange" />
        </T.Mesh>
    </RigidBody>

    //Cube 3
    <RigidBody type="dynamic">
        <Collider shape="cuboid" args={[1,1,1]} />
        <T.Mesh castShadow>
            <T.BoxGeometry args={[2, 2, 2]} />
            <T.MeshStandardMaterial color="red" />
        </T.Mesh>
    </RigidBody>
    </T.Group>
</World>



//enabling orbit controls
<OrbitControls
    {enableDamping}
    {autoRotate}
    {rotateSpeed}
    {zoomToCursor}
    {zoomSpeed}
    {minPolarAngle}
    {maxPolarAngle}
    {enableZoom}
/>
