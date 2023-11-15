import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: String
    llmResponse?: any
}

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<Data>) {
        if(req.method !== "POST") {
            return res.status(405).send({message: "Only POST requests are allowed"});
        }

        const headers = {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${process.env.GET_API_KEY}`
        }
        
        const reponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers,
            body : JSON.stringify({
                    "model" : "gpt-3.5-turbo",
                    "messages": [
                        {
                            "role": "system", 
                            "content": `Act like an experienced chef who knows how to cook every single cuisine in the world. If the mentioned cuisine or food isn't recognizable, please state that it's not a known cuisine or food without further explanation. If it is food just give the instructions do not add anything extra in the response.`
                        },
                        {
                            "role": "user", 
                            //"content": `Act like an experienced chef who knows how to cook every single cuisine in the world. Please provide detailed step-by-step instructions on how to cook ${req.body.dish}. If the mentioned cuisine or food isn't recognizable, please state that it's not a known cuisine or food without further explanation. If it is food just give the instructions do not add anything extra in the response.`
                            // "content": `Recipe to cook ${req.body.dish}`
                            "content": `Please provide detailed step-by-step instructions on how to cook ${req.body.dish}.`
                        }
                    ],
                    "temperature" : 0.2,
                    "max_tokens" : 500
            })

        })

        const llmResponse = await reponse.json();

        res.json({
            message:"Success",
            llmResponse
        })

}