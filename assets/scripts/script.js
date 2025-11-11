/* =========================================================
   Função: handleMouseEnter()
   - Adiciona a classe de destaque ao card quando o mouse entra.
   - Atualiza o ID do <body> para indicar qual card está ativo.
   ========================================================= */
function handleMouseEnter() {
  this.classList.add('card--hovered'); // Adiciona a classe que ativa os efeitos visuais no CSS
  document.body.id = `${this.id}-hovered`; // Define o ID do body dinamicamente, usado para trocar o fundo
}

/* =========================================================
   Função: handleMouseLeave()
   - Remove o destaque quando o mouse sai do card.
   - Limpa o ID do <body> para voltar ao estado padrão.
   ========================================================= */
function handleMouseLeave() {
  this.classList.remove('card--hovered'); // Remove o destaque do card
  document.body.id = ''; // Remove o ID do body (volta ao fundo padrão)
}

/* =========================================================
   Função: addEventListenersToCards()
   - Seleciona todos os cards e adiciona os eventos de
     "mouseenter" e "mouseleave".
   ========================================================= */
function addEventListenersToCards() {
  const cardElements = document.getElementsByClassName('card'); // Pega todos os elementos com a classe "card"
  
  for (let index = 0; index < cardElements.length; index++) {
    const card = cardElements[index];
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
  }
}

/* =========================================================
   Evento: DOMContentLoaded
   - Aguarda o carregamento completo do HTML antes de
     adicionar os eventos aos cards.
   ========================================================= */
document.addEventListener("DOMContentLoaded", addEventListenersToCards, false);

/* =========================================================
   Função: selectCarouselItem(selectedButtonElement)
   - Rotaciona o carrossel de acordo com o botão selecionado.
   - Atualiza o botão ativo visualmente.
   ========================================================= */
function selectCarouselItem(selectedButtonElement) {
  const selectedItem = selectedButtonElement.id; // Pega o ID do botão clicado (1, 2 ou 3)
  
  // Corrigido: o seletor estava '.cards-carousel', mas o HTML usa '#cards-carousel'
  const carousel = document.querySelector('#cards-carousel'); 
  
  // Captura a transformação atual do carrossel
  const transform = carousel.style.transform || "rotateY(0deg)"; 
  
  // Extrai o valor de rotação atual (caso exista)
  const rotateY = transform.match(/rotateY\((-?\d+deg)\)/i);
  
  // Calcula o novo ângulo com base no botão clicado (cada card gira 120°)
  const rotateYDeg = -120 * (Number(selectedItem) - 1);
  
  // Substitui o valor atual de rotação pela nova posição
  const newTransform = rotateY 
    ? transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`)
    : `translateZ(-40vw) rotateY(${rotateYDeg}deg)`; // Caso não haja rotação inicial
  
  carousel.style.transform = newTransform; // Aplica o novo valor no carrossel

  // Atualiza o botão ativo visualmente
  const activeButtonElement = document.querySelector('.controller__button--active');
  if (activeButtonElement) {
    activeButtonElement.classList.remove('controller__button--active');
  }
  selectedButtonElement.classList.add('controller__button--active');
}
