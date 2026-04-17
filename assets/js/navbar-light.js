(function () {
  var canvas = document.getElementById('navbar-light-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var navbarHeight = 80;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = 6;
    canvas.style.top = navbarHeight + 'px';
  }

  function getNavbarHeight() {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
      navbarHeight = navbar.offsetHeight;
      canvas.style.top = navbarHeight + 'px';
    }
  }

  resize();
  window.addEventListener('resize', function () {
    resize();
    getNavbarHeight();
  });

  setTimeout(getNavbarHeight, 100);

  function LightParticle() {
    this.x = -20;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 1.5 + 0.8;
    this.size = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.color = Math.random() < 0.7 ? '#0055FF' : '#00A3FF';
  }

  LightParticle.prototype.update = function () {
    this.x += this.speed;
  };

  LightParticle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  LightParticle.prototype.isDead = function () {
    return this.x > canvas.width + 20;
  };

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.15) {
      particles.push(new LightParticle());
    }

    for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(0, 85, 255, 0)');
    gradient.addColorStop(0.3, 'rgba(0, 85, 255, 0.08)');
    gradient.addColorStop(0.5, 'rgba(0, 163, 255, 0.12)');
    gradient.addColorStop(0.7, 'rgba(0, 85, 255, 0.08)');
    gradient.addColorStop(1, 'rgba(0, 85, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);
  }

  animate();
})();
