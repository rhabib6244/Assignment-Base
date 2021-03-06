async function windowActions() {
    console.log("Window loaded")
    const form = document.querySelector(".userform");
    const search = document.querySelector("#category");
    const targetList = document.querySelector('.target-list')

    const request = await fetch('/api')
    const data = await request.json()

   

    form.addEventListener('keyup', async (event) => {
        event.preventDefault();
        console.log("submit fired");
        const d = data.filter(
           ((record) => record.category.toUpperCase().includes(search.value.toUpperCase())))
        const display = d.reduce((unique, o) => {
          if(!unique.some(obj => obj.address_line_1 === o.address_line_1 && obj.city === o.city && obj.state === o.state)) {
            unique.push(o);
          } return unique;
        },[]);
        while (targetList.firstChild) {
            targetList.removeChild(targetList.firstChild)
          };
        display.forEach((item) => {
            const appendItem = document.createElement("li");
            const html = display.map(place => {
              return (`
              <li>
                <span class='name'>${place.name}</span> 
                <span class='category'>${place.category}</span>
                <span class='address'>${place.address_line_1}</span>
                <span class='location'>${place.city}, ${place.state}</span>
                <span class='zip'>${place.zip}</span>
              </li>
            `);
    })
        if (search.value.length === 0) {html.length = 0}
        else html.length = 75;
        targetList.innerHTML = html.join('');
        
        })
        console.log(display);
        console.table(display);
    }) 

    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
    });
}

window.onload = windowActions;