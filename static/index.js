$(function() {
    var ws_scheme = window.location.protocol == "https:"
        ? "wss"
        : "ws";
    var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + '/calculate' + window.location.pathname);

    chatsock.onmessage = function(message) {
        var data = JSON.parse(message.data);
        var chat = $("#results")
        var ele = $('<tr></tr>')

        ele.append($("<td></td>").text(data.timestamp))
        ele.append($("<td></td>").text(data.owner))
        ele.append($("<td></td>").text(data.input))
        ele.append($("<td></td>").text(data.result))

        chat.append(ele)
    };

    $("#calculatorForm").on("submit", function(event) {
        var message = {
            owner: $('#handle').val(),
            entry: $('#calculatorInput').val()
        }
        chatsock.send(JSON.stringify(message));
        $("#calculatorInput").val('').focus();
        return false;
    });
});