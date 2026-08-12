import React, { useEffect, useRef } from 'react';

export const BackgroundShader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    syncSize();
    window.addEventListener('resize', syncSize);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;

      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = v_texCoord;
          vec2 center = u_mouse / u_resolution;
          
          // Light Emerald / Airy Palette
          vec3 color1 = vec3(0.95, 0.98, 0.96); // Soft emerald tint
          vec3 color2 = vec3(0.98, 0.99, 0.98); // Crisp warm white
          vec3 color3 = vec3(0.0, 0.21, 0.15);  // Signature Emerald Dark (#003527)

          float t = u_time * 0.2;
          
          // Slow, organic movement
          float noise = sin(uv.x * 2.0 + t) * cos(uv.y * 1.5 - t * 0.5);
          noise += sin(uv.y * 3.0 + t * 0.8) * cos(uv.x * 2.5 - t * 0.3);
          noise = noise * 0.5 + 0.5;
          
          // Very subtle mouse glow
          float dist = distance(uv, center);
          float glow = smoothstep(0.5, 0.0, dist) * 0.15;
          
          // Airy blend
          vec3 finalColor = mix(color2, color1, noise * 0.35);
          finalColor = mix(finalColor, color3, pow(noise, 8.0) * 0.06); // Faint hints of emerald
          finalColor += color3 * glow * 0.2;
          
          // Subtle grid overlay for "tech" feel
          float grid = abs(sin(uv.x * 50.0)) * abs(sin(uv.y * 50.0));
          finalColor = mix(finalColor, color1, pow(grid, 0.1) * 0.02);

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function cs(type, src) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vertShader = cs(gl.VERTEX_SHADER, vs);
    const fragShader = cs(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    function render(t) {
      if (!canvas || !gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-40">
      <canvas id="shader-canvas" ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default BackgroundShader;
