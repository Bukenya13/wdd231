// ========================================
// MODAL.JS - FitCore Gym Modal Handling
// ========================================

// ========================================
// 1. MEMBERSHIP PLANS MODAL
// ========================================

const membershipModal = document.getElementById('membershipModal');
const openMembershipBtn = document.getElementById('openMembershipModal');

if (openMembershipBtn && membershipModal) {
    openMembershipBtn.addEventListener('click', () => {
        membershipModal.classList.add('active');
    });
}

// ========================================
// 2. MEMBERSHIP FORM MODAL
// ========================================

const membershipFormModal = document.getElementById('membershipFormModal');
const openFormBtn = document.getElementById('openFormBtn');

if (openFormBtn && membershipFormModal) {
    openFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        membershipFormModal.classList.add('active');
        // Close membership plans modal if open
        if (membershipModal) {
            membershipModal.classList.remove('active');
        }
    });
}

// "Join Now" button in plans modal opens form modal
const joinNowBtn = document.getElementById('joinNowBtn');
if (joinNowBtn) {
    joinNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (membershipModal) {
            membershipModal.classList.remove('active');
        }
        if (membershipFormModal) {
            membershipFormModal.classList.add('active');
        }
    });
}

// ========================================
// 3. CLOSE MODALS
// ========================================

document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
        }
    });
});

// Close modal when clicking outside content
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// ========================================
// 4. MEMBER DETAIL MODAL (Directory page)
// ========================================

const memberModal = document.getElementById('memberModal');
const modalContent = document.getElementById('modalContent');

export function showMemberModal(member) {
    if (!memberModal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="member-detail">
            <img src="${member.image}" alt="${member.name}" 
                 style="width:100%; max-height:250px; object-fit:cover; border-radius:8px; margin-bottom:1rem;"
                 onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">
            <h2>${member.name}</h2>
            ${member.tagline ? `<p style="font-style:italic; color:#666; margin-bottom:1rem;">"${member.tagline}"</p>` : ''}
            <p><strong>Specialty:</strong> ${member.specialty}</p>
            <p><strong>Fitness Level:</strong> ${member.fitnessLevel || 'N/A'}</p>
            <p><strong>Membership:</strong> ${member.membershipLevel}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Address:</strong> ${member.address}</p>
            ${member.website ? `<p><a href="${member.website}" target="_blank" class="visit-btn" style="margin-top:1rem;">Visit Website →</a></p>` : ''}
        </div>
    `;

    memberModal.classList.add('active');
}
