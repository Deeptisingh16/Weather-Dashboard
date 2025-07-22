var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var apiKey = "21e787f2b678a61185dc50b205222ff1";
var getWeatherBtn = document.getElementById("getWeatherBtn");
var cityInput = document.getElementById("cityInput");
var weatherResult = document.getElementById("weatherResult");
getWeatherBtn === null || getWeatherBtn === void 0 ? void 0 : getWeatherBtn.addEventListener("click", function () {
    var cityName = cityInput === null || cityInput === void 0 ? void 0 : cityInput.value.trim();
    var cityRegex = /^[a-zA-Z\s]+$/;
    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }
    if (!cityRegex.test(cityName)) {
        alert("City name should contain only letters and spaces.");
        return;
    }
    fetchWeather(cityName);
});
var fetchWeather = function (city) { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!weatherResult)
                    return [2 /*return*/];
                weatherResult.innerHTML = "<p>Loading...</p>";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(encodeURIComponent(city), "&appid=").concat(apiKey, "&units=metric"))];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("City not found!");
                }
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                displayWeather(data);
                if (cityInput)
                    cityInput.value = "";
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                message = error_1 instanceof Error ? error_1.message : "An unknown error occurred.";
                weatherResult.innerHTML = "<p style=\"color: red;\">".concat(message, "</p>");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
function displayWeather(data) {
    var _a, _b, _c;
    if (!weatherResult)
        return;
    var name = data.name, main = data.main, weather = data.weather;
    var temp = main.temp;
    var humidity = main.humidity;
    var description = (_b = (_a = weather[0]) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "No description";
    var icon = "https://openweathermap.org/img/wn/".concat((_c = weather[0]) === null || _c === void 0 ? void 0 : _c.icon, "@2x.png");
    weatherResult.innerHTML = "\n    <h2>".concat(name, "</h2>\n    <p>").concat(temp, "\u00B0C - ").concat(description, "</p>\n    <p>Humidity - ").concat(humidity, "%</p>\n    <img src=\"").concat(icon, "\" alt=\"Weather icon\" />\n  ");
}
