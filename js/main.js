/**
 * 🌟 ملف main.js المستقر والنهائي لإدارة الموقع بالكامل (نسخة Netlify)
 */

async function loadComponent(elementId, filePath) {
    const placeholder = document.getElementById(elementId);
    if (!placeholder) return;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const htmlContent = await response.text();
        placeholder.innerHTML = htmlContent;
        console.log(`✅ تم تحميل المكون بنجاح: ${filePath}`);

    } catch (error) {
        console.error(`❌ فشل تحميل الملف من المسار: ${filePath}`, error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    // 1. استدعاء مطلق وثابت من الـ Root مباشرة لـ Netlify
    await Promise.all([
        loadComponent('main-navbar', '/navbar.html'),
        loadComponent('main-footer', '/footer.html')
    ]);

    // 2. تفعيل قوائم البوتستراب المنسدلة (Dropdowns) بعد الحقن
    if (window.bootstrap && bootstrap.Dropdown) {
        const dropdownElements = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        dropdownElements.forEach(dropdownToggle => {
            const existingInstance = bootstrap.Dropdown.getInstance(dropdownToggle);
            if (existingInstance) existingInstance.dispose();
            new bootstrap.Dropdown(dropdownToggle);
        });
    }

    // 🌟 3. كود مراقبة السكرول (مكانها الصحيح هنا بعد ما النافبار يكون اتحقن تماماً)
    window.addEventListener('scroll', function () {
        // بنستهدف الـ ID بتاعنا اللي جواه النافبار عشان نضمن دقة الاستهداف
        const navbarContainer = document.getElementById('main-navbar'); 
        
        if (navbarContainer) {
            // بنجيب أول عنصر نافبار حقيقي جوه الكونتينر
            const actualNavbar = navbarContainer.querySelector('.navbar'); 
            
            if (actualNavbar) {
                if (window.scrollY > 50) { 
                    actualNavbar.classList.add('navbar-scrolled');
                } else {
                    actualNavbar.classList.remove('navbar-scrolled');
                }
            }
        }
    });
});