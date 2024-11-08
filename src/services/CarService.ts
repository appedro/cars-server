import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import CarRepo from '@src/repos/CarRepo';
import { ICar } from '@src/models/Car';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'Car not found';


// **** Functions **** //

/**
 * Get all cars.
 */
function getAll(): Promise<any> {
  return CarRepo.getAll();
}

/**
 * Add one car.
 */
function addOne(car: ICar): Promise<void> {
  return CarRepo.add(car);
}

/**
 * Update one car.
 */
async function updateOne(car: ICar): Promise<void> {
  const persists = await CarRepo.persists(car.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return car
  return CarRepo.update(car);
}

/**
 * Delete a car by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await CarRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete car
  return CarRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
