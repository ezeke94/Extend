chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var prompt = message.prompt;
    
    chrome.storage.sync.get(['apiKey'], function (result) {
      var apiKey = result.apiKey;
  
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + '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'
        },
        body: JSON.stringify({
          prompt: 'top 10 movies',
          max_tokens: 50
        })
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var generatedText = data.choices[0].text;
          sendResponse(generatedText);
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
    });
  
    return true;
  });
  