import { ICar } from '@src/models/Car';
import orm from './MockOrm';

function getRandomInt(): number {
  // Define a range for the random ID (e.g., between 1 and 10000).
  return Math.floor(Math.random() * 10000) + 1;
}

// **** Functions **** //

/**
 * Get one car by its license plate (or other unique property like email).
 */
async function getOne(licensePlate: string): Promise<ICar | null> {
  const db = await orm.openDb();
  for (const car of db.cars) {
    if (car.licensePlate === licensePlate) {
      return car;
    }
  }
  return null;
}

/**
 * See if a car with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const car of db.cars) {
    if (car.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all cars.
 */
async function getAll(): Promise<ICar[]> {
  const db = await orm.openDb();
  return db.cars;
}

/**
 * Add one car.
 */
async function add(car: ICar): Promise<void> {
  const db = await orm.openDb();
  car.id = getRandomInt();
  db.cars.push(car);
  return orm.saveDb(db);
}

/**
 * Update a car with new data.
 */
async function update(car: ICar): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.cars.length; i++) {
    if (db.cars[i].id === car.id) {
      const dbCar = db.cars[i];
      db.cars[i] = {
        ...dbCar,
        licensePlate: car.licensePlate,
        chassis: car.chassis,
        renavam: car.renavam,
        model: car.model,
        brand: car.brand,
        year: car.year,
        price: car.price,
        image: car.image,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one car by id.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.cars.length; i++) {
    if (db.cars[i].id === id) {
      db.cars.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
