document.addEventListener('DOMContentLoaded', () => {
    // Main Navigation Menu Handler
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
        menuBtn.querySelector('i').classList.toggle('fa-times');
      });
    }
  
    // App Preview Sidebar Menu Handler
    const menuItems = document.querySelectorAll('.menu-items .menu-item');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    // Handle menu item clicks in the app preview
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remove active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
      });
    });
  
    // Mobile sidebar toggle
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        // Toggle button icon
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      });
    }
  
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar && sidebar.classList.contains('active') &&
          !sidebar.contains(e.target) &&
          !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
        if (mobileMenuBtn) {
          mobileMenuBtn.querySelector('i').classList.add('fa-bars');
          mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
      }
    });
  
    // Handle smooth scrolling for main navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          navLinks.classList.remove('active');
        }
      });
    });
  });

    // Form submission handler
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    if (form && result) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = "Form submitted successfully";
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(function() {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 3000);
        });
      });
    }
  