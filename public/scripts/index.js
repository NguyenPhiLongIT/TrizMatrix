function updateAnswers() {
    // Get the selected values
    const goodOption = parseInt(document.getElementById("goodOption").value);
    const badOption = parseInt(document.getElementById("badOption").value);
    console.log(goodOption, badOption);

    // Send an AJAX request to the server
    fetch("/get-answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ goodOption, badOption }),
    })
        .then((response) => response.text())
        .then((data) => {
            // Update the page with the received data
            document.querySelector(".improvements").innerHTML =
                "<h3>Kết quả</h3>" + data;
        });
}

function clearNone_goodOption() {
    var dropdown = document.getElementById("goodOption");
    var noneOption = dropdown.options[0];
    console.log("🚀 ~ clearNone_goodOption ~ noneOption:", noneOption)

    if (dropdown.value !== "0") {
        noneOption.style.display = "none";
    } else {
        noneOption.style.display = "block";
    }
}

function clearNone_badOption() {
    var dropdown = document.getElementById("badOption");
    var noneOption = dropdown.options[0];
    console.log("🚀 ~ clearNone_baddOption ~ noneOption:", noneOption)

    if (dropdown.value !== "0") {
        noneOption.style.display = "none";
    } else {
        noneOption.style.display = "block";
    }
}
