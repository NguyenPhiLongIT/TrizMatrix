function updateAnswers() {
    // Get the selected values
    const goodOption = document.getElementById("goodOption").value;
    const badOption = document.getElementById("badOption").value;
    console.log(goodOption, badOption);

    // Send an AJAX request to the server
    fetch('/get-answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goodOption, badOption }),
    })
        .then(response => response.text())
        .then(data => {
            // Update the page with the received data
            document.querySelector('.improvements').innerHTML = '<h3>Kết quả</h3>' + data;
        });
}
