const inputs = document.querySelectorAll('.input');
const button = document.querySelector('input[type=submit]');

console.log(button);

for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', (e) => {
        if(e.target.value.length > 0) {
            button.classList.remove('disabled');
            button.classList.add('able');
        } else {
            button.classList.remove('able');
            button.classList.add('disabled');
        }
    });
}
