export const noiseDisplacementGlassFragment = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centered = uv - 0.5;

  float n = noise(uv * 10.0 + u_time * 0.15);
  float ripple = sin(length(centered) * 38.0 - u_time * 3.2) * 0.008;

  vec2 distorted = uv + centered * (n * 0.03 + ripple);

  vec3 base = vec3(0.03, 0.05, 0.09);
  vec3 tint = vec3(0.62, 0.0, 1.0);
  vec3 cyan = vec3(0.0, 0.96, 1.0);

  float glow = smoothstep(0.7, 0.1, length(centered + vec2(n * 0.02)));
  vec3 color = mix(base, tint, glow * 0.32);
  color += cyan * (0.12 * n);

  gl_FragColor = vec4(color, 0.82);
}
`;
