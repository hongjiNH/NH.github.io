https://hongjinh.github.io/NH.github.io/index.html
# Free JSON Quiz Generator Web

Welcome to this **free-to-use quiz generator web app!**  
This app allows you to create interactive quizzes simply by providing a JSON file containing your quiz questions and answers.

---

## How It Works

- Upload or provide a JSON file formatted with your quiz data.
- The app reads your JSON and dynamically generates an interactive quiz.
- Easy, fast, and flexible for creating quizzes with multiple choice questions.

---

## JSON Format Sample

Your quiz JSON should be an array of question objects, each having these properties:

- `question`: A string for the question text.  
- `options`: An array of answer option strings.  
- `answer`: An array of zero-based indexes of the correct options.  
- `explanation`: (Optional) A string explaining the correct answer.

Example JSON:

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
---
## Formatting Questions with Code or Terminal Output

If your question or explanation contains code snippets or command-line output:

- Wrap code blocks inside `<pre><code>...</code></pre>` tags to preserve formatting.  
- Use `\n` for line breaks inside `<code>`.  
- Use HTML entities `&lt;`, `&gt;`, `&amp;` for special characters `<`, `>`, and `&` inside code.  
- Use `<br>` tags for line breaks outside code blocks.

### Example with code block inside question:

```json
{
  "question": "Run this command:<br><br><pre><code>mysql&gt; SHOW DATABASES;\n+-----------+\n| Database  |\n+-----------+\n| mysql     |\n| test      |\n+-----------+</code></pre><br>What does this output show?",
  "options": ["List of databases", "Error message"],
  "answer": [0],
  "explanation": "This command lists all databases on the MySQL server."
}
