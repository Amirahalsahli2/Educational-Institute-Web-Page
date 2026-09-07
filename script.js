/* ==========================================================
   ملف التفاعل والجافاسكريبت - معهد الخوارزمي للتدريب (script.js)
   ========================================================== */

let currentPoints = 1450;

function updateDisplay() {
    document.getElementById('user-points').innerText = currentPoints.toLocaleString();
    
    // حساب المستوى وتحديثه تلقائياً
    let tierName = "الذهبي (Gold)";
    let progressWidth = "90%";
    let tierBox = document.querySelectorAll('.tier-box');
    
    // إزالة الفئات النشطة السابقة
    tierBox.forEach(box => box.classList.remove('active-tier'));

    if (currentPoints < 500) {
        tierName = "البرونزي (Bronze)";
        progressWidth = Math.min(100, (currentPoints / 500) * 100) + "%";
        tierBox[0].classList.add('active-tier');
    } else if (currentPoints < 1500) {
        tierName = "الفضي (Silver)";
        progressWidth = Math.min(100, ((currentPoints - 500) / 1000) * 100) + "%";
        tierBox[1].classList.add('active-tier');
    } else if (currentPoints < 3000) {
        tierName = "الذهبي (Gold)";
        progressWidth = Math.min(100, ((currentPoints - 1500) / 1500) * 100) + "%";
        tierBox[2].classList.add('active-tier');
    } else {
        tierName = "البلاتيني (Platinum)";
        progressWidth = "100%";
        tierBox[3].classList.add('active-tier');
    }

    document.getElementById('current-tier-name').innerText = tierName;
    document.getElementById('tier-progress').style.width = progressWidth;
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

function addPoints(amount, activityName) {
    currentPoints += amount;
    updateDisplay();
    
    // إضافة العملية إلى سجل النشاطات
    const logList = document.getElementById('activity-log');
    const li = document.createElement('li');
    li.className = 'log-item';
    li.innerHTML = `
        <span>${activityName}</span>
        <div>
            <span style="color: #15803d; font-weight:700; margin-left: 10px;">+${amount} نقطة</span>
            <span class="log-time">الآن</span>
        </div>
    `;
    logList.insertBefore(li, logList.firstChild);

    showToast(`مبروك! حصلت على ${amount} نقطة (${activityName})`);
}

function redeemReward(cost, rewardName) {
    if (currentPoints >= cost) {
        currentPoints -= cost;
        updateDisplay();

        // إضافة عملية الخصم إلى سجل النشاطات
        const logList = document.getElementById('activity-log');
        const li = document.createElement('li');
        li.className = 'log-item spent';
        li.innerHTML = `
            <span>استبدال مكافأة: ${rewardName}</span>
            <div>
                <span style="color: #ef4444; font-weight:700; margin-left: 10px;">-${cost} نقطة</span>
                <span class="log-time">الآن</span>
            </div>
        `;
        logList.insertBefore(li, logList.firstChild);

        showToast(`تم استبدال المكافأة بنجاح: ${rewardName}!`);
    } else {
        showToast(`عذراً، رصيدك الحالي (${currentPoints}) لا يكفي لاستبدال هذه المكافأة (${cost} نقطة).`);
    }
}
