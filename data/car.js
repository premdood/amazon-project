class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

    console.log(`${this.#brand} ${this.#model}, speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  go() {
    if (this.isTrunkOpen === false)
      if (this.speed <= 195)
        this.speed += 5;
  }

  brake() {
    if (this.speed >= 5)
      this.speed -= 5;
  }

  openTrunk() {
    if (this.speed === 0)
      this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }
  
  go() {
    if (this.isTrunkOpen === closed)
      if (this.speed + this.acceleration <= 300)
        this.speed += this.acceleration;
  }

  openTrunk() {
    console.log('Race cars do not have trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have trunk.');
  }

  // displayInfo() {
  //   console.log(`${this.brand} ${this.model}, speed: ${this.speed} km/h`);
  // }
}

const car1 = new Car({ brand: 'Toyota', model: 'Corolla' });
const car2 = new Car({ brand: 'Tesla', model: 'Model 3' });
const raceCar = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20 });

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();