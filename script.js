document.addEventListener('DOMContentLoaded', () => {
    hireBtn.addEventListener('click', () => {
    const email = 'kumarnikhil4963@gmail.com';
    const subject = encodeURIComponent('Hiring Inquiry from Portfolio Website');
    const mailtoLink = `mailto:${email}?subject=${subject}`;
    window.open(mailtoLink, '_blank');
    });

    

    const navLinks = document.querySelectorAll('.navlist li a');
    const sections = document.querySelectorAll('section, .portfolio-container');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    });
});
