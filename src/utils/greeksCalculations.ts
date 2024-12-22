// Black-Scholes Greeks calculations
export const calculateGreeks = (
  S: number,  // Spot price
  K: number,  // Strike price
  T: number,  // Time to expiry (years)
  r: number,  // Risk-free rate
  σ: number,  // Volatility
  type: 'call' | 'put'
) => {
  const d1 = (Math.log(S / K) + (r + σ * σ / 2) * T) / (σ * Math.sqrt(T));
  const d2 = d1 - σ * Math.sqrt(T);
  
  const Nd1 = normalCDF(type === 'call' ? d1 : -d1);
  const Nd2 = normalCDF(type === 'call' ? d2 : -d2);
  const nd1 = normalPDF(d1);

  // First-order Greeks
  const delta = type === 'call' ? Nd1 : Nd1 - 1;
  const gamma = nd1 / (S * σ * Math.sqrt(T));
  const vega = S * Math.sqrt(T) * nd1 / 100; // Divided by 100 for percentage
  const theta = (-S * σ * nd1 / (2 * Math.sqrt(T)) - 
    r * K * Math.exp(-r * T) * Nd2) / 365; // Daily theta
  const rho = (type === 'call' ? 1 : -1) * 
    K * T * Math.exp(-r * T) * Nd2 / 100; // Divided by 100 for percentage

  // Second-order Greeks
  const charm = calculateCharm(S, K, T, r, σ, type);
  const vanna = calculateVanna(S, K, T, r, σ);
  const volga = calculateVolga(S, K, T, r, σ);

  return {
    delta,
    gamma,
    vega,
    theta,
    rho,
    charm,
    vanna,
    volga
  };
};

const normalCDF = (x: number): number => {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + p * x);
  const erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return 0.5 * (1 + sign * erf);
};

const normalPDF = (x: number): number => {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
};

// Second-order Greeks calculations
const calculateCharm = (S: number, K: number, T: number, r: number, σ: number, type: 'call' | 'put'): number => {
  const d1 = (Math.log(S / K) + (r + σ * σ / 2) * T) / (σ * Math.sqrt(T));
  const d2 = d1 - σ * Math.sqrt(T);
  const nd1 = normalPDF(d1);
  
  return -nd1 * (2 * (r - σ * σ / 2) * T - d2 * σ * Math.sqrt(T)) / (2 * T * σ * Math.sqrt(T));
};

const calculateVanna = (S: number, K: number, T: number, r: number, σ: number): number => {
  const d1 = (Math.log(S / K) + (r + σ * σ / 2) * T) / (σ * Math.sqrt(T));
  const d2 = d1 - σ * Math.sqrt(T);
  const nd1 = normalPDF(d1);
  
  return -nd1 * d2 / σ;
};

const calculateVolga = (S: number, K: number, T: number, r: number, σ: number): number => {
  const d1 = (Math.log(S / K) + (r + σ * σ / 2) * T) / (σ * Math.sqrt(T));
  const d2 = d1 - σ * Math.sqrt(T);
  const nd1 = normalPDF(d1);
  
  return S * nd1 * Math.sqrt(T) * d1 * d2 / σ;
};