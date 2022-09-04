/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * Created by rodley on 2/21/2017.
 */


(function () {
    exports.formattedTemperature = function (temperatureMonitoredSensor) {
        let ret = {};
        let config = require("../../config/locals.js");
        let sprintf = require("sprintf-js").sprintf, vsprintf = require("sprintf-js").vsprintf;

        if (temperatureMonitoredSensor) {
            if (temperatureMonitoredSensor.units === 'METRIC' &&
                config.getLocals(false).units === 'IMPERIAL') {
                ret.value = sprintf("%.1f", (temperatureMonitoredSensor.value * 9 / 5) + 32);
            }
            else if (temperatureMonitoredSensor.units === 'IMPERIAL' &&
                config.getLocals(false).units === 'METRIC') {
                ret.value = sprintf("%.1f", (temperatureMonitoredSensor.value - 32) * 5 / 9);
            }
            else if (temperatureMonitoredSensor.units === 'METRIC' && config.getLocals(false).units === 'METRIC') {
                ret.value = sprintf("%.1f", temperatureMonitoredSensor.value);
                ret.units = "C";
            }
            else if (temperatureMonitoredSensor.units === 'IMPERIAL' && config.getLocals(false).units === 'IMPERIAL' ){
                ret.value = sprintf("%.1f", temperatureMonitoredSensor.value);
                ret.units = 'F';
            }
        }
        return ( ret );
    }
}).call(this);

(function () {
    exports.formattedWaterLevel = function (waterLevelMonitoredSensor) {
        var ret = {};
        var config = require("../../config/locals.js");
        var sprintf = require("sprintf-js").sprintf,
            vsprintf = require("sprintf-js").vsprintf;

        var gallons_per_inch = config.getLocals(false).tubvolume / config.getLocals(false).tubdepth;
        var gallons = (config.getLocals(false).tubdepth - (waterLevelMonitoredSensor.value / 2.54)) * gallons_per_inch;
        if (gallons < 0)
            return ( 'EMPTY' );
        else
            return ( sprintf("%.1f gallons", gallons));
    }
}).call(this);

(function () {
    exports.formattedAtmosphericPressure = function (airPressureMonitoredSensor) {
        var ret = {};
        var config = require("../../config/locals.js");
        var sprintf = require("sprintf-js").sprintf,
            vsprintf = require("sprintf-js").vsprintf;
        return ( sprintf("%.1f %s", airPressureMonitoredSensor.value, airPressureMonitoredSensor.units));
    }
}).call(this);

