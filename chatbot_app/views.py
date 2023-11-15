import openai
import os
from django.shortcuts import render
from django.http import JsonResponse
#from django.template import RequestContext
#from django.shortcuts import render_to_response
openai.api_key = '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'

def chatbot(request):
    if request.method == 'POST':
        #return render(request, 'chatbot.html')
        # Get user input
        user_input = request.POST['user_input']
        msg = [{"role": "user", "content": user_input}]#{"role": "system","content": "You are a very funny comedian"},
        # Call the ChatGPT API to get a response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages = msg,
            
            #engine='davinci',
            #prompt=f"{user_input}",
            temperature=0,
            max_tokens=60,
            top_p=1,
            frequency_penalty=0
            
            #n=1,
            #stop=None,
            
        )

        # Extract the response text from the API result
        bot_response = response['choices'][0]['message']['content'] #response.choices[0].text.strip()

        # Return the response as JSON
        return JsonResponse({'bot_response': bot_response})

    # If the request is not a POST, render the chatbot template
    return render(request, 'chatbot.html')