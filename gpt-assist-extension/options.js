document.getElementById('optionsForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const openaiToken = document.getElementById('openaiToken').value;
  const prompt = document.getElementById('prompt').value;

  chrome.storage.local.set({ openaiToken, prompt }, function () {
    alert('OpenAI API Token and prompt saved.');
  });
});

chrome.storage.local.get(['openaiToken', 'prompt'], function (data) {
  if (data.openaiToken) {
    document.getElementById('openaiToken').value = data.openaiToken;
  }
  if (data.prompt) {
    document.getElementById('prompt').value = data.prompt;
  }
});
