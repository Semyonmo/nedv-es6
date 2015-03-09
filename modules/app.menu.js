export class menu {
    static init() {
        /**
         * Jquery UI accordion plugin module
         */
        $("#accordion").accordion({
            heightStyle: "content",
            icons: false,
            collapsible: true,
            animate: 150
        });

        /**
         * Custom scrollbar loader
         */
        $("#accordion-wrapper").mCustomScrollbar({
            scrollInertia: 0
        });
    }
}
