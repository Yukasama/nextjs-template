'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getQueryClient } from '@/lib/query-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { addCar, getCars } from './get-cars';

interface Car {
  color: string;
  name: string;
}

export const CarsList = () => {
  const [newCarName, setNewCarName] = useState('');
  const [newCarColor, setNewCarColor] = useState('');
  const [fetchDuration, setFetchDuration] = useState<number | undefined>();
  const [mutateDuration, setMutateDuration] = useState<number | undefined>();
  const queryClient = getQueryClient();

  const { data, error, isFetching } = useQuery({
    gcTime: 10 * 60 * 1000,
    queryFn: async () => {
      const startTime = performance.now();
      const result = await getCars();
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      setFetchDuration(duration);
      return result;
    },
    queryKey: ['cars'],
    staleTime: 5 * 60 * 1000,
  });

  const { isPending, mutate: addCarMutation } = useMutation({
    mutationFn: async (newCar: Car) => {
      const startTime = performance.now();
      const result = await addCar(newCar);
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      setMutateDuration(duration);
      return result;
    },
    onError: (_, __, context) => {
      if (context?.previousCars) {
        queryClient.setQueryData(['cars'], context.previousCars);
      }
    },
    onMutate: async (newCar: Car) => {
      await queryClient.cancelQueries({ queryKey: ['cars'] });
      const previousCars = queryClient.getQueryData<Car[]>(['cars']);
      queryClient.setQueryData<Car[]>(['cars'], (old) =>
        old ? [...old, newCar] : [newCar],
      );
      return { previousCars };
    },
    onSuccess: async () => {
      setNewCarName('');
      setNewCarColor('');
      await queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  const handleAddCar = () => {
    const trimmedName = newCarName.trim();
    const trimmedColor = newCarColor.trim();

    if (trimmedName && trimmedColor) {
      addCarMutation({
        color: trimmedColor,
        name: trimmedName,
      });
    }
  };

  const isAddDisabled = isPending || !newCarName.trim() || !newCarColor.trim();
  const isLoading = isFetching && !data;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          disabled={isFetching}
          onClick={async () =>
            await queryClient.refetchQueries({ queryKey: ['cars'] })
          }
        >
          {isFetching ? 'Loading...' : 'Refetch'}
        </Button>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Add New Car</h2>
        <div className="flex gap-2">
          <input
            className="rounded border px-2 py-1"
            onChange={(e) => setNewCarName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isAddDisabled) {
                handleAddCar();
              }
            }}
            placeholder="Car name"
            type="text"
            value={newCarName}
          />
          <input
            className="rounded border px-2 py-1"
            onChange={(e) => setNewCarColor(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isAddDisabled) {
                handleAddCar();
              }
            }}
            placeholder="Car color"
            type="text"
            value={newCarColor}
          />
          <Button disabled={isAddDisabled} onClick={handleAddCar}>
            {isPending ? 'Adding...' : 'Add Car'}
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold">Cars List</h1>
        <div className="flex flex-col gap-2">
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="skeleton h-6 w-full rounded-md" key={index} />
              ))}
            </>
          )}

          {!isLoading && error && (
            <Badge variant="destructive">
              Error fetching cars: {error.message}
            </Badge>
          )}

          {data && (
            <ul className="space-y-1">
              {data.map((car, index) => (
                <li
                  className="h-6 rounded p-2"
                  key={`${car.name}-${car.color}-${index}`}
                >
                  {car.name} - {car.color}
                </li>
              ))}
            </ul>
          )}

          {isPending && <Badge variant="secondary">Adding new car...</Badge>}
        </div>
      </div>

      <div className="text-muted-foreground flex gap-2 text-sm">
        {fetchDuration !== undefined && (
          <Badge variant="outline">Last fetch: {fetchDuration}ms</Badge>
        )}
        {mutateDuration !== undefined && (
          <Badge variant="outline">Last mutation: {mutateDuration}ms</Badge>
        )}
      </div>
    </div>
  );
};
