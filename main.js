document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  const signInButton = document.querySelector('.sign_in_button');
  const heroTitle = document.querySelector('.hero_title');
  const heroSubtitle = document.querySelector('.hero_subtitle');
  const heroText = document.querySelector('.hero_text');
  const navbar = document.querySelector('.navbar');
  const videos = document.querySelectorAll('video');

  const contentMap = {
    english: {
      title: 'The biggest Indian hits. Ready to watch here <br> from ₹ 149.',
      subtitle: 'Join today. Cancel anytime.',
      text: 'Ready to watch? Enter your email to create or restart your membership.',
      placeholder: 'Email Address',
      button: 'Get Started >',
      success: 'Language changed to English'
    },
    hindi: {
      title: 'सबसे बड़े भारतीय हिट्स। देखने के लिए तैयार <br> सिर्फ ₹ 149 से।',
      subtitle: 'आज ही जुड़ें। कभी भी कैंसल करें।',
      text: 'देखना शुरू करने के लिए अपना ईमेल दर्ज करें और मेंबरशिप बनाएँ या फिर से शुरू करें।',
      placeholder: 'ईमेल पता',
      button: 'शुरू करें >',
      success: 'Language changed to Hindi'
    }
  };

  const showMessage = (message, type = 'error') => {
    let messageBox = document.querySelector('.js-message-box');

    if (!messageBox) {
      messageBox = document.createElement('div');
      messageBox.className = 'js-message-box';
      document.body.appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.style.backgroundColor = type === 'success' ? '#16a34a' : '#e50914';
    messageBox.style.color = '#fff';
    messageBox.style.opacity = '1';
    messageBox.style.transform = 'translateY(0)';

    clearTimeout(messageBox.hideTimer);
    messageBox.hideTimer = setTimeout(() => {
      messageBox.style.opacity = '0';
      messageBox.style.transform = 'translateY(-10px)';
    }, 2500);
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
      emailInput.style.borderColor = '#e50914';
      emailInput.focus();
      showMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      emailInput.style.borderColor = '#e50914';
      emailInput.focus();
      showMessage('Please enter a valid email address.');
      return;
    }

    emailInput.style.borderColor = '#16a34a';
    showMessage(`Welcome! ${email} is ready to get started.`, 'success');
  };

  const bindFormEvents = () => {
    const { emailInput, getStartedButton } = getFormElements();

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        emailInput.style.borderColor = '#535352';
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

  if (languageSelect && heroTitle && heroSubtitle && heroText) {
    languageSelect.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      const selectedContent = contentMap[selectedLanguage];
      const { emailInput, getStartedButton } = getFormElements();

      if (!selectedContent) return;

      heroTitle.innerHTML = selectedContent.title;
      heroSubtitle.textContent = selectedContent.subtitle;
      heroText.textContent = selectedContent.text;

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
      showMessage('Sign In page will be connected soon.', 'success');
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  videos.forEach((video) => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
  });
});