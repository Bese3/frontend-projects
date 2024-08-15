
const myUrl = 'https://projects-vm2m.onrender.com/discover-ze-world/'

const myButton = document.querySelector('.btn-search');
const myEvent =  () => {
    let name = document.getElementById('search').value;
    document.getElementById('search').value = '';
    console.log(name);
    if (name) {
        window.location.href = `${myUrl}name/${name}`;
        console.log(location)
        const myHtml = `<div class="loading-dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>`
        myButton.innerHTML = myHtml;
    }
}
myButton.addEventListener('click', myEvent);
const inputField = document.getElementById('search');
// inputField.addEventListener('keydown', myEvent);


document.querySelectorAll('.search-item').forEach(item => {
    item.addEventListener('click', function() {
        const countryName = this.getAttribute('data-country');
        window.location.href = `${myUrl}results/${countryName}`;
    });
});
