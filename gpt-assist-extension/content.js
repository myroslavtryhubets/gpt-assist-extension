async function getChatGPTSuggestions(openaiToken, prompt, inputText) {
  updateWidgetStatus('...');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openaiToken}`,
  };

  const bodyJson = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt + " " + inputText,
      },
    ],
  };

  const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyJson),
  });

  const openaiResponseBody = await openaiResponse.json();
  const openaiText = openaiResponseBody.choices[0].message.content.trim();
  updateWidgetStatus('GPT');

  return openaiText;
}

chrome.storage.local.get(['openaiToken', 'prompt'], function (data) {
  const openaiToken = data.openaiToken;
  const prompt = data.prompt;

  document.addEventListener('keydown', async function (event) {
    if (event.key === 'Alt' && event.ctrlKey) {
      event.preventDefault();
      const activeElement = document.activeElement;

      if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        const inputText = activeElement.value;

        const suggestion = await getChatGPTSuggestions(openaiToken, prompt, inputText);
        if (suggestion) {
          activeElement.value = inputText + ' ' + suggestion;
        }
      }
    }
  });

});
// Create the widget

function createStatusWidget() {
  const widget = document.createElement('div');
  widget.id = 'chatgpt-extension-widget';
  widget.style.position = 'fixed';
  widget.style.bottom = '20px';
  widget.style.right = '20px';
  widget.style.zIndex = '10000';
  widget.style.width = '34px';
  widget.style.height = '24px';
  widget.style.backgroundColor = '#4CAF50';
  widget.style.borderRadius = '25%';
  widget.style.display = 'flex';
  widget.style.justifyContent = 'center';
  widget.style.alignItems = 'center';
  widget.style.color = 'white';
  widget.style.fontSize = '14px';
  widget.style.fontWeight = 'bold';
  widget.style.cursor = 'pointer';
  widget.textContent = 'GPT';

  document.body.appendChild(widget);
}

function updateWidgetStatus(status) {
  const widget = document.getElementById('chatgpt-extension-widget');
  if (widget) {
    widget.textContent = status;
  }
}
// Append the widget to the web page
createStatusWidget();
// Create the tooltip
function createTooltip() {
  const tooltip = document.createElement('div');
  tooltip.id = 'chatgpt-extension-tooltip';
  tooltip.style.position = 'fixed';
  tooltip.style.bottom = '50px';
  tooltip.style.right = '20px';
  tooltip.style.zIndex = '10001';
  tooltip.style.padding = '8px';
  tooltip.style.backgroundColor = 'white';
  tooltip.style.border = '1px solid #ccc';
  tooltip.style.borderRadius = '5px';
  tooltip.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.2)';
  tooltip.style.fontSize = '14px';
  tooltip.style.fontWeight = 'normal';
  tooltip.style.color = '#333';
  tooltip.textContent = 'ChatGPT-Extension is active';
  tooltip.style.display = 'none';

  document.body.appendChild(tooltip);
}

// Append the tooltip to the web page
createTooltip();

// Show and hide the tooltip on widget hover
const widget = document.getElementById('chatgpt-extension-widget');
const tooltip = document.getElementById('chatgpt-extension-tooltip');

widget.addEventListener('mouseenter', () => {
  tooltip.style.display = 'block';
});

widget.addEventListener('mouseleave', () => {
  tooltip.style.display = 'none';
});
