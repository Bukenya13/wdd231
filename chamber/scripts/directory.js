// ========================================
// DIRECTORY PAGE - MEMBER LISTING
// ========================================

let allMembers = [];
let currentView = 'grid';

// ========================================
// 1. FETCH MEMBERS DATA FROM JSON
// ========================================

async function fetchMembers() {
    const container = document.getElementById('memberContainer');
    
    try {
        console.log('Fetching members from data/members.json...');
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allMembers = await response.json();
        console.log('Members loaded successfully:', allMembers.length, 'members found');
        displayMembers(allMembers);
    } catch (error) {
        console.error('Error fetching members:', error);
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #e76f51;">
                    <p>Unable to load member directory.</p>
                    <p style="font-size: 0.9rem;">Make sure data/members.json exists in your project.</p>
                </div>
            `;
        }
    }
}

// ========================================
// 2. DISPLAY MEMBERS IN GRID/LIST VIEW
// ========================================

function displayMembers(members) {
    const container = document.getElementById('memberContainer');
    if (!container) return;

    if (members.length === 0) {
        container.innerHTML = '<p style="text-align: center;">No members available.</p>';
        return;
    }

    let html = '';
    
    members.forEach(member => {
        html += `
            <div class="member-card">
                <img src="${member.image}" 
                     alt="${member.name}"
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    ${member.tagline ? `<p class="tagline">"${member.tagline}"</p>` : ''}
                    <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p>
                        <span class="membership-badge ${member.membershipLevel.toLowerCase()}">
                            ${member.membershipLevel} Member
                        </span>
                    </p>
                    <a href="${member.website}" target="_blank" class="visit-btn">
                        Visit Website →
                    </a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    console.log('Displayed', members.length, 'members');
}

// ========================================
// 3. TOGGLE BETWEEN GRID AND LIST VIEW
// ========================================

function setupViewToggle() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const memberContainer = document.getElementById('memberContainer');
    
    if (!gridViewBtn || !listViewBtn || !memberContainer) {
        console.warn('View toggle buttons or container not found');
        return;
    }
    
    gridViewBtn.addEventListener('click', () => {
        currentView = 'grid';
        memberContainer.classList.remove('list-view');
        memberContainer.classList.add('grid-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        console.log('Switched to grid view');
    });
    
    listViewBtn.addEventListener('click', () => {
        currentView = 'list';
        memberContainer.classList.remove('grid-view');
        memberContainer.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        console.log('Switched to list view');
    });
}

// ========================================
// 4. INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Directory page loaded');
    setupViewToggle();
    fetchMembers();
});

// ========================================
// END OF DIRECTORY.JS
// ========================================