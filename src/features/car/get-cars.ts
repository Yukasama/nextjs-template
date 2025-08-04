'use server';

import { logger } from '@/lib/logger';
import { AxiosError } from 'axios';
import { unstable_cacheTag as cacheTag, revalidateTag } from 'next/cache';

interface Car {
  color: string;
  name: string;
}

const cars: Car[] = [
  { color: 'red', name: 'Ferrari' },
  { color: 'blue', name: 'Ford' },
  { color: 'green', name: 'Lamborghini' },
];

// eslint-disable-next-line @typescript-eslint/require-await
export const getCars = async () => {
  'use cache';
  cacheTag('cars');

  try {
    return cars;
  } catch (error) {
    if (error instanceof AxiosError) {
      logger.error('Fetch error while fetching cars: %s', error.message);
    } else if (error instanceof Error) {
      logger.error('Unknown error: %s', error.message);
    }
    logger.error('An error occurred while fetching cars: %s', error);
  }
};

// eslint-disable-next-line @typescript-eslint/require-await
export const addCar = async (car: Car) => {
  try {
    cars.push(car);
    revalidateTag('cars');
    return cars;
  } catch (error) {
    if (error instanceof AxiosError) {
      logger.error('Fetch error while adding a car: %s', error.message);
    } else if (error instanceof Error) {
      logger.error('Unknown error: %s', error.message);
    }
    logger.error('An error occurred while adding a car: %s', error);
  }
};
