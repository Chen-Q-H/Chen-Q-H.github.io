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
    var bodyY = Math.abs(Math.sin(legPhase * 2)) * 3;
    var earY = Math.sin(legPhase * 1.5) * 2;

    ctx.save();
    ctx.translate(0, -bodyY);

    // 身体渐变
    var bodyGradient = ctx.createLinearGradient(0, -15, 20, 5);
    bodyGradient.addColorStop(0, '#FFB347');
    bodyGradient.addColorStop(1, '#FFD79E');
    ctx.fillStyle = bodyGradient;
    ctx.strokeStyle = '#E89B2D';
    ctx.lineWidth = 1.5;

    // 身体
    ctx.beginPath();
    ctx.ellipse(8, -8, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 头部
    ctx.beginPath();
    ctx.ellipse(-6, -14, 9, 8, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 耳朵
    ctx.save();
    ctx.translate(-9, -17);
    ctx.translate(0, earY);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-3, -8);
    ctx.lineTo(2, -4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(-4, -17);
    ctx.translate(0, -earY);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(2, -8);
    ctx.lineTo(4, -3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 眼睛
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(-10, -14, 2, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-2, -14, 2, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 高光
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(-9.5, -14.5, 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-1.5, -14.5, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // 鼻子和嘴巴
    ctx.fillStyle = '#FF8C94';
    ctx.beginPath();
    ctx.moveTo(-7, -10);
    ctx.lineTo(-6, -9);
    ctx.lineTo(-5, -10);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#FF8C94';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -9);
    ctx.lineTo(-6, -7);
    ctx.stroke();

    // 尾巴
    ctx.strokeStyle = '#E89B2D';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    ctx.save();
    ctx.translate(18, -8);
    ctx.rotate(Math.sin(legPhase * 1.5) * 0.4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(10, -8, 18, -4);
    ctx.stroke();
    ctx.restore();

    // 腿
    ctx.strokeStyle = '#E89B2D';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    ctx.save();
    ctx.translate(2, -2);
    ctx.rotate(legAngle1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(6, -2);
    ctx.rotate(legAngle2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(12, -2);
    ctx.rotate(legAngle2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(16, -2);
    ctx.rotate(legAngle1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
    ctx.restore();
  }

  function drawChick(x, y, jumpPhase) {
    var jumpY = Math.abs(Math.sin(jumpPhase)) * 12;
    if (Math.sin(jumpPhase) < -0.1) jumpY = 0;
    var wingAngle = Math.sin(jumpPhase * 2) * 0.5;

    ctx.save();
    ctx.translate(x, y - jumpY);

    // 身体渐变
    var bodyGradient = ctx.createLinearGradient(-5, -25, 5, 0);
    bodyGradient.addColorStop(0, '#FFE44D');
    bodyGradient.addColorStop(1, '#FFEE8C');
    ctx.fillStyle = bodyGradient;
    ctx.strokeStyle = '#E8C832';
    ctx.lineWidth = 1.5;

    // 身体
    ctx.beginPath();
    ctx.ellipse(0, -12, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 头部
    ctx.beginPath();
    ctx.ellipse(0, -24, 8, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 鸡冠
    ctx.fillStyle = '#FF6B6B';
    ctx.strokeStyle = '#E85454';
    ctx.beginPath();
    ctx.moveTo(-1, -32);
    ctx.quadraticCurveTo(0, -38, 1, -32);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-3, -31);
    ctx.quadraticCurveTo(-2, -36, -1, -31);
    ctx.fill();
    ctx.stroke();

    // 眼睛
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(-3, -25, 2, 2.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(3, -25, 2, 2.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // 高光
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(-2.5, -25.5, 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(3.5, -25.5, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // 嘴巴
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.moveTo(-3, -21);
    ctx.lineTo(0, -17);
    ctx.lineTo(3, -21);
    ctx.closePath();
    ctx.fill();

    // 腮红
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.arc(-6, -22, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(6, -22, 2, 0, Math.PI * 2);
    ctx.fill();

    // 翅膀
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#E8C832';
    ctx.lineWidth = 1;

    ctx.save();
    ctx.translate(-8, -10);
    ctx.rotate(wingAngle);
    ctx.beginPath();
    ctx.arc(0, 0, 5, -Math.PI * 0.7, Math.PI * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(8, -10);
    ctx.rotate(-wingAngle);
    ctx.beginPath();
    ctx.arc(0, 0, 5, Math.PI * 0.3, Math.PI * 1.7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 腿
    ctx.strokeStyle = '#E8A030';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    if (jumpY > 3) {
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(-4, -6);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(3, 0);
      ctx.lineTo(4, -6);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(-5, 6);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(3, 0);
      ctx.lineTo(5, 6);
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
