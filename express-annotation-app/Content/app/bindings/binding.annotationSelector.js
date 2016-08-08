(function () {

    ko.bindingHandlers.annotationSelector = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            valueAccessor();
            var that = this;
            $(element).bind("mouseup", textSelected);
            $(element).bind("mousedown", clean);

            function textSelected() {
                console.log("selection detected");

                var selection = (document.all) ? document.selection.createRange().text : document.getSelection();

                if (!selection.isCollapsed) {
                    cleanNode(element);
                    console.log(selection);
                    var addAnnotationComponentTemplate = document.getElementById("add-annotation-component-template")

                    $(element).siblings(".add-annotations-container").append(addAnnotationComponentTemplate.innerHTML);

                    var selectionRange = selection.getRangeAt(0);
                    var selectionData = {
                        text: selection.toString(),
                        start: selectionRange.startOffset,
                        end: selectionRange.endOffset,
                        commentElement: selection.getRangeAt(0).startContainer.parentNode
                    }

                    ko.applyBindings(new merlin.AddAnnotationComponent( valueAccessor().annotations, selectionData, cleanNode.bind(that)), $(element).siblings(".add-annotations-container")[0]);
                }
            }

            function clean(e) {
                console.log("cleanup before selection");
                if (e.target.className != "annotation") {
                    var text = valueAccessor().content;
                    $(element).html(text)

                }
            }

            function cleanNode() {
                ko.cleanNode($(element).siblings(".add-annotations-container")[0]);
                $(element).siblings(".add-annotations-container").html("");
            }
        }
    }
})()