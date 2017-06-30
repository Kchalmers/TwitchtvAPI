function TwitchViewer() {
    const channels = ["beyondthesummit", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
    const self = this;


    this.getChannelStatus = function () {
        channels.forEach(function (channel) {
            let newRow = document.createElement('div');
            newRow.className = "row";
            $.getJSON(`https://wind-bow.gomix.me/twitch-api/streams/${channel}?callback=?`, function (stream) {
                let status = document.createElement('div');
                status.className = "col";
                status.innerHTML= "offline";
                $.getJSON(`https://wind-bow.gomix.me/twitch-api/channels/${channel}?callback=?`, function (channel) {
                    console.log("channel ", channel);
                    let name = document.createElement('div');
                    name.className = "col";
                    if(channel.display_name) {
                        let a = document.createElement('a');
                        a.href =  `${channel.url}`;
                        a.target = "_blank";
                        a.innerHTML = channel.display_name;
                        name.append(a);
                    }
                    else {
                        name.innerHTML = "Does not Exist";
                        status.innerHTML= "Does not Exist";
                    }
                    if(stream.stream !== null){
                        let message = document.createElement('div');
                        message.className = "message";
                        status.innerHTML = "online ";
                        message.innerHTML = `Status: ${channel.status}`;
                        status.append(message);
                    }
                    newRow.append(name, status);
                    $(".channelTable").append(newRow);
                });
            });
        });
    }
}

$(document).ready(function () {
   const twitch = new TwitchViewer();
   twitch.getChannelStatus();
});