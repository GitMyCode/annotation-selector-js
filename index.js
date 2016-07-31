

var ViewModel = function () {
    var that = this;
    this.annotations = ko.observableArray();

    $("#comment-id").bind("mouseup", that.highlightSelection);

}

ViewModel.prototype = {
    showAnnotations: function () {
        var newNode = document.createElement("div");
        newNode.innerHTML = document.getElementById("comment-id").innerHTML;
        var highlightAnnotations = [];
        $.each(annotations, function (i, val) {
            var range = document.createRange();
            var textNode = newNode.childNodes[0];
            range.setStart(textNode, val.start);
            range.setEnd(textNode, val.end);

            highlightAnnotations.push(range);
        });

        $.each(highlightAnnotations, function (i, val) {
            highlightRange(val);
        });

        hideAnnotations();
        document.getElementById("annotations-container").appendChild(newNode);

    },
    clearAnnotations: function () {
        annotations = [];
    },

    hideAnnotations: function () {
        document.getElementById("annotations-container").innerHTML = "";
    },

    highlightSelection: function () {
        console.log("selection detected");
        var selection = (document.all) ? document.selection.createRange().text : document.getSelection();
        if (!selection.isCollapsed &&
            selection.getRangeAt(0).startContainer.parentNode.className === "comments") {

            console.log(selection);
            var selectionRange = selection.getRangeAt(0);

            annotations.push({
                text: selection.toString(),
                start: selectionRange.startOffset,
                end: selectionRange.endOffset,
                commentElement: selection.getRangeAt(0).startContainer.parentNode
            });
        }
    },

    highlightRange: function (range) {
        var newNode = document.createElement("div");
        newNode.setAttribute(
            "style",
            "background-color: yellow; display: inline;"
        );
        range.surroundContents(newNode);
    }
}

ko.applyBindings(new ViewModel());

// document.onmouseup = highlightSelection
// if (!document.all) document.captureEvents(Event.MOUSEUP);