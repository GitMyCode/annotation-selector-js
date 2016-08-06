(function () {
    ko.bindingHandlers.bindHTML = {
        init: function () {
            return { controlsDescendantBindings: true };
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            ko.applyBindingsToNode(element, { html: value });
            ko.applyBindingsToDescendants(bindingContext, element);
        }
    };
})()
