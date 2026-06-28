document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  const signInButton = document.querySelector('.sign_in_button');
  const heroTitle = document.querySelector('.hero_title');
  const heroSubtitle = document.querySelector('.hero_subtitle');
  const heroText = document.querySelector('.hero_text');
  const heroNote = document.querySelector('.hero_note');
  const navbar = document.querySelector('.navbar');
  const revealItems = document.querySelectorAll('.reveal');

  const contentMap = {
    english: {
      title: 'A modern streaming landing page that feels premium without copying a real brand.',
      subtitle: 'Designed for portfolio showcase, frontend practice, and safer public deployment.',
      text: 'Use your existing media assets, but keep the branding, language, and interactions clearly fictional and custom.',
      note: 'This is a fictional demo project and is not affiliated with any real entertainment platform.',
      placeholder: 'Work email',
      button: 'Join Waitlist',
      success: 'Language changed to English'
    },
    hindi: {
      title: 'Ek modern streaming landing page jo premium feel deti hai bina kisi real brand ko copy kiye.',
      subtitle: 'Portfolio showcase, frontend practice, aur safer public deployment ke liye design ki gayi hai.',
      text: 'Apne existing media assets use karo, lekin branding, language aur interactions ko clearly fictional aur custom rakho.',
      note: 'Yeh ek fictional demo project hai aur iska kisi real entertainment platform se koi sambandh nahi hai.',
      placeholder: 'Work email',
      button: 'Waitlist Join Karein',
      success: 'Language changed to Hindi'
    }
  };

  const showMessage = (message, type = 'info') => {
    let messageBox = document.querySelector('.js-message-box');

    if (!messageBox) {
      messageBox = document.createElement('div');
      messageBox.className = 'js-message-box';
      document.body.appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.style.background = type === 'success'
      ? 'linear-gradient(135deg, #20c7a8, #14967d)'
      : 'linear-gradient(135deg, #7c8cff, #5f73ff)';
    messageBox.style.color = '#fff';
    messageBox.style.opacity = '1';
    messageBox.style.transform = 'translateY(0)';

    clearTimeout(messageBox.hideTimer);
    messageBox.hideTimer = setTimeout(() => {
      messageBox.style.opacity = '0';
      messageBox.style.transform = 'translateY(-10px)';
    }, 2400);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const getFormElements = () => ({
    emailInput: document.querySelector('.email'),
    getStartedButton: document.querySelector('.get_started')
  });

  const handleStart = () => {
    const { emailInput } = getFormElements();
    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (!email) {
      emailInput.style.borderColor = '#ff8a8a';
      emailInput.focus();
      showMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      emailInput.style.borderColor = '#ff8a8a';
      emailInput.focus();
      showMessage('Please enter a valid email address.');
      return;
    }

    emailInput.style.borderColor = '#20c7a8';
    showMessage(`Thanks! ${email} has been added to the demo waitlist.`, 'success');
  };

  const bindFormEvents = () => {
    const { emailInput, getStartedButton } = getFormElements();

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        emailInput.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      });

      emailInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleStart();
        }
      });
    }

    if (getStartedButton) {
      getStartedButton.addEventListener('click', handleStart);
    }
  };

  if (languageSelect && heroTitle && heroSubtitle && heroText && heroNote) {
    languageSelect.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      const selectedContent = contentMap[selectedLanguage];
      const { emailInput, getStartedButton } = getFormElements();

      if (!selectedContent) return;

      heroTitle.textContent = selectedContent.title;
      heroSubtitle.textContent = selectedContent.subtitle;
      heroText.textContent = selectedContent.text;
      heroNote.textContent = selectedContent.note;

      if (emailInput) {
        emailInput.placeholder = selectedContent.placeholder;
      }

      if (getStartedButton) {
        getStartedButton.textContent = selectedContent.button;
      }

      showMessage(selectedContent.success, 'success');
    });
  }

  bindFormEvents();

  if (signInButton) {
    signInButton.addEventListener('click', () => {
      showMessage('This is a UI demo, not a real account system.', 'success');
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
});