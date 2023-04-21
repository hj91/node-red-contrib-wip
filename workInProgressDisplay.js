module.exports = function(RED) {
    "use strict";

    function workInProgressDisplay(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        this.topic = config.topic;

        this.on("input", function(msg) {
            if (msg.hasOwnProperty("payload") && typeof msg.payload === 'object') {
                var startTime = msg.payload.start_time;
                var stopTime = msg.payload.stop_time;
                var duration = msg.payload.duration;

                if (!startTime || !stopTime || !duration) {
                    node.error("Invalid payload: " + JSON.stringify(msg.payload));
                    return;
                }

                var message = `Work started at ${startTime} and ended at ${stopTime}. The total duration was ${duration.toFixed(2)} seconds.`;
                
                msg.payload = message;

                // overwrite topic if configured
                if (node.topic) {
                    msg.topic = node.topic;
                }

                node.send(msg);
            } else {
                node.error("Invalid payload: " + JSON.stringify(msg.payload));
            }
        });
    }

    RED.nodes.registerType("workInProgressDisplay", workInProgressDisplay);
};

