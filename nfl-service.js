var PlayersService = function (endpointUri, callback) {
    var playersData = []
    var myTeam = localStorage.getItem('myTeam') || []
    var getData = []
    var playerCards = []

    function loadPlayersData() {

        var localData = localStorage.getItem('playersData')
        if (localData) {
            playersData = JSON.parse(localData)
            return
        }

        var url = "//bcw-getter.herokuapp.com/?url="
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri)

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
        })
    }

    this.searchName = function (obj, cb) {
        playerCards = []
        getData = localStorage.getItem('playersData')
        getData = JSON.parse(getData)
        if (obj.name != "") {
            getData.forEach(function (player) {
                if (player.fullname == obj.name) {
                    playerCards.push(player)
                }
            })
        }
        cb(playerCards)
    }

    this.searchTeam = function (obj, cb) {
        playerCards = []
        getData = localStorage.getItem('playersData')
        getData = JSON.parse(getData)
        if (obj.team != "") {
            getData.forEach(function (player) {
                if (player.pro_team == obj.team) {
                    playerCards.push(player)
                }
            })
        }
        cb(playerCards)
    }

    this.searchPosition = function (obj, cb) {
        playerCards = []
        getData = localStorage.getItem('playersData')
        getData = JSON.parse(getData)
        if (obj.position != "") {
            getData.forEach(function (player) {
                if (player.position == obj.position) {
                    playerCards.push(player)
                }
            })
        }
        cb(playerCards)
    }

    this.teamAdd = function (id) {
        var teamData = playersData.find(player => player.id === id)
        if (myTeam.indexOf(player) == -1) {
            myTeam.push(player)
        }
        localStorage.setItem('myTeam', JSON.stringify(myTeam))
    }

    this.teamRemove = function (id) {
        var teamData = playersData.find(player => player.id == id)
        var num = myTeam.indexOf(player)
        if (num != 1) {
            myTeam.splice(num, 1)
        }
    }

    this.getMyTeam = function () {
        return JSON.parse(JSON.stringify(myTeam))
    }
    loadPlayersData()

}