chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var prompt = message.prompt;
    console.log("In background")
    
    chrome.storage.sync.get(['apiKey'], function (result) {
      var apiKey = result.apiKey;
      console.log("In background in Sync Get")
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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' //+ apiKey
        },
        body: JSON.stringify({
          
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "user",
                "content": "Top 10 movies according to IMdB"
            }
          ]
          
        })
      })
        .then(function (response) {
          console.log("In background in Response Get")
          return response.json();
        })
        .then(function (data) {
          console.log("In background in Res .then")
          var generatedText = data.choices[0].message.content;
          sendResponse(generatedText);
        })
        .catch(function (error) {
          console.log("In background in Error")
          console.log('Error:', error);
        });
    });
  
    return true;
  });
  
