document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burger-menu");
    const navList = document.querySelector(".header-liste");

    burgerMenu.addEventListener("click", () => {
        navList.classList.toggle("active");
    });

    const contactLink = document.querySelector('.header-liste a[href="#contact"]');

    if (contactLink) {
        contactLink.addEventListener("click", () => {
            navList.classList.remove("active");
        });
    }
});
