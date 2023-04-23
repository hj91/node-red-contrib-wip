// Module for calculating work in progress time - ideally should be used in industrial applications
// workInProgress.js
// Release version - 0.0.1
// Release date - 21/04/2023, Pune

/**

 Copyright 2023 Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/

module.exports = function(RED) {
    "use strict";

    function workInProgress(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        this.topic = config.topic;
        let startTime = null;
        let stopTime = null;
        let durationInSeconds = null;

        function formatDate(date) {
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let year = date.getFullYear();
            return day + '-' + month + '-' + year;
        }

        function formatTime(date) {
            let hours = String(date.getHours()).padStart(2, '0');
            let minutes = String(date.getMinutes()).padStart(2, '0');
            let seconds = String(date.getSeconds()).padStart(2, '0');
            return hours + ':' + minutes + ':' + seconds;
        }

        this.on("input", function(msg) {
            if (msg.hasOwnProperty("payload")) {

                if (msg.topic === "reset" && msg.payload === true) {
                    startTime = null;
                    stopTime = null;
                    durationInSeconds = null;
                    return;
                }

                if (msg.topic === "start_time" && msg.payload === true) {
                    startTime = new Date();
                } else if (msg.topic === "stop_time" && msg.payload === true) {
                    if (startTime === null) {
                        node.error("Invalid sequence: Stop time received before start time.");
                        return;
                    }
                    
                    stopTime = new Date();
                    durationInSeconds = (stopTime - startTime) / 1000;
                } else if (msg.topic === "set" && msg.payload === true) {
                    if (startTime === null || stopTime === null) {
                        node.error("Invalid sequence: Start or stop time not set.");
                        return;
                    }

                    msg.payload = {
                        start_time: formatDate(startTime) + ' ' + formatTime(startTime),
                        stop_time: formatDate(stopTime) + ' ' + formatTime(stopTime),
                        duration: durationInSeconds
                    };

                    // overwrite topic if configured
                    if (node.topic) {
                        msg.topic = node.topic;
                    }

                    node.send(msg);
                } else {
                    node.error("Invalid payload or topic: " + JSON.stringify(msg.payload));
                }
            } else {
                node.error("Invalid payload: " + JSON.stringify(msg.payload));
            }
        });
    }

    RED.nodes.registerType("workInProgress", workInProgress);
};

