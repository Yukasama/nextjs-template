import { CarsList } from './cars-list';
import { getCars } from './get-cars';

export const CarsWrapper = async () => {
  const initialCars = await getCars();

  return <CarsList initialCars={initialCars} />;
};
