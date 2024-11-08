import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate car keys.';


// **** Types **** //

export interface ICar {
  id: number;
  licensePlate: string;
  chassis: string;
  renavam: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  image: string;
}

// **** Functions **** //

function new_(
  id?: number,
  licensePlate?: string,
  chassis?: string,
  renavam?: string,
  model?: string,
  brand?: string,
  year?: number,
  price?: number,
  image?: string,
): ICar {
  return {
    id: id ?? -1,
    licensePlate: licensePlate ?? '',
    chassis: chassis ?? '',
    renavam: renavam ?? '',
    model: model ?? '',
    brand: brand ?? '',
    year: year ?? 0,
    price: price ?? 0,
    image: image ?? '',
  };
}

function from(param: ICar): ICar {
  if (isCar(param)) {
    return new_(
      param.id,
      param.licensePlate,
      param.chassis,
      param.renavam,
      param.model,
      param.brand,
      param.year,
      param.price,
      param.image
    );
  }
  throw new Error(INVALID_CONSTRUCTOR_PARAM);
}

function isCar(arg: unknown): arg is ICar {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof (arg as any).id === 'number' &&
    'licensePlate' in arg && typeof (arg as any).licensePlate === 'string' &&
    'chassis' in arg && typeof (arg as any).chassis === 'string' &&
    'renavam' in arg && typeof (arg as any).renavam === 'string' &&
    'model' in arg && typeof (arg as any).model === 'string' &&
    'brand' in arg && typeof (arg as any).brand === 'string' &&
    'year' in arg && typeof (arg as any).year === 'number' &&
    'price' in arg && typeof (arg as any).price === 'number' &&
    'image' in arg && typeof (arg as any).image === 'string'
  );
}



// **** Export default **** //

export default {
  new: new_,
  from,
  isCar,
} as const;
