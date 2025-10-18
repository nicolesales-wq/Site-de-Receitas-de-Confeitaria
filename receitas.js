window.addEventListener('load', () => {
    setTimeout(() => {
        const hours = new Date().getHours();
        let greeting = '';
        
        if (hours < 12) greeting = 'Bom dia! ☀️';
        else if (hours < 18) greeting = 'Boa tarde! 🌤️';
        else greeting = 'Boa noite! 🌙';
        
        alert(`${greeting}\n\nBem-vindo ao nosso catálogo de receitas!\n\nAqui você encontra as melhores sobremesas brasileiras.\n\nDica: Explore nossos filtros para encontrar a receita perfeita!`);
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.page-hero-section');
    
    
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        margin-top: 25px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    `;
    
    const searchWrapper = document.createElement('div');
    searchWrapper.style.cssText = `
        position: relative;
        display: flex;
        align-items: center;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-recipes';
    searchInput.placeholder = '🔍 Pesquisar receitas...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 15px 50px 15px 20px;
        border: 2px solid #f06292;
        border-radius: 50px;
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
        outline: none;
        transition: all 0.3s ease;
        background: white;
    `;
    
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search';
    searchIcon.style.cssText = `
        position: absolute;
        right: 20px;
        color: #f06292;
        font-size: 1.2rem;
        pointer-events: none;
    `;
    
    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(searchIcon);
    searchContainer.appendChild(searchWrapper);
    heroSection.appendChild(searchContainer);
    
    
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const recipeCards = document.querySelectorAll('.recipe-card');
        let foundCount = 0;
        
        recipeCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const tags = card.querySelector('.tags-list')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        
        updateSearchResults(searchTerm, foundCount);
    });
    
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.boxShadow = '0 0 0 4px rgba(240, 98, 146, 0.2)';
        searchInput.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.boxShadow = 'none';
        searchInput.style.transform = 'scale(1)';
    });
});


function updateSearchResults(term, count) {
    const existingMsg = document.getElementById('search-results-msg');
    if (existingMsg) existingMsg.remove();
    
    if (term.length > 0) {
        const resultsMsg = document.createElement('div');
        resultsMsg.id = 'search-results-msg';
        resultsMsg.style.cssText = `
            text-align: center;
            padding: 15px;
            margin: 20px 0;
            background: ${count > 0 ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
            border-radius: 10px;
            color: ${count > 0 ? '#28a745' : '#dc3545'};
            font-weight: 600;
        `;
        resultsMsg.innerHTML = count > 0 
            ? `<i class="fas fa-check-circle"></i> ${count} receita(s) encontrada(s) para "${term}"`
            : `<i class="fas fa-times-circle"></i> Nenhuma receita encontrada para "${term}"`;
        
        document.querySelector('.all-recipes-section').insertBefore(
            resultsMsg, 
            document.querySelector('.recipe-grid')
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.page-hero-section');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    const counter = document.createElement('div');
    counter.id = 'recipe-counter';
    counter.style.cssText = `
        background: linear-gradient(135deg, #f06292, #ff92b4);
        padding: 12px 25px;
        border-radius: 50px;
        margin-top: 15px;
        display: inline-block;
        font-size: 1rem;
        font-weight: 700;
        color: white;
        box-shadow: 0 4px 15px rgba(240, 98, 146, 0.3);
        animation: pulse 2s infinite;
    `;
    
    
    let count = 0;
    const target = recipeCards.length;
    const increment = Math.ceil(target / 50);
    
    const countInterval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(countInterval);
        }
        counter.innerHTML = `<i class="fas fa-utensils"></i> ${count} receitas disponíveis`;
    }, 30);
    
    heroSection.appendChild(counter);
});

document.addEventListener('DOMContentLoaded', () => {
    const allRecipesSection = document.querySelector('.all-recipes-section');
    const recipeGrid = document.querySelector('.recipe-grid');
    
    const filterBar = document.createElement('div');
    filterBar.id = 'filter-bar';
    filterBar.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        padding: 25px;
        background: linear-gradient(135deg, rgba(255, 224, 178, 0.4), rgba(252, 246, 249, 0.6));
        border-radius: 15px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    `;
    
    const filterLabel = document.createElement('span');
    filterLabel.textContent = 'Filtrar por:';
    filterLabel.style.cssText = `
        font-weight: 700;
        color: #333;
        margin-right: 10px;
        font-size: 1.1rem;
    `;
    filterBar.appendChild(filterLabel);
    
    const filters = ['Todas', 'Rápida', 'Chocolate', 'Tortas', 'Bolos', 'Sem Glúten'];
    
    filters.forEach((filter, index) => {
        const btn = document.createElement('button');
        btn.textContent = filter;
        btn.className = 'filter-btn';
        btn.dataset.filter = filter;
        btn.style.cssText = `
            padding: 10px 22px;
            border: 2px solid #f06292;
            background: ${filter === 'Todas' ? '#f06292' : 'white'};
            color: ${filter === 'Todas' ? 'white' : '#f06292'};
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-family: 'Inter', sans-serif;
        `;
        
        btn.addEventListener('click', () => {
            
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.style.background = 'white';
                b.style.color = '#f06292';
                b.style.transform = 'scale(1)';
            });
            
            btn.style.background = '#f06292';
            btn.style.color = 'white';
            btn.style.transform = 'scale(1.05)';
            
            filterRecipes(filter);
            showToast(`Filtro aplicado: ${filter}`);
        });
        
        btn.addEventListener('mouseover', () => {
            if (btn.style.background !== 'rgb(240, 98, 146)') {
                btn.style.background = 'rgba(240, 98, 146, 0.15)';
                btn.style.transform = 'translateY(-3px)';
                btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }
        });
        
        btn.addEventListener('mouseout', () => {
            if (btn.style.background !== 'rgb(240, 98, 146)') {
                btn.style.background = 'white';
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            }
        });
        
        filterBar.appendChild(btn);
    });
    
    allRecipesSection.insertBefore(filterBar, recipeGrid);
});


function filterRecipes(filter) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    let visibleCount = 0;
    
    recipeCards.forEach((card, index) => {
        const tags = card.querySelector('.tags-list');
        const tagText = tags ? tags.textContent : '';
        
        setTimeout(() => {
            if (filter === 'Todas' || tagText.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'bounceIn 0.6s ease';
                visibleCount++;
            } else {
                card.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => card.style.display = 'none', 300);
            }
        }, index * 50);
    });
    
    setTimeout(() => {
        if (visibleCount === 0) {
            showNoResults(filter);
        } else {
            const existingMsg = document.getElementById('no-results-msg');
            if (existingMsg) existingMsg.remove();
        }
    }, recipeCards.length * 50 + 100);
}


