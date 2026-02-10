// ========================================
// FORM.JS - Form Submission Result Display
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const formDataDisplay = document.getElementById('formDataDisplay');
    if (!formDataDisplay) return;

    const params = new URLSearchParams(window.location.search);

    if (params.toString() === '') {
        formDataDisplay.innerHTML = '<p>No form data received. Please submit the membership form.</p>';
        return;
    }

    const labelMap = {
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        plan: 'Membership Plan',
        goals: 'Fitness Goals',
        newsletter: 'Newsletter'
    };

    let html = '';
    for (const [key, value] of params.entries()) {
        const label = labelMap[key] || key;
        const displayValue = value || 'Not provided';
        html += `
            <div class="detail-item">
                <span class="detail-label">${label}:</span>
                <span class="detail-value">${displayValue}</span>
            </div>
        `;
    }

    // Add submission timestamp
    const now = new Date();
    html += `
        <div class="detail-item">
            <span class="detail-label">Submitted:</span>
            <span class="detail-value">${now.toLocaleDateString()} at ${now.toLocaleTimeString()}</span>
        </div>
    `;

    formDataDisplay.innerHTML = html;
    console.log('Form data displayed successfully');
});
