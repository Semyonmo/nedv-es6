var _this;

export class citySelector {
    static init() {
        _this = this;
        _this.$citySelect = $(".chosen-select-city");
        _this.$distSelect = $(".chosen-select-dist");

        _this.$distSelect.chosen({
            disable_search_threshold: 10,
            width: "100%",
            placeholder_text_single: "Выберите Район"
        });

        _this.$citySelect.chosen({
            disable_search_threshold: 10,
            width: "100%",
            placeholder_text_single: "Выберите город"
        }).on('change', function (evt, params) {
            _this.loadDist(params.selected);
        });

    }

    static loadDist(cityId) {
        $.ajax({
            url: "http://real-estate-dev.bureauit.com/site/districts",
            type: "GET",
            dataType: "json",
            data: {
                city: cityId
            }
        }).done((data) => {
            _this.applyDist(data);
        });
    }

    static applyDist(data) {
        _this.$distSelect.empty();
        $.each(data.districts, (index, item) => {
            _this.$distSelect.append('<option  value="' + item.id + '">' + item.name + '</option>');
        });
        _this.$distSelect.trigger('chosen:updated');
    }

}