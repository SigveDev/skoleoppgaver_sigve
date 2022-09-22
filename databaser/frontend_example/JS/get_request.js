function updateRequest() {
    console.log("funker");
    var fornavn = document.getElementById("fnameChange").value;
    console.log(fornavn);

    fetch('http://localhost:3000/' + fornavn + '/change')
        .then((response) => response.json())
        .then((data) => console.log(data));
}

function deleteRequest() {
    console.log("funker");
    var fornavn = document.getElementById("fnameDelete").value;
    console.log(fornavn);

    fetch('http://localhost:3000/' + fornavn + '/delete')
        .then((response) => response.json())
        .then((data) => console.log(data));
}

function getRequest() {
    console.log("funker");
    var fornavn = document.getElementById("fnameGet").value;
    console.log(fornavn);

    fetch('http://localhost:3000/' + fornavn + '/get')
        .then((response) => response.json())
        .then(
            
            data => {
                console.log(data);
                if (data.length > 0) {
        
                  var temp = "";
                  data.forEach((itemData) => {
                    temp += "<tr><th> ID </th><th> Fornavn </th><th> Etternavn </th><th> Klasse </th><th> Hobby </th><th> Kjønn </th><th> Datamaskin </th></tr>";
                    temp += "<tr>";
                    temp += "<td>" + itemData.ElevID + "</td>";
                    temp += "<td>" + itemData.Fornavn + "</td>";
                    temp += "<td>" + itemData.Etternavn + "</td>";
                    temp += "<td>" + itemData.Klasse + "</td>";
                    temp += "<td>" + itemData.Hobby + "</td>";
                    temp += "<td>" + itemData.Kjonn + "</td>";
                    temp += "<td>" + itemData.Datamaskin + "</td></tr>";
                  });
                  document.getElementById('getTable').innerHTML = temp;
                }
            }
        );
}