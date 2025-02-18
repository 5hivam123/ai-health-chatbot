const healthDatabase = {
    "fever": {
        possibleConditions: ["Common Cold", "Flu", "COVID-19"],
        recommendations: [
            "Rest and stay hydrated",
            "Take acetaminophen or ibuprofen for fever",
            "Seek medical attention if temperature exceeds 103°F (39.4°C)"
        ]
    },
    "headache": {
        possibleConditions: ["Tension Headache", "Migraine", "Sinus Infection"],
        recommendations: [
            "Rest in a quiet, dark room",
            "Apply a cool compress to forehead",
            "Consider over-the-counter pain relievers"
        ]
    },
    "cough": {
        possibleConditions: ["Common Cold", "Allergies", "Bronchitis"],
        recommendations: [
            "Stay hydrated with warm liquids",
            "Use a humidifier",
            "Consider cough drops or honey (for adults)"
        ]
    }
};

function appendMessage(message, isUser = false) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function analyzeSymptoms(input) {
    const symptoms = input.toLowerCase().split(' ');
    const results = {
        possibleConditions: [],
        recommendations: []
    };

    symptoms.forEach(symptom => {
        if (healthDatabase[symptom]) {
            results.possibleConditions.push(...healthDatabase[symptom].possibleConditions);
            results.recommendations.push(...healthDatabase[symptom].recommendations);
        }
    });

    return {
        conditions: [...new Set(results.possibleConditions)],
        advice: [...new Set(results.recommendations)]
    };
}

function processInput() {
    const userInput = document.getElementById('userInput');
    const inputText = userInput.value.trim();
    
    if (!inputText) return;

    appendMessage(inputText, true);
    userInput.value = '';
    showLoading(true);

    setTimeout(() => {
        const analysis = analyzeSymptoms(inputText);
        showLoading(false);

        let response = '⚠️ Remember: This is not medical advice. Always consult a professional.\n\n';
        
        if (analysis.conditions.length > 0) {
            response += `Possible conditions:\n- ${analysis.conditions.join('\n- ')}\n\n`;
            response += `Recommendations:\n- ${analysis.advice.join('\n- ')}`;
        } else {
            response = "I'm not sure about these symptoms. Could you provide more details? For serious symptoms, please seek immediate medical attention.";
        }

        appendMessage(response);
    }, 1500);
}

// Event Listeners
document.getElementById('sendButton').addEventListener('click', processInput);
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processInput();
});