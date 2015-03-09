var _this;

export class popup {

    static init() {
        _this = this;

        _this.popupList = [
            {
                selector: ".popup-favorite",
                text: "В избранном можно сравнивать объявления",
                position: 'top left'
            },
            {
                selector: ".popup-mother",
                text: "Материнский капитал",
                position: 'top right'
            },
            {
                selector: ".popup-ipo",
                text: "В ипотеку",
                position: 'top right'
            },
            {
                selector: ".popup-rasr",
                text: "В рассрочку",
                position: 'top right'
            }
        ];


        $.each(_this.popupList, (i, popup) => {
            $(popup.selector).each((index, item) => {
                new Drop({
                    target: item,
                    content: popup.text,
                    position: popup.position,
                    openOn: 'hover',
                    classes: 'drop-theme-arrows-bounce drop-hero'
                });
            });
        });

        _this.link();

        window.popup = _this.update;
    }

    static update(element, text, position) {
        new Drop({
            target: element[0],
            content: text,
            position: position,
            openOn: 'hover',
            classes: 'drop-theme-arrows-bounce drop-hero'
        });

        _this.link(element[0]);
    }

    static link(element) {
        $(element || '.drop-target').click(e => {
            var href = $(e.currentTarget).attr('href');
            if (href) window.location.href = href;
            e.preventDefault();

            return false;
        });
    }
}