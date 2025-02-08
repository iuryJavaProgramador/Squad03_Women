document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const menuIcon = menuButton.querySelector("i");
    const sidebar = document.getElementById("sidebarMenu");

    menuButton.addEventListener("click", function () {
        if (sidebar.classList.contains("show")) {
            menuIcon.classList.remove("fa-times"); 
            menuIcon.classList.add("fa-bars"); 
        } else {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
        }
    });

    sidebar.addEventListener("shown.bs.collapse", function () {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
    });

    sidebar.addEventListener("hidden.bs.collapse", function () {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
    });


    // Click menu dropdown
    document.querySelectorAll(".submenu-toggle").forEach(function (el) {
        el.addEventListener("click", function (event) {
            event.stopPropagation();
            let submenu = this.nextElementSibling;
            let isOpen = submenu.classList.contains("show");

            document.querySelectorAll(".collapse").forEach(c => c.classList.remove("show"));

            if (!isOpen) {
                submenu.classList.add("show");
            }
        });
    });

});



async function carregarFormulario(url, seletorDestino) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Erro ao carregar o formulário.");
        }

        const html = await resposta.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const formulario = doc.querySelector("form");

        if (formulario) {
            document.querySelector(seletorDestino).innerHTML = formulario.outerHTML;
        } else {
            console.error("Nenhum formulário encontrado na página.");
        }
    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}

carregarFormulario("outra_pagina.html", "#login.html");


