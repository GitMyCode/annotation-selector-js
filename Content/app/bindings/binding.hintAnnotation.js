(function () {
    ko.bindingHandlers.hintAnnotation = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var jqueryElement = $(element);
            var allBindings = allBindingsAccessor();
            var options = {
                trigger: 'hover',
            };

            ko.utils.extend(options, allBindings);
            ko.utils.extend(options, {
                title: JSON.stringify(value),
                placement: 'right'
            });

            jqueryElement.tooltip(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                jqueryElement.tooltip("destroy");
            });
        },
    };
})()