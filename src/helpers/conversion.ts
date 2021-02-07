import { base32Encode, base32Decode } from '@ctrl/ts-base32';
import * as utf8 from 'utf8';

const base32Variant = 'Crockford'

export const encodeId = (buffer:any) => base32Encode(buffer, base32Variant)
export const decodeId = (id:any) => {
    // console.log('decodeId', {id})
    return new Uint8Array(base32Decode(id, base32Variant))
}

export const numbersToByteArray = (numbers:any, size:any = 0):any => {
    if (size == null) {
        return new Uint8Array(numbers)
    }
    if (numbers.length >= size) {
        return numbersToByteArray(numbers.slice(0, size))
    }
    const bytes = new Uint8Array(size)
    bytes.set(numbers, size - numbers.length)
    return bytes
}

export const byteArrayToHex = (byteArray:any, withPrefix = true) => {
    const prefix = withPrefix ? '0x' : '';
    return prefix + Array.from(byteArray, (byte:any) => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
};

export const byteArrayToNumbers = (bytes:any) => bytes.reduce((prev:any, curr:any) => [...prev, curr], [])
export const hexPrefix = '0x'
export const toHex = (byteArray:any, withPrefix = true) =>
    (withPrefix ? hexPrefix : '') + Array.from(byteArray, (byte:any) => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('')

export const hexToNumbers = (hex:any) => {
    const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex
    const subStrings = []
    for (let i = 0; i < hexWithoutPrefix.length; i += 2) {
        subStrings.push(hexWithoutPrefix.substr(i, 2))
    }
    return subStrings.map(s => parseInt(s, 16))
}
export const hexToByteArray = (hex:any, size=0) => numbersToByteArray(hexToNumbers(hex), size)
export const stripHexPrefix = (hex:any) => hex.startsWith(hexPrefix) ? hex.slice(hexPrefix.length) : hex
export const stringToUint8Array = (data:any) => utf8.encode(data);
