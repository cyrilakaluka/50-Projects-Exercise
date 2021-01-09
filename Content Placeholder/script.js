(function (document) {
  const header = document.getElementById('header');
  const title = document.getElementById('title');
  const excerpt = document.getElementById('excerpt');
  const profileImage = document.getElementById('profile-img');
  const name = document.getElementById('name');
  const date = document.getElementById('date');

  const animatedBgs = document.querySelectorAll('.animated-bg');

  function loadData() {
    header.innerHTML = `<img
    src="https://images.unsplash.com/photo-1581976485836-17a106a253a4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1431&q=80"
    alt=""/>`;
    title.innerHTML = `Lorem ipsum dolor sit amet.`;
    excerpt.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, hic!`;
    profileImage.innerHTML = ` <img
    src="https://randomuser.me/api/portraits/women/50.jpg"
    alt=""/>`;
    name.innerHTML = 'Sarah Conwell';
    date.innerHTML = 'Jan 09, 2021';

    animatedBgs.forEach((animBg) => {
      animBg.classList.remove('animated-bg');
      animBg.classList.remove('animated-bg--text');
    });
  }

  setTimeout(loadData, 2500);
})(document);
