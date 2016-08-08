(function () {
    var SelectComponent = function (params) {
        this.selected = params.selected;
        this.optionValues = params.optionValues;
        this.optionsText = params.optionsText == null ? "text" : params.optionsText;
        this.optionsValue = params.optionsValue == null ? "value" : params.optionsValue;
        this.optionsCaption = params.optionsCaption;
        this.valueAllowUnset = params.valueAllowUnset == null ? false : params.valueAllowUnset;
    }

    // --------------------------

    ko.components.register("select-component", {
        viewModel: SelectComponent,
        template: {
            element: "select-component-template"
        }
    });
})();