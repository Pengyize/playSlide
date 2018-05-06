let $buttons = $('#buttonWrapper>button');
let $slides = $('#slides');
let $images = $slides.children('img');
let $next = $('#next');
let $previous = $('#previous');

makeFakeSlide();

$slides.css({transform:'translateX(-750px)'});

playSlide();

let current = 0;
$next.on('click',function () {
    goToSlide(current+1);
});
$previous.on('click',function () {
    goToSlide(current-1);
});























function makeFakeSlide() {
    let $firstCopy = $images.eq(0).clone(true);
    let $lastCopy = $images.eq($images.length-1).clone(true);

    $slides.append($firstCopy);
    $slides.prepend($lastCopy);
}



function playSlide() {

    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget);
        $button.addClass('active').siblings().removeClass('active');
        let index = $button.index();
        goToSlide(index);

    });
}





// let timer = setInterval(function () {
//     goToSlide((current+1))
// },2000);
//
// $('.container').on('mouseenter',function () {
//     window.clearInterval(timer);
// }).on('mouseleave',function () {
//     timer = setInterval(function () {
//         goToSlide((current+1))
//     },2000);
// });

// document.addEventListener('visibilitychange',function () {
//     if(document.hidden){
//         window.clearInterval(timer);
//     }else{
//         timer = setInterval(function () {
//             goToSlide((current+1))
//         },2000);
//     }
// });

function goToSlide(index) {
    if(index>$buttons.length-1){
        index=0;
    }else if(index<0){
        index = $buttons.length-1
    }

    if(index === 0 && current === $buttons.length-1){
        $slides.css({transform:`translateX(${-($buttons.length+1)*750}px)`})
            .one('transitionend',function () {
                $slides.hide().offset();
                $slides.css({transform: `translateX(${-(index+1)*750}px)`})
                    .show();
            });
        current = index;
    }else if(current === 0 && index === $buttons.length-1){
        $slides.css({transform:`translateX(0px)`})
            .one('transitionend',function () {
                $slides.hide().offset();
                $slides.css({transform: `translateX(${-(index+1)*750}px)`})
                    .show();
            });
        current = index;
    }else{
        $slides.css({transform:`translateX(${-(index+1)*750}px)`});
        current = index;
    }
}