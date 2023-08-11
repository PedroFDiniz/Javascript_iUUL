import fetchConversion from "../model/fetcher.js";
class CLIController {
    executeRequest(request) {
        return fetchConversion(request.from, request.to, request.value);
    }
}
export default CLIController;
