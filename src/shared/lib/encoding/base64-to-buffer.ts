export function base64ToBuffer(base64: string): ArrayBuffer {
    return Uint8Array.from(atob(base64), (character: string): number => character.charCodeAt(0))
      .buffer;
}