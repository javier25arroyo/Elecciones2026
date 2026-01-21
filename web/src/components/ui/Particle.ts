// Clase Particle extraída para evitar error de inline class
export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseX: number;
  baseY: number;
  density: number;

  constructor(canvasWidth: number, canvasHeight: number, colors: string[]) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = (Math.random() - 0.5) * 1; // slow float
    this.vy = (Math.random() - 0.5) * 1;
    this.size = Math.random() * 2 + 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.density = (Math.random() * 30) + 1;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  update(mousePos: { x: number; y: number }, canvasWidth: number, canvasHeight: number) {
    const dx = mousePos.x - this.x;
    const dy = mousePos.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = 150;
    const force = (maxDistance - distance) / maxDistance;
    if (distance < maxDistance) {
      const speed = 2;
      this.vx += forceDirectionX * force * speed * 0.05;
      this.vy += forceDirectionY * force * speed * 0.05;
    }
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.x += this.vx + (Math.random() - 0.5) * 0.2;
    this.y += this.vy + (Math.random() - 0.5) * 0.2;
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }
}
