
import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function receivedMessageChatGpt(message: string) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message.content);
    return chatCompletion.choices[0].message.content;
}
