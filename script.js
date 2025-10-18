window.addEventListener('load', () => {
    setTimeout(() => {
        alert('🍰 Bem-vindo ao Açúcar & Afeto! \n\nQue tal explorar nossas deliciosas receitas?');
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    
    const tipButton = document.createElement('button');
    tipButton.id = 'tip-button';
    tipButton.innerHTML = '<i class="fas fa-lightbulb"></i> Dica do Dia';
    tipButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #f06292, #ff92b4);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(240, 98, 146, 0.4);
        z-index: 999;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(tipButton);

    
    const tipCard = document.createElement('div');
    tipCard.id = 'tip-card';
    tipCard.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        max-width: 300px;
        z-index: 998;
        display: none;
        animation: slideIn 0.4s ease;
        border-left: 5px solid #f06292;
    `;
    tipCard.innerHTML = `
        <h4 style="color: #f06292; margin-bottom: 10px; font-family: 'Dancing Script', cursive; font-size: 1.5rem;">
            <i class="fas fa-star"></i> Dica do Chef
        </h4>
        <p style="color: #333; font-size: 14px; line-height: 1.6;">
            Para um brigadeiro mais cremoso, deixe a mistura esfriar completamente antes de enrolar. 
            Você também pode refrigerar por 30 minutos! 🍫
        </p>
        <button id="close-tip" style="
            background: #f06292;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 10px;
            font-size: 12px;
        ">Entendi!</button>
    `;
    document.body.appendChild(tipCard);

    
    let tipVisible = false;
    tipButton.addEventListener('click', () => {
        tipVisible = !tipVisible;
        tipCard.style.display = tipVisible ? 'block' : 'none';
        tipButton.style.transform = tipVisible ? 'scale(0.95)' : 'scale(1)';
    });

    
    document.getElementById('close-tip').addEventListener('click', () => {
        tipCard.style.display = 'none';
        tipVisible = false;
    });

    
    tipButton.addEventListener('mouseover', () => {
        tipButton.style.transform = 'scale(1.1)';
        tipButton.style.boxShadow = '0 6px 20px rgba(240, 98, 146, 0.6)';
    });

    tipButton.addEventListener('mouseout', () => {
        if (!tipVisible) {
            tipButton.style.transform = 'scale(1)';
        }
        tipButton.style.boxShadow = '0 4px 15px rgba(240, 98, 146, 0.4)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('nav a');
    
    menuItems.forEach(item => {
        
        const colors = ['#f06292', '#8c76ab', '#ff92b4', '#ffc107', '#e91e63'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        item.addEventListener('mouseover', (e) => {
            if (!e.target.classList.contains('active')) {
                e.target.style.backgroundColor = randomColor;
                e.target.style.color = 'white';
                e.target.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseout', (e) => {
            if (!e.target.classList.contains('active')) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#f06292';
                e.target.style.transform = 'translateX(0)';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        
        const heartBtn = document.createElement('button');
        heartBtn.innerHTML = '<i class="far fa-heart"></i>';
        heartBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            font-size: 18px;
            color: #f06292;
            transition: all 0.3s ease;
            z-index: 10;
        `;
        
        card.style.position = 'relative';
        card.appendChild(heartBtn);
        
        
        let favorited = false;
        heartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            favorited = !favorited;
            
            if (favorited) {
                heartBtn.innerHTML = '<i class="fas fa-heart"></i>';
                heartBtn.style.backgroundColor = '#f06292';
                heartBtn.style.color = 'white';
                heartBtn.style.transform = 'scale(1.2)';
                
                
                createConfetti(heartBtn);
            } else {
                heartBtn.innerHTML = '<i class="far fa-heart"></i>';
                heartBtn.style.backgroundColor = 'white';
                heartBtn.style.color = '#f06292';
                heartBtn.style.transform = 'scale(1)';
            }
        });
        
        heartBtn.addEventListener('mouseover', () => {
            heartBtn.style.transform = favorited ? 'scale(1.3)' : 'scale(1.1)';
        });
        
        heartBtn.addEventListener('mouseout', () => {
            heartBtn.style.transform = favorited ? 'scale(1.2)' : 'scale(1)';
        });
    });
});


function createConfetti(element) {
    const colors = ['#f06292', '#ffe0b2', '#8c76ab', '#ff92b4', '#ffc107'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
        `;
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0, opacity = 1;
        const animate = () => {
            x += vx * 0.1;
            y += vy * 0.1 + 5;
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section h2');
    const messages = [
        'Bem-vindos ao Açúcar & Afeto',
        'Receitas Feitas com Carinho ❤️',
        'Sabor e Tradição em Cada Doce',
        'Transforme Momentos em Memórias Doces'
    ];
    let currentIndex = 0;
    
    
    setInterval(() => {
        heroSection.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            heroSection.textContent = messages[currentIndex];
            heroSection.style.opacity = '1';
        }, 500);
    }, 4000);
    
    heroSection.style.transition = 'opacity 0.5s ease';
});

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer .copyright');
    const views = 12000 + Math.floor(Math.random() * 1000);
    
    const viewCounter = document.createElement('p');
    viewCounter.style.cssText = `
        text-align: center;
        font-size: 0.8rem;
        color: #aaa;
        margin-top: 10px;
    `;
    viewCounter.innerHTML = `<i class="fas fa-eye"></i> ${views.toLocaleString('pt-BR')} visualizações este mês`;
    
    footer.parentNode.insertBefore(viewCounter, footer.nextSibling);
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.id = 'scroll-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #8c76ab;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(140, 118, 171, 0.4);
        z-index: 997;
        display: none;
        transition: all 0.3s ease;
        font-size: 20px;
    `;
    document.body.appendChild(scrollBtn);
    
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.transform = 'scale(1.1)';
        scrollBtn.style.backgroundColor = '#f06292';
    });
    
    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.backgroundColor = '#8c76ab';
    });
});

console.log('🍰 Açúcar & Afeto - Script carregado com sucesso!');
