// components/StarryBackground.js
import { useEffect } from "react";

export default function StarryBackground() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = -1;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const stars = [];

    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5,
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animateStars() {
      drawStars();
      requestAnimationFrame(animateStars);
    }

    animateStars();

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
