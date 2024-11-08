import { Router } from 'express';

import Paths from '../common/Paths';
import CarRoutes from './CarRoutes';


// **** Variables **** //

const apiRouter = Router();


// ** Add CarRouter ** //

// Init router
const carRouter = Router();

// Get all cars
carRouter.get(Paths.cars.Get, CarRoutes.getAll);
carRouter.post(Paths.cars.Add, CarRoutes.add);
carRouter.put(Paths.cars.Update, CarRoutes.update);
carRouter.delete(Paths.cars.Delete, CarRoutes.delete);

// Add CarRouter
apiRouter.use(Paths.cars.Base, carRouter);


// **** Export default **** //

export default apiRouter;
