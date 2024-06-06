import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        // Realizar una solicitud de escaneo a la tabla "students"
        const data = await ddbDocClient.send(new ScanCommand({
            TableName: "students"
        }));

        // Extraer los elementos de la respuesta
        const students = data.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(students),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
