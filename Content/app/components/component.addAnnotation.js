(function () {
    merlin.AddAnnotationComponent = function (annotations, selectionData, callback) {
        this.selectionData = selectionData;
        this.annotations = annotations;
        this.callback = callback;

        this.comment = ko.observable();
    }

    merlin.AddAnnotationComponent.prototype = {
        save: function () {
            this.annotations.push({
                selectionData: this.selectionData,
                comment: this.comment.peek()
            });

            this._close();
        },

        cancel: function(){
            this._close();
        },

        _close: function(){
            this.callback();
        }
    }
})();