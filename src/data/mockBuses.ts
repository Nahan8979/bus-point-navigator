
import { Bus } from '@/types/busTypes';

export const generateMockBuses = (route: string, from: string, to: string): Bus[] => {
  const buses: Bus[] = [
    {
      id: '1',
      number: 'KL-08-1234',
      route: route,
      arrival: '10:30 AM',
      fair: 25,
      distance: '5.2 km',
      time: '15 min',
      isUpcoming: true
    },
    {
      id: '2',
      number: 'KL-08-5678',
      route: route,
      arrival: '11:15 AM',
      fair: 25,
      distance: '8.7 km',
      time: '25 min'
    },
    {
      id: '3',
      number: 'KL-08-9012',
      route: route,
      arrival: '12:00 PM',
      fair: 30,
      distance: '12.3 km',
      time: '35 min'
    },
    {
      id: '4',
      number: 'KL-08-3456',
      route: route,
      arrival: '12:45 PM',
      fair: 25,
      distance: '15.8 km',
      time: '45 min'
    },
    {
      id: '5',
      number: 'KL-08-7890',
      route: route,
      arrival: '1:30 PM',
      fair: 35,
      distance: '18.2 km',
      time: '55 min'
    }
  ];

  return buses;
};
