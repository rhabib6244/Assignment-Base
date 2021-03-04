async function windowActions() {
    console.log("Window loaded")
    const form = document.querySelector(".userform");
    const search = document.querySelector("#category");

    const request = await fetch('/api')
    const data = await request.json()

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("submit fired");
        const display = data.filter((record) => record.category.toUpperCase() === search.value.toUpperCase());

        console.log(display);
        console.table(display);
    }) 

    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
    });
}

window.onload = windowActions;