

(function () {
    require("./index.css")

    merlin = {
    }
    console.log("sdfsdf")
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