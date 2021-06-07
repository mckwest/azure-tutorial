import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    if (name) {
        // create a random ID
        const id = new Date().toISOString() + Math.random().toString().substr(2, 8)
        context.bindings.outputDocument = JSON.stringify({
            id,
            name
        });
        context.bindings.msg = (req.query.name || req.body.name);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a name in the query string or request body"
        }
    }

};

export default httpTrigger;