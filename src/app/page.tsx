"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { ChatOpenAI } from "@langchain/openai";
import chain from "./utils/langchain";

import { useState } from "react";


import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { OpenAI } from "@langchain/openai";
import type { PromptTemplate } from "@langchain/core/prompts";

const tools = [new TavilySearchResults({ 
  apiKey: "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",
  maxResults: 1 
})];

export default function Home() {
  const [answer, setAnswer] = useState<any>({})
  const makeASong = async () => {
    const prompt = await pull<PromptTemplate>("hwchase17/react");
    const llm = new OpenAI({
        openAIApiKey: "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",
      //   modelName: "gpt-3.5-turbo-instruct",
        temperature: 0,
      });

    const agent = await createReactAgent({
      llm,
      tools,
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
    });
    
    const ans = await agentExecutor.invoke({
      input: "Write a song for me with 5 stanzas 1 chorus and 1 coda.",
    });
    setAnswer(ans);
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button onClick={() => {makeASong()}}>Generate a song</button>
        <h1>Robot Says : </h1>
        <div>
          {answer.output}
        </div>
      </div>
    </main>
  );
}
