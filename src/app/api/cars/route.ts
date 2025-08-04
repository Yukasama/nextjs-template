import { logger } from '@/lib/logger';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

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
export const GET = async () => {
  try {
    return NextResponse.json(cars);
  } catch (error) {
    if (error instanceof AxiosError) {
      logger.error('Fetch error while fetching cars: %s', error.message);
    } else if (error instanceof Error) {
      logger.error('Unknown error: %s', error.message);
    }
    logger.error('An error occurred while fetching cars: %s', error);
  }
};
