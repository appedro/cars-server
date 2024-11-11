import assert from 'assert';
import sinon from 'sinon';
import carService from '../src/services/CarService';
import orm from '../src/repos/MockOrm';
import { ICar } from '@src/models/Car';
import CarRepo from '../src/repos/CarRepo';

describe('Car Service', function () {
  let openDbStub: sinon.SinonStub;
  let addStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;
  let deleteStub: sinon.SinonStub;
  let persistsStub: sinon.SinonStub;

  beforeEach(() => {
    openDbStub = sinon.stub(orm, 'openDb');
    addStub = sinon.stub(CarRepo, 'add');
    updateStub = sinon.stub(CarRepo, 'update');
    deleteStub = sinon.stub(CarRepo, 'delete');
    persistsStub = sinon.stub(CarRepo, 'persists');
  });

  afterEach(() => {
    openDbStub.restore();
    addStub.restore();
    updateStub.restore();
    deleteStub.restore();
    persistsStub.restore();
  });

  describe('#getAll()', function () {
    it('should return all cars', async function () {
      const mockCars: ICar[] = [
        { id: 1, licensePlate: 'ABC1234', chassis: 'XYZ1234', renavam: '123456789', model: 'Model X', brand: 'Brand Y', year: 2020, price: 30000, image: 'image.png' },
        { id: 2, licensePlate: 'DEF5678', chassis: 'UVW5678', renavam: '987654321', model: 'Model Y', brand: 'Brand Z', year: 2021, price: 35000, image: 'image2.png' }
      ];
      openDbStub.resolves({ cars: mockCars });

      const result = await carService.getAll();
      assert.deepStrictEqual(result, mockCars);
    });
  });

  describe('#addOne()', function () {
    it('should add a new car', async function () {
      const newCar: ICar = {
        id: 3,
        licensePlate: 'GHI9012',
        chassis: 'RST9012',
        renavam: '246813579',
        model: 'Model Z',
        brand: 'Brand A',
        year: 2022,
        price: 40000,
        image: 'image3.png'
      };
      addStub.resolves();

      await carService.addOne(newCar);
      assert(addStub.calledOnceWith(newCar));
    });
  });

  describe('#updateOne()', function () {
    it('should update an existing car', async function () {
      const updatedCar: ICar = {
        id: 1,
        licensePlate: 'ABC1234',
        chassis: 'XYZ1234',
        renavam: '123456789',
        model: 'Model X',
        brand: 'Brand Y',
        year: 2020,
        price: 31000,
        image: 'image.png'
      };
      persistsStub.withArgs(updatedCar.id).resolves(true);
      updateStub.resolves();

      await carService.updateOne(updatedCar);
      assert(persistsStub.calledOnceWith(updatedCar.id));
      assert(updateStub.calledOnceWith(updatedCar));
    });
  });

  describe('#delete()', function () {
    it('should delete an existing car', async function () {
      const carId = 1;
      persistsStub.withArgs(carId).resolves(true);
      deleteStub.resolves();

      await carService.delete(carId);
      assert(persistsStub.calledOnceWith(carId));
      assert(deleteStub.calledOnceWith(carId));
    });
  });
});
