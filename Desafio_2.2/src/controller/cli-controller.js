import fetchConversion from "../model/fetcher";
class CLIController {
    executeRequest(request) {
        return fetchConversion(request.from, request.to, request.value);
    }
}
export default CLIController;
