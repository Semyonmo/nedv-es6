export class gallery {
    static init() {
        $('.fotorama').fotorama({
            allowfullscreen: true,
            thumbwidth: 100,
            thumbheight: 70,
            thumbborderwidth: 3,
            thumbmargin: 10,
            autoplay: false
        });
    }
}