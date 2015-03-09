export class selector {
    static init() {
        $(".mortgages__form-dropdown").chosen({
            disable_search_threshold: 10,
            width: '220px',
            height: "100%"
        });

        $(".staff__filter-competence-dropdown").chosen({
            disable_search_threshold: 10,
            width: '28%',
            height: "30px"
        });

        $(".add-page__dropdown").chosen({
            disable_search_threshold: 10,
            width: '35%',
            height: "30px"
        });
    }
}