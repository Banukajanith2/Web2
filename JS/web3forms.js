const form = document.getElementById("contact-form");
const name = document.getElementById("inputName");
const email = document.getElementById("inputEmail");
const subject = document.getElementById("inputSubject");
const message = document.getElementById("inputMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const showError = (text) => {
        Swal.fire({
            title: "ERROR",
            text: text,
            icon: "error",
            showClass: {
                popup: 'animate__animated animate__fadeInDown animate__faster'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp animate__faster'
            },
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                content: 'swal2-content',
                confirmButton: 'swal2-confirm'
            }
        });
    };

    if (name.value.trim() === "") {
        showError("Name is Empty!");
    } else if (email.value.trim() === "") {
        showError("Email is Empty!");
    } else if (subject.value.trim() === "") {
        showError("Subject is Empty!");
    } else if (message.value.trim() === "") {
        showError("Message is Empty!");
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError("Please enter a valid email address!");
        } else {
            // Prepare FormData for Web3Forms
            const formData = new FormData(form);
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    Swal.fire({
                        title: "Message Sent!",
                        text: "Thanks for contacting me! I'll respond ASAP.",
                        icon: "success",
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown animate__faster'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp animate__faster'
                        },
                        customClass: {
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            content: 'swal2-content',
                            confirmButton: 'swal2-confirm'
                        }
                    });
                    form.reset(); // Clear form
                } else {
                    showError("Failed to send. Try again later.");
                }
            } catch (error) {
                showError("Something went wrong. Please try again.");
            }
        }
    }
});
