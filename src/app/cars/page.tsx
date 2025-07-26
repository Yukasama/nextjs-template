import { CarsList } from '@/features/car/cars-list';
import { Suspense } from 'react';

export default function CarsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Cars</h1>
      <p className="mb-8">Explore our collection of cars.</p>
      <Suspense fallback={<div className="bg-red-500">Loading cars...</div>}>
        <CarsList />
      </Suspense>
    </div>
  );
}
