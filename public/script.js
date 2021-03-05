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
            const linebreak = '\r\n'
            const html = display.map(place => {
            return (`
              <li>
              <span class='name'>${place.name} </span> 
              <span class='category'>${place.category}</span>
              <span class='address'>${place.address_line_1}</span>
              <span class='location'>${place.city}, ${place.state}</span>
              <span class='zip'>${place.zip}</span>
              </li>
            `);
    })

    targetList.innerHTML = html;
            //appendItem.innerText = (item.name + "\n" + item.category + "\n" + item.address_line_1 + "\n" + item.city + ", " + item.state + "\n" + item.zip);         

            //console.log(appendItem)
            //targetList.append(appendItem)
        })
        console.log(display);
        console.table(display);
    }) 

    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
    });
}

window.onload = windowActions;