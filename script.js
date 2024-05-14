function playSound() {
    const audio = new Audio('https://dm0qx8t0i9gc9.cloudfront.net/watermarks/audio/BsTwCwBHBjzwub4i4/bell-game-show-chime-service-desk-two-fast-hits_G1RP3uEO_WM.mp3');
    audio.play();
}

function callNumber(page) {
    const numberSelect = document.getElementById('numberSelect');
    localStorage.setItem(`${page}Number`, numberSelect.value);
    localStorage.setItem('lastUpdated', `${page}_${Date.now()}`); // Broadcast changes
    playSound();
}

function saveTitle(page) {
    const titleInput = document.getElementById('title');
    localStorage.setItem(`${page}Title`, titleInput.value);
    localStorage.setItem('lastUpdated', `${page}Title_${Date.now()}`); // Broadcast changes
}

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.split('/').pop().replace('.html', '');
    if (['doctor', 'pharmacy'].includes(path)) {
        loadNumbers(path);
    } else if (path === 'display') {
        window.addEventListener('storage', function(event) {
            if (event.key.startsWith('doctor') || event.key.startsWith('pharmacy')) {
                updateDisplay();
            }
        });
        updateDisplay(); // Initial update
    }
});

function loadNumbers(page) {
    const numberSelect = document.getElementById('numberSelect');
    const prefix = page === 'doctor' ? 'S' : 'P';
    for (let i = 1; i <= 50; i++) {
        const option = document.createElement('option');
        option.value = option.text = `${prefix}${i < 10 ? '0' : ''}${i}`;
        numberSelect.appendChild(option);
    }
    numberSelect.value = localStorage.getItem(`${page}Number`) || `${prefix}01`;
}

function updateDisplay() {
    const doctorQueue = document.getElementById('doctorQueue');
    const pharmacyQueue = document.getElementById('pharmacyQueue');
    const doctorTitle = document.getElementById('doctorTitle');
    const pharmacyTitle = document.getElementById('pharmacyTitle');

    if (doctorQueue && pharmacyQueue && doctorTitle && pharmacyTitle) {
        doctorQueue.textContent = localStorage.getItem('doctorNumber') || 'S01';
        pharmacyQueue.textContent = localStorage.getItem('pharmacyNumber') || 'P01';
        doctorTitle.textContent = localStorage.getItem('doctorTitle') || 'Doctor Room';
        pharmacyTitle.textContent = localStorage.getItem('pharmacyTitle') || 'Pharmacy';
    }
}
