import { api } from "@/lib/genericApi";

interface GetRatesParams {
  base: string;
  currencies: string;
}

export const getRates = async (params: GetRatesParams) => {
  const { base, currencies } = params;
  const resp = await api.get('/v1/rate', { params: { base, currencies } });

  console.log('API Response:', resp.data);
  return resp.data;
}