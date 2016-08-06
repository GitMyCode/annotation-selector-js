(function () {

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
})()