var _this;
export class header {
    /**
     * Init header modules
     */
    static init() {
        _this = this;
        $('.header__menu-list-item-dropdown-container')
            .hover(_this.showUserMenu, _this.hideUserMenu);
    }

    /**
     * Show header user menu
     * @param e - jquery event
     */
    static showUserMenu(e) {
        $('.header__menu-list-item-dropdown-wrapper', e.currentTarget)
            .css('display', 'block');
    }

    /**
     * Hide header user menu
     * @param e - jquery event
     */
    static hideUserMenu(e) {
        $('.header__menu-list-item-dropdown-wrapper', e.currentTarget)
            .css('display', 'none');
    }
}