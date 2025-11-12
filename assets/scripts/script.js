/* ======================== */
/* HOVER NOS CARDS */
/* ======================== */
function handleMouseEnter() {
  this.classList.add('card--hovered');              // Aplica efeito hover
  document.body.id = `${this.id}-hovered`;         // Atualiza ID do body para fundo dinâmico
}

function handleMouseLeave() {
  this.classList.remove('card--hovered');          // Remove efeito hover
  document.body.id = '';                            // Retorna fundo padrão
}

/* Inicialização do hover */
function addEventListenersToCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}

/* ======================== */
/* ROTACIONAR O CARROSSEL E ATUALIZAR BOTÕES */
/* ======================== */
function selectCarouselItem(button) {
  const index = Number(button.id);
  const carousel = document.querySelector('.cards-carousel');
  if (!carousel) return console.error('Carousel não encontrado');

  // Rotaciona o carrossel
  carousel.style.transform = `translateZ(-40vw) rotateY(${-120 * (index - 1)}deg)`;

  // Atualiza estado visual e acessibilidade dos botões
  document.querySelectorAll('.controller__button').forEach(btn => {
    const active = btn === button;
    btn.classList.toggle('controller__button--active', active);
    btn.setAttribute('aria-pressed', active);
  });
}

/* ======================== */
/* INICIALIZAÇÃO DO CARROSSEL */
/* ======================== */
document.addEventListener("DOMContentLoaded", () => {
  addEventListenersToCards();

  // Botões agora usam event listener (sem onclick inline)
  document.querySelectorAll('.controller__button').forEach(button => {
    button.addEventListener('click', () => selectCarouselItem(button));
  });
});
