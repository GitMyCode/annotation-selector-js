

(function () {
    require("./index.css")

    merlin = {
    }

    merlin.app = function () {
        var that = this;
        this.feedbacks = ko.observableArray();
        this.feedbacks.push(
            {
                content: ' In software, a stack overflow occurs when too much memory is used on the call stack. The call stack contains a limite',
                annotations: ko.observableArray()
            });
        this.feedbacks.push(
            {
                content: 'Machine learning is a subfield of computer science (more particularly soft computing and granular computing) that evolved from the study of pattern recognition and computational learning theory in artificial intelligence.',
                annotations: ko.observableArray()
            })

        // $("#comment-id").bind("mouseup", that.highlightSelection);

    }
    merlin.app.prototype = {

    }
})();

// document.onmouseup = highlightSelection
// if (!document.all) document.captureEvents(Event.MOUSEUP);