import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Order } from '../types/order';

const API_URL = import.meta.env.VITE_API_URL;

export function useOrders(userId: string) {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/orders?userId=${userId}`);
      return data as Order[];
    }
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: Partial<Order>) => {
      const { data } = await axios.post(`${API_URL}/orders`, orderData);
      return data as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Order> }) => {
      const response = await axios.patch(`${API_URL}/orders/${id}`, data);
      return response.data as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });
}