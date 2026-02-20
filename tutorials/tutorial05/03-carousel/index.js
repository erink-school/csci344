//current slide
let currentPosition = 0;
//space between slides
let gap = 10;
//width of slide
const slideWidth = 400;

//moves carosel left and right
function moveCarousel(direction) {
    //gets the carosel items
    const items = document.querySelectorAll(".carousel-item");

    //moves carosel forward
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        //stop at last slide
        if (currentPosition >= items.length - 2) {
            return false;
        }
        // go to next slide
        currentPosition++;
    } else {
        //stop at first slide
        if (currentPosition == 0) {
            return false;
        }
        //go to previous slide
        currentPosition--;
    }

    //how far to move each slide
    const offset = (slideWidth + gap) * currentPosition;

    //move each slide
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
