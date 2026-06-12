export type MonetizationProvider = 'free' | 'ads' | 'gems' | 'telegram_stars' | 'ton';
export const providerRules: Record<MonetizationProvider, string> = {
  free: 'Recompensas gratuitas internas.',
  ads: 'Rewarded ads limitados, validados server-side antes de produção.',
  gems: 'Moeda premium interna sem conversão para TON.',
  telegram_stars: 'Compras digitais internas futuras, sem saque.',
  ton: 'Conexão e pagamentos futuros revisados; sem crédito no cliente.',
};
