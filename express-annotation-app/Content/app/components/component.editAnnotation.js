(function () {
    merlin.EditAnnotationComponent = function (annotations, annotation,  callback) {
        this.annotations = annotations;
        this.annotation = annotation;
        this.callback = callback;
        this.classificationData = annotation.peek().classificationData

        this.themeOptions = [
            {
                value: "Satisfaction",
                text: "Satisfaction"
            }, {
                value: "RelationShip with manager",
                text: "RelationShip with manager"
            }];
    }

    merlin.EditAnnotationComponent.prototype = {
        save: function () {
            this.annotation({
                selectionData: this.selectionData,
                classificationData: this.classificationData
            })

            this._close();
        },

        cancel: function () {
            this._close();
        },

        _close: function () {
            this.callback();
        }
    }
})();