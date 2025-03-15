document.addEventListener('DOMContentLoaded', async () => {
    const memberList = document.getElementById('member-list');
    const toggleViewButton = document.getElementById('toggle-view');
    const year = document.getElementById('year');
    const lastModified = document.getElementById('last-modified');

    year.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;

    toggleViewButton.addEventListener('click', () => {
        memberList.classList.toggle('list-view');
        memberList.classList.toggle('card-view');
    });

    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }

    function displayMembers(members) {
        memberList.innerHTML = members.map(member => `
            <div class="member">
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
            </div>
        `).join('');
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 1:
                return 'Member';
            case 2:
                return 'Silver';
            case 3:
                return 'Gold';
            default:
                return 'Unknown';
        }
    }
});