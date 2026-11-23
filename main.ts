import { readdirSync as L, readFileSync as R, mkdirSync as M, writeFileSync as W } from 'node:fs';
let Z = f => (a, b) => { if (!b) throw 4; return f(a, b); };
let F = [(a, b) => a + b | 0, (a, b) => a - b | 0, Math.imul, Z((a, b) => a / b | 0), Z((a, b) => a % b | 0), Z((a, b) => (a >>> 0) / (b >>> 0) | 0), Z((a, b) => (a >>> 0) % (b >>> 0) | 0), (a, b) => a & b, (a, b) => a | b, (a, b) => a ^ b, (a, b) => a << (b & 31), (a, b) => a >> (b & 31), (a, b) => a >>> (b & 31) | 0, (a, b) => a == b ? 1 : 0, (a, b) => a < b ? 1 : 0, (a, b) => (a >>> 0) < (b >>> 0) ? 1 : 0];
let S = '(9i,.237xxxxxxxx1111111-111-111x111xxxxxxxxxxxxxHLLH(xxxxxxxxxxx-0xxxxxxxxxxxxxx,,),';
function r(p, q) {
  let n = p.length, D = new Int32Array(256), s = 0, C = new Int32Array(64), t = 0, A = new Int32Array(256), O = new Uint8Array(65536), l = 0, g = 0, h = 0, k = 0, d = c => [O.slice(0, l), c];
  for (;;) {
    if (k == 1e6) return d(10);
    if (h < 0 || h >= n) return d(9);
    let v = p[h], z = S.charCodeAt(v) - 40;
    if (!(z <= 79)) return d(5);
    let m = z >> 4, a = (z >> 2) & 3, b = z & 3, B = v >= 16 && v <= 34 && v != 23 && v != 27;
    if (h + m >= n) return d(9);
    k++;
    let x = h + 1 + m;
    if (s < a) return d(2);
    if (s - a + b > 256) return d(3);
    h = x;
    try {
      if (B) { let y = D[s - 1], w = D[s - 2]; z = F[v - 16 - (v > 23) - (v > 27) - (v > 31)](w, y); s -= 2; D[s++] = z; }
      else if (v == 0) return d(0);
      else if (v == 1) D[s++] = (p[x - 1] << 24) >> 24;
      else if (v == 2) D[s++] = p[x - 4] | p[x - 3] << 8 | p[x - 2] << 16 | p[x - 1] << 24;
      else if (v == 3) s--;
      else if (v == 4) { D[s] = D[s - 1]; s++; }
      else if (v == 5) { let y = D[s - 1]; D[s - 1] = D[s - 2]; D[s - 2] = y; }
      else if (v == 6) { D[s] = D[s - 2]; s++; }
      else if (v == 7) { let y = D[s - 3]; D[s - 3] = D[s - 2]; D[s - 2] = D[s - 1]; D[s - 1] = y; }
      else if (v == 23) D[s - 1] = -D[s - 1] | 0;
      else if (v == 27) D[s - 1] = ~D[s - 1];
      else if (v >= 48 && v <= 50) { let y = (p[x - 2] | p[x - 1] << 8) << 16 >> 16, j = 1; if (v != 48) { let w = D[--s]; j = v == 49 ? w == 0 : w != 0; } if (j) h = x + y; }
      else if (v == 51) { if (t == 64) return d(7); C[t++] = x; h = p[x - 2] | p[x - 1] << 8; }
      else if (v == 52) { if (!t) return d(8); h = C[--t]; }
      else if (v == 64) { let y = D[s - 1]; if (y < 0 || y > 255) return d(6); D[s - 1] = A[y]; }
      else if (v == 65) { let y = D[s - 1], w = D[s - 2]; if (y < 0 || y > 255) return d(6); s -= 2; A[y] = w; }
      else if (v == 80) { let y = Buffer.from(String(D[s - 1])); if (l + y.length > 65536) return d(11); s--; O.set(y, l); l += y.length; }
      else if (v == 81) { if (l > 65535) return d(11); O[l++] = D[--s] & 255; }
      else if (v == 82) D[s++] = g < q.length ? q[g++] : -1;
      else if (v == 83) return d(D[--s] & 255);
    } catch (c) { return d(c); }
  }
}
let I = process.env.MAKEFUN_INPUT_DIR || '/input', O = process.env.MAKEFUN_OUTPUT_DIR || '/output';
for (let i of L(I).sort()) {
  let [o, c] = r(R(I + '/' + i + '/program.bin'), R(I + '/' + i + '/input.bin'));
  M(O + '/' + i, { recursive: true });
  W(O + '/' + i + '/stdout.bin', o);
  W(O + '/' + i + '/exit.txt', c + '\n');
}
