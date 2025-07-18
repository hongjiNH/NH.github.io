https://hongjinh.github.io/NH.github.io/index.html
# Free JSON Quiz Generator Web

Welcome to this **free-to-use quiz generator web app**!  
This app allows you to create interactive quizzes simply by providing a JSON file containing your quiz questions and answers.

---

## How It Works

- You provide a JSON file formatted with your quiz data.
- The app reads your JSON and dynamically generates a quiz for users to take.
- Easy, fast, and flexible!

---

## JSON Format Sample

Here's a sample JSON structure your quiz file should follow:

```json
[
  {
    "question": "What is the capital of France?",
    "options": ["Paris", "Rome", "Madrid", "Berlin"],
    "answer": [0],
    "explanation": "Paris is the capital of France."
  },
  {
    "question": "2 + 2 = ?",
    "options": ["3", "4", "5", "22"],
    "answer": [1],
    "explanation": "2 + 2 is 4."
  },
  {
    "question": "Select the prime numbers",
    "options": ["2", "3", "4", "5"],
    "answer": [0, 1, 3],
    "explanation": "2, 3 and 5 are prime numbers."
  }
]
