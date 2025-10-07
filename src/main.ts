import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime';

export async function setupAgentSubmit(
  button: HTMLButtonElement,
  input: HTMLInputElement,
  select: HTMLSelectElement
) {
  
  button.addEventListener('click', async () => {
    const userInstructions = input.value.trim();
    const userLevel = select.value;

    if (!userInstructions) {
      alert('Please enter instructions first.');
      return;
    }

    const agent = new RealtimeAgent({
      name: 'Assistant',
      instructions: `You are a helpful assistant for a Chinese learner at ${userLevel} level. You need to teach them the following vocabulary words. Use example sentences in a way that maximizes comprehensible input ${userInstructions}. In order to maximize language acquisition, you should use primarily Chinese to address the user, only using sparse english when absolutely necessary (especially at the lower levels, where studensts may not comprehend what you are saying.). if the user selects it's my first time learning chinese, use primarily english to introduce them to chinese, then wean off as necessary if the user selects in the range HSK1-2, you may use english to teach them their vocabulary, otherwise, primiarily use chinese.`,
    });

    const session = new RealtimeSession(agent);

    try {
      await session.connect({
        apiKey: 'ek_68e5413b4f4481919ac5f52439a8c472',
      });
      console.log(`Connected! (Level: ${userLevel})`);
      (session as any).on('event', (event: any) => {
  console.log('ALL EVENTS:', event);
});



    } catch (e) {
      console.error(e);
    }
  });
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Custom Language Tutor</h1>
    <label for="hskSelect">Select your HSK level:</label>
    <div class="card">
      <select id="hskSelect" style="width: 100%; margin-bottom: 8px; padding: 6px;">
        <option value="It's my first time ever learning Chinese">It's my first time ever learning Chinese</option>
        <option value="HSK 1">HSK 1</option>
        <option value="HSK 2">HSK 2</option>
        <option value="HSK 3">HSK 3</option>
        <option value="HSK 4">HSK 4</option>
        <option value="HSK 5">HSK 5</option>
        <option value="HSK 6">HSK 6</option>
      </select>
    </div>
    <input id="instructions" type="text" placeholder="Enter agent instructions..." style="width: 100%; margin-bottom: 8px; padding: 6px;" />
    <div class="card">
      <button id="submitBtn" type="button">Create Agent Session</button>
    </div>
    

  </div>
`

setupAgentSubmit(
  document.querySelector<HTMLButtonElement>('#submitBtn')!,
  document.querySelector<HTMLInputElement>('#instructions')!,
  document.querySelector<HTMLSelectElement>('#hskSelect')!
);