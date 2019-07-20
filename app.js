
$(".state").click(function () {
    state = $(this).text();
    var queryRobbery = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/robbery/offense/states/" + state + "/count?api_key=CMQzjoaW3P43pwPkMnWzLcqwhlVQXZcJeo8rrktf";

    $.ajax({
        url: queryRobbery,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $(".robbery").html(
            "<h2> Robbery </h2> <h3> Incident Count " + response.results[response.results.length - 1].incident_count + "</h3>"
            + "<h3> Offense Count " + response.results[response.results.length - 1].offense_count + "</h3>" +
            "<h3> Year " + response.results[response.results.length - 1].data_year + "</h3>");
    })

    var queryRape = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/rape/offense/states/" + state + "/count?api_key=CMQzjoaW3P43pwPkMnWzLcqwhlVQXZcJeo8rrktf"

    $.ajax({
        url: queryRape,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        // console.log(url);
        // console.log(response);
        console.log(response.results.length)

        $(".rape").html(
            "<h2> Rape </h2> <h3> Incident Count " + response.results[response.results.length - 1].incident_count + "</h3>"
            + "<h3> Offense Count " + response.results[response.results.length - 1].offense_count + "</h3>" +
            "<h3> Year " + response.results[response.results.length - 1].data_year + "</h3>");
    });
});

$(".dropdown-item").click(function (e) {
    e.preventDefault();
})

$("#submit").click(function (event) {
    event.preventDefault();
    var departure = $(".departure option:selected").val()
    var arrival = $(".arrival option:selected").val()
    var date = $("input[type='date']").val()
    var queryURL = "https://csa-proxy.herokuapp.com/flights/" + departure + "/" + arrival + "/" + date

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": "Bearer ",
        }
    }
    $("#flightData").empty()
    console.log("fetchingresults")
    $.ajax(settings)
        .then(function (test) {

            var flightArray = test.ScheduleResource.Schedule;
            console.log(flightArray)

            for (var i = 0; i < 5; i++) {
                var arrivalCode = flightArray[i].Flight.Arrival.AirportCode
                var departureCode = flightArray[i].Flight.Departure.AirportCode
                var arrivalTime = flightArray[i].Flight.Arrival.ScheduledTimeLocal.DateTime
                var departureTime = flightArray[i].Flight.Departure.ScheduledTimeLocal.DateTime
                if (arrivalCode && departureCode && arrivalTime && departureTime) {
                    $("#flightData").append(`
                    <tr>
                    <td> ${departureCode} </td>
                    <td> ${departureTime} </td>
                    <td> ${arrivalCode} </td>
                    <td> ${arrivalTime} </td>
                    </tr>
                    `)
                }

            }

        })

});



