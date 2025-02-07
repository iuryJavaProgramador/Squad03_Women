document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const menuIcon = document.getElementById("menu-icon");

    menuButton.addEventListener("click", function () {
        if (menuIcon.classList.contains("fa-bars")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
        } else {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        }
    });
});



async function carregarFormulario(url, seletorDestino) {
    try {
        // Faz a requisição para obter o formulário da outra página
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Erro ao carregar o formulário.");
        }

        // Converte a resposta para texto HTML
        const html = await resposta.text();

        // Cria um elemento temporário para manipular o HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Busca o formulário na página carregada
        const formulario = doc.querySelector("form");

        if (formulario) {
            // Insere o formulário no seletor de destino
            document.querySelector(seletorDestino).innerHTML = formulario.outerHTML;
        } else {
            console.error("Nenhum formulário encontrado na página.");
        }
    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}

// Exemplo de uso
carregarFormulario("outra_pagina.html", "#cadastro.html");
