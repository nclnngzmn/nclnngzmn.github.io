document.addEventListener('DOMContentLoaded', function () {

    console.log("COMMON JS LOADED");

    /** =========================
     * aos
     ========================== */
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 1000 });
        setTimeout(() => AOS.refresh(), 500);
    }

    /** =========================
     * updating year (footer)
     ========================== */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /** =========================
     * credentials counter
     ========================== */
    const expEl = document.getElementById("experience-years");
    const coffeeEl = document.getElementById("coffee-count");
    const codeEl = document.getElementById("code-lines");

    if (expEl || coffeeEl || codeEl) {

        function formatNumber(num) {
            if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
            if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + "k";
            return num;
        }

        const startDate = new Date(2023, 10);
        const currentDate = new Date();

        // experience
        if (expEl) {
            const previousExperienceMonths = 3;
            const previousExperienceYears = previousExperienceMonths / 12;
            const diffInYears = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
            const totalExperience = diffInYears + previousExperienceYears;

            expEl.textContent =
                (Math.floor(totalExperience * 10) / 10).toFixed(1) + "+";
        }

        // coffee
        if (coffeeEl) {
            const collegeYears = 5;
            const coffeeStartDate = new Date(currentDate.getFullYear() - collegeYears, 0, 1);
            const coffeeDays = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24));

            coffeeEl.textContent = formatNumber(coffeeDays) + "+";
        }

        // code lines
        if (codeEl) {
            const collegeYears = 5;
            const coffeeStartDate = new Date(currentDate.getFullYear() - collegeYears, 0, 1);
            const weeksSinceStart = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24 * 7));
            const linesOfCode = weeksSinceStart * 5000;

            codeEl.textContent = formatNumber(linesOfCode) + "+";
        }
    }

    /** =========================
     * crafted counter
     ========================== */
    const hasStats =
        document.getElementById("no-websites") ||
        document.getElementById("no-landing") ||
        document.getElementById("no-design") ||
        document.getElementById("no-special");

    if (hasStats) {
        fetch("/projects/index.html")
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const projectItems = doc.querySelectorAll(".projects-archive .item");

                let counts = {
                    website: 0,
                    landing: 0,
                    design: 0,
                    special: 0
                };

                projectItems.forEach(item => {
                    const type = item.getAttribute("data-type");
                    if (counts[type] !== undefined) counts[type]++;
                });

                const map = {
                    "no-websites": counts.website,
                    "no-landing": counts.landing,
                    "no-design": counts.design,
                    "no-special": counts.special
                };

                Object.keys(map).forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = map[id] + "+";
                });
            })
            .catch(err => console.error("Error loading projects:", err));
    }

    /** =========================
     * video full screen
     ========================== */
    const video = document.getElementById("specialVId");

    if (video) {
        video.addEventListener("click", async () => {
            if (window.innerWidth <= 500) {
                try {
                    await (video.requestFullscreen?.() || video.webkitRequestFullscreen?.());

                    if (screen.orientation?.lock) {
                        await screen.orientation.lock("landscape");
                    }
                } catch (err) {
                    console.warn("Fullscreen/orientation not supported:", err);
                }
            } else {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    video.requestFullscreen?.();
                }
            }
        });
    }

    /** =========================
     * project filter buttons
     ========================== */
    const buttons = document.querySelectorAll(".projects-category .item");
    const items = document.querySelectorAll(".projects-archive .item");

    if (buttons.length && items.length) {
        console.log("FILTER RUNNING");

        function filterItems(category) {
            items.forEach(item => {
                const type = item.getAttribute("data-type");
                item.style.display =
                    (category === "all" || type === category) ? "block" : "none";
            });
        }

        buttons.forEach(btn => {
            btn.addEventListener("click", function () {
                buttons.forEach(b => b.classList.remove("active"));
                this.classList.add("active");

                filterItems(this.getAttribute("data-type"));
            });
        });

        filterItems("all");
    }

});

/** =========================
 * view more toggle
 ========================== */
document.querySelectorAll('.btn-more').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.nextElementSibling;
        if (!details) return;

        details.classList.toggle('active');

        const icon = button.querySelector('i');
        const text = button.querySelector('p');

        icon?.classList.toggle('rotate');
        if (text) {
            text.textContent =
                details.classList.contains('active') ? 'See Less' : 'See More';
        }
    });
});


/** =========================
 * scroll on top
 ========================== */
document.querySelector('.btn-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});