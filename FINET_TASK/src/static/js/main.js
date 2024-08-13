
const myUrl = 'http://localhost:5000/discover-ze-world/'

const myButton = document.querySelector('.btn-search');
const myEvent =  () => {
    let name = document.getElementById('search').value;
    document.getElementById('search').value = '';
    console.log(name);
    if (name) {
        window.location.href = `${myUrl}name/${name}`;
        const myHtml = `<div class="loading-dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>`
        myButton.innerHTML = myHtml;
    }
}
myButton.addEventListener('click', myEvent);
myButton.addEventListener('keypress', myEvent);