
(function () {
    merlin = {

    }
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

    ko.bindingHandlers.annotationSelector = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            $(element).bind("mouseup", textSelected);
            var annotations = valueAccessor();

            function textSelected() {
                console.log("selection detected");
                var selection = (document.all) ? document.selection.createRange().text : document.getSelection();
                if (!selection.isCollapsed) {
                    cleanNode();
                    console.log(selection);
                    var addAnnotationComponentTemplate = document.getElementById("add-annotation-component-template")

                    $("#add-annotations-container").append(addAnnotationComponentTemplate.innerHTML);

                    var selectionRange = selection.getRangeAt(0);
                    var selectionData = {
                        text: selection.toString(),
                        start: selectionRange.startOffset,
                        end: selectionRange.endOffset,
                        commentElement: selection.getRangeAt(0).startContainer.parentNode
                    }

                    ko.applyBindings(new merlin.AddAnnotationComponent(annotations, selectionData, cleanNode), $("#add-annotations-container")[0]);
                }
            }

            function cleanNode() {
                ko.cleanNode($("#add-annotations-container")[0]);
                $("#add-annotations-container").html("");
            }
        }
    }

    merlin.app = function () {
        var that = this;
        this.feedbacks = ko.observableArray();

        this.feedbacks.push({
            content: ' In software, a stack overflow occurs when too much memory is used on the call stack. The call stack contains a limite',
            annotations: ko.observableArray()
        });

        // $("#comment-id").bind("mouseup", that.highlightSelection);

    }
    merlin.app.prototype = {

    }
})();

// document.onmouseup = highlightSelection
// if (!document.all) document.captureEvents(Event.MOUSEUP);