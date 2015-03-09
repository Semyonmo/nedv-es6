var _this;

export class modal {
    /**
     * Init module
     */
    static init() {
        _this = this;

        /**
         * each all modal windows select element
         * chek for active-load
         */
        $('.mymodal').each(function () {
            //curent element
            var $element = $(this);
            if ($element.hasClass('active-load')) {
                $element.addClass('active');

                _this.activate($element);
            }
        });

        $('.show-modal').click(_this.open);
    }

    /**
     * Show modal if click on model activation link
     * @param e
     */
    static open(e) {
        var id = $(this).attr('href');

        if (id) {
            $(id).addClass('active');
        }

        _this.activate(id);

        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Close modal window
     * @param element
     */
    static close(element) {
        $(element).closest('.mymodal').removeClass('active');
    }

    static activate(select) {
        var $modalWindow = $('.mymodal__window', select),
            child = $modalWindow.children(),
            childHeight = $(child).outerHeight(true),
            childWidth = $(child).outerWidth(true);

        $modalWindow
            .height(childHeight).width(childWidth)
            .click(e => {
                e.stopPropagation();
            });

        $('.mymodal').click(e => {
            _this.close(e.currentTarget);
            e.preventDefault();
            e.stopPropagation();
        }).on({
            'mousewheel': e => {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        $('.mymodal__close').click(e => {
            _this.close(e.currentTarget);
            e.preventDefault();
            e.stopPropagation();
        })
    }
}