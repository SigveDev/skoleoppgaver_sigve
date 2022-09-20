function updateRequest() {
    console.log("funker");
    var fornavn = document.getElementById("fname").value;
    var hobby = document.getElementById("hobby").value;
    console.log(fornavn);
    console.log(hobby);

    fetch('http://localhost:3000/' + fornavn)
        .then((response) => response.json())
        .then((data) => console.log(data));
}

function deleteRequest() {
    console.log("funker");
    var fornavn = document.getElementById("fname").value;
    console.log(fornavn);

    fetch('http://localhost:3000/' + fornavn)
        .then((response) => response.json())
        .then((data) => console.log(data));
}