function showNoResults(filter) {
    const existingMsg = document.getElementById('no-results-msg');
    if (existingMsg) existingMsg.remove();
    
    const noResultsMsg = document.createElement('div');
    noResultsMsg.id = 'no-results-msg';
    noResultsMsg.style.cssText = `
        text-align: center;
        padding: 60px 20px;
        color: #666;
        font-size: 1.2rem;
        grid-column: 1 / -1;
        animation: fadeIn 0.5s ease;
    `;
    noResultsMsg.innerHTML = `
        <i class="fas fa-search" style="font-size: 4rem; color: #f06292; margin-bottom: 20px; display: block;"></i>
        <h3 style="color: #f06292; margin-bottom: 10px;">Ops! Nenhuma receita encontrada</h3>
        <p>Não encontramos receitas na categoria "${filter}"</p>
        <button onclick="document.querySelector('[data-filter=\\'Todas\\']').click()" style="
            margin-top: 20px;
            padding: 12px 30px;
            background: #f06292;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
        ">Ver Todas as Receitas</button>
    `;
    
    document.querySelector('.recipe-grid').appendChild(noResultsMsg);
}

document.addEventListener('DOMContentLoaded', () => {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const actionMenu = document.createElement('div');
        actionMenu.className = 'action-menu';
        actionMenu.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        `;
        
        
        const buttons = [
            { icon: 'fa-heart', title: 'Favoritar', color: '#dc3545', action: 'favorite' },
            { icon: 'fa-share-alt', title: 'Compartilhar', color: '#007bff', action: 'share' },
            { icon: 'fa-bookmark', title: 'Salvar', color: '#ffc107', action: 'save' }
        ];
        
        buttons.forEach(btnData => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="fas ${btnData.icon}"></i>`;
            btn.title = btnData.title;
            btn.className = `action-btn ${btnData.action}-btn`;
            btn.style.cssText = `
                width: 38px;
                height: 38px;
                border: none;
                border-radius: 50%;
                background: white;
                color: ${btnData.color};
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                font-size: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            let isActive = false;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                isActive = !isActive;
                
                if (isActive) {
                    btn.style.background = btnData.color;
                    btn.style.color = 'white';
                    btn.style.transform = 'scale(1.2)';
                    createParticles(btn, btnData.color);
                    showToast(`✓ ${btnData.title} com sucesso!`);
                } else {
                    btn.style.background = 'white';
                    btn.style.color = btnData.color;
                    btn.style.transform = 'scale(1)';
                }
            });
            
            btn.addEventListener('mouseover', () => {
                if (!isActive) {
                    btn.style.transform = 'scale(1.15)';
                    btn.style.boxShadow = `0 4px 15px ${btnData.color}66`;
                }
            });
            
            btn.addEventListener('mouseout', () => {
                if (!isActive) {
                    btn.style.transform = 'scale(1)';
                    btn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
                }
            });
            
            actionMenu.appendChild(btn);
        });
        
        card.style.position = 'relative';
        card.appendChild(actionMenu);
        
        
        card.addEventListener('mouseenter', () => {
            actionMenu.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            actionMenu.style.opacity = '0';
        });
    });
});


function createParticles(element, color) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 60;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0, opacity = 1;
        const animate = () => {
            x += vx * 0.15;
            y += vy * 0.15 + 3;
            opacity -= 0.025;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.querySelector('.button-load-more');
    const recipeGrid = document.querySelector('.recipe-grid');
    let clickCount = 0;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;
            
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando receitas...';
            loadMoreBtn.style.pointerEvents = 'none';
            loadMoreBtn.style.opacity = '0.7';
            
            
            const skeletons = [];
            for (let i = 0; i < 3; i++) {
                const skeleton = createSkeletonCard();
                recipeGrid.appendChild(skeleton);
                skeletons.push(skeleton);
            }
            
            setTimeout(() => {
                
                skeletons.forEach(sk => sk.remove());
                
                for (let i = 0; i < 3; i++) {
                    const newCard = createRecipeCard();
                    recipeGrid.appendChild(newCard);
                }
                
                loadMoreBtn.innerHTML = 'Carregar Mais Receitas <i class="fas fa-redo-alt"></i>';
                loadMoreBtn.style.pointerEvents = 'auto';
                loadMoreBtn.style.opacity = '1';
                
                showToast('✨ 3 novas receitas adicionadas!');
                
                
                const counter = document.getElementById('recipe-counter');
                const allCards = document.querySelectorAll('.recipe-card');
                if (counter) {
                    counter.innerHTML = `<i class="fas fa-utensils"></i> ${allCards.length} receitas disponíveis`;
                }
                
                if (clickCount >= 2) {
                    loadMoreBtn.innerHTML = '<i class="fas fa-check-circle"></i> Todas as receitas foram carregadas!';
                    loadMoreBtn.style.background = '#28a745';
                    loadMoreBtn.style.pointerEvents = 'none';
                }
            }, 2000);
        });
    }
});


function createSkeletonCard() {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    skeleton.style.cssText = `
        background: #f0f0f0;
        border-radius: 8px;
        overflow: hidden;
        animation: pulse 1.5s ease-in-out infinite;
    `;
    skeleton.innerHTML = `
        <div style="width: 100%; height: 200px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;"></div>
        <div style="padding: 1rem;">
            <div style="height: 20px; background: #e0e0e0; border-radius: 4px; margin-bottom: 10px;"></div>
            <div style="height: 15px; background: #e0e0e0; border-radius: 4px; width: 60%;"></div>
        </div>
    `;
    return skeleton;
}


function createRecipeCard() {
    const recipes = [
        { name: 'Pudim de Leite Condensado', img: 'https://receitapudim.com.br/wp-content/uploads/2016/06/pudimgostosohoz.jpg', rating: '4.9⭐ (856)', tags: '#Rápida' },
        { name: 'Bolo de Cenoura', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjJLHb5IZrLs_bOfv47T8VY12sNncf-zBisA&s', rating: '4.8⭐ (742)', tags: '#Bolos' },
        { name: 'Pavê de Chocolate', img: 'https://bodyfarma.com.br/wp-content/uploads/2019/11/sorvete-fit-de-cacau.png', rating: '4.7⭐ (623)', tags: '#Chocolate' }
    ];
    
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animation = 'bounceIn 0.6s ease';
    card.innerHTML = `
        <img src="${randomRecipe.img}" alt="${randomRecipe.name}" class="recipe-image">
        <div class="recipe-info">
            <h4><a href="#">${randomRecipe.name}</a></h4>
            <div class="rating">${randomRecipe.rating} avaliações</div>
            <div class="tags-list">${randomRecipe.tags}</div>
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.title = 'Voltar ao topo';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #8c76ab, #b39ddb);
        color: white;
        border: none;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(140, 118, 171, 0.4);
        z-index: 998;
        display: none;
        transition: all 0.3s ease;
        font-size: 22px;
    `;
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.alignItems = 'center';
            scrollBtn.style.justifyContent = 'center';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollBtn.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => scrollBtn.style.transform = 'rotate(0deg) scale(1)', 400);
    });
    
    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollBtn.style.boxShadow = '0 6px 25px rgba(140, 118, 171, 0.6)';
    });
    
    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
        scrollBtn.style.boxShadow = '0 4px 20px rgba(140, 118, 171, 0.4)';
    });
});


function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #333, #555);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideUp 0.3s ease;
        font-size: 1rem;
        font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}


const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translate(-50%, 100px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, 100px); opacity: 0; }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
document.head.appendChild(style);

console.log('📖 Página de Receitas - Script Expandido Carregado! ✨');
