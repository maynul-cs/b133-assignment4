const jobData = [
    { id: 1, companyName: "TechFlow", position: "Frontend Developer", location: "Dhaka, BD", type: "Full-time", salary: "$45k - $60k", description: "Build modern UIs using React and Tailwind.", status: "all" },
    { id: 2, companyName: "CloudNine", position: "UI/UX Designer", location: "Remote", type: "Contract", salary: "$30k - $40k", description: "Design high-fidelity mockups in Figma.", status: "all" },
    { id: 3, companyName: "InnovateJS", position: "Backend Engineer", location: "Sylhet, BD", type: "Full-time", salary: "$50k - $70k", description: "Scalable Node.js architectures and APIs.", status: "all" },
    { id: 4, companyName: "SwiftApp", position: "Mobile Developer", location: "Chittagong, BD", type: "Full-time", salary: "$40k - $55k", description: "Native Android and iOS app development.", status: "all" },
    { id: 5, companyName: "DataCore", position: "Data Analyst", location: "Remote", type: "Part-time", salary: "$25k - $35k", description: "Analyze user behavior and business metrics.", status: "all" },
    { id: 6, companyName: "SecurityX", position: "Cyber Security", location: "Dhaka, BD", type: "Full-time", salary: "$60k - $80k", description: "Protecting enterprise data from threats.", status: "all" },
    { id: 7, companyName: "GreenOps", position: "DevOps Engineer", location: "Hybrid", type: "Full-time", salary: "$55k - $75k", description: "Managing AWS infrastructure and CI/CD.", status: "all" },
    { id: 8, companyName: "CreativeLab", position: "Content Writer", location: "Remote", type: "Freelance", salary: "$15k - $25k", description: "Technical writing for developer tools.", status: "all" }
];

let currentTab = 'all';

function renderJobs() {
    const container = document.getElementById('job-container');
    const emptyState = document.getElementById('empty-state');
    
    const filteredJobs = currentTab === 'all' 
        ? jobData 
        : jobData.filter(job => job.status === currentTab);

    container.innerHTML = '';
    
    if (filteredJobs.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        filteredJobs.forEach(job => {
            const card = `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative group">
                    <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-gray-300 hover:text-red-500">
                        <i class="fas fa-trash"></i>
                    </button>
                    <div class="mb-4">
                        <h4 class="font-bold text-lg text-gray-800">${job.position}</h4>
                        <p class="text-indigo-600 text-sm font-medium">${job.companyName}</p>
                    </div>
                    <div class="space-y-2 mb-4 text-sm text-gray-500">
                        <div class="flex items-center"><i class="fas fa-map-marker-alt w-5"></i> ${job.location}</div>
                        <div class="flex items-center"><i class="fas fa-briefcase w-5"></i> ${job.type}</div>
                        <div class="flex items-center"><i class="fas fa-money-bill-wave w-5"></i> ${job.salary}</div>
                    </div>
                    <p class="text-gray-600 text-sm mb-6 line-clamp-2">${job.description}</p>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="updateStatus(${job.id}, 'interview')" class="py-2 px-3 rounded-lg text-xs font-bold transition ${job.status === 'interview' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}">Interview</button>
                        <button onclick="updateStatus(${job.id}, 'rejected')" class="py-2 px-3 rounded-lg text-xs font-bold transition ${job.status === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 hover:bg-red-100'}">Rejected</button>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }
    updateCounts();
}

function updateStatus(id, newStatus) {
    const job = jobData.find(j => j.id === id);
    if (job.status === newStatus) {
        job.status = 'all'; // Toggle back to all if clicked again
    } else {
        job.status = newStatus;
    }
    renderJobs();
}

function deleteJob(id) {
    const index = jobData.findIndex(j => j.id === id);
    if (index > -1) {
        jobData.splice(index, 1);
        renderJobs();
    }
}

function updateCounts() {
    document.getElementById('total-count').innerText = jobData.length;
    document.getElementById('int-count').innerText = jobData.filter(j => j.status === 'interview').length;
    document.getElementById('rej-count').innerText = jobData.filter(j => j.status === 'rejected').length;
}

function switchTab(tab) {
    currentTab = tab;
    // UI Update for Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-indigo-600', 'text-indigo-600');
        btn.classList.add('border-transparent', 'text-gray-500');
    });
    const activeTab = document.getElementById(`tab-${tab}`);
    activeTab.classList.remove('border-transparent', 'text-gray-500');
    activeTab.classList.add('border-indigo-600', 'text-indigo-600');
    
    renderJobs();
}

// Initial Call
renderJobs();