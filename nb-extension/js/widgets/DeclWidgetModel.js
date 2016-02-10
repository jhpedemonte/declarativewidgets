// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

define([
    'jupyter-js-widgets'
], function(Widgets) {
    "use strict";

    /**
     * Collection of patches on top of ipywidgets.WidgetModel
     */

    var DeclWidgetModel = function(widget_manager, model_id, comm) {
        Widgets.WidgetModel.apply(this, arguments);
    };

    DeclWidgetModel.prototype = Object.create(Widgets.WidgetModel.prototype);

    /*
     * Making request_state a noop to avoid requiring this handshake to take place to create model.
     */
    DeclWidgetModel.prototype.request_state = function(callbacks) {
        console.trace( "Empty implementation of request_state()")
        return Promise.resolve(this);
    };

    /*
     * Avoiding out of sequence messages due to new promise/async code in ipywidgets.WidgetModel
     */
    DeclWidgetModel.prototype.send_sync_message = function(attrs, callbacks) {
        var data = {method: 'backbone', sync_data: attrs};
        this.comm.send(data, callbacks);
    };

    Widgets.ManagerBase.register_widget_model('DeclWidgetModel', DeclWidgetModel);

    return DeclWidgetModel;

});
