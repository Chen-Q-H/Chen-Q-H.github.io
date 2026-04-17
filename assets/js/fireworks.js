(function () {
  var canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var rockets = [];
  var colors = ['#0055FF', '#00A3FF', '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF922B'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 4 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.01;
    this.size = Math.random() * 2 + 1;
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.03;
    this.alpha -= this.decay;
  };

  Particle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  function Rocket(x, targetY) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = targetY;
    this.vy = -(Math.random() * 3 + 5);
    this.alpha = 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.trail = [];
  }

  Rocket.prototype.update = function () {
    this.trail.push({ x: this.x, y: this.y, alpha: 0.6 });
    if (this.trail.length > 8) this.trail.shift();
    this.y += this.vy;
    this.vy += 0.04;
  };

  Rocket.prototype.draw = function () {
    for (var i = 0; i < this.trail.length; i++) {
      var t = this.trail[i];
      ctx.save();
      ctx.globalAlpha = t.alpha * (i / this.trail.length);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  Rocket.prototype.exploded = function () {
    return this.vy >= 0 || this.y <= this.targetY;
  };

  function explode(x, y, color) {
    var count = Math.floor(Math.random() * 40) + 30;
    for (var i = 0; i < count; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  function launchRocket() {
    var side = Math.random() < 0.5 ? 'left' : 'right';
    var container = document.querySelector('.container-lg, .container-xl, .container');
    var containerLeft = container ? container.getBoundingClientRect().left : canvas.width * 0.15;
    var containerRight = container ? container.getBoundingClientRect().right : canvas.width * 0.85;
    var x;
    if (side === 'left') {
      x = containerLeft / 2;
    } else {
      x = containerRight + (canvas.width - containerRight) / 2;
    }
    var targetY = Math.random() * canvas.height * 0.4 + canvas.height * 0.05;
    rockets.push(new Rocket(x, targetY));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = rockets.length - 1; i >= 0; i--) {
      rockets[i].update();
      rockets[i].draw();
      if (rockets[i].exploded()) {
        explode(rockets[i].x, rockets[i].y, rockets[i].color);
        rockets.splice(i, 1);
      }
    }

    for (var j = particles.length - 1; j >= 0; j--) {
      particles[j].update();
      particles[j].draw();
      if (particles[j].alpha <= 0) {
        particles.splice(j, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  function scheduleLaunch() {
    launchRocket();
    setTimeout(scheduleLaunch, Math.random() * 2000 + 1000);
  }

  animate();
  setTimeout(scheduleLaunch, 500);
})();
