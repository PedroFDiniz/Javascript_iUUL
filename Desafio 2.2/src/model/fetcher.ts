import fetch from 'node-fetch';

type ConversionResponse = {
    motd: {
        msg: string;
        url: string;
    },
    success: boolean,
    query: {
        from: string,
        to: string
        amount: number
    },
    info: {
        rate: number
    },
    historical: false,
    date: string
    result: number
}

async function fetchConversion(inputCurrency:string, outputCurrency:string, value: number): Promise<any> {
    try {
        let link: string = "https://api.exchangerate.host/convert?" + new URLSearchParams({
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

        const result = (await response.json()) as ConversionResponse;
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

// fetchConversion("BRL","USD",1000).then( (result) => { console.log(result.result) } );
export default fetchConversion;