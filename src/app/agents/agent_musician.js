import { Agent } from 'langchain';

export default class Agent_Musician extends Agent {
  async run(context, input) {
    // Process the input here
    console.log("The musician received:", input);

    // Access the output from Agent 1
    const agent1Output = context.get("agent_writer_output");

    // Return a response based on both inputs
    return `From the peom created by the writer which is : ${agent1Output}\n Modify it a bit to make it musical with chords, chorus and verses. You must follow the usual pop chord progression.`;
  }
}
