export const tonManifestUrl = import.meta.env.VITE_TON_MANIFEST_URL;
export const shortenTonAddress = (address?: string) => address ? `${address.slice(0, 4)}…${address.slice(-4)}` : 'Disconnected';
export const tonSafetyCopy = 'A wallet TON será usada para conexão, pagamentos futuros revisados e saques futuros de Aether Fragments elegíveis. Compras, saques e recompensas financeiras exigem validação server-side antes de produção.';
