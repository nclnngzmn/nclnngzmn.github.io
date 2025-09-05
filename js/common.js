document.addEventListener('DOMContentLoaded', function () {
    // aos scroll animation
    AOS.init({ duration: 1000 });
    setTimeout(() => AOS.refresh(), 500);

    // closing nav on click
    const navLinks = document.querySelectorAll('.nav a');
    const menuToggle = document.getElementById('menuToggle');
    navLinks.forEach(link => link.addEventListener('click', () => (menuToggle.checked = false)));

    // details
    const startDate = new Date(2023, 10); // november 2023 (month is 0-based)
    const currentDate = new Date();
    const previousExperienceMonths = 3;
    const previousExperienceYears = previousExperienceMonths / 12;
    const diffInYears = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
    const totalExperience = diffInYears + previousExperienceYears;
    document.getElementById("experience-years").textContent = (Math.floor(totalExperience * 10) / 10).toFixed(1) + "+";

    // coffee counter
    const collegeYears = 5;
    const coffeeStartDate = new Date(currentDate.getFullYear() - collegeYears, 0, 1);
    const coffeeDays = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24));
    document.getElementById("coffee-count").textContent = formatNumber(coffeeDays);

    // code lines counter
    const weeksSinceStart = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24 * 7));
    const linesOfCode = weeksSinceStart * 5000;
    document.getElementById("code-lines").textContent = formatNumber(linesOfCode);

    // formatting large number
    function formatNumber(num) {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + "k";
        return num;
    }

    // project counter
    const projectItems = document.querySelectorAll(".sec03__item");
    const websiteCounter = document.getElementById("no-websites");
    const landingCounter = document.getElementById("no-landing");
    const personalCounter = document.getElementById("no-personal");
    const designCounter = document.getElementById("no-design");

    let websiteCount = 0;
    let landingCount = 0;
    let personalCount = 0;
    let designCount = 0;

    projectItems.forEach(item => {
        const type = item.getAttribute("data-type");
        if (type === "website") {
            websiteCount++;
        } else if (type === "landing") {
            landingCount++;
        } else if (type === "personal") {
            personalCount++;
        } else if (type === "design") {
            designCount++;
        }
    });

    if (websiteCounter) {
        websiteCounter.textContent = websiteCount + "+";
    }

    if (landingCounter) {
        landingCounter.textContent = landingCount + "+";
    }

    if (personalCounter) {
        personalCounter.textContent = personalCount + "+";
    }
    if (designCounter) {
        personalCounter.textContent = designCount + "+";
    }

    // see more toggle
    $(function () {
        $(".btn-toggle").click(function () {
            const $this = $(this);
            $this.closest('.sec02__layout-item').find(".item-hidden").slideToggle();
            $this.toggleClass('less');
            $this.html($this.hasClass('less') 
                ? 'See Less <i class="fas fa-chevron-up"></i>' 
                : 'See More <i class="fas fa-chevron-down"></i>'
            );
        });
    });

    // pagination
    const dataList = document.querySelector(".sec03__layout");
    const pagination = document.getElementById("pagination");
    const itemsPerPage = 6;
    const dataItems = document.querySelectorAll(".sec03__item");
    const data = Array.from(dataItems).map(item => item.outerHTML);
    let currentPage = 1;

    function displayData(page) {
        dataList.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const pageData = data.slice(start, start + itemsPerPage);
        pageData.forEach(itemHTML => {
            const li = document.createElement("li");
            li.innerHTML = itemHTML;
            dataList.appendChild(li);
        });
    }

    function createPaginationButtons() {
        const totalPages = Math.ceil(data.length / itemsPerPage);

        const prevButton = createNavButton('<i class="fa-solid fa-arrow-left"></i>', () => {
            if (currentPage > 1) {
                currentPage--;
                displayData(currentPage);
                updatePagination();
            }
        });

        const nextButton = createNavButton('<i class="fa-solid fa-arrow-right"></i>', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayData(currentPage);
                updatePagination();
            }
        });

        pagination.appendChild(prevButton);
        pagination.appendChild(nextButton);

        function updatePagination() {
            pagination.querySelectorAll(".page-link:not(:first-child):not(:last-child)").forEach(el => el.remove());

            if (currentPage > 2) pagination.insertBefore(createPageButton(1), nextButton);
            if (currentPage > 3) pagination.insertBefore(createDots(), nextButton);

            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPages, currentPage + 1);
            for (let i = start; i <= end; i++) {
                pagination.insertBefore(createPageButton(i), nextButton);
            }

            if (currentPage < totalPages - 2) pagination.insertBefore(createDots(), nextButton);
            if (currentPage < totalPages - 1) pagination.insertBefore(createPageButton(totalPages), nextButton);

            prevButton.style.display = currentPage === 1 ? "none" : "inline-block";
            nextButton.style.display = currentPage === totalPages ? "none" : "inline-block";
        }

        function createPageButton(page) {
            const btn = createNavButton(page, () => {
                currentPage = page;
                displayData(currentPage);
                updatePagination();
            });
            if (page === currentPage) btn.classList.add("active");
            return btn;
        }

        function createNavButton(innerHTML, onClick) {
            const a = document.createElement("a");
            a.href = "javascript:void(0)";
            a.innerHTML = innerHTML;
            a.className = "page-link";
            a.addEventListener("click", onClick);
            return a;
        }

        function createDots() {
            const span = document.createElement("span");
            span.textContent = "...";
            span.className = "page-link";
            span.style.cursor = "default";
            return span;
        }

        updatePagination();
    }

    createPaginationButtons();
    displayData(currentPage);

    // certificates
    const certificates = document.querySelectorAll(".certificate");
    const previewBox = document.querySelector(".preview-box");
    const previewImage = document.querySelector(".preview-image");
    const previewDescription = document.querySelector(".preview-description");
    const closeButton = document.querySelector(".close-preview");
    const overlay = document.querySelector(".preview-overlay");
    const filterItems = document.querySelectorAll(".certificates-category .item");

    function openModal(imgSrc, description) {
        previewImage.src = imgSrc;
        previewDescription.textContent = description;
        previewBox.style.display = "block";
        overlay.style.display = "block";
    }

    function closeModal() {
        previewBox.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    certificates.forEach(cert => {
        cert.addEventListener("click", () => {
            const imgSrc = cert.querySelector("img").src;
            const desc = cert.querySelector(".description").textContent;
            openModal(imgSrc, desc);
        });
    });

    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", e => {
        if (!previewBox.contains(e.target)) closeModal();
    });

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            filterItems.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedCategory = this.getAttribute("data-name");

            certificates.forEach(cert => {
                const certCategory = cert.getAttribute("data-name");
                cert.style.display = (selectedCategory === "all" || selectedCategory === certCategory) ? "block" : "none";
            });
        });
    });
});
