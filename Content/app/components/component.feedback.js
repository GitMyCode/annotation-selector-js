(function () {
    var FeedbackComponent = function (params) {
        this.feedback = params.feedback;
        this.showAnnotationContent = ko.observable();
        this.showAnnotation = ko.observable(false);
    }

    FeedbackComponent.prototype = {
        showAnnotations: function () {
            this.showAnnotation(true);
            var that = this;
            var newNode = document.createElement("div");
            newNode.innerHTML = this.feedback.content;
            var highlightAnnotations = [];

            $.each(this.feedback.annotations.peek(), function (i, annotation) {
                var range = document.createRange();
                var textNode = newNode.childNodes[0];
                range.setStart(textNode, annotation.selectionData.start);
                range.setEnd(textNode, annotation.selectionData.end);

                highlightAnnotations.push({
                    annotation: annotation,
                    range: range
                }
                );
            });

            $.each(highlightAnnotations, function (i, val) {
                that.highlightRange(val);
            });

            this.showAnnotationContent(newNode.innerHTML);
        },

        clearAnnotations: function () {
            annotations = [];
        },

        hideAnnotations: function () {
            this.showAnnotation(false);
            this.showAnnotationContent("");
        },

        highlightRange: function (annotationDto) {
            var newNode = document.createElement("div");
            newNode.setAttribute(
                "style",
                "background-color: yellow; display: inline;"
            );
            newNode.setAttribute("data-bind", "hintAnnotation: { title: '" + annotationDto.annotation.comment + "' , placement: 'right' }");
            annotationDto.range.surroundContents(newNode);
        }
    }

    ko.components.register("feedback", {
        viewModel: FeedbackComponent,
        template: {
            element: "feedback-component-template"
        }
    });
})();