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