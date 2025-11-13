// API for our resources
exports.api = function(req, res) {
    res.write('[');
    res.write('{"resource":"artifacts", "verbs":["GET","PUT","DELETE"]}');
    res.write(']');
    res.send();
};

