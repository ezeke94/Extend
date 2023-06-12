chrome.storage.sync.set({ "apiKey": "YOUR_API_KEY" }).then(() =>  {
    // Do something when the storage has been set.
  });
  
  chrome.storage.sync.get(['apiKey']).then((result) => {
    var apiKey = result.apiKey;
    console.log('Retrieved API key:', apiKey);
  
    // Pass the apiKey variable to background.js for API requests
    chrome.runtime.sendMessage({ apiKey: apiKey, useBackground: true }, function (response) {
      console.log('Received response from background:', response);
    });
  });
 

