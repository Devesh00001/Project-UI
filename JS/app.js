const filter_btns = document.querySelectorAll(".filter-btn");

filter_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filter_btns.forEach(button => button.classList.remove("active"));
        btn.classList.add('active');

        let filterValue = btn.dataset.filter;

        $(".grid").isotope({ filter: filterValue });
    });
});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView();
}

function scrollToSection(e) {
    e.preventDefault();
    var targetId = this.getAttribute('href');
    var targetElement = document.querySelector(targetId);
    var topOffset = targetElement.offsetTop;
    var duration = 2000;
    var easing = function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t };

    animateScroll(topOffset, duration, easing);
}

function animateScroll(topOffset, duration, easing) {
    var start = window.pageYOffset;
    var end = topOffset;
    var time = 0;
    var delta = end - start;

    function tick() {
        time += 16;
        var fraction = Math.min(1, time / duration);
        var eased = easing(fraction);
        var scrollTop = start + delta * eased;
        window.scrollTo(0, scrollTop);

        if (time < duration) {
            requestAnimationFrame(tick);
        }
    }

    requestAnimationFrame(tick);
}

var link = document.querySelector('a[href^="#"]');
link.addEventListener('click', scrollToSection);


var div1 = document.getElementById('main1');
var display1 = 0;

function hideShow1()
{
    if(display1 == 0)
    {
        div1.style.display = 'flex';
        display1 = 1;
    }
    else
    {
        div1.style.display = 'none';
        display1 = 0;
    }
}

var div2 = document.getElementById('main2');
var display2 = 0;

function hideShow2()
{
    if(display2 == 0)
    {
        div2.style.display = 'flex';
        display2 = 1;
    }
    else
    {
        div2.style.display = 'none';
        display2 = 0;
    }
}

var div3 = document.getElementById('main3');
var display3 = 0;

function hideShow3()
{
    if(display3 == 0)
    {
        div3.style.display = 'flex';
        display3 = 1;
    }
    else
    {
        div3.style.display = 'none';
        display3 = 0;
    }
}

var div4 = document.getElementById('main4');
var display4 = 0;

function hideShow4()
{
    if(display4 == 0)
    {
        div4.style.display = 'flex';
        display4 = 1;
    }
    else
    {
        div4.style.display = 'none';
        display4 = 0;
    }
}

var div5 = document.getElementById('main5');
var display5 = 0;

function hideShow5()
{
    if(display5 == 0)
    {
        div5.style.display = 'flex';
        display5 = 1;
    }
    else
    {
        div5.style.display = 'none';
        display5 = 0;
    }
}

// function hideShow(id) {
//     var div = document.getElementById(id);
//     var display = 0;

//     if (display == 'none') {
//         div.style.display = 'block';
//         display = 0;
//     } 
//     else {
//         div.style.display = 'none';
//         display = 1;
//     }
// }







$('.grid').isotope({
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    transitionDuration: "0.8s",
});