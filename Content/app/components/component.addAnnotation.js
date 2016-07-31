(function () {
    merlin.AddAnnotationComponent = function (annotations, selectionData, callback) {
        this.selectionData = selectionData;
        this.annotations = annotations;
        this.callback = callback;
        this.classificationData = {
            comment: ko.observable(),
            theme: ko.observable()
        }

        this.themeOptions = [{
            value: "Satisfaction",
            text: "Satisfaction"
        },
            {
                value: "RelationShip with manager",
                text: "RelationShip with manager"
            }];
    }

    merlin.AddAnnotationComponent.prototype = {
        save: function () {
            this.annotations.push({
                selectionData: this.selectionData,
                classificationData: this.classificationData
            });

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