var form = document.getElementById("form_code");

form.addEventListener("submit", function(event){
    event.preventDefault();
    var input = document.getElementById("input_zip_code");
    var client = new XMLHttpRequest();
    client.open("GET", "http://api.zippopotam.us/" + input.value, true);
    client.onreadystatechange = function() {
        if(client.readyState == 4) {
            var object = JSON.parse(client.responseText);
            console.log(object);
            document.getElementById("code_details").textContent = "Postal Code: " + object['post code']
            document.getElementById("country_details").textContent = "Postal Code: " + object.country
            document.getElementById("countryAbb_details").textContent = "Postal Code: " + object['country abbreviation']
            var table_places = document.getElementById("table_details_places").getElementsByTagName('tbody')[0];
            for(var i in object.places){
                let new_row = table_places.insertRow();
                let name_cell = new_row.insertCell();
                let longitude_cell = new_row.insertCell();
                let state_cell = new_row.insertCell();
                let stateAbb_cell = new_row.insertCell();
                let latitude_cell = new_row.insertCell();
                let image_cell = new_row.insertCell();

                let name_place = document.createTextNode(object.places[i]['place name']);
                let longitude_place = document.createTextNode(object.places[i].longitude);
                let state_place = document.createTextNode(object.places[i].state);
                let stateAbb_place = document.createTextNode(object.places[i]['state abbreviation']);
                let latitude_place = document.createTextNode(object.places[i].latitude);
                let img = document.createElement('img');
                img.src = "../states/" + object.places[i]['state abbreviation'] + ".svg";
                name_cell.appendChild(name_place);
                longitude_cell.appendChild(longitude_place);
                state_cell.appendChild(state_place);
                stateAbb_cell.appendChild(stateAbb_place);
                latitude_cell.appendChild(latitude_place);
                image_cell.appendChild(img);
            }
        };
    };

    client.send();
});