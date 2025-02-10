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




// Feed
document.getElementById('postButton').addEventListener('click', function() {
    const text = document.getElementById('postText').value;
    const imageInput = document.getElementById('postImage');
    const feed = document.getElementById('feed');
    
    if (text.trim() === "") {
        alert("Digite algo antes de postar!");
        return;
    }
    
    const post = document.createElement('div');
    post.classList.add('post');
    
    const profile = document.createElement('div');
    profile.classList.add('profile');
    profile.innerHTML = `<img src='user.png' alt='Perfil'><span>Usuário</span>`;
    
    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = `<p>${text}</p>`;
    
    if (imageInput.files.length > 0) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(imageInput.files[0]);
        content.appendChild(image);
    }
    
    const actions = document.createElement('div');
    actions.classList.add('actions');
    actions.innerHTML = `
        <button class='like-btn'>Curtir (0)</button>
        <button class='comment-btn'>Comentar</button>
        <button class='share-btn'>Compartilhar</button>
    `;
    
    post.appendChild(profile);
    post.appendChild(content);
    post.appendChild(actions);
    
    feed.prepend(post);
    document.getElementById('postText').value = "";
    document.getElementById('postImage').value = "";
});



const postagens = [
    {
        nome: "Camila Oliveira",
        cargo: "Empreendedora & Coach de Carreira",
        fotoPerfil: "https://randomuser.me/api/portraits/women/14.jpg",
        tempo: "2h atrás",
        texto: "Hoje finalizei um workshop incrível sobre liderança feminina! É maravilhoso ver tantas mulheres se apoiando e crescendo juntas. 💗",
        imagem: "https://img.freepik.com/psd-gratuitas/poster-do-dia-internacional-da-mulher_23-2148870186.jpg?t=st=1739058686~exp=1739062286~hmac=e871d0ce25321b71e5ace40bf2d1b8d8a8f3281831768c5e8cf8098969c6d818&w=740",
        curtidas: 128,
        comentarios: [
            { nome: "Juliana Silva", texto: "Que incrível, Camila! Muito inspirador!", fotoPerfil: "https://randomuser.me/api/portraits/women/25.jpg" },
            { nome: "Ana Costa", texto: "Liderança feminina é essencial. Parabéns pelo workshop!", fotoPerfil: "https://randomuser.me/api/portraits/women/16.jpg" }
        ]
    },
    {
        nome: "Sofia Mendes",
        cargo: "Nutricionista & Saúde Integrativa",
        fotoPerfil: "https://randomuser.me/api/portraits/women/26.jpg",
        tempo: "4h atrás",
        texto: "Cuidar da nossa saúde não é um luxo, é um ato de amor próprio! Hoje compartilho essa receita deliciosa e nutritiva para vocês. 🍓💖",
        imagem: "https://img.freepik.com/fotos-gratis/conceito-de-simbolo-de-icone-de-batimento-cardiaco-de-saude_53876-144428.jpg?t=st=1739058802~exp=1739062402~hmac=46143199833c92dc6e16cb14b0d68383db194cf6e82ad7b7b146adc2c63949c7&w=996",
        curtidas: 210,
        comentarios: [
            { nome: "Luciana Pereira", texto: "Amei essa receita, Sofia! Vou tentar fazer.", fotoPerfil: "https://randomuser.me/api/portraits/women/11.jpg" },
            { nome: "Carlos Souza", texto: "Com certeza vou incorporar na minha rotina.", fotoPerfil: "https://randomuser.me/api/portraits/men/25.jpg" }
        ]
    },
    {
        nome: "Maria Santos",
        cargo: "Psicóloga & Mentora de Autoconhecimento",
        fotoPerfil: "https://randomuser.me/api/portraits/women/37.jpg",
        tempo: "1h atrás",
        texto: "Lembre-se: você é suficiente, exatamente como é. Cada passo que damos na jornada do autoconhecimento nos fortalece! 🌿✨",
        imagem: "https://www.w3schools.com/w3images/forest.jpg",
        curtidas: 185,
        comentarios: [
            { nome: "Fernanda Lima", texto: "Palavras inspiradoras, Maria! Precisamos disso no dia a dia.", fotoPerfil: "https://randomuser.me/api/portraits/women/19.jpg" },
            { nome: "Beatriz Costa", texto: "Realmente, autoconhecimento é um caminho poderoso.", fotoPerfil: "https://randomuser.me/api/portraits/women/22.jpg" }
        ]
    }
];

const feed = document.getElementById("feed");

function carregarPostagens() {
    postagens.forEach(post => {
        let comentariosHTML = post.comentarios.map(comentario => {
            return `
                <div class="comentario m-1 mb-4">
                    <img src="${comentario.fotoPerfil}" alt="Foto de ${comentario.nome}" class="comentario-foto">
                    <div>
                        <strong>${comentario.nome}</strong>: ${comentario.texto}
                    </div>
                </div>
            `;
        }).join('');

        let postHTML = `
            <div class="post">
                <div class="post-header">
                    <img src="${post.fotoPerfil}" alt="Foto de ${post.nome}">
                    <div class="">
                        <strong>${post.nome}</strong> <br>
                        <small>${post.cargo} • ${post.tempo}</small>
                    </div>
                </div>
                <p class="p-2">${post.texto}</p>
                <div class="post-content">
                    <img src="${post.imagem}" alt="Imagem do post">
                </div>
                <div class="">
                    <span>💗 ${post.curtidas} • 💬 ${post.comentarios.length}</span>
                </div>
                <div class="comentarios">
                    ${comentariosHTML}
                </div>
            </div>
        `;
        feed.innerHTML += postHTML;
    });
}

carregarPostagens();
