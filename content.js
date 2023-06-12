// Listen for user input in text fields
document.addEventListener('input', function (event) {
    var target = event.target;
  
    // Check if the target is a text field
    if (target.tagName.toLowerCase() === 'input' && target.type === 'text') {
      var userInput = target.value;
  
      // Check if the user input matches the trigger phrase
      if (userInput.startsWith('Create: ') && userInput.endsWith(' ;')) {
        var prompt = userInput.substring(8, userInput.length - 2);
  
        chrome.runtime.sendMessage({ prompt: prompt }, function (response) {
          if (response) {
            var activeElement = document.activeElement;
        
            // Check if the active element is a text field
            if (activeElement.tagName.toLowerCase() === 'input' && activeElement.type === 'text') {
              activeElement.value += response;
            } else {
              // If the active element is not a text field, display the response in a chat window or console.log it
              console.log('Generated response:', response);
            }
          }
        });
      }
    }
  });
  