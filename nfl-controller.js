function PlayersController() {
    var playersService = new PlayersService()

    function getData(playersData) {
        var template = ''

        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i]
            console.log(player)
            template += `
                <div class="col-xs-3">
                    <div class="playerCard">
                        <div class="thumbnail">
                            <img src="${player.photo}" style="width:200px;height:200px">
                        </div>
                        <h5>${player.fullname}</h5>
                        <h5>${player.pro_team}</h5>
                        <h5>$${player.position}</h5>
                        <h5>#${player.jersey}</h5>
                        <button type="button" class="btn btn-default" onclick="app.controllers.controller.teamAdd(${player.id})">Add Player</button>
                    </div>
                </div>
            `
        }
        document.getElementById('players').innerHTML = template
    }

    getTeam = function () {
        var team = getMyTeam()

        var template = ''

        team.forEach(player => {
            template +=
                `
            <div class="col-xs-3">
                <div class="playerCard">
                    <div class="thumbnail">
                        <img src="${player.photo}" style="width:200px;height:200px">
                    </div>
                    <h5>${player.fullname}</h5>
                    <h5>${player.pro_team}</h5>
                    <h5>$${player.position}</h5>
                    <h5>#${player.jersey}</h5>
                    <button type="button" class="btn btn-default" onclick="app.controllers.controller.teamRemove(${player.id})>Remove Player</button>
                 </div>
            </div>
            `
        })
        document.getElementById('playersOnTeam').innerHTML = template
    }

    this.searchName = function (event) {
        var nameThing = {
            name: event.target.name.value,
        }
        playersService.searchName(nameThing, draw)
    }

    this.searchTeam = function (event) {
        var teamThing = {
            team: event.target.team.value,
        }
        playersService.searchTeam(teamThing, draw)
    }

    this.searchPosition = function (event) {
        var positionThing = {
            position: event.target.position.value,
        }
        playersService.searchPosition(positionThing, draw)
    }

    this.teamAdd = function (id) {
        playersService.teamAdd(id)
        getTeam()

    }
    this.teamRemove = function (id) {
        playersService.teamRemove(id)
        getTeam()
    }
}