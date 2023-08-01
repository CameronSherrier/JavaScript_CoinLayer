const cryptoList = 'http://api.coinlayer.com/list?access_key=0831eac5f4fca47bc779beaa36e028a3'
const cryptoLiveData = 'http://api.coinlayer.com/live?access_key=0831eac5f4fca47bc779beaa36e028a3'

async function getMyData() {
    try {
        const response_list = await fetch(cryptoList);
        if (!response_list.ok) {
            throw new Error(`Uhh, something went wrong here. Response wasn't good sire. Status Code: ${response.status}`);
        };
        const data_list = await response_list.json();
        console.log(data_list);

        const response_live_data = await fetch(cryptoLiveData);
        if (!response_live_data.ok) {
            throw new Error(`We couldn't get the live data for sum reason. Status Code: ${response.status}`);
        };
        const data_live = await response_live_data.json();
        console.log(data_live);

        return { data_list, data_live };
    } catch (error) {
        console.error('There was a problem fetching this info:', error);
    };
}

async function buildTable() {
    try {
        const { data_list, data_live } = await getMyData();

        const table = document.createElement('table');
        const headerRow = table.insertRow();
        const headers = ['Currency', 'Rate', 'Name', 'Symbol', 'Full Name', 'Max Supply'];
        headers.forEach(headerText => {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = headerText
        });

        for (const currency in data_list.crypto) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            const cell4 = row.insertCell();
            const cell5 = row.insertCell();
            const cell6 = row.insertCell();
            cell1.textContent = currency;
            cell2.textContent = data_live.rates[currency];

            const cryptoInfo = data_list.crypto[currency];
            cell3.textContent = cryptoInfo.name;
            cell4.textContent = cryptoInfo.symbol;
            cell5.textContent = cryptoInfo.name_full;
            cell6.textContent = cryptoInfo.max_supply;
        }

        document.body.appendChild(table);
    } catch (error) {
        console.log('There was a problem building the table:', error);
    }
}
buildTable();