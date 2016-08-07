(function () {

    ko.bindingHandlers.annotationSelector = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            this.feedback = valueAccessor();
            this.elem = element;

            $(this.elem).bind("mouseup", textSelected.bind(this));
            $(this.elem).bind("mousedown", clean.bind(this));

            function textSelected() {
                console.log("selection detected");

                var selection = (document.all) ? document.selection.createRange().text : document.getSelection();

                if (!selection.isCollapsed) {
                    cleanNode(this.elem);
                    console.log(selection);
                    var addAnnotationComponentTemplate = document.getElementById("add-annotation-component-template")

                    $(this.elem).siblings(".add-annotations-container").append(addAnnotationComponentTemplate.innerHTML);

                    var selectionRange = selection.getRangeAt(0);
                    var selectionData = {
                        text: selection.toString(),
                        start: selectionRange.startOffset,
                        end: selectionRange.endOffset,
                        commentElement: selection.getRangeAt(0).startContainer.parentNode
                    }

                    ko.applyBindings(new merlin.AddAnnotationComponent(this.feedback.annotations, selectionData, cleanNode.bind(this)), $(this.elem).siblings(".add-annotations-container")[0]);
                }
            }

            function clean() {
                console.log("cleanup before selection");
                var text = this.feedback.content;
                $(this.elem).html(text)

            }

            function getSelectionText() {
                var text = ""
                if (window.getSelection) {
                    text = window.getSelection();//.toString();
                } else if (document.selection && document.selection.type == "Text") {
                    text = document.selection.createRange().text;
                }
                return text;
            }

            function cleanNode() {
                ko.cleanNode($(this.elem).siblings(".add-annotations-container")[0]);
                $(this.elem).siblings(".add-annotations-container").html("");
            }
        }
    }
})()