
function showFlashMessage(message) {
    const flashMessage = document.getElementById('flash-message');
    flashMessage.textContent = message;
    flashMessage.classList.remove('hidden');
    flashMessage.classList.add('show');

    // Hide the message after 3 seconds
    setTimeout(() => {
        flashMessage.classList.remove('show');
        flashMessage.classList.add('hidden');
    }, 3000);
}


const myUrl = 'https://projects-vm2m.onrender.com/discover-ze-world/'

const myButton = document.querySelector('.btn-search');
const myEvent =  () => {
    let name = document.getElementById('search').value;
    console.log(name);
    if (name == null || name == ""){
        showFlashMessage("Enter a Valid Name");
        return
    }
    document.getElementById('search').value = '';
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
const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); //
        console.log('Enter key pressed');
        myEvent()
    }
};
inputField.addEventListener('keydown', handleKeyDown);


document.querySelectorAll('.search-item').forEach(item => {
    item.addEventListener('click', function() {
        const countryName = this.getAttribute('data-country');
        window.location.href = `${myUrl}results/${countryName}`;
    });
});
