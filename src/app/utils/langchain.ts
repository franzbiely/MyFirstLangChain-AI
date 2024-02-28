// import { LangChain } from 'langchain';
// import Agent_Musician from '../agents/agent_musician';
// import Agent_Writer from '../agents/agent_writer';
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { OpenAI } from "@langchain/openai";
import type { PromptTemplate } from "@langchain/core/prompts";

const tools = [new TavilySearchResults({ maxResults: 1 })];


// Get the prompt to use - you can modify this!
// If you want to see the prompt in full, you can at:
// https://smith.langchain.com/hub/hwchase17/react
const prompt = await pull<PromptTemplate>("hwchase17/react");

const llm = new OpenAI({
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

const result = await agentExecutor.invoke({
  input: "what is LangChain?",
});

// const chain = new LangChain()
//   .add(new Agent_Writer(), { name: "agent_writer" })
//   .add(new Agent_Musician(), { name: "agent_musician" });

// export default chain;