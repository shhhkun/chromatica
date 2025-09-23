import { useEffect, useRef } from "react";

/**
 * ParticlesBackground component renders an animated particle effect on a canvas.
 * It is designed to be a configurable background element for any part of your application.
 * @param {object} props
 * @param {string[]} props.colors - An array of hex color codes, usually 9.
 * @param {number} [props.opacity=0.5] - The transparency of the particles (from 0.0 to 1.0).
 */
const Particles = ({ colors, opacity = 0.5 }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);

  // helper function to convert a hex color string to an RGB object
  const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;
    const particleCount = 75; // number of particles

    const resizeCanvas = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      // reinitialize particles on resize
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        const selectedColor = colors[Math.floor(Math.random() * colors.length)];
        particles.current.push(new Particle(hexToRgb(selectedColor)));
      }
    };

    class Particle {
      constructor(rgb) {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 5 + 5; // before: 2 + 1
        this.vx = (Math.random() - 0.5) * 1; // before: 0.5
        this.vy = (Math.random() - 0.5) * 1; // before: 0.5
        this.rgb = rgb;
      }
      update() {
        // bounce off walls
        if (this.x < 0 || this.x > W) this.vx = -this.vx;
        if (this.y < 0 || this.y > H) this.vy = -this.vy;
        this.x += this.vx;
        this.y += this.vy;
      }
      draw() {
        // apply opacity
        ctx.fillStyle = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // animation loop
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      for (const particle of particles.current) {
        particle.update();
        particle.draw();
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // initial setup
    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    // cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [colors, opacity]);

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Particles;
