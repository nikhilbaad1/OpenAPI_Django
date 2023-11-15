document.addEventListener('DOMContentLoaded', function() {
    const chatlog = document.getElementById('chatlog');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const appenddiv = document.getElementById('appenddiv');
    // selecting loading div
    const loader = document.getElementById("loading");
    const insertAfter = (element, htmlString) => {element.insertAdjacentHTML("beforebegin", htmlString)}
    const append = (element, htmlString) => {
      //var content = document.createTextNode(htmlString);
      element.innerHtml += htmlString;
    }
    // showing loading
    function displayLoading() {
      loader.classList.add("display");
      // to stop loading after some time

    }

    // hiding loading 
    function hideLoading() {
      loader.classList.remove("display");
    }


    function getCookie(name) {
        if (!document.cookie) {
          return null;
        }
      
        const xsrfCookies = document.cookie.split(';')
          .map(c => c.trim())
          .filter(c => c.startsWith(name + '='));
      
        if (xsrfCookies.length === 0) {
          return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
      };

    

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get user input
        const userMessage = userInput.value;
        const csrfToken = getCookie('csrftoken');

        // Clear the input field
        userInput.value = '';

        // Add the user message to the chat log
        insertAfter(appenddiv,' <div class="outgoing-chats"><div class="outgoing-msg"><div class="outgoing-chats-msg"><p class="multi-msg">'+userMessage+'</p></div></div></div>')
        //chatlog.innerHTML += '<p class="user-message">' + userMessage + '</p>';
        displayLoading()
        // Send the user message to the server and get the response
        fetch('/chatbot_app/chatbot', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": csrfToken,
            },
            body: 'user_input=' + encodeURIComponent(userMessage)
        })
        .then(response => response.json())
        .then(data => {
            hideLoading()
            // Add the bot response to the chat log
            insertAfter(appenddiv,'  <div class="received-chats"><div class="received-msg"><div class="received-msg-inbox"><p>'+data.bot_response+'</p></div></div></div>')
            //chatlog.innerHTML += '<p class="bot-message">' + data.bot_response + '</p>';
            // Scroll to the bottom of the chat log
            chatlog.scrollTop = chatlog.scrollHeight;
        });
      
    });
});