// =============================================
//  DRILLS PORTFOLIO — script.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------
  //  MOBILE MENU TOGGLE
  // ------------------------------------------
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');



  window.addEventListener('scroll', () => {
    navLinks.classList.remove('active'); // close menu on scroll
    // ... rest of your scroll code
});
  
  const menuToggle = document.querySelector('.menu-toggle');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });


  // ------------------------------------------
  // 2. ACTIVE NAV LINK ON SCROLL
  // ------------------------------------------
  const sections = document.querySelectorAll('section[id], header[id], div[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  };

  window.addEventListener('scroll', highlightNav);


  // ------------------------------------------
  // 3. SKILL BARS ANIMATE ON SCROLL
  // ------------------------------------------
  const skillLevels = document.querySelectorAll('.skill-level');

  // Store original widths, then reset to 0
  skillLevels.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = '0%';
  });

  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillLevels.forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        observer.disconnect(); // Only animate once
      }
    });
  };

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(animateSkills, {
      threshold: 0.3,
    });
    skillsObserver.observe(skillsSection);
  }


  // ------------------------------------------
  // 4. CV DOWNLOAD BUTTON
  // ------------------------------------------
  const cvButton = document.querySelector('.cv-button');
  if (cvButton) {
    cvButton.addEventListener('click', () => {
      // Change 'drills-cv.pdf' to your actual CV file name
      const link = document.createElement('a');
      link.href = 'Drills_CV.pdf';
      link.download = 'Drills_CV.pdf';
      link.click();
    });
  }




 


  // ------------------------------------------
  // 5. PROJECT CARDS — FADE IN ON SCROLL
  // ------------------------------------------
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const revealCards = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 150);
        revealCards.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => revealCards.observe(card));


  // ------------------------------------------
  // 6. CONTACT FORM — BASIC FEEDBACK
  // ------------------------------------------
  const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const res = await fetch('https://formspree.io/f/xqewglyz', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.innerHTML = `
          <div style="text-align:center; padding:30px 0;">
            <h3 style="color:green; margin-bottom:10px;">✅ Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
          </div>
        `;
      } else {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Network error. Please try again.');
    }
  });
}
  // ------------------------------------------
  // 7. NAVBAR — SHRINK ON SCROLL
  // ------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.padding = '8px 30px';
      nav.style.transition = 'padding 0.3s ease';
    } else {
      nav.style.padding = '15px 30px';
    }
  });

});

document.getElementById("year").textContent = new Date().getFullYear();