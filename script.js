function saveData(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.name) {
            localStorage.setItem(input.name, input.value);
        }
    }
}

function loadSummary() {
    const container = document.getElementById('summary-content');
    if (!container) return;

    const fields = [
        { key: 'studentName', label: 'Sorcerer Name' },
        { key: 'studentDob', label: 'Date of Birth' },
        { key: 'studentAge', label: 'Age' },
        { key: 'gender', label: 'Gender' },
        { key: 'applyClass', label: 'Class Applying For' },
        { key: 'nationality', label: 'Nationality' },
        { key: 'address', label: 'Address' },
        { key: 'favSubject', label: 'Favorite Technique' },
        { key: 'ambition', label: 'Goal' },
        { key: 'parentName', label: 'Guardian Name' },
        { key: 'parentRelation', label: 'Relationship' },
        { key: 'parentOccupation', label: 'Occupation' },
        { key: 'parentPhone', label: 'Phone' },
        { key: 'parentEmail', label: 'Email' },
        { key: 'emergencyPhone', label: 'Emergency Contact' },
        { key: 'siblingsCount', label: 'Siblings' },
        { key: 'siblingInSchool', label: 'Sibling in School?' },
        { key: 'bloodGroup', label: 'Blood Group' },
        { key: 'allergies', label: 'Allergies' },
        { key: 'medicalConditions', label: 'Medical Conditions' },
        { key: 'medicalInstructions', label: 'Emergency Instructions' },
        { key: 'prevSchool', label: 'Previous School' },
        { key: 'lastGrade', label: 'Last Grade' },
        { key: 'academicGrades', label: 'Academic Grades' },
        { key: 'leavingReason', label: 'Reason for Leaving' },
        { key: 'transferCert', label: 'Transfer Cert Available?' }
    ];

    let html = '<ul class="summary-list">';
    let hasData = false;

    for (let i = 0; i < fields.length; i++) {
        const val = localStorage.getItem(fields[i].key);
        if (val) {
            html += '<li><strong>' + fields[i].label + ':</strong> ' + val + '</li>';
            hasData = true;
        }
    }
    html += '</ul>';

    if (!hasData) {
        container.innerHTML = '<p style="text-align:center; font-style:italic;">No data found! Please fill forms.</p>';
    } else {
        container.innerHTML = html;
    }
}

function confirmSubmission() {
    const checkBox = document.getElementById('declarationCheck');
    if (checkBox && !checkBox.checked) {
        alert("You must accept the Binding Vow (Declaration) to proceed.");
        return;
    }

    const submission = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        studentName: localStorage.getItem('studentName') || '-',
        applyClass: localStorage.getItem('applyClass') || '-',
        parentName: localStorage.getItem('parentName') || '-',
        parentPhone: localStorage.getItem('parentPhone') || '-'
    };

    let all = JSON.parse(localStorage.getItem('allSubmissions') || '[]');
    all.push(submission);
    localStorage.setItem('allSubmissions', JSON.stringify(all));

    localStorage.clear();
    localStorage.setItem('allSubmissions', JSON.stringify(all));

    const keysToRemove = [
        'studentName', 'studentDob', 'studentAge', 'gender', 'applyClass', 'nationality', 'address', 'favSubject', 'ambition',
        'parentName', 'parentRelation', 'parentOccupation', 'parentPhone', 'parentEmail', 'emergencyPhone', 'siblingsCount', 'siblingInSchool',
        'bloodGroup', 'allergies', 'medicalConditions', 'medicalInstructions',
        'prevSchool', 'lastGrade', 'academicGrades', 'leavingReason', 'transferCert'
    ];

    for (const k of keysToRemove) {
        localStorage.removeItem(k);
    }

    alert("Binding Vow Sealed. Application Submitted.");
    window.location.href = "index.html";
}

function loadAdmin() {
    const tbody = document.getElementById('admin-body');
    if (!tbody) return;

    const all = JSON.parse(localStorage.getItem('allSubmissions') || '[]');

    if (all.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No sorcerers enrolled yet.</td></tr>';
        return;
    }

    let html = '';
    for (const item of all) {
        html += '<tr>';
        html += '<td>' + item.studentName + '</td>';
        html += '<td>' + item.applyClass + '</td>';
        html += '<td>' + item.parentName + '</td>';
        html += '<td>' + item.parentPhone + '</td>';
        html += '<td>' + item.date + '</td>';
        html += '</tr>';
    }

    tbody.innerHTML = html;
}
