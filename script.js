document.addEventListener("DOMContentLoaded", () => {
    // Update the progress bar and enable next steps dynamically
    const updateStepProgress = () => {
        const step1Complete = document.getElementById("category").value !== "" && document.getElementById("topic").value !== "";
        const step2Complete = document.getElementById("date").value !== "" && document.getElementById("startTime").value !== "" && document.getElementById("endTime").value !== "";
        const step3Complete = document.getElementById("preferences").value.trim() !== "";

        document.getElementById("step1-bar").style.width = step1Complete ? "25%" : "0";
        document.getElementById("step2-bar").style.width = step2Complete ? "25%" : "0";
        document.getElementById("step3-bar").style.width = step3Complete ? "25%" : "0";
        document.getElementById("step4-bar").style.width = step1Complete && step2Complete && step3Complete ? "25%" : "0";

        // Auto-fill summary if all steps are complete
        if (step1Complete && step2Complete && step3Complete) {
            document.getElementById("summaryCategory").textContent = document.getElementById("category").value;
            document.getElementById("summaryTopic").textContent = document.getElementById("topic").value;
            document.getElementById("summaryDate").textContent = document.getElementById("date").value;
            document.getElementById("summaryTime").textContent = `${document.getElementById("startTime").value} - ${document.getElementById("endTime").value}`;
        }
    };

    // Attach event listeners to all relevant fields
    document.getElementById("category").addEventListener("change", updateStepProgress);
    document.getElementById("topic").addEventListener("input", updateStepProgress);
    document.getElementById("date").addEventListener("change", updateStepProgress);
    document.getElementById("startTime").addEventListener("change", updateStepProgress);
    document.getElementById("endTime").addEventListener("change", updateStepProgress);
    document.getElementById("preferences").addEventListener("input", updateStepProgress);

    // Handle the "Book demo class" button click
    document.getElementById("bookButton").addEventListener("click", () => {
        const studentEmail = prompt("Enter your email address to confirm booking:");

        if (studentEmail) {
            alert("Your demo class was booked successfully!");

            // Sending an email using EmailJS
            emailjs.init("YOUR_USER_ID"); // Replace YOUR_USER_ID with your EmailJS User ID

            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                company_email: "codemateai01@gmail.com", // Replace with your company email
                category: document.getElementById("category").value,
                topic: document.getElementById("topic").value,
                date: document.getElementById("date").value,
                time: `${document.getElementById("startTime").value} - ${document.getElementById("endTime").value}`,
                preferences: document.getElementById("preferences").value,
                student_email: studentEmail, // The student's email address
            }).then(
                () => {
                    console.log("Email sent successfully to the student");
                },
                (error) => {
                    console.error("Failed to send email", error);
                }
            );
        }
    });
});
