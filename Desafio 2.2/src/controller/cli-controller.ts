import ConversionWrapper from "../model/ConversionWrapper";
import fetchConversion from "../model/fetcher";

class CLIController {
    executeRequest(request:ConversionWrapper):Promise<any> {
        return fetchConversion(request.from, request.to, request.value);
    }
}

export default CLIController;