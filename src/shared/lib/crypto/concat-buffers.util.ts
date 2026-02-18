export function concatBuffers(...buffers: ArrayBuffer[]): ArrayBuffer {
  const totalLength: number = buffers.reduce((accumulator: number, buffer: ArrayBuffer): number => {
    return accumulator + buffer.byteLength;
  }, 0);
  const result = new Uint8Array(totalLength);
  let offset: number = 0;
  for (const buffer of buffers) {
    result.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;
  }
  return result.buffer;
}
