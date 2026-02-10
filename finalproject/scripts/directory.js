import { showMemberModal } from './modal.js';

let allMembers = [];
let filteredMembers = [];
let currentView = 'grid';
let currentPage = 1;
const membersPerPage = 8;

// ========================================
// 1. FETCH MEMBERS DATA FROM JSON
// ========================================

async function fetchMembers() {
    const container = document.getElementById('membersContainer');
    
    try {
        console.log('Fetching members from data/members.json...');
        const response = await fetch('../data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allMembers = await response.json();
        filteredMembers = [...allMembers];
        console.log('Members loaded successfully:', allMembers.length, 'members found');
        updateDisplay();
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
    const container = document.getElementById('membersContainer');
    if (!container) return;

    if (members.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No members found matching your criteria.</p>';
        return;
    }

    container.innerHTML = members.map(member => `
        <div class="member-card" data-id="${member.id}">
            <img src="${member.image}" 
                 alt="${member.name}"
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
            <div class="member-info">
                <h3>${member.name}</h3>
                ${member.tagline ? `<p class="tagline">"${member.tagline}"</p>` : ''}
                ${member.fitnessLevel ? `<span class="specialty">${member.fitnessLevel}</span>` : ''}
                <p><strong>Specialty:</strong> ${member.specialty}</p>
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
    `).join('');

    // Add click handlers for member detail modal
    container.querySelectorAll('.member-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('.visit-btn')) return; // Don't open modal when clicking website link
            const memberId = parseInt(card.dataset.id);
            const member = allMembers.find(m => m.id === memberId);
            if (member) showMemberModal(member);
        });
    });

    console.log('Displayed', members.length, 'members');
}

// ========================================
// 3. PAGINATION
// ========================================

function getPaginatedMembers() {
    const start = (currentPage - 1) * membersPerPage;
    const end = start + membersPerPage;
    return filteredMembers.slice(start, end);
}

function updatePagination() {
    const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
}

function updateDisplay() {
    const paginatedMembers = getPaginatedMembers();
    displayMembers(paginatedMembers);
    updatePagination();
    updateStats();
}

function updateStats() {
    const countEl = document.getElementById('memberCount');
    const filterInfoEl = document.getElementById('filterInfo');
    if (countEl) countEl.textContent = filteredMembers.length;
    if (filterInfoEl) {
        filterInfoEl.textContent = filteredMembers.length === allMembers.length
            ? 'All members displayed'
            : `Filtered from ${allMembers.length} total members`;
    }
}

// ========================================
// 4. SEARCH FUNCTIONALITY
// ========================================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const query = searchInput?.value.toLowerCase().trim() || '';
        if (query === '') {
            filteredMembers = [...allMembers];
        } else {
            filteredMembers = allMembers.filter(m =>
                m.name.toLowerCase().includes(query) ||
                m.specialty.toLowerCase().includes(query) ||
                (m.tagline && m.tagline.toLowerCase().includes(query)) ||
                (m.fitnessLevel && m.fitnessLevel.toLowerCase().includes(query))
            );
        }
        currentPage = 1;
        updateDisplay();
    }

    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
}

// ========================================
// 5. FILTER BY FITNESS LEVEL
// ========================================

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            if (filter === 'all') {
                filteredMembers = [...allMembers];
            } else if (filter === 'trainer') {
                filteredMembers = allMembers.filter(m =>
                    m.tagline && m.tagline.toLowerCase().includes('trainer') ||
                    m.tagline && m.tagline.toLowerCase().includes('coach') ||
                    m.tagline && m.tagline.toLowerCase().includes('instructor')
                );
            } else {
                filteredMembers = allMembers.filter(m =>
                    m.fitnessLevel && m.fitnessLevel.toLowerCase() === filter
                );
            }

            currentPage = 1;
            updateDisplay();
        });
    });
}

// ========================================
// 6. SORTING
// ========================================

function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        filteredMembers.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'joinDate') return (a.joinDate || '').localeCompare(b.joinDate || '');
            if (sortBy === 'level') return (a.fitnessLevel || '').localeCompare(b.fitnessLevel || '');
            return 0;
        });
        currentPage = 1;
        updateDisplay();
    });
}

// ========================================
// 7. VIEW TOGGLE (Grid/List)
// ========================================

function setupViewToggle() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const container = document.getElementById('membersContainer');

    if (!gridViewBtn || !listViewBtn || !container) return;

    gridViewBtn.addEventListener('click', () => {
        currentView = 'grid';
        container.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        currentView = 'list';
        container.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

// ========================================
// 8. PAGINATION CONTROLS
// ========================================

function setupPagination() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateDisplay();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updateDisplay();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

// ========================================
// 9. HAMBURGER NAV (for directory page)
// ========================================

function setupNav() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }
}

// ========================================
// 10. INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Directory page loaded');
    setupNav();
    setupViewToggle();
    setupSearch();
    setupFilters();
    setupSorting();
    setupPagination();
    fetchMembers();
});