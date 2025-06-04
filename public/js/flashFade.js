const flashMsg = document.querySelectorAll('.flash');

document.addEventListener('DOMContentLoaded', () => {
    if(flashMsg) {
        for(msg of flashMsg) {
            if(msg) {
                setTimeout(() => {
                    msg.style.display = 'none';
                }, 4000);
            }
        }
    }
})