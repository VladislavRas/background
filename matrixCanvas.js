import { randomInt } from './random';

function matrixCanvas(canvas) {
  if (!canvas) throw Error('Invalid canvas element');

  const config = {
    fontSize: 35,
    fontColor: '#6A1BDA',
    speed: 40,
  };

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const content = '01';
  const matrix = content.split('');
  const colsLength = Math.ceil(width / config.fontSize);
  
  const arr = Array(colsLength).fill(0);
  const fontSizes = Array.from({ length: colsLength }).map(() =>
    randomInt(10, config.fontSize)
  );

  let animation = null;
  let timer = null;

  function frame() {
    animation = requestAnimationFrame(draw);
  }

  function draw(timestamp) {
    if (timer && timestamp - timer < 25) {
      return frame();
    }
    timer = timestamp;

    ctx.fillStyle = 'rgba(0, 0, 0, .05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = config.fontColor;

    for (let i = 0; i < arr.length; i++) {
      ctx.font = `${fontSizes[i]}px Clash Display`;
      let txt = matrix[Math.floor(Math.random() * matrix.length)];
      ctx.fillText(txt, i * config.fontSize, arr[i] * config.fontSize);
      if (arr[i] * config.fontSize > height && Math.random() > 0.975) {
        arr[i] = 0;
      }
      arr[i]++;
    }
    frame();
  }

  frame();

  return {
    destroy() {
      if(animation) {
        cancelAnimationFrame(animation);
        animation = null;
      }
    }
  }
}

export default matrixCanvas;
