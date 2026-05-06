document.addEventListener('DOMContentLoaded', () => {

    // console.log('COMMON JS LOADED');

    /* ============================================================
       AOS — scroll animations
       ============================================================ */
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000 });
        setTimeout(() => AOS.refresh(), 500);
    }

    /* ============================================================
       Footer — auto-update year
       ============================================================ */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ============================================================
       Credentials counter (experience / coffee / code lines)
       ============================================================ */
    const expEl    = document.getElementById('experience-years');
    const coffeeEl = document.getElementById('coffee-count');
    const codeEl   = document.getElementById('code-lines');

    if (expEl || coffeeEl || codeEl) {

        const formatNumber = (num) => {
            if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
            if (num >= 1_000)     return (num / 1_000    ).toFixed(1).replace(/\.0$/, '') + 'k';
            return String(num);
        };

        const now       = new Date();
        const startDate = new Date(2023, 10); // November 2023

        if (expEl) {
            const prevMonths  = 3;
            const diffYears   = (now - startDate) / (1000 * 60 * 60 * 24 * 365.25);
            const totalYears  = diffYears + prevMonths / 12;
            expEl.textContent = (Math.floor(totalYears * 10) / 10).toFixed(1) + '+';
        }

        if (coffeeEl || codeEl) {
            const collegeStart = new Date(now.getFullYear() - 5, 0, 1);
            const daysSince    = Math.floor((now - collegeStart) / (1000 * 60 * 60 * 24));

            if (coffeeEl) {
                coffeeEl.textContent = formatNumber(daysSince) + '+';
            }
            if (codeEl) {
                const weeks = Math.floor(daysSince / 7);
                codeEl.textContent = formatNumber(weeks * 5000) + '+';
            }
        }
    }

    /* ============================================================
       Crafted stats counter (fetches project counts from archive)
       ============================================================ */
    const statIds = ['no-websites', 'no-landing', 'no-design', 'no-special'];
    const hasStats = statIds.some(id => document.getElementById(id));

    if (hasStats) {
        fetch('/projects/index.html')
            .then(res => res.text())
            .then(html => {
                const doc   = new DOMParser().parseFromString(html, 'text/html');
                const items = doc.querySelectorAll('.projects-archive .item');

                const counts = { website: 0, landing: 0, design: 0, special: 0 };
                items.forEach(item => {
                    const type = item.getAttribute('data-type');
                    if (type in counts) counts[type]++;
                });

                const idMap = {
                    'no-websites': counts.website,
                    'no-landing':  counts.landing,
                    'no-design':   counts.design,
                    'no-special':  counts.special,
                };

                for (const [id, value] of Object.entries(idMap)) {
                    const el = document.getElementById(id);
                    if (el) el.textContent = value + '+';
                }
            })
            .catch(err => console.error('Error loading projects:', err));
    }

    /* ============================================================
       Video — fullscreen on click (with landscape lock on mobile)
       ============================================================ */
    const video = document.getElementById('specialVId');

    if (video) {
        video.addEventListener('click', async () => {
            try {
                if (window.innerWidth <= 500) {
                    await (video.requestFullscreen?.() ?? video.webkitRequestFullscreen?.());
                    await screen.orientation?.lock?.('landscape');
                } else {
                    document.fullscreenElement
                        ? document.exitFullscreen()
                        : video.requestFullscreen?.();
                }
            } catch (err) {
                console.warn('Fullscreen/orientation not supported:', err);
            }
        });
    }

    /* ============================================================
       Project filter buttons
       ============================================================ */
    const filterBtns  = document.querySelectorAll('.projects-category .item');
    const projectItems = document.querySelectorAll('.projects-archive .item');

    if (filterBtns.length && projectItems.length) {
        console.log('FILTER RUNNING');

        const filterItems = (category) => {
            projectItems.forEach(item => {
                item.style.display =
                    (category === 'all' || item.getAttribute('data-type') === category)
                        ? 'block'
                        : 'none';
            });
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterItems(this.getAttribute('data-type'));
            });
        });

        filterItems('all'); // show all on load
    }

}); // end DOMContentLoaded

/* ============================================================
   "See More / See Less" toggle
   ============================================================ */
document.querySelectorAll('.btn-more').forEach(btn => {
    btn.addEventListener('click', () => {
        const details = btn.nextElementSibling;
        if (!details) return;

        const isOpen = details.classList.toggle('active');

        btn.querySelector('i')?.classList.toggle('rotate', isOpen);

        const text = btn.querySelector('p');
        if (text) text.textContent = isOpen ? 'See Less' : 'See More';
    });
});

/* ============================================================
   Scroll-to-top button
   ============================================================ */
document.querySelector('.btn-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
