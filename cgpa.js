// Function to get grade point from total marks (out of 100)
function getGradePoint(total) {
    if (total >= 90) return 10;
    else if (total >= 80) return 9;
    else if (total >= 70) return 8;
    else if (total >= 60) return 7;
    else if (total >= 50) return 6;
    else if (total >= 40) return 5;
    else return 0;
}

// Function to calculate GPA for any table
function calculateGPA(tableId, isPractical = false) {
    const table = document.getElementById(tableId);
    const subjects = table.querySelectorAll(".subject");
    const eseMarks = table.querySelectorAll(".ese");
    const iaMarks = table.querySelectorAll(".ia");
    const credits = table.querySelectorAll(".credit");

    let totalCredits = 0;
    let totalGradePoints = 0;
    let resultText = "";

    for (let i = 0; i < subjects.length; i++) {
        if (!subjects[i].value) continue;

        const ese = Number(eseMarks[i].value || 0);
        const ia = Number(iaMarks[i].value || 0);
        const credit = Number(credits[i].value || 0);

        let rawTotal = ese + ia;
        let total = rawTotal;

        //  If practical → scale to 100 (since practical is out of 50)
        if (isPractical) {
            total = (rawTotal / 50) * 100;
        }

        const gradePoint = getGradePoint(total);

        totalCredits += credit;
        totalGradePoints += gradePoint * credit;

        resultText += ${subjects[i].value}: Marks = ${rawTotal}, Grade Point = ${gradePoint}<br>;
    }

    const gpa = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    return { gpa, totalGradePoints, totalCredits, resultText };
}

// Event listeners for Theory GPA
document.getElementById("calculateTheoryBtn").addEventListener("click", () => {
    const { resultText, gpa } = calculateGPA("theoryTable", false);
    document.getElementById("result").innerHTML = <h3>Theory GPA</h3>${resultText}<br><strong>GPA: ${gpa}</strong>;
});

// Event listeners for Practical GPA
document.getElementById("calculatePracticalBtn").addEventListener("click", () => {
    const { resultText, gpa } = calculateGPA("practicalTable", true);
    document.getElementById("result").innerHTML = <h3>Practical GPA</h3>${resultText}<br><strong>GPA: ${gpa}</strong>;
});

// Event listener for Overall CGPA
document.getElementById("calculateOverallBtn").addEventListener("click", () => {
    const theory = calculateGPA("theoryTable", false);
    const practical = calculateGPA("practicalTable", true);

    const totalGradePoints = theory.totalGradePoints + practical.totalGradePoints;
    const totalCredits = theory.totalCredits + practical.totalCredits;

    const overallCGPA = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : 0;

    const overallText = `<h3>Overall CGPA</h3>
                         <strong>Theory GPA:</strong> ${theory.gpa}<br>
                         <strong>Practical GPA:</strong> ${practical.gpa}<br>
                         <strong>Overall CGPA:</strong> ${overallCGPA}`;
    document.getElementById("result").innerHTML = overallText;
});