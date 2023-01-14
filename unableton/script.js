const menuBtn = document.querySelector('.navbar-primary__btn-menu');
const moreBtn = document.querySelector('.navbar-primary__btn-more');
const [logo1, logo2] = document.querySelectorAll('.logo');
const menuPrimary = document.querySelector('.navbar-primary__content');
const menuMore = document.querySelector('.navbar-primary__more');

menuBtn.addEventListener('click', () => {
  menuPrimary.classList.toggle('is-expanded');
  logo1.classList.toggle('menu-is-down');
  logo2.classList.toggle('menu-is-down');
  menuBtn.classList.toggle('menu-is-down');
});

moreBtn.addEventListener('click', () => {
  menuMore.classList.toggle('more-is-open');
  const extraHeight = menuMore.offsetHeight;
  console.log(extraHeight);
  document.querySelector('.navbar-secondary').style = `padding-top: ${
    extraHeight + 20
  }px`;
});
