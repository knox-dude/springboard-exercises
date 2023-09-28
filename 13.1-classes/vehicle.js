class Vehicle {
  constructor(make, model, year) {
    this.make = make != '' ? make : "Toyota";
    this.model = model != '' ? model : "Toyota";
    this.year = year != '' ? year : "2000";
  }

  honk() {
    return "Beep."
  }

  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }

  revEngine() {
    return "VROOM!!!";
  }
}

class Garage {
  constructor(capacity) {
    this.capacity = capacity <= 0 ? 5 : capacity;
    this.vehicles = [];
  }

  add(vehicle) {
    if (!(vehicle instanceof Vehicle)) {
      return "Only vehicles are allowed in here!";
    }
    if (this.vehicles.length == this.capacity) {
      return "Sorry, we're full.";
    } else {
      this.vehicles.push(vehicle);
      return "Vehicle added!";
    }
  }
}