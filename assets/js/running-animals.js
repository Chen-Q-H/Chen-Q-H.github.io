(function () {
  var canvas = document.getElementById('animals-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var navbarHeight = 80;
  var time = 0;

  var catX = 0;
  var catDir = 1;
  var catInitialized = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = 60;
    if (window.innerWidth < 992) {
      canvas.style.top = '';
      canvas.style.bottom = '0';
    } else {
      canvas.style.bottom = '';
      var navbar = document.querySelector('.navbar');
      if (navbar) {
        navbarHeight = navbar.offsetHeight;
        canvas.style.top = (navbarHeight - 60) + 'px';
      }
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setTimeout(resize, 100);

  function getContainerEdges() {
    var container = document.querySelector('.container-lg, .container-xl, .container');
    if (!container) return { left: 0, right: canvas.width };
    var rect = container.getBoundingClientRect();
    return { left: rect.left, right: rect.right };
  }

  function drawCat(x, y, dir, legPhase) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(dir, 1);

    var legAngle1 = Math.sin(legPhase) * 0.5;
    var legAngle2 = Math.sin(legPhase + Math.PI) * 0.5;
    var bodyY = Math.abs(Math.sin(legPhase * 2)) * 2;

    ctx.save();
    ctx.translate(0, -bodyY);

    ctx.fillStyle = '#FFB347';
    ctx.strokeStyle = '#E89B2D';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.ellipse(8, -8, 12, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(-6, -12, 7, 6, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-9, -17);
    ctx.lineTo(-12, -23);
    ctx.lineTo(-7, -19);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-4, -17);
    ctx.lineTo(-2, -23);
    ctx.lineTo(0, -18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(-9, -12, 1.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FF8C94';
    ctx.beginPath();
    ctx.moveTo(-7, -9);
    ctx.lineTo(-6, -8);
    ctx.lineTo(-5, -9);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#E89B2D';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    ctx.save();
    ctx.translate(18, -8);
    ctx.rotate(Math.sin(legPhase * 1.5) * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(8, -6, 14, -3);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = '#E89B2D';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    ctx.save();
    ctx.translate(2, -2);
    ctx.rotate(legAngle1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(6, -2);
    ctx.rotate(legAngle2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(12, -2);
    ctx.rotate(legAngle2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(16, -2);
    ctx.rotate(legAngle1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
    ctx.restore();
  }

  function drawChick(x, y, jumpPhase) {
    var jumpY = Math.abs(Math.sin(jumpPhase)) * 10;
    if (Math.sin(jumpPhase) < -0.1) jumpY = 0;

    ctx.save();
    ctx.translate(x, y - jumpY);

    ctx.fillStyle = '#FFE44D';
    ctx.strokeStyle = '#E8C832';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.ellipse(0, -10, 9, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, -22, 7, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#E8A030';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-1, -28);
    ctx.quadraticCurveTo(0, -34, 1, -28);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-3, -27);
    ctx.quadraticCurveTo(-2, -32, -1, -27);
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(-3, -23, 1.5, 1.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(3, -23, 1.5, 1.8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.moveTo(-3, -20);
    ctx.lineTo(0, -16);
    ctx.lineTo(3, -20);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#FFB347';
    ctx.beginPath();
    ctx.arc(0, -17, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#E8C832';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    ctx.arc(-8, -9, 4, -Math.PI * 0.7, Math.PI * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(8, -9, 4, Math.PI * 0.3, Math.PI * 1.7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#E8A030';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    if (jumpY > 2) {
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(-4, -4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(3, 0);
      ctx.lineTo(4, -4);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(-5, 4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(3, 0);
      ctx.lineTo(5, 4);
      ctx.stroke();
    }

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    time += 0.012;

    var edges = getContainerEdges();
    var centerY = 48;

    if (!catInitialized) {
      catX = window.innerWidth < 992 ? canvas.width * 0.25 : edges.left / 2;
      catInitialized = true;
    }

    var catSpeed = 0.35;
    catX += catDir * catSpeed;

    if (window.innerWidth < 992) {
      var catLeft = 35;
      var catRight = canvas.width * 0.4;
      if (catX > catRight) {
        catX = catRight;
        catDir = -1;
      }
      if (catX < catLeft) {
        catX = catLeft;
        catDir = 1;
      }
      var chickCenterX = canvas.width * 0.75;
      drawCat(catX, centerY, -catDir, time * 1.2);
      drawChick(chickCenterX, centerY, time * 3);
      requestAnimationFrame(animate);
      return;
    }

    var catLeft = 35;
    var catRight = edges.left - 25;
    if (catRight < catLeft + 20) catRight = catLeft + 20;
    if (catX > catRight) {
      catX = catRight;
      catDir = -1;
    }
    if (catX < catLeft) {
      catX = catLeft;
      catDir = 1;
    }

    var chickCenterX = edges.right + (canvas.width - edges.right) / 2;

    drawCat(catX, centerY, -catDir, time * 1.2);
    drawChick(chickCenterX, centerY, time * 3);

    requestAnimationFrame(animate);
  }

  animate();
})();
