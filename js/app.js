// Mobile nav toggle
const navBtn = document.querySelector("[data-nav-btn]");
const navLinks = document.querySelector("[data-nav-links]");
if (navBtn && navLinks) {
    navBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// Active link highlight (based on body data-page attr)
const page = document.body.getAttribute("data-page");
if (page && navLinks) {
    [...navLinks.querySelectorAll("a")].forEach(a => {
        if (a.dataset.page === page) a.classList.add("active");
    });
}

// Practice quiz
const quizForm = document.querySelector("[data-quiz-form]");
if (quizForm) {
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const a1 = Number(document.querySelector("#q1").value);
        const a2 = Number(document.querySelector("#q2").value);
        const a3 = Number(document.querySelector("#q3").value);

        let score = 0;
        if (a1 === 12) score++;
        if (a2 === 7) score++;
        if (a3 === 9) score++;

        const out = document.querySelector("[data-quiz-output]");
        out.className = "notice " + (score === 3 ? "good" : score === 2 ? "warn" : "danger");
        out.textContent = `You scored ${score}/3. ` + (score === 3
            ? "Excellent! You’re ready for the next level."
            : score === 2
                ? "Good job! Review one question and try again."
                : "Keep going! Practice a bit more and retry.");
    });
}

// Basic solver (calculator + simple explanation)
const solverForm = document.querySelector("[data-solver-form]");
if (solverForm) {
    solverForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const n1 = Number(document.querySelector("#n1").value);
        const n2 = Number(document.querySelector("#n2").value);
        const op = document.querySelector("#op").value;

        const out = document.querySelector("[data-solver-output]");
        const steps = document.querySelector("[data-solver-steps]");

        if (!Number.isFinite(n1) || !Number.isFinite(n2)) {
            out.className = "notice danger";
            out.textContent = "Please enter valid numbers.";
            steps.textContent = "";
            return;
        }

        let result;
        let stepText = "";

        switch (op) {
            case "add":
                result = n1 + n2;
                stepText = `Step: Add the numbers.\n${n1} + ${n2} = ${result}`;
                break;
            case "sub":
                result = n1 - n2;
                stepText = `Step: Subtract the second number from the first.\n${n1} − ${n2} = ${result}`;
                break;
            case "mul":
                result = n1 * n2;
                stepText = `Step: Multiply the numbers.\n${n1} × ${n2} = ${result}`;
                break;
            case "div":
                if (n2 === 0) {
                    out.className = "notice danger";
                    out.textContent = "Division by zero is not allowed.";
                    steps.textContent = "Step: A number cannot be divided by 0.";
                    return;
                }
                result = n1 / n2;
                stepText = `Step: Divide the first number by the second.\n${n1} ÷ ${n2} = ${result}`;
                break;
            default:
                out.className = "notice danger";
                out.textContent = "Choose an operation.";
                steps.textContent = "";
                return;
        }

        out.className = "notice good";
        out.textContent = `Answer: ${result}`;
        steps.textContent = stepText;
    });
}