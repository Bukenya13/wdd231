// scripts/spotlight.js - Display ALL Gold/Silver Members
document.addEventListener('DOMContentLoaded', function() {
    const spotlightContainer = document.getElementById('spotlight-members');
    console.log(' Spotlight script started - Displaying ALL eligible members...');

    try {
        // Direct JavaScript array with company data
        const members = [{
                name: "Mukono Agro Processors Ltd",
                address: "Plot 15, Industrial Area, Mukono",
                phone: "+256 772 456 789",
                website: "https://mukonoagro.ug",
                image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJ1aXRzJTIwYW5kJTIwdmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
                membership: "gold",
                description: "Leading agricultural processing company specializing in coffee and maize products for export."
            },
            {
                name: "Nile Tech Solutions",
                address: "Mukono Town Center, Main Street",
                phone: "+256 752 987 654",
                website: "https://niletech.ug",
                image: "https://images.unsplash.com/photo-1629837093109-11325d6e7afd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNlcnZlciUyMHJvb218ZW58MHx8MHx8fDA%3D",
                membership: "silver",
                description: "IT services and digital solutions provider for businesses across Central Uganda."
            },
            {
                name: "Uganda Crafts Cooperative",
                address: "Cultural Village, Seeta Road",
                phone: "+256 702 123 456",
                website: "https://ugandacrafts.ug",
                image: "https://i.pinimg.com/736x/22/ce/82/22ce826c02828604e75b5a19a5e54185.jpg",
                membership: "gold",
                description: "Promoting local artisans and traditional Ugandan crafts to international markets."
            },
            {
                name: "Mukono Resort Hotel",
                address: "Lakeside Drive, Mukono",
                phone: "+256 392 123 456",
                website: "https://mukonoresort.ug",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzb3J0JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
                membership: "silver",
                description: "Premium accommodation and conference facilities in the heart of Mukono."
            },
            {
                name: "Mitiyan Valley Farmers Association",
                address: "Namilyango Road, Mukono District",
                phone: "+256 752 654 321",
                website: "https://greenvalleyfarmers.ug",
                image: "https://mityanawomencoop.com/wp-content/uploads/2024/01/logo-miotyan.jpg",
                membership: "gold",
                description: "Cooperative of local farmers promoting sustainable agriculture and fair trade."
            },
            {
                name: "Mukono Microfinance Institution",
                address: "Banking Street, Central Mukono",
                phone: "+256 312 456 789",
                website: "https://mukonomfi.ug",
                image: "https://d1jcea4y7xhp7l.cloudfront.net/wp-content/uploads/2025/10/Microfinance-bank-398-Microfinance-Bank-Introduces-New-Payment-Features.png",
                membership: "silver",
                description: "Financial services and business loans supporting local entrepreneurs and small businesses."
            },
            {
                name: "Seeta Hardware World & Construction",
                address: "Mukono-Jinja Highway, Seeta",
                phone: "+256 752 111 222",
                website: "https://seetahardware.ug",
                image: "https://i0.wp.com/hardwareworld.ug/wp-content/uploads/about-hworld2.png?fit=601%2C396&ssl=1",
                membership: "gold",
                description: "Quality building materials and construction services for residential and commercial projects."
            },
            {
                name: "Pearl of Africa Tours",
                address: "Tourist Center, Mukono Town",
                phone: "+256 702 333 444",
                website: "https://pearlafricatours.ug",
                image: "https://images.unsplash.com/photo-1570826885524-ea6f1dc1c952?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFmcmljYW4lMjB0b3Vyc3xlbnwwfHwwfHx8MA%3D%3D",
                membership: "silver",
                description: "Local tour operator showcasing Mukono's cultural heritage and natural attractions."
            },
            {
                name: "Mukono Medical Center",
                address: "Hospital Road, Mukono",
                phone: "+256 392 765 432",
                website: "https://mukonomedical.ug",
                image: "https://www.bwindiugandagorillatrekking.com/wp-content/uploads/2020/04/Mulago-Hospital.jpg",
                membership: "gold",
                description: "Comprehensive healthcare services and medical facilities serving the Mukono community."
            },
            {
                name: "Victoria Fisheries Ltd",
                address: "Lakeside, Ggaba Road",
                phone: "+256 752 888 999",
                website: "https://victoriafisheries.ug",
                image: "https://images.unsplash.com/photo-1601699006891-c27e05b161c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmlzaGluZyUyMHBvcnR8ZW58MHx8MHx8fDA%3D",
                membership: "silver",
                description: "Fresh fish processing and distribution from Lake Victoria to local and international markets."
            },

            {
                name: "Mukono Transport Services",
                address: "Bus Park, Mukono Town",
                phone: "+256 752 777 888",
                website: "https://kawolotransport.ug",
                image: "https://plus.unsplash.com/premium_photo-1694475279939-4f7cbdfa2321?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHViZXIlMjB0YXhpfGVufDB8fDB8fHww",
                membership: "silver",
                description: "Reliable transport and logistics services connecting Mukono to major Ugandan cities."
            },
            {
                name: "Mukono Nasuuti Supermarket ",
                address: "Main Street, Central Mukono",
                phone: "+256 392 444 555",
                website: "https://mukonosupermarket.ug",
                image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxzdXBwZXJtYXJrZXRzfGVufDB8fDB8fHww",
                membership: "gold",
                description: "Leading retail chain offering quality products and groceries at competitive prices."
            },
            {
                name: "Namanve Industrial Supplies",
                address: "Namanve Industrial Park, Mukono",
                phone: "+256 702 222 333",
                website: "https://namanvesupplies.ug",
                image: "https://plus.unsplash.com/premium_photo-1661963227925-09b413651cb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGluZHVzdHJpYWwlMjBhcmVhfGVufDB8fDB8fHww",
                membership: "silver",
                description: "Supplier of industrial equipment and materials to businesses in the greater Mukono area."
            },
            {
                name: "Mukono High School",
                address: "kayunga road, Mukono",
                phone: "+256 312 999 000",
                website: "https://mukonoeducation.ug",
                image: "https://mukonohigh.ac.ug/wp-content/uploads/2025/03/3G9A0388-700x450.jpg",
                membership: "gold",
                description: "Non-profit organization supporting educational initiatives and scholarship programs in Mukono."
            }
        ];

        console.log(`📊 Total members in array: ${members.length}`);

        // Filter for gold and silver members
        const eligibleMembers = members.filter(member =>
            member.membership === 'gold' || member.membership === 'silver'
        );

        console.log(`🎯 ALL Gold/Silver members found: ${eligibleMembers.length}`);
        console.log('Eligible members:', eligibleMembers.map(m => ({ name: m.name, membership: m.membership })));

        if (eligibleMembers.length === 0) {
            spotlightContainer.innerHTML = '<p>No gold or silver members available for spotlight.</p>';
            return;
        }

        // Display ALL eligible members (not just 2-3 random ones)
        const selectedMembers = eligibleMembers; // Use ALL members instead of random selection

        console.log(`🔄 Displaying ALL ${selectedMembers.length} eligible members`);

        // Display all members with images
        let spotlightHTML = '';
        selectedMembers.forEach(member => {
            const imageHTML = member.image ?
                `<img src="${member.image}" alt="${member.name}" class="company-image" loading="lazy">` :
                '<div class="image-placeholder">No Image</div>';

            spotlightHTML += `
                <div class="spotlight-card">
                    <div class="company-image-container">
                        ${imageHTML}
                        <span class="membership-badge ${member.membership}">${member.membership.toUpperCase()}</span>
                    </div>
                    <h3>${member.name}</h3>
                    <p class="company-description">${member.description}</p>
                    <div class="contact">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <a href="${member.website}" target="_blank" rel="noopener" class="website-link">Visit Website</a>
                    </div>
                </div>
            `;
        });

        spotlightContainer.innerHTML = spotlightHTML;
        console.log(`✅ ALL ${selectedMembers.length} spotlight members displayed successfully!`);

    } catch (error) {
        console.error('❌ Error in spotlight script:', error);

        // Show detailed error message
        spotlightContainer.innerHTML = `
            <div class="error-message">
                <h3>Error Loading Members</h3>
                <p>${error.message}</p>
                <p>Please refresh the page or check the console.</p>
            </div>
        `;
    }
});