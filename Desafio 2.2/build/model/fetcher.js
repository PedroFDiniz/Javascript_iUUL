import fetch from 'node-fetch';


async function getResponse(inputCurrency, outputCurrency, value) {
    try {
        let link = "https://api.exchangerate.host/convert?" + new URLSearchParams({
            from: inputCurrency,
            to: outputCurrency,
            amount: String(value),
        }).toString();
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw Error("Error! Status: " + response.status);
        }

        const result = (await response.json());
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

getResponse("BRL","JPY",1000).then(function(result) {
    console.log(result.result);
});