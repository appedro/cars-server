import HttpStatusCodes from '@src/common/HttpStatusCodes';
import carservice from '@src/services/CarService';
import Car from '@src/models/Car';

import { IReq, IRes } from './common/types';
import check from './common/check';


// **** Functions **** //

/**
 * Get all cars.
 */
async function getAll(_: IReq, res: IRes) {
  const cars = await carservice.getAll();
  res.status(HttpStatusCodes.OK).json({ cars });
}

/**
 * Add one car.
 */
async function add(req: IReq, res: IRes) {
  const car = check.isValid(req.body, 'car', Car.isCar);
  await carservice.addOne(car);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one car.
 */
async function update(req: IReq, res: IRes) {
  const car = check.isValid(req.body, 'car', Car.isCar);
  await carservice.updateOne(car);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one car.
 */
async function delete_(req: IReq, res: IRes) {
  const id = check.isNum(req.params, 'id');
  await carservice.delete(id);
  res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
