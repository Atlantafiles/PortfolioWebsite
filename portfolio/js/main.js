// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Observe individual cards and elements
document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Contact form submission
document.querySelector('#contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && message) {
        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:atlantagogoi11@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for your message! Your email client should open now.', 'success');
        
        // Reset form
        this.reset();
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Particle effect on mouse move
document.addEventListener('mousemove', (e) => {
    // Only create particles occasionally to avoid performance issues
    if (Math.random() > 0.8) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #6366f1, #ec4899);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.8;
        animation: particleFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: var(--primary);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
`;

document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'scale(1)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'scale(0)';
    }
});

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                let tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a delay
    setTimeout(() => {
        type();
    }, 1000);
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText);
    }
});

// Add skill tag hover counter (fun little detail)
document.querySelectorAll('.skill-tag').forEach(tag => {
    let hoverCount = 0;
    tag.addEventListener('mouseenter', () => {
        hoverCount++;
        if (hoverCount > 5) {
            tag.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            tag.title = `Wow! You really like ${tag.textContent}! 🚀`;
        }
    });
});

console.log('🚀 Portfolio JavaScript loaded successfully! Welcome to Atlanta Gogoi\'s interactive portfolio.');

// Three.js animated background with proper error handling
let threeJSCleanup = null;
let isThreeJSLoaded = false;

// Check if Three.js is available
function checkThreeJS() {
    return typeof THREE !== 'undefined';
}

// Hide loading spinner immediately on page load
function hideLoader() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('three-loaded');
    }
}

function initThreeJS() {
    if (!checkThreeJS()) {
        console.warn('Three.js is not loaded');
        hideLoader();
        return null;
    }

    const canvas = document.querySelector('.hero-bg');
    if (!canvas) {
        console.warn('Canvas element with class .hero-bg not found');
        hideLoader();
        return null;
    }
    
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true 
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Set camera position
        camera.position.z = 10;
        
        return { scene, camera, renderer };
    } catch (error) {
        console.error('Failed to initialize Three.js:', error);
        hideLoader();
        return null;
    }
}

// Create floating geometric shapes
function createFloatingShapes(scene) {
    const shapes = [];
    const colors = [0x6366f1, 0xec4899, 0x06b6d4, 0x10b981, 0xf59e0b];
    const geometries = [
        () => new THREE.BoxGeometry(0.5, 0.5, 0.5),
        () => new THREE.SphereGeometry(0.3, 8, 6),
        () => new THREE.ConeGeometry(0.3, 0.6, 8),
        () => new THREE.TetrahedronGeometry(0.4),
        () => new THREE.OctahedronGeometry(0.3)
    ];

    for (let i = 0; i < 25; i++) {
        try {
            // Random geometry
            const geometryFunc = geometries[Math.floor(Math.random() * geometries.length)];
            const geometry = geometryFunc();
            
            // Random material with some transparency
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6,
                wireframe: Math.random() > 0.7 // Some shapes as wireframes
            });

            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 20;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;

            scene.add(mesh);
            
            // Store shape data for animation
            shapes.push({
                mesh: mesh,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                originalY: mesh.position.y
            });
        } catch (error) {
            console.warn('Failed to create shape:', error);
        }
    }
    
    return shapes;
}

// Animation loop
function animate(scene, camera, renderer, shapes) {
    let animationId;
    
    function animateFrame() {
        if (!isThreeJSLoaded) return;
        
        animationId = requestAnimationFrame(animateFrame);

        // Animate each shape
        shapes.forEach((shape, index) => {
            try {
                // Rotation
                shape.mesh.rotation.x += shape.rotationSpeed.x;
                shape.mesh.rotation.y += shape.rotationSpeed.y;
                shape.mesh.rotation.z += shape.rotationSpeed.z;

                // Floating movement
                const time = Date.now() * 0.001;
                shape.mesh.position.y = shape.originalY + Math.sin(time * shape.floatSpeed + index) * 2;
                
                // Slight horizontal drift
                shape.mesh.position.x += Math.sin(time * 0.0005 + index) * 0.01;
            } catch (error) {
                console.warn('Animation error for shape:', error);
            }
        });

        try {
            // Render the scene
            renderer.render(scene, camera);
        } catch (error) {
            console.error('Render error:', error);
            isThreeJSLoaded = false;
        }
    }
    
    animateFrame();
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

// Mouse interaction with 3D scene
function addMouseInteraction(camera, shapes) {
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event) => {
        if (!isThreeJSLoaded) return;
        
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        try {
            // Move camera slightly based on mouse position
            camera.position.x = mouseX * 2;
            camera.position.y = mouseY * 2;
            
            // Make shapes react to mouse
            shapes.forEach((shape, index) => {
                const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
                const intensity = Math.max(0, 1 - distance);
                
                // Scale shapes based on mouse proximity
                const scale = 1 + intensity * 0.5;
                shape.mesh.scale.set(scale, scale, scale);
                
                // Change opacity
                shape.mesh.material.opacity = 0.6 + intensity * 0.4;
            });
        } catch (error) {
            console.warn('Mouse interaction error:', error);
        }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Return cleanup function
    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
    };
}

// Handle window resize
function handleResize(camera, renderer) {
    const handleResizeEvent = () => {
        if (!isThreeJSLoaded) return;
        
        try {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } catch (error) {
            console.warn('Resize error:', error);
        }
    };
    
    window.addEventListener('resize', handleResizeEvent);
    
    // Return cleanup function
    return () => {
        window.removeEventListener('resize', handleResizeEvent);
    };
}

// Main Three.js initialization function
function startThreeJS() {
    try {
        if (!checkThreeJS()) {
            console.log('Three.js not available, using fallback background');
            hideLoader();
            return;
        }

        const threeJS = initThreeJS();
        if (!threeJS) {
            console.log('Failed to initialize Three.js, using fallback background');
            hideLoader();
            return;
        }
        
        const { scene, camera, renderer } = threeJS;
        const shapes = createFloatingShapes(scene);
        
        // Add interactions
        const mouseCleanup = addMouseInteraction(camera, shapes);
        const resizeCleanup = handleResize(camera, renderer);
        
        // Start animation
        isThreeJSLoaded = true;
        const animationCleanup = animate(scene, camera, renderer, shapes);
        
        // Hide loading indicator
        hideLoader();
        
        // Store cleanup function
        threeJSCleanup = () => {
            isThreeJSLoaded = false;
            if (animationCleanup) animationCleanup();
            if (mouseCleanup) mouseCleanup();
            if (resizeCleanup) resizeCleanup();
            
            // Dispose of Three.js resources
            try {
                shapes.forEach(shape => {
                    if (shape.mesh.geometry) shape.mesh.geometry.dispose();
                    if (shape.mesh.material) shape.mesh.material.dispose();
                });
                scene.clear();
                renderer.dispose();
            } catch (error) {
                console.warn('Cleanup error:', error);
            }
        };
        
        console.log('🎨 Three.js 3D background initialized successfully!');
    } catch (error) {
        console.error('Three.js initialization failed:', error);
        hideLoader();
    }
}

// Performance optimization - pause when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause Three.js animation
        isThreeJSLoaded = false;
        if (threeJSCleanup) {
            threeJSCleanup();
        }
    } else {
        // Resume Three.js animation
        setTimeout(startThreeJS, 100);
    }
});

// Initialize Three.js when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Hide loader immediately
        hideLoader();
        // Try to start Three.js
        setTimeout(startThreeJS, 100);
    });
} else {
    // Hide loader immediately
    hideLoader();
    // Try to start Three.js
    setTimeout(startThreeJS, 100);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    isThreeJSLoaded = false;
    if (threeJSCleanup) {
        threeJSCleanup();
    }
});

// Ensure loader is hidden if Three.js fails to load within 2 seconds
setTimeout(() => {
    hideLoader();
}, 2000);

// Performance Optimizations

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for smooth performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Header scroll effect (already exists, just optimizing)
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }

    // Scroll to top button
    const scrollTopBtn = document.querySelector('button[style*="bottom: 30px"]');
    if (scrollTopBtn) {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0)';
        }
    }
}, 16); // ~60fps

// Replace existing scroll listener
window.removeEventListener('scroll', () => {}); // Remove old listeners
window.addEventListener('scroll', optimizedScrollHandler);

// Optimize mouse move for particles
const optimizedMouseMove = throttle((e) => {
    if (Math.random() > 0.9) { // Reduce particle frequency
        createParticle(e.clientX, e.clientY);
    }
}, 50);

document.removeEventListener('mousemove', () => {});
document.addEventListener('mousemove', optimizedMouseMove);

// Lazy loading for heavy animations
function enableLazyAnimations() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        // Disable heavy animations for users who prefer reduced motion
        document.querySelectorAll('.floating').forEach(el => {
            el.style.animation = 'none';
        });
    }
}

enableLazyAnimations();

// Memory cleanup
function cleanupUnusedElements() {
    // Remove old particles
    document.querySelectorAll('[style*="particleFloat"]').forEach(particle => {
        if (particle.getBoundingClientRect().top < -100) {
            particle.remove();
        }
    });
}

// Run cleanup every 10 seconds
setInterval(cleanupUnusedElements, 10000);