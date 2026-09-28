// بناء مراقب الشاشة المستقر
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // بمجرد دخول 15% من السكشن، ثبت كلاس active تماماً
            entry.target.classList.add('active'); 
        } else {
            // عند الخروج تماماً من السكشن لأعلى أو أسفل، قم بإزالته للاستعداد للإعادة
            entry.target.classList.remove('active'); 
        }
    });
}, { 
    // قيمة رقمية واحدة تضمن عدم حدوث ومضات أثناء الحركة الداخلية للسكشن
    threshold: 0.15 
}); 

// مراقبة العناصر
const elementsToAnimate = document.querySelectorAll('.slide-down-container, .slide-up-container, .pop-in-container');
elementsToAnimate.forEach((element) => {
    animationObserver.observe(element);
});



