(function cookiesAccept() {
  const acceptButton = document.querySelector('.btn_accept');

  const cookiesAccepted = localStorage.getItem('cookiesAccepted');

  if (cookiesAccepted) {
    const cookiesBanner = document.querySelector('.cookies_accept');
    cookiesBanner.style.display = 'none';
  }

  acceptButton.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');

    const cookiesBanner = document.querySelector('.cookies_accept');
    cookiesBanner.classList.add('hide');

    setTimeout(function() {
      cookiesBanner.style.display = 'none';
    }, 500); 
  });
})();