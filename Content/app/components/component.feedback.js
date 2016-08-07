var FeedbackComponent = function (params) {
    var that = this;
    this.feedback = params.feedback;
    this.showAnnotationContent = ko.observable();
    this.showAnnotation = ko.observable(true);
    that.showAnnotations();
    this.feedback.annotations.subscribe(function (change) {
        console.log("changed!");
        that.showAnnotations();
    })
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
            range.setStart(textNode, annotation.peek().selectionData.start);
            range.setEnd(textNode, annotation.peek().selectionData.end);

            highlightAnnotations.push({
                annotation: annotation,
                range: range
            }
            );
        });

        $.each(highlightAnnotations, function (i, val) {
            that.highlightRange(val, i);
        });

        this.showAnnotationContent(newNode.innerHTML);
    },

    editAnnotation: function (annotationIndex, component, evt) {
        console.log("edit annotation");

        var addAnnocationContainerElem = $(evt.target).closest(".annotation-container").siblings(".add-annotations-container");
        var addAnnotationComponentTemplate = document.getElementById("add-annotation-component-template")
        addAnnocationContainerElem.append(addAnnotationComponentTemplate.innerHTML);

        var annotation = component.feedback.annotations.peek()[annotationIndex]

        function cleanNode(addAnnocationContainerElem) {
            ko.cleanNode(addAnnocationContainerElem[0]);
            addAnnocationContainerElem.html("");
        }

        ko.applyBindings(new merlin.EditAnnotationComponent(component.feedback.annotations, annotation, cleanNode.bind(this, addAnnocationContainerElem)), addAnnocationContainerElem[0]);
    },

    clearAnnotations: function () {
        this.feedback.annotations([]);
    },

    hideAnnotations: function () {
        this.showAnnotation(false);
        this.showAnnotationContent("");
    },

    highlightRange: function (annotationDto, index) {
        var newNode = document.createElement("div");
        newNode.className = "annotation"
        newNode.setAttribute(
            "style",
            "background-color: yellow; display: inline;"
        );
        newNode.setAttribute("data-bind", "hintAnnotation: " + ko.toJSON(annotationDto.annotation.peek().classificationData) + ", click: editAnnotation.bind(this, " + index + "), clickBubble: false");
        annotationDto.range.surroundContents(newNode);
    }
}

ko.components.register("feedback", {
    viewModel: FeedbackComponent,
    template: {
        element: "feedback-component-template"
    }
});