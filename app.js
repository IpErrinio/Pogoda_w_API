const apiKey = 'a5a1af19216ee28a248421b379db487b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
let searchHistory = [];

function pobierzPogode() {
    const wprowadzoneMiasto = prompt('Podaj miasto:');
    
    if (wprowadzoneMiasto) {
        searchHistory.push(wprowadzoneMiasto);
        const url = `${apiUrl}?q=${wprowadzoneMiasto}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => wyswietlPogode(data))
            .catch(error => {
                console.error('Błąd podczas pobierania danych pogodowych:', error);
            });
    } else {
        alert('Proszę podać miasto!');
    }
}

function wyswietlPogode(data) {
    const lokalizacja = document.getElementById('location');
    const ikona = document.getElementById('weather-icon');
    const temperatura = document.getElementById('temperature');
    const opis = document.getElementById('description');
    const refreshMessage = document.getElementById('refresh-message');

    lokalizacja.textContent = data.name + ', ' + data.sys.country;
    ikona.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Ikona Pogody">`;
    temperatura.textContent = `${data.main.temp} °C`;
    opis.textContent = data.weather[0].description;

    refreshMessage.textContent = 'Naciśnij F5, aby wprowadzić nowe miasto bo nie chce mi sie programować wyszukiwarki.';
    refreshMessage.style.display = 'block';
}

pobierzPogode();
