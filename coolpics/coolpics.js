document.addEventListener("DOMContentLoaded", function(){
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    function handleResize(){
        if (window.innerWidth > 1000){
            menu.classList.remove("hide");
        } else {
            menu.classList.add("hide");
        }
    }

    menu.classList.add("hide");

    menuButton.addEventListener("click", function(){
        menu.classList.toggle("hide");
    });

    window.addEventListener("resize", handleResize);
    handleResize();

    function viewerTemplate(pic, alt) {
        return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${pic}" alt="${alt}">
        </div>`;
    }

    const gallery = document.querySelector(".gallery");

    function viewHandler(event) {
        if (event.target.tagName === "IMG") {
            const imgSrcParts = event.target.src.split("-");
            const fullImageSrc = imgSrcParts[0] + "-full.jpeg";
            const altText = event.target.alt;

            document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImageSrc, altText));

            document.querySelector(".close-viewer").addEventListener("click", closeViewer);
        }
    }

    function closeViewer() {
        document.querySelector(".viewer").remove();
    }

    gallery.addEventListener("click", viewHandler);
});