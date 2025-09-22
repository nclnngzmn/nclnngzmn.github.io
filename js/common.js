document.addEventListener('DOMContentLoaded', function () {
    // aos scroll animation
    AOS.init({ duration: 1000 });
    setTimeout(() => AOS.refresh(), 500);

    /** =========================
     *  hero stats
     ========================== */
    // formatting large numbers
    function formatNumber(num) {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + "k";
        return num;
    }

    // experience
    const startDate = new Date(2023, 10); // November 2023 (month is 0-based)
    const currentDate = new Date();
    const previousExperienceMonths = 3;
    const previousExperienceYears = previousExperienceMonths / 12;
    const diffInYears = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
    const totalExperience = diffInYears + previousExperienceYears;
    document.getElementById("experience-years").textContent =
        (Math.floor(totalExperience * 10) / 10).toFixed(1) + "+";

    // coffee counter
    const collegeYears = 5;
    const coffeeStartDate = new Date(currentDate.getFullYear() - collegeYears, 0, 1);
    const coffeeDays = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24));
    document.getElementById("coffee-count").textContent =
        formatNumber(coffeeDays) + "+";

    // code lines counter
    const weeksSinceStart = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24 * 7));
    const linesOfCode = weeksSinceStart * 5000;
    document.getElementById("code-lines").textContent =
        formatNumber(linesOfCode) + "+";

    /** =========================
     *  crafted stats
     ========================== */

    // fetch projects.html and parse project stats
    fetch("/projects/index.html")
    .then(response => response.text())
    .then(html => {
        // create a temporary DOM to parse
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // select all project items from projects.html
        const projectItems = doc.querySelectorAll(".projects-archive .item");

        let websiteCount = 0;
        let landingCount = 0;
        let designCount = 0;
        let specialCount = 0;

        projectItems.forEach(item => {
            const type = item.getAttribute("data-type");
            if (type === "website") websiteCount++;
            else if (type === "landing") landingCount++;
            else if (type === "design") designCount++;
            else if (type === "special") specialCount++;
        });

        // update counters on index.html
        const websiteCounter = document.getElementById("no-websites");
        const landingCounter = document.getElementById("no-landing");
        const designCounter = document.getElementById("no-design");
        const specialCounter = document.getElementById("no-special");

        if (websiteCounter) websiteCounter.textContent = websiteCount + "+";
        if (landingCounter) landingCounter.textContent = landingCount + "+";
        if (designCounter) designCounter.textContent = designCount + "+";
        if (specialCounter) specialCounter.textContent = specialCount + "+";
    })
    .catch(err => console.error("Error loading projects:", err));

    /** =========================
     *  playing video in special projects in full screen
     ========================== */
    const video = document.getElementById("specialVId");

    video.addEventListener("click", async () => {
        if (window.innerWidth <= 500) {
        try {
            if (video.requestFullscreen) {
                await video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { 
                await video.webkitRequestFullscreen();
            }

            if (screen.orientation && screen.orientation.lock) {
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
});

/** =========================
 *  view all button
 ========================== */
document.querySelectorAll('.btn-more').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.nextElementSibling; 
        details.classList.toggle('active');

        const icon = button.querySelector('i');
        icon.classList.toggle('rotate');

        const text = button.querySelector('p');
        text.textContent = details.classList.contains('active') ? 'See Less' : 'See More';
    });
});

/** =========================
 *  top button
 ========================== */
document.querySelector('.btn-top')?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
