document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#formData').onsubmit = function(event) {
        event.preventDefault();

        const date = document.querySelector("#date").value;
        const amount = document.querySelector("#amount").value;
        const currencyFrom = document.querySelector("#currencyFrom").value;
        const currencyTo = document.querySelector("#currencyTo").value;

        // https://cors-anywhere.herokuapp.com/
        fetch(`http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const xmlData = xml.getElementsByTagName("Cube")

            for (let i = 0; i < xmlData.length; i++) {

                if (xmlData[i].getAttribute('time') === date) {
                    const xmlData2 = xmlData[i];
                    const xmlData3 = xmlData2.getElementsByTagName("Cube");

                    const rateOne = () => {
                        for (let j = 0; j < xmlData3.length; j++) {
                            if (xmlData3[j].getAttribute('currency') === currencyFrom) {

                                const currency = xmlData3[j].getAttribute('currency');
                                const rate = xmlData3[j].getAttribute('rate');
                                const CurrencyFrom = document.querySelector('#currencyOne');
                                const RateOne = document.querySelector('#rateOne');
                                CurrencyFrom.textContent = currency;
                                RateOne.textContent = rate;
                                return rate
                            };
                        }
                    };

                    const rateTwo = () => {
                        for (let j = 0; j < xmlData3.length; j++) {
                            if (xmlData3[j].getAttribute('currency') === currencyTo) {

                                const currency = xmlData3[j].getAttribute('currency');
                                const rate = xmlData3[j].getAttribute('rate');
                                const CurrencyTo = document.querySelector('#currencyTwo');
                                const RateTwo = document.querySelector('#rateTwo');
                                CurrencyTo.textContent = currency;
                                RateTwo.textContent = rate;
                                return rate
                            };
                        };
                    };
                    const rate = (Math.floor(((rateOne() / rateTwo()) * amount)* 100) / 100).toFixed(2);
                    document.querySelector('#rate').innerHTML = `${currencyFrom} ${rate}`;
                };
            };
        });
    };
        //  .catch(console.error);
        // open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security
});

