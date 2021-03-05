async function windowActions() {
    console.log("Window loaded")
    const form = document.querySelector(".userform");
    const search = document.querySelector("#category");
    const targetList = document.querySelector('.target-list')

    const request = await fetch('/api')
    const data = await request.json()

   

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("submit fired");
        const display = data.filter((record) => record.category.toUpperCase() === search.value.toUpperCase());
        while (targetList.firstChild) {
            targetList.removeChild(targetList.firstChild)
          };
        display.forEach((item) => {
            const appendItem = document.createElement("li");
            appendItem.innerText = (item.name + "\n" + item.category + "\n" + item.address_line_1 + "\n" + item.city + ", " + item.state + "\n" + item.zip);
            targetList.append(appendItem);
        })
        console.log(display);
        console.table(display);
    }) 

    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
    });
}

window.onload = windowActions;