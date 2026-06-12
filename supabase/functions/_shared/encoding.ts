const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function utf8ToBytes(value: string): Uint8Array {
  return textEncoder.encode(value);
}

export function bytesToUtf8(bytes: Uint8Array): string {
  return textDecoder.decode(bytes);
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function hexToBytes(hex: string): Uint8Array {
  if (!/^(?:[0-9a-f]{2})+$/i.test(hex)) {
    throw new Error('Invalid hexadecimal input');
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < hex.length; index += 2) {
    bytes[index / 2] = Number.parseInt(hex.slice(index, index + 2), 16);
  }
  return bytes;
}

export function base64urlEncodeBytes(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function base64urlDecodeToBytes(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]*$/.test(value)) {
    throw new Error('Invalid base64url input');
  }

  const paddingLength = (4 - (value.length % 4)) % 4;
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(paddingLength);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

export function jsonToBase64url(value: unknown): string {
  return base64urlEncodeBytes(utf8ToBytes(JSON.stringify(value)));
}

export function base64urlToJson<T>(value: string): T {
  return JSON.parse(bytesToUtf8(base64urlDecodeToBytes(value))) as T;
}

export function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  let diff = left.length ^ right.length;
  const maxLength = Math.max(left.length, right.length);

  for (let index = 0; index < maxLength; index += 1) {
    diff |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }

  return diff === 0;
}

export async function hmacSha256(key: Uint8Array | string, message: string): Promise<Uint8Array> {
  const keyBytes = typeof key === 'string' ? utf8ToBytes(key) : key;
  const cryptoKey = await crypto.subtle.importKey('raw', toArrayBuffer(keyBytes), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, toArrayBuffer(utf8ToBytes(message)));
  return new Uint8Array(signature);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}
