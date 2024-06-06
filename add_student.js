import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        const atudent = JSON.parse(event.body);
        
        const nuevoEstudiante = {
            ...student,
            id: randomUUID(),
        };
        await ddbDocClient.send(new PutCommand({
            TableName: "students",
            Item: nuevoEstudiante,
        }));

        return {
            statusCode: 201,
            body: JSON.stringify(nuevoEstudiante),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
