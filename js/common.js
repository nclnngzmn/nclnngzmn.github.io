//for scroll effect
AOS.init();
// document.addEventListener("DOMContentLoaded", function () {
//     const scrollElements = document.querySelectorAll('.scroll');

//     const observer = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('active');
//         } else {
//           entry.target.classList.remove('active');
//         }
//       });
//     }, { threshold: 0.1 }); 
  
//     scrollElements.forEach(element => observer.observe(element));
// });

//closing nav
const navLinks = document.querySelectorAll('.nav a');
const menuToggle = document.getElementById('menuToggle');

 navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});

//details
document.addEventListener("DOMContentLoaded", function() {
    // Experience Calculation
    const startYear = 2023; //year work started
    const startMonth = 11; //november
    const previousExperienceMonths = 3; //3 months before work

    const startDate = new Date(startYear, startMonth - 1);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - startDate;
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    const previousExperienceYears = previousExperienceMonths / 12;
    const totalExperience = diffInYears + previousExperienceYears;

    document.getElementById("experience-years").textContent = 
        (Math.floor(totalExperience * 10) / 10).toFixed(1) + "+";

    //coffee
    const collegeYears = 5;
    const coffeeStartYear = currentDate.getFullYear() - collegeYears; 
    const coffeeStartDate = new Date(coffeeStartYear, 0, 1); 

    const coffeeDays = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24));
    const coffeeCount = coffeeDays; 

    document.getElementById("coffee-count").textContent = formatNumber(coffeeCount);

    //code lines
    const weeksSinceStart = Math.floor((currentDate - coffeeStartDate) / (1000 * 60 * 60 * 24 * 7));
    const linesOfCode = weeksSinceStart * 5000; 

    document.getElementById("code-lines").textContent = formatNumber(linesOfCode);

    //for shorthand
    function formatNumber(num) {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M"; 
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(/\.0$/, '') + "k"; 
        } else {
            return num; 
        }
    }

});

//for see more button
$(document).ready(function(){
    $(".btn-toggle").click(function(){
        $(this).closest('.sec02__layout-item').find(".item-hidden").slideToggle();
        $(this).toggleClass('less');
        if ($(this).hasClass('less')) {
            $(this).html('See Less <i class="fas fa-chevron-up"></i>');
        } else {
            $(this).html('See More <i class="fas fa-chevron-down"></i>');
        }
    });
});

//for pagination
document.addEventListener("DOMContentLoaded", function () {
    const dataList = document.querySelector(".sec03__layout");
    const pagination = document.getElementById("pagination");

    const itemsPerPage = 6;
    const dataItems = document.querySelectorAll(".sec03__item");
    const data = Array.from(dataItems).map(item => item.outerHTML);

    let currentPage = 1;

    function displayData(page) {
        dataList.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        pageData.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = item;
            dataList.appendChild(li);
        });
    }

    function createPaginationButtons() {
        const totalPages = Math.ceil(data.length / itemsPerPage);

        const prevButton = document.createElement("a");
        prevButton.href = "#sec03__layout";
        prevButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        prevButton.classList.add("page-link");
        prevButton.addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                displayData(currentPage);
                updatePagination();
            }
        });
        pagination.appendChild(prevButton);

        const nextButton = document.createElement("a");
        nextButton.href = "#sec03__layout";
        nextButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
        nextButton.classList.add("page-link");
        nextButton.addEventListener("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                displayData(currentPage);
                updatePagination();
            }
        });
        pagination.appendChild(nextButton);

        function updatePagination() {
            const oldPages = pagination.querySelectorAll(".page-link:not(:first-child):not(:last-child)");
            oldPages.forEach(btn => btn.remove());

            if (currentPage > 2) {
                const firstPage = createPageButton(1);
                pagination.insertBefore(firstPage, nextButton);
            }

            if (currentPage > 3) {
                const dots = document.createElement("span");
                dots.textContent = "...";
                dots.classList.add("page-link");
                dots.style.cursor = "default";
                pagination.insertBefore(dots, nextButton);
            }

            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPages, currentPage + 1);

            for (let i = start; i <= end; i++) {
                const btn = createPageButton(i);
                pagination.insertBefore(btn, nextButton);
            }

            if (currentPage < totalPages - 2) {
                const dots = document.createElement("span");
                dots.textContent = "...";
                dots.classList.add("page-link");
                dots.style.cursor = "default";
                pagination.insertBefore(dots, nextButton);
            }

            if (currentPage < totalPages - 1) {
                const lastPage = createPageButton(totalPages);
                pagination.insertBefore(lastPage, nextButton);
            }

            prevButton.style.display = currentPage === 1 ? "none" : "inline-block";
            nextButton.style.display = currentPage === totalPages ? "none" : "inline-block";
        }

        function createPageButton(page) {
            const button = document.createElement("a");
            button.href = "#sec03__layout";
            button.textContent = page;
            button.classList.add("page-link");
            if (page === currentPage) button.classList.add("active");
            button.addEventListener("click", function () {
                currentPage = page;
                displayData(currentPage);
                updatePagination();
            });
            return button;
        }

        updatePagination(); 
    }

    createPaginationButtons();
    displayData(currentPage);
});


//for filtering certificates categories
document.addEventListener("DOMContentLoaded", function () {
    const certificates = document.querySelector(".certificates-category");
    const images = document.querySelectorAll(".certificate .image-container");
    const descriptions = document.querySelectorAll(".certificate .description-container");
    const previewBox = document.querySelector(".preview-box");
    const previewImage = document.querySelector(".preview-image");
    const previewDescription = document.querySelector(".preview-description");
    const closeButton = document.querySelector(".close-preview");

    const overlay = document.createElement("div");
    overlay.classList.add("preview-overlay");
    document.body.appendChild(overlay);

    function closeModal() {
        previewBox.style.display = "none";
        overlay.style.display = "none";
    }

    certificates.addEventListener("click", (event) => {
        if (event.target.classList.contains("item")) {
            document.querySelectorAll(".item").forEach((item) => {
                item.classList.remove("active");
            });

            event.target.classList.add("active");
            const filter = event.target.getAttribute("data-name");

            images.forEach((image, index) => {
                const imageFilter = image.parentElement.getAttribute("data-name");
                image.parentElement.style.display = (filter === "all" || filter === imageFilter) ? "block" : "none";
            });
        }
    });

    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            const imgSrc = image.querySelector("img").src;
            const description = descriptions[index].querySelector(".description").textContent;
            previewImage.src = imgSrc;
            previewDescription.textContent = description;
            previewBox.style.display = "block";
            overlay.style.display = "block";
        });
    });

    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
});

