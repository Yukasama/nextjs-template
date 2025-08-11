import { CarsList } from '@/features/car/cars-list';
import { getCars } from '@/features/car/get-cars';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { Suspense } from 'react';

export default function CarsServerPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Cars</h1>
      <p className="mb-8">Explore our collection of cars.</p>
      <Suspense
        fallback={
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="skeleton h-6 w-full rounded-md" key={index} />
            ))}
          </div>
        }
      >
        <CarsContent />
      </Suspense>
    </div>
  );
}

const CarsContent = async () => {
  'use cache';
  cacheTag('cars');

  const cars = await getCars();
  return <CarsList initialCars={cars} />;
};
