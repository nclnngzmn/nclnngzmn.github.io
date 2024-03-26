//for burger menu
document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLayout = document.querySelector('.nav__layout');

    burgerMenu.addEventListener('click', function () {
        navLayout.classList.toggle('show-nav');
        burgerMenu.classList.toggle('close');

        document.querySelectorAll('.burger-icon .bar').forEach(function (bar) {
            bar.classList.toggle('active');
        });
    });

    navLayout.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            navLayout.classList.remove('show-nav');
            burgerMenu.classList.remove('close');

            document.querySelectorAll('.burger-icon .bar').forEach(function (bar) {
                bar.classList.remove('active');
            });
        });
    });

    document.addEventListener('click', function (event) {
        if (!navLayout.contains(event.target) && event.target !== burgerMenu) {
            navLayout.classList.remove('show-nav');
            burgerMenu.classList.remove('close');

            document.querySelectorAll('.burger-icon .bar').forEach(function (bar) {
                bar.classList.remove('active');
            });
        }
    });

    function adjustNavLayout() {
        if (window.innerWidth > 1600) {
            navLayout.classList.add('show-nav');
            burgerMenu.classList.remove('close');
        } else {
            navLayout.classList.remove('show-nav');
            burgerMenu.classList.remove('close');

            document.querySelectorAll('.burger-icon .bar').forEach(function (bar) {
                bar.classList.remove('active');
            });
        }
    }

    window.addEventListener('load', adjustNavLayout);
    window.addEventListener('resize', adjustNavLayout);
});


//for see more button
$(document).ready(function(){
    $(".btn-toggle").click(function(){
        $(this).closest('.index-sec02__layout-item').find(".item-hidden").slideToggle();
        $(this).toggleClass('less');
        if ($(this).hasClass('less')) {
            $(this).html('See Less <i class="fas fa-chevron-up"></i>');
        } else {
            $(this).html('See More <i class="fas fa-chevron-down"></i>');
        }
    });
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

    certificates.addEventListener("click", (event) => {
        if (event.target.classList.contains("item")) {
            document.querySelectorAll(".item").forEach((item) => {
                item.classList.remove("active");
            });

            event.target.classList.add("active");

            const filter = event.target.getAttribute("data-name");

            images.forEach((image, index) => {
                const imageFilter = image.parentElement.getAttribute("data-name");
                if (filter === "all" || filter === imageFilter) {
                    image.parentElement.style.display = "block";
                } else {
                    image.parentElement.style.display = "none";
                }
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
        });
    });

    closeButton.addEventListener("click", () => {
        previewBox.style.display = "none";
    });
});

  

