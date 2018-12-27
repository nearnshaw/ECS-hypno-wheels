// custom component to handle opening and closing doors
@Component('wheelSpin')
export class WheelSpin {
  active: boolean = false
  direction: Vector3 = Vector3.Up()
  speed: number = 30
}

// a group to keep track of all entities with a WheelSpin component
const wheels = engine.getComponentGroup(WheelSpin)

// a system to carry out the rotation
export class RotatorSystem implements ISystem {
 
  update(dt: number) {
    // iterate over the doors in the component group
    for (let wheel of wheels.entities) {
      let spin = wheel.get(WheelSpin)
      let transform = wheel.get(Transform)
      if (spin.active){
        transform.rotate(spin.direction, spin.speed * dt)
      }
    }
  }
}

// Add system to engine
engine.addSystem(new RotatorSystem())


// Wheels
let wheel1 = new Entity()
wheel1.set(new CylinderShape())
wheel1.get(CylinderShape).withCollisions = true
wheel1.set(new Transform({
  position: new Vector3(2, 1, 4),
  rotation: Quaternion.Euler(90, 0, 0),
  scale: new Vector3(1, 0.05, 1)
}))
engine.addEntity(wheel1)

let wheel2 = new Entity()
wheel2.set(new CylinderShape())
wheel2.get(CylinderShape).withCollisions = true
wheel2.set(new Transform({
  position: new Vector3(6, 1, 4),
  rotation: Quaternion.Euler(90, 0, 0),
  scale: new Vector3(1, 0.05, 1)
}))
engine.addEntity(wheel2)

// Material
let SpiralMaterial = new Material()
SpiralMaterial.albedoTexture = "materials/hypno-wheel.png"

// Add material to wheels
wheel1.set(SpiralMaterial)
wheel2.set(SpiralMaterial)

// add custom component
wheel1.set(new WheelSpin())
wheel1.get(WheelSpin).direction = Vector3.Up()
wheel2.set(new WheelSpin())
wheel2.get(WheelSpin).direction = Vector3.Down()

// Set the click behavior for the wheels
wheel1.set(
  new OnClick(e => {
    let spin = wheel1.get(WheelSpin)
    if (!spin.active){
      spin.active = true
    } else{
      spin.speed += 20
    }
  })
)

wheel2.set(
  new OnClick(e => {
    let spin = wheel2.get(WheelSpin)
    if (!spin.active){
      spin.active = true
    } else{
      spin.speed += 30
    }
  })
)



