document.addEventListener('DOMContentLoaded', () => {
  const phoneLink = document.querySelector('.phone-icon');
  const mailLink = document.querySelector('.mail-icon');

  if (phoneLink) {
    phoneLink.addEventListener('click', (event) => {
      event.preventDefault();
      const numero = phoneLink.getAttribute('href');
      navigator.clipboard.writeText(numero)
        .then(() => {
          showCopiedMessage(event.pageX, event.pageY);
        });
    });
  }

  if (mailLink) {
    mailLink.addEventListener('click', (event) => {
      event.preventDefault();
      const mail = mailLink.getAttribute('href');
      navigator.clipboard.writeText(mail)
        .then(() => {
          showCopiedMessage(event.pageX, event.pageY);
        });
    });
  }

  function showCopiedMessage(x, y) {
    const message = document.createElement('div');
    message.textContent = 'Copié !';
    message.style.position = 'absolute';
    message.style.top = `${y - 30}px`;
    message.style.left = `${x + 10}px`;
    message.style.backgroundColor = '#000';
    message.style.color = '#fff';
    message.style.padding = '5px 10px';
    message.style.borderRadius = '5px';
    message.style.fontSize = '14px';
    message.style.zIndex = '1000';
    message.style.pointerEvents = 'none';
    message.style.opacity = '0';
    message.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(message);

    requestAnimationFrame(() => {
      message.style.opacity = '1';
    });

    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }, 1500);
  }
});
