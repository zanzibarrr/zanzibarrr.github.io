document.addEventListener('DOMContentLoaded', () => {
    let questionsByQuiz = { '2425': [], '2324': [] };
    let activeQuizId = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let questionsForCurrentQuiz = [];
    let pendingSelections = [];
    let answerLocked = false;

    const startArea = document.getElementById('start-area');
    const questionSection = document.getElementById('question-section');
    const questionCard = document.getElementById('question-card');
    const resultsArea = document.getElementById('results-area');

    const startButtons = {
        '2425': document.getElementById('start-de-2425-button'),
        '2324': document.getElementById('start-de-2324-button'),
        'p2023': document.getElementById('start-de-p2023-button'),
        'de_bdd': document.getElementById('start-de-de-bdd-button'),
    };
    const validateButton = document.getElementById('validate-button');
    const multiHint = document.getElementById('multi-hint');

    const questionContext = document.getElementById('question-context');
    const questionNumberEl = document.getElementById('question-number');
    const questionTitle = document.getElementById('question-title');
    const questionSource = document.getElementById('question-source');
    const optionsArea = document.getElementById('options-area');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackText = document.getElementById('feedback-text');
    const nextButton = document.getElementById('next-button');
    const scoreDisplay = document.getElementById('score');
    const totalQuestionsInQuizDisplay = document.getElementById('total-questions-in-quiz');
    const percentageDisplay = document.getElementById('percentage');
    const restartButton = document.getElementById('restart-button');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const correctAnswersSummary = document.getElementById('correct-answers-summary');
    const mainTitle = document.querySelector('header h1');

    const ORIGINAL_TITLE = mainTitle.dataset.originalTitle || mainTitle.textContent;
    mainTitle.dataset.originalTitle = ORIGINAL_TITLE;

    const CONTEXT_VUES_2425 = `
        <h3>Exercice — Vues et droits d'accès (hôpital)</h3>
        <p>Vous administrez une base pour un hôpital. Table <strong>Patients</strong> :</p>
        <pre>CREATE TABLE Patients (
    PatientID INT PRIMARY KEY,
    Nom VARCHAR(50),
    DateNaissance DATE,
    Diagnostic VARCHAR(100),
    MedecinID INT,
    Chambre INT
);</pre>
        <p><strong>Besoins :</strong></p>
        <ul>
            <li><strong>Médecins</strong> : Nom, DateNaissance, Diagnostic pour leurs patients (MedecinID), sans Chambre.</li>
            <li><strong>Infirmiers</strong> : Nom et Chambre uniquement.</li>
            <li><strong>Administrateurs</strong> : vue matérialisée stats par diagnostic, mise à jour chaque nuit.</li>
        </ul>
        <pre>CREATE VIEW Vue_Medecins AS
SELECT PatientID, Nom, DateNaissance, Diagnostic
FROM Patients WHERE MedecinID = CURRENT_USER_ID();

CREATE VIEW Vue_Infirmiers AS
SELECT PatientID, Nom, Chambre FROM Patients;

CREATE MATERIALIZED VIEW Vue_Stats_Diagnostics AS
SELECT Diagnostic, COUNT(*) AS NombrePatients
FROM Patients GROUP BY Diagnostic;</pre>
        <p><strong>Droits :</strong> Médecins → SELECT, UPDATE sur Vue_Medecins ; Infirmiers → SELECT sur Vue_Infirmiers ; Administrateurs → SELECT sur Vue_Stats_Diagnostics.</p>
    `;

    const CONTEXT_LIVRES_2425 = `
        <h3>Exercice — Normalisation (librairie)</h3>
        <p>Relation <strong>Livres</strong> :</p>
        <pre>Livres (ISBN, Titre, NomAuteur, EmailAuteur, NomEditeur,
     AdresseEditeur, AnneePublication, Prix)</pre>
        <p><strong>DF :</strong> ISBN → Titre, NomAuteur, EmailAuteur, NomEditeur, AdresseEditeur, AnneePublication, Prix ; NomAuteur → EmailAuteur ; NomEditeur → AdresseEditeur.</p>
        <p>Normaliser en <strong>3FN</strong> (décomposition ou synthèse).</p>
    `;

    const CONTEXT_SALES_2324 = `
        <h3>Exercice — Normalisation (inventaire / ventes)</h3>
        <p>Schéma initial <strong>SalesRecord</strong> :</p>
        <pre>SaleID, ProductID, ProductName, ProductCategory, UnitPrice,
Quantity, SaleDate, CustomerID, CustomerName,
CustomerEmails, CustomerPhone</pre>
        <p><strong>Contraintes :</strong> une vente = un seul client ; une vente peut contenir plusieurs produits.</p>
        <p><strong>DF utiles :</strong></p>
        <ul>
            <li>ProductID → ProductName, ProductCategory, Unit Price</li>
            <li>CustomerID → CustomerName, CustomerEmails, CustomerPhone</li>
            <li>SaleID → CustomerID, SaleDate</li>
            <li>(SaleID, ProductID) → Quantity</li>
        </ul>
    `;

    const CONTEXT_RETAIL_2324 = `
        <h3>Exercice — Programmes stockés et déclencheurs (magasin)</h3>
        <pre>Products (ProductID, ProductName, QuantityAvailable, Price) — PK ProductID
Sales (SaleID, ProductID, QuantitySold, SaleDate) — PK (SaleID, ProductID)
InventoryLog (LogID, ProductID, ChangeType, ChangeAmount, ChangeDate) — PK LogID</pre>
        <p><strong>Trigger :</strong> après INSERT dans Sales → mettre à jour QuantityAvailable (Products) et journaliser dans InventoryLog.</p>
        <p><strong>Procédure UpdateInventory(ProductID, Quantity, OperationType) :</strong> « sale » diminue le stock, « restock » l'augmente.</p>
        <p><strong>Fonction CalculateTotalSales(ProductID) :</strong> total des ventes (prix × quantité vendue).</p>
    `;

    const QUIZ_CONFIGS = {
        '2425': {
            jsonFile: 'json/bdd.json',
            count: 40,
            label: 'DE 24-25',
            contexts: [
                { from: 31, to: 35, html: CONTEXT_VUES_2425 },
                { from: 36, to: 40, html: CONTEXT_LIVRES_2425 },
            ],
        },
        '2324': {
            jsonFile: 'json/bdd_2324.json',
            count: 50,
            label: 'DE 23-24',
            contexts: [
                { from: 32, to: 40, html: CONTEXT_SALES_2324 },
                { from: 41, to: 50, html: CONTEXT_RETAIL_2324 },
            ],
        },
        'p2023': {
            jsonFile: 'json/bdd_p2023.json',
            count: 60,
            label: 'DE P2023 (2021)',
            contexts: [],
            useExamContexts: true,
        },
        'de_bdd': {
            jsonFile: 'json/bdd_de_bdd.json',
            count: 50,
            label: 'DE BDD (2021)',
            contexts: [],
            useExamContexts: true,
        },
    };

    function getQuestionNumber(question) {
        const match = question.id && question.id.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : null;
    }

    function sortQuestionsByNumber(questions) {
        return [...questions].sort((a, b) => (getQuestionNumber(a) ?? 0) - (getQuestionNumber(b) ?? 0));
    }

    function getContextHtmlForQuestion(questionNum, question) {
        if (question && question.contextHtml) {
            return question.contextHtml;
        }
        const config = QUIZ_CONFIGS[activeQuizId];
        if (config && config.useExamContexts && window.EXAM_CONTEXTS) {
            const perQuestion = window.EXAM_CONTEXTS[activeQuizId];
            if (perQuestion && perQuestion[questionNum]) {
                return perQuestion[questionNum];
            }
            return '';
        }
        if (!config || !config.contexts) return '';
        const blocks = config.contexts.filter(c => questionNum >= c.from && questionNum <= c.to);
        return blocks.map(b => b.html).join('');
    }

    function renderExerciseContext(questionNum, question) {
        if (!questionContext || !activeQuizId) return;
        const html = getContextHtmlForQuestion(questionNum, question);
        if (html) {
            questionContext.innerHTML = html;
            questionContext.classList.remove('hidden');
        } else {
            questionContext.innerHTML = '';
            questionContext.classList.add('hidden');
        }
    }

    function getCorrectAnswers(question) {
        if (question.multiple && Array.isArray(question.correctAnswers)) {
            return question.correctAnswers;
        }
        return question.correctAnswer ? [question.correctAnswer] : [];
    }

    function answersMatch(selected, correct) {
        if (selected.length !== correct.length) return false;
        const a = [...selected].sort();
        const b = [...correct].sort();
        return a.every((val, i) => val === b[i]);
    }

    function setButtonState(quizId, ready, loaded, total) {
        const btn = startButtons[quizId];
        const config = QUIZ_CONFIGS[quizId];
        if (!btn) return;
        if (!ready) {
            btn.textContent = 'Erreur de chargement';
            btn.disabled = true;
        } else if (loaded >= config.count) {
            btn.textContent = `${config.label} (${config.count} questions)`;
            btn.disabled = false;
        } else {
            btn.textContent = `${config.label} (${loaded}/${config.count})`;
            btn.disabled = true;
        }
    }

    async function loadQuizData(quizId) {
        const config = QUIZ_CONFIGS[quizId];
        const response = await fetch(config.jsonFile);
        if (!response.ok) throw new Error(`HTTP ${response.status} pour ${config.jsonFile}`);
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error(`JSON vide : ${config.jsonFile}`);
        }
        questionsByQuiz[quizId] = sortQuestionsByNumber(data);
        return questionsByQuiz[quizId].length;
    }

    async function fetchAllQuestions() {
        for (const quizId of Object.keys(QUIZ_CONFIGS)) {
            try {
                const loaded = await loadQuizData(quizId);
                setButtonState(quizId, true, loaded, QUIZ_CONFIGS[quizId].count);
            } catch (error) {
                console.error(`Chargement ${quizId}:`, error);
                setButtonState(quizId, false, 0, 0);
            }
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initializeQuiz(quizTitleMode) {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        pendingSelections = [];
        answerLocked = false;
        startArea.classList.add('hidden');
        resultsArea.classList.add('hidden');
        questionSection.classList.remove('hidden');
        nextButton.classList.add('hidden');
        validateButton.classList.add('hidden');
        feedbackArea.classList.add('hidden');
        questionCard.className = 'question-card';
        mainTitle.textContent = `${ORIGINAL_TITLE} - ${quizTitleMode}`;
        displayQuestion();
        updateProgress();
    }

    function startQuiz(quizId) {
        const config = QUIZ_CONFIGS[quizId];
        const data = questionsByQuiz[quizId];
        if (!data || data.length < config.count) {
            alert(`Il faut ${config.count} questions pour ${config.label}. Disponibles : ${data ? data.length : 0}.`);
            return;
        }
        activeQuizId = quizId;
        questionsForCurrentQuiz = data.slice(0, config.count);
        initializeQuiz(config.label);
    }

    function displayQuestion() {
        pendingSelections = [];
        answerLocked = false;
        validateButton.classList.add('hidden');
        nextButton.classList.add('hidden');
        feedbackArea.classList.add('hidden');
        questionCard.className = 'question-card';

        if (currentQuestionIndex < questionsForCurrentQuiz.length) {
            const currentQuestion = questionsForCurrentQuiz[currentQuestionIndex];
            const isMultiple = Boolean(currentQuestion.multiple);
            const questionNum = getQuestionNumber(currentQuestion) ?? currentQuestionIndex + 1;

            renderExerciseContext(questionNum, currentQuestion);
            if (questionNumberEl) {
                questionNumberEl.textContent = `Question ${questionNum}`;
            }
            questionTitle.textContent = currentQuestion.question;
            questionSource.textContent = currentQuestion.sourceFile;
            if (multiHint) {
                multiHint.classList.toggle('hidden', !isMultiple);
            }
            optionsArea.innerHTML = '';

            shuffleArray([...currentQuestion.options]).forEach(optionText => {
                const button = document.createElement('button');
                button.textContent = optionText;
                button.classList.add('option-button');
                button.addEventListener('click', () => handleOptionClick(button, optionText, currentQuestion));
                optionsArea.appendChild(button);
            });
        } else {
            showResults();
        }
        updateProgress();
    }

    function handleOptionClick(button, selectedOption, currentQuestion) {
        if (answerLocked) return;

        if (currentQuestion.multiple) {
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
                pendingSelections = pendingSelections.filter(o => o !== selectedOption);
            } else {
                button.classList.add('selected');
                pendingSelections.push(selectedOption);
            }
            validateButton.classList.toggle('hidden', pendingSelections.length === 0);
            return;
        }

        lockAnswer(button, [selectedOption], currentQuestion);
    }

    function lockAnswer(clickedButton, selectedOptions, currentQuestion) {
        answerLocked = true;
        const correctAnswers = getCorrectAnswers(currentQuestion);
        const optionButtons = optionsArea.querySelectorAll('.option-button');

        optionButtons.forEach(btn => {
            btn.disabled = true;
            if (correctAnswers.includes(btn.textContent)) {
                btn.classList.add('reveal-correct');
            }
        });

        if (!currentQuestion.multiple && clickedButton) {
            clickedButton.classList.add('selected');
        }

        const isCorrect = answersMatch(selectedOptions, correctAnswers);
        if (isCorrect) {
            score++;
            questionCard.className = 'question-card correct-answer-bg';
            feedbackText.textContent = '🎉 Bonne réponse !';
            feedbackText.className = 'correct-feedback';
        } else {
            questionCard.className = 'question-card incorrect-answer-bg';
            feedbackText.textContent = `😔 Mauvaise réponse. Réponse(s) attendue(s) : ${correctAnswers.join(' ; ')}`;
            feedbackText.className = 'incorrect-feedback';
            if (clickedButton && !currentQuestion.multiple) {
                clickedButton.classList.add('incorrect');
            }
        }

        feedbackArea.classList.remove('hidden');
        validateButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
        nextButton.textContent = currentQuestionIndex === questionsForCurrentQuiz.length - 1
            ? 'Voir les Résultats'
            : 'Question Suivante';

        userAnswers.push({
            questionNum: getQuestionNumber(currentQuestion) ?? currentQuestionIndex + 1,
            question: currentQuestion.question,
            selected: currentQuestion.multiple ? selectedOptions.join(' ; ') : selectedOptions[0],
            correct: correctAnswers.join(' ; '),
            isCorrect,
            source: currentQuestion.sourceFile,
        });
    }

    function validateMultipleAnswer() {
        lockAnswer(null, [...pendingSelections], questionsForCurrentQuiz[currentQuestionIndex]);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionsForCurrentQuiz.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        questionSection.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        scoreDisplay.textContent = score;
        totalQuestionsInQuizDisplay.textContent = questionsForCurrentQuiz.length;
        const percent = questionsForCurrentQuiz.length > 0
            ? ((score / questionsForCurrentQuiz.length) * 100).toFixed(1)
            : 0;
        percentageDisplay.textContent = `Pourcentage de réussite : ${percent}%`;
        displayCorrectAnswersSummary();
        progressBar.style.width = '100%';
        progressText.textContent = 'QCM Terminé !';
    }

    function displayCorrectAnswersSummary() {
        correctAnswersSummary.innerHTML = '';
        userAnswers.forEach((answer) => {
            const item = document.createElement('div');
            item.classList.add('summary-item');
            item.innerHTML = `
                <p><strong>Question ${answer.questionNum}:</strong> </p>
                <p>Votre réponse : <span class="${answer.isCorrect ? 'correct-text' : 'incorrect-text'}"></span></p>
                ${!answer.isCorrect ? '<p>Réponse correcte : <span class="correct-text"></span></p>' : ''}
            `;
            item.querySelector('p:nth-child(1)').appendChild(document.createTextNode(answer.question + ' '));
            const smallSource = document.createElement('small');
            smallSource.textContent = `(${answer.source})`;
            item.querySelector('p:nth-child(1)').appendChild(smallSource);
            item.querySelector('p:nth-child(2) span').textContent = answer.selected;
            if (!answer.isCorrect) {
                item.querySelector('p:nth-child(3) span').textContent = answer.correct;
            }
            correctAnswersSummary.appendChild(item);
        });
    }

    function updateProgress() {
        const total = questionsForCurrentQuiz.length;
        progressBar.style.width = total > 0 ? `${(currentQuestionIndex / total) * 100}%` : '0%';
        if (currentQuestionIndex < total) {
            const q = questionsForCurrentQuiz[currentQuestionIndex];
            const num = getQuestionNumber(q) ?? currentQuestionIndex + 1;
            progressText.textContent = `Question ${num} sur ${total}`;
        }
    }

    document.addEventListener('keydown', (event) => {
        if (questionSection.classList.contains('hidden')) return;
        if (!validateButton.classList.contains('hidden') && (event.code === 'Space' || event.key === 'Enter')) {
            event.preventDefault();
            validateButton.click();
        } else if (!nextButton.classList.contains('hidden') && (event.code === 'Space' || event.key === 'Enter')) {
            event.preventDefault();
            nextButton.click();
        }
    });

    fetchAllQuestions();
    startButtons['2425']?.addEventListener('click', () => startQuiz('2425'));
    startButtons['2324']?.addEventListener('click', () => startQuiz('2324'));
    startButtons['p2023']?.addEventListener('click', () => startQuiz('p2023'));
    startButtons['de_bdd']?.addEventListener('click', () => startQuiz('de_bdd'));
    validateButton.addEventListener('click', validateMultipleAnswer);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', () => {
        activeQuizId = null;
        resultsArea.classList.add('hidden');
        startArea.classList.remove('hidden');
        questionSection.classList.add('hidden');
        if (questionContext) {
            questionContext.innerHTML = '';
            questionContext.classList.add('hidden');
        }
        mainTitle.textContent = ORIGINAL_TITLE;
        progressBar.style.width = '0%';
        progressText.textContent = '';
    });
});
